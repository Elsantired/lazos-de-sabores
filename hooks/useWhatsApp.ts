'use client';

import { CartItem, subtotalItem } from '@/context/CartContext';
import { WHATSAPP_VENDEDOR, formatPrecio } from '@/data/catalog';

export interface DatosCheckout {
  nombre: string;
  apellido: string;
  telefono: string;
  formaEntrega: 'envio' | 'retiro';
  direccion?: string;
  formaPago: 'efectivo' | 'transferencia';
}

const LABEL_PAGO: Record<DatosCheckout['formaPago'], string> = {
  efectivo: 'Efectivo',
  transferencia: 'Transferencia bancaria',
};

export function useWhatsApp() {
  const enviarPedido = (items: CartItem[], datos: DatosCheckout) => {
    if (items.length === 0) {
      alert('Tu carrito está vacío. Agregá productos antes de enviar el pedido.');
      return;
    }

    const hayAproximados = items.some(i => i.variante.pesoAprox);

    const lineas = items.map((item, idx) => {
      const nombre = item.sabor ? `${item.nombre} (${item.sabor})` : item.nombre;
      let bloque = `${idx + 1}. *${nombre}* — ${item.variante.tipo} (x${item.cantidad})\n`;
      if (item.variante.pesoAprox) {
        bloque += `   Peso aprox: ${item.variante.pesoAprox}kg c/u · Precio aprox: ${formatPrecio(subtotalItem(item))}`;
      } else {
        bloque += `   Precio: ${formatPrecio(subtotalItem(item))}`;
      }
      return bloque;
    });

    const total = items.reduce((sum, i) => sum + subtotalItem(i), 0);

    let mensaje = `Hola Lazos de Sabores! Necesito hacer el siguiente pedido:\n\n`;
    mensaje += lineas.join('\n\n');
    mensaje += `\n\n💰 *Total ${hayAproximados ? 'aproximado' : ''}:* ${formatPrecio(total)}`;
    if (hayAproximados) {
      mensaje += `\n\n⚠️ _Los precios de hormas son estimados según el peso promedio de cada pieza. El vendedor te va a confirmar el total exacto al coordinar la entrega, una vez pesada la pieza real._`;
    }

    mensaje += `\n\n👤 *DATOS DEL PEDIDO:*\n`;
    mensaje += `Nombre: ${datos.nombre} ${datos.apellido}\n`;
    mensaje += `WhatsApp: ${datos.telefono}\n`;
    mensaje += `Entrega: ${datos.formaEntrega === 'envio' ? 'Envío a domicilio' : 'Retiro personal'}\n`;
    if (datos.formaEntrega === 'envio' && datos.direccion) {
      mensaje += `Dirección: ${datos.direccion}\n`;
    }
    mensaje += `Forma de pago: ${LABEL_PAGO[datos.formaPago]}\n`;

    mensaje += `\n✅ Confirmo mi pedido y espero ser contactado para coordinar la entrega.`;

    const url = `https://wa.me/${WHATSAPP_VENDEDOR}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return { enviarPedido };
}
