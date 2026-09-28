'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';

export interface Usuario {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  direccion: string;
  lat?: number;
  lng?: number;
  placeId?: string;
  formattedAddress?: string;
}

interface RegistroData extends Usuario {
  password: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  cargando: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  registro: (data: RegistroData) => Promise<string | null>;
  logout: () => void;
  updateUsuario: (data: Partial<Usuario>) => Promise<string | null>;
  isAuthOpen: boolean;
  setIsAuthOpen: (v: boolean) => void;
  authTab: 'login' | 'registro' | 'perfil';
  setAuthTab: (tab: 'login' | 'registro' | 'perfil') => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface PerfilRow {
  id: string;
  nombre: string;
  apellido: string;
  telefono: string;
  direccion: string;
  lat: number | null;
  lng: number | null;
  place_id: string | null;
  formatted_address: string | null;
}

function perfilAUsuario(perfil: PerfilRow, email: string): Usuario {
  return {
    nombre: perfil.nombre,
    apellido: perfil.apellido,
    email,
    telefono: perfil.telefono,
    direccion: perfil.direccion,
    lat: perfil.lat ?? undefined,
    lng: perfil.lng ?? undefined,
    placeId: perfil.place_id ?? undefined,
    formattedAddress: perfil.formatted_address ?? undefined,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'registro' | 'perfil'>('login');

  const cargarPerfil = async (userId: string, email: string) => {
    const { data } = await supabase.from('perfiles').select('*').eq('id', userId).single();
    if (data) {
      setUsuario(perfilAUsuario(data as PerfilRow, email));
      setAuthTab('perfil');
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) cargarPerfil(session.user.id, session.user.email!);
      setCargando(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        cargarPerfil(session.user.id, session.user.email!);
      } else {
        setUsuario(null);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<string | null> => {
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) return 'Email o contraseña incorrectos.';
    return null;
  };

  const registro = async (data: RegistroData): Promise<string | null> => {
    const { password, ...perfil } = data;
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: perfil.email,
      password,
    });
    if (signUpError) {
      if (signUpError.message.toLowerCase().includes('already registered')) {
        return 'Ya existe una cuenta con ese email. ¿Querés ingresar?';
      }
      return signUpError.message;
    }
    if (!signUpData.user) return 'No se pudo crear la cuenta. Intentá de nuevo.';

    const { error: perfilError } = await supabase.from('perfiles').insert({
      id: signUpData.user.id,
      nombre: perfil.nombre,
      apellido: perfil.apellido,
      telefono: perfil.telefono,
      direccion: perfil.direccion,
      lat: perfil.lat ?? null,
      lng: perfil.lng ?? null,
      place_id: perfil.placeId ?? null,
      formatted_address: perfil.formattedAddress ?? null,
    });
    if (perfilError) return perfilError.message;

    setUsuario(perfil);
    setAuthTab('perfil');
    return null;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUsuario(null);
    setAuthTab('login');
    setIsAuthOpen(false);
  };

  const updateUsuario = async (data: Partial<Usuario>): Promise<string | null> => {
    if (!usuario) return 'No hay sesión activa.';
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return 'No hay sesión activa.';

    const { error } = await supabase.from('perfiles').update({
      nombre: data.nombre ?? usuario.nombre,
      apellido: data.apellido ?? usuario.apellido,
      telefono: data.telefono ?? usuario.telefono,
      direccion: data.direccion ?? usuario.direccion,
      lat: data.lat ?? usuario.lat ?? null,
      lng: data.lng ?? usuario.lng ?? null,
      place_id: data.placeId ?? usuario.placeId ?? null,
      formatted_address: data.formattedAddress ?? usuario.formattedAddress ?? null,
    }).eq('id', session.user.id);

    if (error) return error.message;
    setUsuario({ ...usuario, ...data });
    return null;
  };

  return (
    <AuthContext.Provider value={{ usuario, cargando, login, registro, logout, updateUsuario, isAuthOpen, setIsAuthOpen, authTab, setAuthTab }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
