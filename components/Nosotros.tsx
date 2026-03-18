'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    title: 'Directo de Fábrica',
    desc: 'Sin intermediarios, máxima frescura garantizada',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    title: 'Entrega Coordinada',
    desc: 'Te contactamos para organizar el envío a tu puerta',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    title: 'Calidad Garantizada',
    desc: 'Solo los mejores productos seleccionados para vos',
  },
];

export default function Nosotros() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="nosotros" className="py-24 bg-crema" ref={ref}>
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-dorado text-xs font-['Cinzel'] tracking-[0.25em] uppercase block mb-3">
              Quiénes Somos
            </span>
            <h2 className="text-4xl font-['Playfair_Display'] text-verde font-bold mb-6 leading-tight">
              Una historia de <em>sabores</em> y pasión
            </h2>
            <p className="text-texto-medio mb-4 leading-relaxed">
              Lazos de Sabores nació con una misión simple: acercar los mejores quesos de Córdoba directamente a tu mesa. Somos distribuidores oficiales de <strong>Quesos Arroyo Cabral</strong> en <strong>Córdoba Capital</strong> y alrededores, una marca cordobesa con más de 75 años de tradición quesera.
            </p>
            <p className="text-texto-medio mb-8 leading-relaxed">
              Trabajamos directamente con la fábrica para garantizar frescura, autenticidad y los mejores precios. Atendemos a <strong>particulares, restaurantes, rotiserías, almacenes y verdulerías</strong> en Córdoba Capital, Villa Carlos Paz, Alta Gracia, Jesús María, Cosquín y zona.
            </p>

            <div className="space-y-4">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm"
                >
                  <div className="w-10 h-10 bg-verde/10 rounded-lg flex items-center justify-center text-verde shrink-0">
                    {f.icon}
                  </div>
                  <div>
                    <strong className="text-verde font-semibold block">{f.title}</strong>
                    <p className="text-texto-medio text-sm">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Decoration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-72 h-72 md:w-80 md:h-80">
              <div className="absolute inset-0 rounded-full bg-verde/10 border-2 border-dorado/30" />
              <div className="absolute inset-4 rounded-full overflow-hidden">
                <Image src="/lazos-logo.png" alt="Lazos de Sabores" fill className="object-contain p-4" />
              </div>
            </div>
            {/* Badges */}
            <div className="absolute top-0 right-0 bg-verde text-crema rounded-2xl px-4 py-3 text-center shadow-lg">
              <strong className="text-2xl text-dorado block">+10</strong>
              <small className="text-xs">años en el<br />mercado</small>
            </div>
            <div className="absolute bottom-4 left-0 bg-dorado text-verde rounded-2xl px-4 py-3 text-center shadow-lg">
              <strong className="text-2xl block">100%</strong>
              <small className="text-xs">producto<br />cordobés</small>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
