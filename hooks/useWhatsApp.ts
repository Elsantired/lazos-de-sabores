'use client';

import { CartItem } from '@/context/CartContext';
import { Usuario } from '@/context/AuthContext';
import { WHATSAPP_VENDEDOR, formatPrecio } from '@/data/catalog';

export function useWhatsApp() {
  const enviarPedido = (items: CartItem[], usuario: Usuario | null) => {
    if (items.length === 0) {
      alert('Tu carrito está vacío. Agregá productos antes de enviar el pedido.');
      return;
    }

    const lineas = items.map(item => {
      const nombre = item.sabor ? `${item.nombre} (${item.sabor})` : item.nombre;
      const precio = formatPrecio(item.variante.precio);
      return `• ${item.cantidad}x ${nombre} — ${item.variante.tipo} @ ${precio}${item.variante.unidad}`;
    });

    const total = items.reduce((sum, i) => sum + i.variante.precio * i.cantidad, 0);

    let mensaje = `🧀 *PEDIDO — Lazos de Sabores*\n`;
    mensaje += `━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    mensaje += `📋 *DETALLE DEL PEDIDO:*\n`;
    mensaje += lineas.join('\n');
    mensaje += `\n\n💰 *Subtotal estimado:* ${formatPrecio(total)}`;
    mensaje += `\n_(El precio final de las hormas depende del peso exacto)_\n`;

    if (usuario) {
      mensaje += `\n\n👤 *DATOS DE ENTREGA:*\n`;
      mensaje += `Nombre: ${usuario.nombre} ${usuario.apellido}\n`;
      mensaje += `WhatsApp: ${usuario.telefono}\n`;
      if (usuario.formattedAddress) {
        mensaje += `Dirección: ${usuario.formattedAddress}\n`;
      } else {
        mensaje += `Dirección: ${usuario.direccion}\n`;
      }
    } else {
      mensaje += `\n\n_Por favor registrate para agilizar el proceso de entrega._`;
    }

    mensaje += `\n\n✅ Confirmo mi pedido y espero ser contactado para coordinar la entrega.`;

    const url = `https://wa.me/${WHATSAPP_VENDEDOR}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return { enviarPedido };
}
