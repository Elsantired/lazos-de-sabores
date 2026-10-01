'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useAddressAutocomplete } from '@/hooks/useAddressAutocomplete';

/* ---------- Validators ---------- */
function validarNombre(v: string) {
  if (!v.trim()) return 'Campo obligatorio';
  if (v.trim().length < 2) return 'Mínimo 2 caracteres';
  if (!/^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s'\-]+$/i.test(v.trim())) return 'Solo letras';
  return null;
}
function validarEmail(v: string) {
  if (!v.trim()) return 'Campo obligatorio';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return 'Email no válido';
  return null;
}
function normalizarTel(v: string) {
  let d = v.replace(/\D/g, '');
  if (d.startsWith('54') && d.length > 10) d = d.slice(2);
  if (d.startsWith('9') && d.length === 11) d = d.slice(1);
  if (d.startsWith('0') && d.length > 10) d = d.slice(1);
  return d;
}
function formatTel(d: string) {
  if (d.length < 10) return d;
  const area3 = ['351','353','358','354','362','381','387','388'];
  const cod3 = area3.some(a => d.startsWith(a));
  if (cod3 && d.length === 10) return `${d.slice(0,3)} ${d.slice(3,6)}-${d.slice(6)}`;
  if (d.length === 10) return `${d.slice(0,2)} ${d.slice(2,6)}-${d.slice(6)}`;
  return d;
}
function validarTel(v: string) {
  if (!v.trim()) return 'Campo obligatorio';
  const d = normalizarTel(v.trim());
  if (d.length < 10) return 'Número incompleto — 10 dígitos sin código de país';
  if (d.length > 11) return 'Número demasiado largo — sin +54';
  return null;
}

function validarPassword(v: string) {
  if (!v) return 'Campo obligatorio';
  if (v.length < 6) return 'Mínimo 6 caracteres';
  return null;
}

/* ---------- Field component ---------- */
function Field({ id, label, type = 'text', placeholder, autoComplete, hint, inputMode, maxLength, defaultValue, disabled, togglePassword }: {
  id: string; label: string; type?: string; placeholder?: string; autoComplete?: string;
  hint?: string; inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']; maxLength?: number; defaultValue?: string; disabled?: boolean; togglePassword?: boolean;
}) {
  const [state, setState] = useState<'idle' | 'ok' | 'err'>('idle');
  const [msg, setMsg] = useState(hint || '');
  const [visible, setVisible] = useState(false);
  const esPassword = type === 'password';

  return (
    <div className={`flex flex-col gap-1 ${state === 'err' ? 'text-red-600' : state === 'ok' ? 'text-green-700' : 'text-texto-medio'}`}>
      <label htmlFor={id} className="text-xs font-bold uppercase tracking-wider text-texto">{label}</label>
      <div className="relative">
      <input
        id={id}
        type={esPassword && togglePassword && visible ? 'text' : type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        defaultValue={defaultValue}
        disabled={disabled}
        className={`w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-all bg-crema disabled:opacity-60 disabled:cursor-not-allowed ${esPassword && togglePassword ? 'pr-11' : ''} ${
          state === 'err' ? 'border-red-400 bg-red-50' : state === 'ok' ? 'border-green-500 bg-green-50/30' : 'border-crema-oscuro focus:border-verde'
        }`}
        onFocus={() => { setState('idle'); setMsg(hint || ''); }}
      />
      {esPassword && togglePassword && (
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setVisible(v => !v)}
          aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-texto-medio/60 hover:text-verde"
        >
          {visible ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          )}
        </button>
      )}
      </div>
      {msg && <p className="text-xs">{msg}</p>}
    </div>
  );
}

export default function AuthModal() {
  const { isAuthOpen, setIsAuthOpen, authTab, setAuthTab, usuario, login, registro, logout, updateUsuario } = useAuth();
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const { inputRef: dirInputRef, mapsReady, direccionData, setDireccionData } = useAddressAutocomplete(isAuthOpen && authTab === 'registro');

  /* Prefill address when editing an existing profile */
  useEffect(() => {
    if (authTab === 'registro' && editMode && usuario) {
      const dir = usuario.formattedAddress || usuario.direccion;
      if (dirInputRef.current) dirInputRef.current.value = dir;
      if (usuario.lat != null && usuario.lng != null) {
        setDireccionData({
          text: dir,
          lat: usuario.lat,
          lng: usuario.lng,
          placeId: usuario.placeId,
          formatted: usuario.formattedAddress,
        });
      }
    }
  }, [authTab, editMode, usuario, dirInputRef, setDireccionData]);

  const handleLogin = async () => {
    setError('');
    const email = (document.getElementById('login-email') as HTMLInputElement)?.value;
    const password = (document.getElementById('login-password') as HTMLInputElement)?.value;
    if (!email) { setError('Ingresá tu email'); return; }
    if (!password) { setError('Ingresá tu contraseña'); return; }
    setEnviando(true);
    const err = await login(email, password);
    setEnviando(false);
    if (err) setError(err);
  };

  const handleRegistro = async () => {
    setError('');
    const nombre = (document.getElementById('reg-nombre') as HTMLInputElement)?.value;
    const apellido = (document.getElementById('reg-apellido') as HTMLInputElement)?.value;
    const email = (document.getElementById('reg-email') as HTMLInputElement)?.value;
    const telefono = (document.getElementById('reg-telefono') as HTMLInputElement)?.value;
    const password = (document.getElementById('reg-password') as HTMLInputElement)?.value || '';
    const passwordConfirm = (document.getElementById('reg-password-confirm') as HTMLInputElement)?.value || '';
    const direccion = dirInputRef.current?.value || '';

    const errNombre = validarNombre(nombre);
    const errApellido = validarNombre(apellido);
    const errEmail = validarEmail(email);
    const errTel = validarTel(telefono);
    const errPassword = editMode ? null : validarPassword(password);

    if (errNombre || errApellido || errEmail || errTel || errPassword) {
      setError(errNombre || errApellido || errEmail || errTel || errPassword || 'Revisá los campos');
      return;
    }
    if (!editMode && password !== passwordConfirm) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if (!direccion || direccion.length < 8) {
      setError('Ingresá tu dirección completa');
      return;
    }
    if (mapsReady && !direccionData) {
      setError('Seleccioná tu dirección de la lista de Google Maps');
      return;
    }

    const d = normalizarTel(telefono.trim());
    const payload = {
      nombre: nombre.trim().replace(/\b\w/g, c => c.toUpperCase()),
      apellido: apellido.trim().replace(/\b\w/g, c => c.toUpperCase()),
      email: email.trim().toLowerCase(),
      telefono: formatTel(d),
      direccion,
      lat: direccionData?.lat,
      lng: direccionData?.lng,
      placeId: direccionData?.placeId,
      formattedAddress: direccionData?.formatted,
    };

    setEnviando(true);
    const err = editMode ? await updateUsuario(payload) : await registro({ ...payload, password });
    setEnviando(false);

    if (err) { setError(err); return; }
    setEditMode(false);
  };

  if (!isAuthOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setIsAuthOpen(false)}>
        <div
          className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto relative"
          onClick={e => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={() => setIsAuthOpen(false)}
            className="absolute top-4 right-4 p-2 text-texto-medio hover:text-texto rounded-full hover:bg-crema"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <div className="p-8">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Image src="/lazos-logo.png" alt="Lazos de Sabores" width={64} height={64} className="rounded-full" />
            </div>

            {/* --- LOGIN --- */}
            {authTab === 'login' && (
              <div>
                <h3 className="text-2xl font-['Playfair_Display'] font-bold text-verde text-center mb-1">Bienvenido de nuevo</h3>
                <p className="text-texto-medio text-sm text-center mb-6">Ingresá con tu email para realizar pedidos</p>
                <div className="space-y-4">
                  <Field id="login-email" label="Email" type="email" placeholder="tucorreo@email.com" autoComplete="email" />
                  <Field id="login-password" label="Contraseña" type="password" placeholder="••••••••" autoComplete="current-password" togglePassword />
                  {error && <p className="text-red-600 text-sm text-center">{error}</p>}
                  <button onClick={handleLogin} disabled={enviando} className="w-full bg-verde text-crema font-bold py-3 rounded-full hover:bg-verde-claro transition-colors disabled:opacity-60">
                    {enviando ? 'Ingresando...' : 'Ingresar'}
                  </button>
                  <p className="text-center text-sm text-texto-medio">
                    ¿No tenés cuenta?{' '}
                    <button onClick={() => { setAuthTab('registro'); setEditMode(false); setError(''); }} className="text-verde font-bold hover:underline">
                      Registrate aquí
                    </button>
                  </p>
                </div>
              </div>
            )}

            {/* --- REGISTRO --- */}
            {authTab === 'registro' && (
              <div>
                <h3 className="text-2xl font-['Playfair_Display'] font-bold text-verde text-center mb-1">{editMode ? 'Editar datos' : 'Crear cuenta'}</h3>
                <p className="text-texto-medio text-sm text-center mb-6">{editMode ? 'Actualizá tus datos de contacto y entrega' : 'Completá tus datos para realizar pedidos fácilmente'}</p>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Field id="reg-nombre" label="Nombre *" placeholder="Juan" autoComplete="given-name" defaultValue={editMode ? usuario?.nombre : undefined} />
                    <Field id="reg-apellido" label="Apellido *" placeholder="García" autoComplete="family-name" defaultValue={editMode ? usuario?.apellido : undefined} />
                  </div>
                  <Field id="reg-email" label="Email *" type="email" placeholder="tucorreo@email.com" autoComplete="email" defaultValue={editMode ? usuario?.email : undefined} disabled={editMode} />
                  {editMode && <p className="text-xs text-texto-medio/70 -mt-2">El email no se puede cambiar desde acá.</p>}
                  <Field id="reg-telefono" label="Teléfono / WhatsApp *" type="tel" placeholder="351 123-4567" autoComplete="tel" hint="Sin 0 ni 15 — solo código de área y número" maxLength={20} defaultValue={editMode ? usuario?.telefono : undefined} />
                  {!editMode && (
                    <div className="grid grid-cols-2 gap-3">
                      <Field id="reg-password" label="Contraseña *" type="password" placeholder="••••••••" autoComplete="new-password" hint="Mínimo 6 caracteres" togglePassword />
                      <Field id="reg-password-confirm" label="Repetir contraseña *" type="password" placeholder="••••••••" autoComplete="new-password" togglePassword />
                    </div>
                  )}

                  {/* Address */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-texto flex items-center gap-2">
                      Dirección de entrega *
                      <span className="text-xs bg-verde/10 text-verde px-2 py-0.5 rounded-full font-normal normal-case tracking-normal">
                        {mapsReady ? '🗺 buscá en el mapa' : '📍 ingresá manualmente'}
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        ref={dirInputRef}
                        type="text"
                        placeholder={mapsReady ? 'Escribí tu calle y número...' : 'Calle, número y localidad...'}
                        autoComplete="off"
                        spellCheck={false}
                        onChange={() => { if (mapsReady) setDireccionData(null); }}
                        className="w-full px-4 py-3 pr-10 rounded-xl border-2 border-crema-oscuro focus:border-verde text-sm outline-none bg-crema transition-all"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-texto-medio/40">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                      </span>
                    </div>
                    {!mapsReady && (
                      <p className="text-xs text-texto-medio/70">Ingresá calle, número y localidad (ej: Av. Colón 1234, Córdoba)</p>
                    )}
                    {direccionData && (
                      <div className="flex items-center gap-2 text-xs text-verde bg-green-50 border border-green-200 px-3 py-2 rounded-lg mt-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                        {direccionData.text}
                      </div>
                    )}
                    {direccionData?.formatted && (
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccionData.formatted)}${direccionData.placeId ? `&query_place_id=${direccionData.placeId}` : ''}`}
                        target="_blank"
                        rel="noopener"
                        className="flex items-center gap-2 text-xs text-verde underline hover:text-verde-claro mt-1"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        Ver en Google Maps
                      </a>
                    )}
                  </div>

                  {error && <p className="text-red-600 text-sm text-center bg-red-50 px-4 py-2 rounded-xl">{error}</p>}
                  <button onClick={handleRegistro} disabled={enviando} className="w-full bg-verde text-crema font-bold py-3 rounded-full hover:bg-verde-claro transition-colors mt-2 disabled:opacity-60">
                    {enviando ? 'Guardando...' : editMode ? 'Guardar Cambios' : 'Crear Cuenta'}
                  </button>
                  {editMode ? (
                    <button onClick={() => { setAuthTab('perfil'); setEditMode(false); setError(''); }} className="w-full text-center text-sm text-texto-medio hover:text-verde">
                      Cancelar
                    </button>
                  ) : (
                    <p className="text-center text-sm text-texto-medio">
                      ¿Ya tenés cuenta?{' '}
                      <button onClick={() => { setAuthTab('login'); setError(''); }} className="text-verde font-bold hover:underline">
                        Ingresá aquí
                      </button>
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* --- PERFIL --- */}
            {authTab === 'perfil' && usuario && (
              <div>
                <h3 className="text-2xl font-['Playfair_Display'] font-bold text-verde text-center mb-6">Tu Perfil</h3>
                <div className="bg-crema rounded-2xl p-5 space-y-3 mb-4">
                  {[
                    { label: 'Nombre', value: `${usuario.nombre} ${usuario.apellido}` },
                    { label: 'Email', value: usuario.email },
                    { label: 'Teléfono', value: usuario.telefono },
                    { label: 'Dirección', value: usuario.formattedAddress || usuario.direccion },
                  ].map(f => (
                    <div key={f.label} className="flex flex-col gap-0.5">
                      <span className="text-xs text-texto-medio uppercase tracking-wider">{f.label}</span>
                      <span className="text-verde font-medium text-sm">{f.value}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => { setAuthTab('registro'); setEditMode(true); }}
                    className="w-full border-2 border-verde text-verde font-bold py-2.5 rounded-full hover:bg-verde/5 transition-colors"
                  >
                    Editar datos
                  </button>
                  <button
                    onClick={logout}
                    className="w-full border-2 border-red-400 text-red-600 font-bold py-2.5 rounded-full hover:bg-red-50 transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
