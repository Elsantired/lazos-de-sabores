'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

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

interface AuthContextType {
  usuario: Usuario | null;
  login: (email: string) => boolean;
  registro: (data: Usuario) => boolean;
  logout: () => void;
  updateUsuario: (data: Partial<Usuario>) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (v: boolean) => void;
  authTab: 'login' | 'registro' | 'perfil';
  setAuthTab: (tab: 'login' | 'registro' | 'perfil') => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'registro' | 'perfil'>('login');

  useEffect(() => {
    const saved = localStorage.getItem('lzs_usuario');
    if (saved) setUsuario(JSON.parse(saved));
  }, []);

  const login = (email: string): boolean => {
    const users: Usuario[] = JSON.parse(localStorage.getItem('lzs_users') || '[]');
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    if (found) {
      setUsuario(found);
      localStorage.setItem('lzs_usuario', JSON.stringify(found));
      setAuthTab('perfil');
      return true;
    }
    return false;
  };

  const registro = (data: Usuario): boolean => {
    const users: Usuario[] = JSON.parse(localStorage.getItem('lzs_users') || '[]');
    if (users.find(u => u.email.toLowerCase() === data.email.toLowerCase())) return false;
    const updated = [...users, data];
    localStorage.setItem('lzs_users', JSON.stringify(updated));
    localStorage.setItem('lzs_usuario', JSON.stringify(data));
    setUsuario(data);
    setAuthTab('perfil');
    return true;
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('lzs_usuario');
    setAuthTab('login');
    setIsAuthOpen(false);
  };

  const updateUsuario = (data: Partial<Usuario>) => {
    if (!usuario) return;
    const updated = { ...usuario, ...data };
    const users: Usuario[] = JSON.parse(localStorage.getItem('lzs_users') || '[]');
    const idx = users.findIndex(u => u.email === usuario.email);
    if (idx >= 0) users[idx] = updated;
    localStorage.setItem('lzs_users', JSON.stringify(users));
    localStorage.setItem('lzs_usuario', JSON.stringify(updated));
    setUsuario(updated);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, registro, logout, updateUsuario, isAuthOpen, setIsAuthOpen, authTab, setAuthTab }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
