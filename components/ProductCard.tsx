'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Producto, Categoria, formatPrecio } from '@/data/catalog';
import { useCart } from '@/context/CartContext';

interface Props {
  producto: Producto;
  categoria: Categoria;
  index: number;
}

export default function ProductCard({ producto, categoria, index }: Props) {
  const { addItem } = useCart();
  const [varianteIdx, setVarianteIdx] = useState(0);
  const [sabor, setSabor] = useState(categoria.sabores?.[0] || '');
  const [imgError, setImgError] = useState(false);

  const varianteActual = producto.variantes[varianteIdx];

  const handleAdd = () => {
    const img = producto.esFundido && categoria.saboresImgs?.[sabor]
      ? categoria.saboresImgs[sabor]
      : producto.img;

    addItem({
      id: `${producto.id}-${varianteIdx}${sabor ? `-${sabor}` : ''}`,
      catId: categoria.id,
      nombre: producto.nombre,
      img,
      variante: varianteActual,
      sabor: producto.esFundido ? sabor : undefined,
    });
  };

  const imgSrc = producto.esFundido && sabor && categoria.saboresImgs?.[sabor]
    ? categoria.saboresImgs[sabor]
    : producto.img;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-[#e2ddd6] to-[#c8c4bc] flex items-center justify-center overflow-hidden">
        {!imgError ? (
          <Image
            src={imgSrc}
            alt={producto.alt}
            fill
            className="object-contain p-2"
            onError={() => setImgError(true)}
            loading="lazy"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="text-6xl opacity-40">🧀</div>
        )}
        <div className="absolute top-2 left-2 bg-verde text-crema text-xs font-bold px-2 py-0.5 rounded-full">
          {categoria.nombre}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-['Playfair_Display'] font-semibold text-verde text-base mb-1">{producto.nombre}</h3>

        {/* Fundido flavor selector */}
        {producto.esFundido && categoria.sabores && (
          <select
            value={sabor}
            onChange={e => setSabor(e.target.value)}
            className="text-xs border border-crema-oscuro rounded-lg px-2 py-1 mb-2 bg-crema text-texto w-full"
          >
            {categoria.sabores.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        )}

        {/* Variante selector */}
        {producto.variantes.length > 1 && (
          <div className="flex gap-1 mb-2 flex-wrap">
            {producto.variantes.map((v, i) => (
              <button
                key={i}
                onClick={() => setVarianteIdx(i)}
                className={`text-xs px-2 py-1 rounded-full border transition-colors ${
                  varianteIdx === i
                    ? 'bg-verde text-crema border-verde'
                    : 'border-crema-oscuro text-texto-medio hover:border-verde'
                }`}
              >
                {v.tipo}
              </button>
            ))}
          </div>
        )}

        <div className="mt-auto pt-3 flex items-center justify-between border-t border-crema-oscuro/50">
          <div>
            <span className="text-verde font-bold text-lg">{formatPrecio(varianteActual.precio)}</span>
            <span className="text-texto-medio text-xs ml-1">{varianteActual.unidad}</span>
          </div>
          <button
            onClick={handleAdd}
            className="bg-verde text-crema text-xs font-bold px-3 py-1.5 rounded-full hover:bg-verde-claro transition-colors flex items-center gap-1"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Agregar
          </button>
        </div>
      </div>
    </motion.div>
  );
}
