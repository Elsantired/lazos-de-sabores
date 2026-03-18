import type { Metadata } from 'next';
import { Playfair_Display, Cinzel, Lato } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { localBusinessSchema } from '@/lib/schema';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://lazosdesabores.com.ar'),
  title: 'Quesos Arroyo Cabral en Córdoba | Lazos de Sabores — Distribuidor Oficial',
  description: 'Distribuidor oficial de Quesos Arroyo Cabral en Córdoba Capital y alrededores. Cremoso, Port Salut, Fynbo, Reggianito, Provoletas y más. Pedí por WhatsApp con entrega a domicilio.',
  keywords: 'quesos arroyo cabral córdoba, distribuidor quesos córdoba capital, quesos a domicilio córdoba, comprar quesos arroyo cabral, quesos cremoso córdoba, quesería córdoba capital, lazos de sabores',
  authors: [{ name: 'Lazos de Sabores' }],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://lazosdesabores.com.ar',
    title: 'Quesos Arroyo Cabral en Córdoba | Lazos de Sabores',
    description: 'Distribuidor oficial de Quesos Arroyo Cabral en Córdoba Capital. Pedí por WhatsApp con entrega a domicilio.',
    images: [{ url: '/lazos-logo.png', alt: 'Logo Lazos de Sabores' }],
    locale: 'es_AR',
    siteName: 'Lazos de Sabores',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quesos Arroyo Cabral en Córdoba | Lazos de Sabores',
    description: 'Distribuidor oficial de Quesos Arroyo Cabral en Córdoba Capital. Pedí por WhatsApp con entrega a domicilio.',
    images: ['/lazos-logo.png'],
  },
  other: {
    'geo.region': 'AR-X',
    'geo.placename': 'Córdoba, Argentina',
    'geo.position': '-31.4201;-64.1888',
    'ICBM': '-31.4201, -64.1888',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${playfair.variable} ${cinzel.variable} ${lato.variable}`}>
      <head>
        <link rel="icon" type="image/png" href="/lazos-logo.png" />
        <link rel="apple-touch-icon" href="/lazos-logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
