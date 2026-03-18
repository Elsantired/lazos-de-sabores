'use client';

import { useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';
import { CATALOGO } from '@/data/catalog';
import ProductCard from './ProductCard';

export default function Productos() {
  const [catActiva, setCatActiva] = useState('todos');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const categoriasActivas = catActiva === 'todos'
    ? CATALOGO
    : CATALOGO.filter(c => c.id === catActiva);

  return (
    <section id="productos" className="py-24 bg-crema" ref={ref}>
      <div className="max-w-[1180px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-dorado text-xs font-['Cinzel'] tracking-[0.25em] uppercase block mb-3">Catálogo</span>
          <h2 className="text-4xl font-['Playfair_Display'] text-verde font-bold mb-3">
            Nuestros <em>Productos</em>
          </h2>
          <p className="text-texto-medio text-sm mb-4">Precios por kilogramo · Vigentes al momento de la consulta</p>
          <div className="flex flex-wrap justify-center gap-2 mb-2">
            {['✓ SIN TACC — Apto Celíacos', '✓ Refrigeración 2–8°C', '✓ Directo de Fábrica'].map(b => (
              <span key={b} className="bg-verde/10 text-verde text-xs px-3 py-1 rounded-full font-medium">{b}</span>
            ))}
          </div>
        </motion.div>

        {/* Category tabs */}
        <div className="overflow-x-auto pb-2 mb-8">
          <div className="flex gap-2 min-w-max mx-auto justify-start lg:justify-center">
            <button
              onClick={() => setCatActiva('todos')}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                catActiva === 'todos' ? 'bg-verde text-crema shadow-md' : 'bg-white text-texto-medio hover:bg-verde/10 border border-crema-oscuro'
              }`}
            >
              🧀 Todos
            </button>
            {CATALOGO.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCatActiva(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                  catActiva === cat.id ? 'bg-verde text-crema shadow-md' : 'bg-white text-texto-medio hover:bg-verde/10 border border-crema-oscuro'
                }`}
              >
                {cat.emoji} {cat.nombre}
              </button>
            ))}
          </div>
        </div>

        {/* Products grid */}
        {categoriasActivas.map(cat => (
          <div key={cat.id} className="mb-10">
            {catActiva === 'todos' && (
              <h3 className="text-xl font-['Playfair_Display'] font-bold text-verde mb-4 pb-2 border-b border-crema-oscuro">
                {cat.emoji} {cat.nombre}
                {cat.desc && <span className="text-sm text-texto-medio font-normal ml-3">{cat.desc}</span>}
              </h3>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {cat.productos.map((prod, i) => (
                <ProductCard key={prod.id} producto={prod} categoria={cat} index={i} />
              ))}
            </div>
          </div>
        ))}

        <p className="text-center text-texto-medio/70 text-xs mt-6">
          * Los precios de quesos por horma son precio por kg. El total final se determina por el peso exacto de cada pieza al momento de la entrega.
        </p>
      </div>
    </section>
  );
}
