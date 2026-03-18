'use client';

import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useWhatsApp } from '@/hooks/useWhatsApp';
import { formatPrecio } from '@/data/catalog';

export default function CartSidebar() {
  const { items, removeItem, updateQty, total, isOpen, setIsOpen } = useCart();
  const { usuario } = useAuth();
  const { enviarPedido } = useWhatsApp();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-verde text-crema">
          <h3 className="font-['Playfair_Display'] font-bold text-xl">Tu Pedido</h3>
          <button onClick={() => setIsOpen(false)} aria-label="Cerrar carrito" className="p-1 hover:text-dorado transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-12 text-texto-medio">
              <div className="text-5xl mb-3">🧀</div>
              <p className="font-semibold">Tu carrito está vacío</p>
              <p className="text-sm mt-1">Agregá productos del catálogo</p>
            </div>
          ) : items.map(item => (
            <div key={item.id} className="flex gap-3 bg-crema rounded-xl p-3">
              <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-[#e2ddd6] shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.img} alt={item.nombre} className="w-full h-full object-contain p-1" loading="lazy" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-verde text-sm truncate">
                  {item.nombre}{item.sabor ? ` (${item.sabor})` : ''}
                </p>
                <p className="text-xs text-texto-medio">{item.variante.tipo}</p>
                <p className="text-verde font-bold text-sm">{formatPrecio(item.variante.precio)}{item.variante.unidad}</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 bg-verde text-crema rounded-full text-xs hover:bg-verde-claro flex items-center justify-center">+</button>
                <span className="text-sm font-bold">{item.cantidad}</span>
                <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 border border-verde text-verde rounded-full text-xs hover:bg-red-50 flex items-center justify-center">−</button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-crema-oscuro px-4 py-4 space-y-3">
          <p className="text-xs text-texto-medio/70 text-center">
            * El total final depende del peso exacto de cada horma.
          </p>
          {items.length > 0 && (
            <div className="flex justify-between items-center font-bold text-verde">
              <span>Subtotal estimado</span>
              <span>{formatPrecio(total)}</span>
            </div>
          )}
          <button
            onClick={() => enviarPedido(items, usuario)}
            className="w-full bg-[#25d366] text-white font-bold py-3 rounded-full flex items-center justify-center gap-2 hover:bg-[#20bc5a] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
            Enviar Pedido por WhatsApp
          </button>
        </div>
      </aside>
    </>
  );
}
