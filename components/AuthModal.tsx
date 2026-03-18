'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

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

/* ---------- Field component ---------- */
function Field({ id, label, type = 'text', placeholder, autoComplete, hint, inputMode, maxLength }: {
  id: string; label: string; type?: string; placeholder?: string; autoComplete?: string;
  hint?: string; inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']; maxLength?: number;
}) {
  const [state, setState] = useState<'idle' | 'ok' | 'err'>('idle');
  const [msg, setMsg] = useState(hint || '');

  return (
    <div className={`flex flex-col gap-1 ${state === 'err' ? 'text-red-600' : state === 'ok' ? 'text-green-700' : 'text-texto-medio'}`}>
      <label htmlFor={id} className="text-xs font-bold uppercase tracking-wider text-texto">{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        className={`w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-all bg-crema ${
          state === 'err' ? 'border-red-400 bg-red-50' : state === 'ok' ? 'border-green-500 bg-green-50/30' : 'border-crema-oscuro focus:border-verde'
        }`}
        onFocus={() => { setState('idle'); setMsg(hint || ''); }}
      />
      {msg && <p className="text-xs">{msg}</p>}
    </div>
  );
}

declare global {
  interface Window {
    google?: { maps?: { places?: unknown } };
    initMapsAutocomplete?: () => void;
  }
}

export default function AuthModal() {
  const { isAuthOpen, setIsAuthOpen, authTab, setAuthTab, usuario, login, registro, logout } = useAuth();
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [mapsReady, setMapsReady] = useState(false);
  const [direccionData, setDireccionData] = useState<{ text: string; lat?: number; lng?: number; placeId?: string; formatted?: string } | null>(null);
  const autocompleteRef = useRef<unknown>(null);
  const dirInputRef = useRef<HTMLInputElement>(null);
  const mapPreviewRef = useRef<HTMLDivElement>(null);

  /* Init Google Maps */
  useEffect(() => {
    if (!isAuthOpen) return;
    if (authTab !== 'registro' && !(authTab === 'perfil' && editMode)) return;

    const init = () => {
      if (!window.google?.maps) return;
      setMapsReady(true);
      if (!dirInputRef.current) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ac = new (window.google.maps as any).places.Autocomplete(dirInputRef.current, {
        componentRestrictions: { country: 'ar' },
        fields: ['formatted_address', 'geometry', 'place_id', 'name'],
        types: ['address'],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        bounds: new (window.google.maps as any).LatLngBounds(
          { lat: -33.0, lng: -65.5 },
          { lat: -29.5, lng: -62.5 }
        ),
        strictBounds: false,
      });

      ac.addListener('place_changed', () => {
        const place = ac.getPlace();
        if (!place.geometry) return;
        const data = {
          text: place.formatted_address || dirInputRef.current?.value || '',
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          placeId: place.place_id,
          formatted: place.formatted_address,
        };
        setDireccionData(data);
        if (dirInputRef.current) dirInputRef.current.value = data.text;

        // Mini map preview
        if (mapPreviewRef.current) {
          const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAGEov_aKhicAdnFoXVRBNvIBxyC8Yt9_s&q=place_id:${place.place_id}&zoom=16`;
          mapPreviewRef.current.innerHTML = `<iframe src="${mapUrl}" class="w-full h-full rounded-xl border-0" allowfullscreen loading="lazy"></iframe>`;
          mapPreviewRef.current.classList.remove('hidden');
        }
      });
      autocompleteRef.current = ac;
    };

    if (window.google?.maps) {
      init();
    } else {
      window.initMapsAutocomplete = init;
    }
  }, [isAuthOpen, authTab, editMode]);

  /* Load script once */
  useEffect(() => {
    if (document.querySelector('script[data-maps]')) return;
    const s = document.createElement('script');
    s.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAGEov_aKhicAdnFoXVRBNvIBxyC8Yt9_s&libraries=places&language=es&region=AR&callback=initMapsAutocomplete`;
    s.async = true;
    s.defer = true;
    s.setAttribute('data-maps', '1');
    document.body.appendChild(s);
  }, []);

  const handleLogin = () => {
    setError('');
    const email = (document.getElementById('login-email') as HTMLInputElement)?.value;
    if (!email) { setError('Ingresá tu email'); return; }
    const ok = login(email);
    if (!ok) setError('No encontramos una cuenta con ese email. ¿Querés registrarte?');
  };

  const handleRegistro = () => {
    setError('');
    const nombre = (document.getElementById('reg-nombre') as HTMLInputElement)?.value;
    const apellido = (document.getElementById('reg-apellido') as HTMLInputElement)?.value;
    const email = (document.getElementById('reg-email') as HTMLInputElement)?.value;
    const telefono = (document.getElementById('reg-telefono') as HTMLInputElement)?.value;
    const direccion = dirInputRef.current?.value || '';

    const errNombre = validarNombre(nombre);
    const errApellido = validarNombre(apellido);
    const errEmail = validarEmail(email);
    const errTel = validarTel(telefono);

    if (errNombre || errApellido || errEmail || errTel) {
      setError(errNombre || errApellido || errEmail || errTel || 'Revisá los campos');
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
    const ok = registro({
      nombre: nombre.trim().replace(/\b\w/g, c => c.toUpperCase()),
      apellido: apellido.trim().replace(/\b\w/g, c => c.toUpperCase()),
      email: email.trim().toLowerCase(),
      telefono: formatTel(d),
      direccion,
      lat: direccionData?.lat,
      lng: direccionData?.lng,
      placeId: direccionData?.placeId,
      formattedAddress: direccionData?.formatted,
    });

    if (!ok) setError('Ya existe una cuenta con ese email. ¿Querés ingresar?');
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
                  {error && <p className="text-red-600 text-sm text-center">{error}</p>}
                  <button onClick={handleLogin} className="w-full bg-verde text-crema font-bold py-3 rounded-full hover:bg-verde-claro transition-colors">
                    Ingresar
                  </button>
                  <p className="text-center text-sm text-texto-medio">
                    ¿No tenés cuenta?{' '}
                    <button onClick={() => { setAuthTab('registro'); setError(''); }} className="text-verde font-bold hover:underline">
                      Registrate aquí
                    </button>
                  </p>
                </div>
              </div>
            )}

            {/* --- REGISTRO --- */}
            {authTab === 'registro' && (
              <div>
                <h3 className="text-2xl font-['Playfair_Display'] font-bold text-verde text-center mb-1">Crear cuenta</h3>
                <p className="text-texto-medio text-sm text-center mb-6">Completá tus datos para realizar pedidos fácilmente</p>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Field id="reg-nombre" label="Nombre *" placeholder="Juan" autoComplete="given-name" />
                    <Field id="reg-apellido" label="Apellido *" placeholder="García" autoComplete="family-name" />
                  </div>
                  <Field id="reg-email" label="Email *" type="email" placeholder="tucorreo@email.com" autoComplete="email" />
                  <Field id="reg-telefono" label="Teléfono / WhatsApp *" type="tel" placeholder="351 123-4567" autoComplete="tel" hint="Sin 0 ni 15 — solo código de área y número" maxLength={20} />

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
                    {/* Map preview */}
                    <div ref={mapPreviewRef} className="hidden h-36 mt-2 rounded-xl overflow-hidden" />
                    {direccionData && (
                      <div className="flex items-center gap-2 text-xs text-verde bg-green-50 border border-green-200 px-3 py-2 rounded-lg mt-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                        {direccionData.text}
                      </div>
                    )}
                  </div>

                  {error && <p className="text-red-600 text-sm text-center bg-red-50 px-4 py-2 rounded-xl">{error}</p>}
                  <button onClick={handleRegistro} className="w-full bg-verde text-crema font-bold py-3 rounded-full hover:bg-verde-claro transition-colors mt-2">
                    Crear Cuenta
                  </button>
                  <p className="text-center text-sm text-texto-medio">
                    ¿Ya tenés cuenta?{' '}
                    <button onClick={() => { setAuthTab('login'); setError(''); }} className="text-verde font-bold hover:underline">
                      Ingresá aquí
                    </button>
                  </p>
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
