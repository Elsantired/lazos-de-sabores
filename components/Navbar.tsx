'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const navLinks = [
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#arroyo-cabral', label: 'Arroyo Cabral' },
  { href: '#productos', label: 'Productos' },
  { href: '#contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, setIsOpen: setCartOpen } = useCart();
  const { usuario, setIsAuthOpen, setAuthTab } = useAuth();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleAuth = () => {
    if (usuario) setAuthTab('perfil');
    else setAuthTab('login');
    setIsAuthOpen(true);
  };

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-verde/95 backdrop-blur shadow-lg py-2' : 'bg-verde py-3'}`}>
        <div className="max-w-[1180px] mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollTo('#inicio')} className="flex items-center gap-3 group">
            <Image src="/lazos-logo.png" alt="Lazos de Sabores" width={64} height={64} className="rounded-full transition-transform group-hover:scale-105" priority />
            <span className="text-crema font-['Cinzel'] font-bold text-lg hidden md:block tracking-wide">
              Lazos de Sabores
            </span>
          </button>

          {/* Nav links */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className="text-crema/80 hover:text-crema font-medium text-sm tracking-wide transition-colors duration-200 hover:text-dorado"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Ver carrito"
              className="relative p-2 text-crema hover:text-dorado transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-dorado text-verde text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>

            {/* Auth */}
            <button
              onClick={handleAuth}
              className="bg-dorado text-verde font-bold text-sm px-4 py-2 rounded-full hover:bg-dorado-claro transition-colors"
            >
              {usuario ? `Hola, ${usuario.nombre}` : 'Ingresar'}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menú"
              className="lg:hidden p-2 text-crema"
            >
              <div className="w-5 flex flex-col gap-1">
                <span className={`block h-0.5 bg-crema transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`block h-0.5 bg-crema transition-all ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 bg-crema transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-verde/98 flex flex-col items-center justify-center gap-8 lg:hidden">
          {navLinks.map(link => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-crema text-2xl font-['Cinzel'] font-bold hover:text-dorado transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { setMenuOpen(false); handleAuth(); }}
            className="text-crema text-xl hover:text-dorado transition-colors"
          >
            {usuario ? 'Mi Perfil' : 'Ingresar / Registrarse'}
          </button>
        </div>
      )}
    </>
  );
}
