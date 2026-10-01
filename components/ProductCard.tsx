'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [justAdded, setJustAdded] = useState(false);

  const varianteActual = producto.variantes[varianteIdx];

  const handleAdd = () => {
    const img = producto.esFundido && categoria.saboresImgs?.[sabor]
      ? categoria.saboresImgs[sabor]
      : producto.img;

    addItem({
      id: `${producto.id}-${varianteIdx}${sabor ? `-${sabor}` : ''}`,
      catId: categoria.id,
      productoId: producto.id,
      varianteIdx,
      nombre: producto.nombre,
      img,
      variante: varianteActual,
      sabor: producto.esFundido ? sabor : undefined,
    });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 900);
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
      <div className="relative aspect-[3/2] bg-gradient-to-br from-[#e2ddd6] to-[#c8c4bc] flex items-center justify-center overflow-hidden">
        {!imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imgSrc}
            alt={producto.alt}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="text-6xl opacity-40">🧀</div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <h3 className="font-['Playfair_Display'] font-semibold text-verde text-base">{producto.nombre}</h3>

        {/* Fundido flavor selector */}
        {producto.esFundido && categoria.sabores && (
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-texto-medio/70">Sabor</span>
            <select
              value={sabor}
              onChange={e => setSabor(e.target.value)}
              className="text-xs border border-crema-oscuro rounded-lg px-2 py-1.5 bg-crema text-texto w-full"
            >
              {categoria.sabores.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        )}

        {/* Variante selector */}
        {producto.variantes.length > 1 && (
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-texto-medio/70">Presentación</span>
            <div className="flex gap-1 flex-wrap">
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
          </div>
        )}

        {/* Price + add */}
        <div className="mt-auto pt-3 border-t border-crema-oscuro/50 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-baseline gap-1 flex-wrap">
              <span className="text-verde font-bold text-lg">{formatPrecio(varianteActual.precio)}</span>
              <span className="text-texto-medio text-xs">{varianteActual.unidad}</span>
            </div>
            {varianteActual.pesoAprox && (
              <p className="text-texto-medio/70 text-xs">≈ {varianteActual.pesoAprox}kg la pieza</p>
            )}
          </div>
          <motion.button
            onClick={handleAdd}
            aria-label={`Agregar ${producto.nombre} al carrito`}
            title="Agregar al carrito"
            animate={justAdded ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              justAdded ? 'bg-dorado text-verde' : 'bg-verde text-crema hover:bg-verde-claro'
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {justAdded ? (
                <motion.svg
                  key="check"
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <polyline points="20 6 9 17 4 12"/>
                </motion.svg>
              ) : (
                <motion.svg
                  key="plus"
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
