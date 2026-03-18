'use client';

import Image from 'next/image';

export default function Footer() {
  const scrollTo = (href: string) => {
    if (typeof window !== 'undefined') {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#1a2b22] text-crema/70 py-12">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-8">
          {/* Brand */}
          <div className="flex flex-col items-start gap-3">
            <Image src="/lazos-logo.png" alt="Lazos de Sabores" width={72} height={72} className="rounded-full" />
            <p className="text-sm">Distribuidores oficiales de<br /><strong className="text-crema">Quesos Arroyo Cabral</strong></p>
            <div className="flex items-center gap-2 text-xs bg-white/10 px-3 py-2 rounded-full">
              <span>Distribuidor oficial</span>
              <Image src="/arroyo-cabral-logo.svg" alt="Arroyo Cabral" width={60} height={28} className="object-contain" />
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-crema font-['Cinzel'] font-bold text-sm mb-4 tracking-wide">Navegación</h4>
            <ul className="space-y-2 text-sm">
              {[['#inicio', 'Inicio'], ['#nosotros', 'Nosotros'], ['#arroyo-cabral', 'Arroyo Cabral'], ['#productos', 'Productos'], ['#contacto', 'Contacto']].map(([href, label]) => (
                <li key={href}>
                  <button onClick={() => scrollTo(href)} className="hover:text-dorado transition-colors">{label}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-crema font-['Cinzel'] font-bold text-sm mb-4 tracking-wide">Pedidos</h4>
            <p className="text-sm mb-4">Realizá tu pedido online y coordinamos la entrega a tu domicilio.</p>
            <p className="text-xs text-crema/50">Córdoba Capital y alrededores<br />Lunes a Viernes · 8:00–18:00 hs</p>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center text-xs text-crema/40">
          © 2025 Lazos de Sabores · Todos los derechos reservados · Córdoba, Argentina
        </div>
      </div>
    </footer>
  );
}
