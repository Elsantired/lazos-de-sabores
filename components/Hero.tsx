'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center bg-verde overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `repeating-linear-gradient(45deg, #f8f2e3 0, #f8f2e3 1px, transparent 0, transparent 50%)`,
        backgroundSize: '20px 20px'
      }} />

      <div className="relative z-10 text-center px-6 py-24 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <Image
            src="/lazos-logo.png"
            alt="Logo Lazos de Sabores — Distribuidor Oficial Quesos Arroyo Cabral en Córdoba"
            width={260}
            height={260}
            priority
            className="mx-auto mb-6 drop-shadow-2xl"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-crema/70 text-sm tracking-[0.2em] uppercase mb-3 font-['Cinzel']"
        >
          Distribuidores Oficiales en Córdoba de
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="flex items-center justify-center gap-4 mb-4"
        >
          <Image src="/arroyo-cabral-logo.svg" alt="Quesos Arroyo Cabral" width={120} height={60} className="object-contain" />
          <h1 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold text-crema">
            Quesos Arroyo Cabral
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-crema/60 text-base mb-10"
        >
          Entrega a domicilio en Córdoba Capital y alrededores
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => scrollTo('#productos')}
            className="bg-dorado text-verde font-bold px-10 py-4 rounded-full text-lg hover:bg-dorado-claro transition-all duration-300 shadow-lg hover:shadow-dorado/30 hover:-translate-y-0.5"
          >
            Ver Catálogo
          </button>
          <button
            onClick={() => scrollTo('#nosotros')}
            className="border-2 border-crema/40 text-crema px-10 py-4 rounded-full text-base hover:border-crema hover:bg-crema/10 transition-all duration-300"
          >
            Conocenos
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo('#nosotros')}
        aria-label="Bajar"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-crema/40 hover:text-crema transition-colors animate-bounce"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </button>
    </section>
  );
}
