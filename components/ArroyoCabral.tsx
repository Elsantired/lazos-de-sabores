'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const cards = [
  { icon: '🏛️', title: 'Tradición desde 1946', desc: 'Fundada el 12 de octubre de 1946 en Córdoba. Más de 75 años de historia y crecimiento continuo avalan cada producto.' },
  { icon: '🥛', title: '+300.000 Litros Diarios', desc: 'Dos plantas productivas procesan más de 300.000 litros de leche por día, con tecnología de última generación.' },
  { icon: '🏆', title: 'BPM · HACCP · SIN TACC', desc: 'Certificaciones BPM y HACCP. Todos sus productos son aptos para celíacos. Planta habilitada como exportadora.' },
  { icon: '🌿', title: 'Cooperativa Cordobesa', desc: 'Nacida del esfuerzo de productores locales, defiende el modelo cooperativo y el desarrollo regional.' },
];

export default function ArroyoCabral() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="arroyo-cabral" className="py-24 bg-verde" ref={ref}>
      <div className="max-w-[1180px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Image src="/arroyo-cabral-logo.svg" alt="Logo Quesos Arroyo Cabral" width={160} height={80} className="mx-auto mb-6 object-contain" />
          <span className="text-dorado text-xs font-['Cinzel'] tracking-[0.25em] uppercase block mb-3">La Marca que distribuimos</span>
          <h2 className="text-4xl font-['Playfair_Display'] text-crema font-bold mb-4">
            Quesos <em>Arroyo Cabral</em>
          </h2>
          <p className="text-crema/70 max-w-2xl mx-auto leading-relaxed">
            Fundada el 12 de octubre de 1946 por 72 productores de la localidad de Arroyo Cabral, Córdoba. Más de 75 años elaborando quesos con la más alta calidad, procesando más de 300.000 litros de leche diarios.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center hover:bg-white/15 transition-colors"
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-crema font-['Playfair_Display'] font-semibold mb-2">{card.title}</h3>
              <p className="text-crema/60 text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { src: 'https://www.cooparroyocabral.com.ar/assets/img/lacteos-1.jpg', alt: 'Planta productiva Quesos Arroyo Cabral' },
            { src: 'https://www.cooparroyocabral.com.ar/assets/img/lacteos-2.jpg', alt: 'Elaboración de quesos Arroyo Cabral' },
            { src: 'https://www.cooparroyocabral.com.ar/assets/img/lacteos-3.jpg', alt: 'Variedad de quesos Arroyo Cabral' },
          ].map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              className="relative h-48 rounded-xl overflow-hidden"
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover" loading="lazy" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
