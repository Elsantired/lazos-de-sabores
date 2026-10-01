'use client';

import { useEffect, useState } from 'react';
import { useCart, subtotalItem } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useWhatsApp, DatosCheckout } from '@/hooks/useWhatsApp';
import { useAddressAutocomplete } from '@/hooks/useAddressAutocomplete';
import { formatPrecio } from '@/data/catalog';

function validarTel(v: string) {
  const d = v.replace(/\D/g, '');
  return d.length >= 10;
}

export default function CheckoutModal() {
  const { items, isCheckoutOpen, setIsCheckoutOpen, total } = useCart();
  const { usuario } = useAuth();
  const { enviarPedido } = useWhatsApp();

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [formaEntrega, setFormaEntrega] = useState<'envio' | 'retiro'>('envio');
  const [formaPago, setFormaPago] = useState<'efectivo' | 'transferencia'>('efectivo');
  const [error, setError] = useState('');

  const { inputRef: dirInputRef, mapsReady, direccionData, setDireccionData } = useAddressAutocomplete(isCheckoutOpen && formaEntrega === 'envio');
  const direccionTexto = direccionData?.text || '';

  // Prefill con los datos del usuario logueado, si hay
  useEffect(() => {
    if (!isCheckoutOpen) return;
    if (usuario) {
      setNombre(usuario.nombre);
      setApellido(usuario.apellido);
      setTelefono(usuario.telefono);
      const dirGuardada = usuario.formattedAddress || usuario.direccion || '';
      if (dirGuardada) {
        setDireccionData({ text: dirGuardada, lat: usuario.lat, lng: usuario.lng, placeId: usuario.placeId, formatted: usuario.formattedAddress });
        if (dirInputRef.current) dirInputRef.current.value = dirGuardada;
      }
    }
    setError('');
  }, [isCheckoutOpen, usuario, setDireccionData, dirInputRef]);

  if (!isCheckoutOpen) return null;

  const handleConfirmar = () => {
    setError('');
    if (!nombre.trim() || !apellido.trim()) { setError('Ingresá tu nombre y apellido'); return; }
    if (!validarTel(telefono)) { setError('Ingresá un teléfono válido'); return; }
    if (formaEntrega === 'envio') {
      if (!direccionTexto || direccionTexto.length < 8) { setError('Ingresá tu dirección de entrega'); return; }
      if (mapsReady && !direccionData) { setError('Seleccioná tu dirección de la lista de Google Maps'); return; }
    }

    const datos: DatosCheckout = {
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      telefono: telefono.trim(),
      formaEntrega,
      direccion: formaEntrega === 'envio' ? direccionTexto : undefined,
      formaPago,
    };

    enviarPedido(items, datos);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4" onClick={() => setIsCheckoutOpen(false)}>
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={() => setIsCheckoutOpen(false)}
          aria-label="Cerrar"
          className="absolute top-4 right-4 p-2 text-texto-medio hover:text-texto rounded-full hover:bg-crema"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className="p-8">
          <h3 className="text-2xl font-['Playfair_Display'] font-bold text-verde text-center mb-1">Completá tu pedido</h3>
          <p className="text-texto-medio text-sm text-center mb-6">Un último paso antes de enviarlo por WhatsApp</p>

          <div className="space-y-4">
            {/* Datos de contacto */}
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-texto-medio/70">Tus datos</span>
              <div className="grid grid-cols-2 gap-2">
                <input
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  placeholder="Nombre"
                  className="px-3 py-2.5 rounded-xl border-2 border-crema-oscuro focus:border-verde text-sm outline-none bg-crema"
                />
                <input
                  value={apellido}
                  onChange={e => setApellido(e.target.value)}
                  placeholder="Apellido"
                  className="px-3 py-2.5 rounded-xl border-2 border-crema-oscuro focus:border-verde text-sm outline-none bg-crema"
                />
              </div>
              <input
                value={telefono}
                onChange={e => setTelefono(e.target.value)}
                type="tel"
                placeholder="Teléfono / WhatsApp"
                className="mt-2 px-3 py-2.5 rounded-xl border-2 border-crema-oscuro focus:border-verde text-sm outline-none bg-crema w-full"
              />
            </div>

            {/* Forma de entrega */}
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-texto-medio/70">Forma de entrega</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFormaEntrega('envio')}
                  className={`flex-1 text-sm px-3 py-2.5 rounded-xl border-2 transition-colors ${
                    formaEntrega === 'envio' ? 'bg-verde text-crema border-verde' : 'border-crema-oscuro text-texto-medio hover:border-verde'
                  }`}
                >
                  📦 Necesito que me lo envíen
                </button>
                <button
                  type="button"
                  onClick={() => setFormaEntrega('retiro')}
                  className={`flex-1 text-sm px-3 py-2.5 rounded-xl border-2 transition-colors ${
                    formaEntrega === 'retiro' ? 'bg-verde text-crema border-verde' : 'border-crema-oscuro text-texto-medio hover:border-verde'
                  }`}
                >
                  🏠 Lo retiro personalmente
                </button>
              </div>
            </div>

            {/* Direccion (solo si envio) */}
            {formaEntrega === 'envio' && (
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-texto-medio/70">
                  Dirección de entrega {mapsReady ? '— buscá en el mapa' : ''}
                </span>
                <input
                  ref={dirInputRef}
                  defaultValue={direccionTexto}
                  type="text"
                  placeholder={mapsReady ? 'Escribí tu calle y número...' : 'Calle, número y localidad...'}
                  autoComplete="off"
                  spellCheck={false}
                  onChange={e => {
                    if (mapsReady) setDireccionData(null);
                    else setDireccionData(e.target.value ? { text: e.target.value } : null);
                  }}
                  className="px-3 py-2.5 rounded-xl border-2 border-crema-oscuro focus:border-verde text-sm outline-none bg-crema w-full"
                />
                {mapsReady && direccionData && (
                  <div className="flex items-center gap-2 text-xs text-verde bg-green-50 border border-green-200 px-3 py-2 rounded-lg mt-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    {direccionTexto}
                  </div>
                )}
                {!mapsReady && (
                  <p className="text-xs text-texto-medio/70">Ingresá calle, número y localidad (ej: Av. Colón 1234, Córdoba)</p>
                )}
              </div>
            )}

            {/* Forma de pago */}
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-texto-medio/70">Forma de pago</span>
              <select
                value={formaPago}
                onChange={e => setFormaPago(e.target.value as 'efectivo' | 'transferencia')}
                className="px-3 py-2.5 rounded-xl border-2 border-crema-oscuro focus:border-verde text-sm outline-none bg-crema w-full"
              >
                <option value="efectivo">Efectivo</option>
                <option value="transferencia">Transferencia bancaria</option>
              </select>
            </div>

            {/* Resumen del pedido */}
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-texto-medio/70">Resumen del pedido</span>
              <div className="bg-crema rounded-xl p-3 space-y-2 max-h-40 overflow-y-auto">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-start text-sm gap-2">
                    <span className="text-texto">
                      {item.cantidad}x {item.nombre}{item.sabor ? ` (${item.sabor})` : ''}
                      <span className="text-texto-medio text-xs block">{item.variante.tipo}{item.variante.pesoAprox ? ` · ≈${item.variante.pesoAprox}kg` : ''}</span>
                    </span>
                    <span className="text-verde font-bold whitespace-nowrap">{formatPrecio(subtotalItem(item))}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center font-bold text-verde pt-2">
                <span>Total aproximado</span>
                <span>{formatPrecio(total)}</span>
              </div>
            </div>

            {error && <p className="text-red-600 text-sm text-center bg-red-50 px-4 py-2 rounded-xl">{error}</p>}

            <button
              onClick={handleConfirmar}
              className="w-full bg-[#25d366] text-white font-bold py-3 rounded-full flex items-center justify-center gap-2 hover:bg-[#20bc5a] transition-colors mt-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
              Confirmar y enviar por WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
