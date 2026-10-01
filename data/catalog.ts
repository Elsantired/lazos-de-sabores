export const AC_IMG = '/productos/';

export const WHATSAPP_VENDEDOR = '5493516852187';

export interface Variante {
  tipo: string;
  precio: number;
  unidad: string;
  pesoAprox?: number; // peso aproximado de la pieza, en kg (solo variantes /kg)
}

export interface Producto {
  id: string;
  nombre: string;
  slug: string;
  img: string;
  alt: string;
  variantes: Variante[];
  esFundido?: boolean;
}

export interface Categoria {
  id: string;
  nombre: string;
  emoji: string;
  slug: string;
  desc?: string;
  sabores?: string[];
  saboresImgs?: Record<string, string>;
  productos: Producto[];
}

export const CATALOGO: Categoria[] = [
  {
    id: 'frescos',
    nombre: 'Frescos',
    emoji: '🧀',
    slug: 'quesos-frescos',
    productos: [
      {
        id: 'cremoso-vacio',
        nombre: 'Cremoso al Vacío',
        slug: 'queso-cremoso-vacio-arroyo-cabral',
        img: AC_IMG + 'frescos/cremoso.jpg',
        alt: 'Queso Cremoso al Vacío Arroyo Cabral — distribuidor oficial Córdoba',
        variantes: [
          { tipo: 'Horma completa', precio: 9540, unidad: '/kg', pesoAprox: 4.2 },
          { tipo: '½ Horma', precio: 10140, unidad: '/kg', pesoAprox: 2.1 },
        ],
      },
      {
        id: 'port-salut',
        nombre: 'Port Salut',
        slug: 'queso-port-salut-arroyo-cabral',
        img: AC_IMG + 'frescos/port-salut.jpg',
        alt: 'Queso Port Salut Arroyo Cabral — venta en Córdoba Capital',
        variantes: [
          { tipo: 'Horma completa', precio: 10260, unidad: '/kg', pesoAprox: 4.2 },
          { tipo: '½ Horma', precio: 10890, unidad: '/kg', pesoAprox: 2.1 },
        ],
      },
    ],
  },
  {
    id: 'semiblandos',
    nombre: 'Semi Blandos',
    emoji: '🧀',
    slug: 'quesos-semiblandos',
    productos: [
      {
        id: 'fynbo',
        nombre: 'Fynbo',
        slug: 'queso-fynbo-arroyo-cabral',
        img: AC_IMG + 'semiblandos/fynbo.jpg',
        alt: 'Queso Fynbo Arroyo Cabral — semiblando cordobés',
        variantes: [
          { tipo: 'Horma completa', precio: 19520, unidad: '/kg', pesoAprox: 4.5 },
          { tipo: '½ Horma', precio: 20220, unidad: '/kg', pesoAprox: 2.25 },
        ],
      },
      {
        id: 'minifynbo',
        nombre: 'Mini Fynbo',
        slug: 'queso-mini-fynbo-arroyo-cabral',
        img: AC_IMG + 'semiblandos/mini-fynbo.jpg',
        alt: 'Queso Mini Fynbo Arroyo Cabral',
        variantes: [{ tipo: 'Horma completa', precio: 17360, unidad: '/kg', pesoAprox: 0.85 }],
      },
      {
        id: 'holanda',
        nombre: 'Holanda',
        slug: 'queso-holanda-arroyo-cabral',
        img: AC_IMG + 'semiblandos/holanda.jpg',
        alt: 'Queso Holanda Arroyo Cabral',
        variantes: [
          { tipo: 'Horma completa', precio: 14430, unidad: '/kg', pesoAprox: 4.5 },
          { tipo: '½ Horma', precio: 15200, unidad: '/kg', pesoAprox: 2.25 },
        ],
      },
      {
        id: 'fontina',
        nombre: 'Fontina',
        slug: 'queso-fontina-arroyo-cabral',
        img: AC_IMG + 'semiblandos/fontina.jpg',
        alt: 'Queso Fontina Arroyo Cabral',
        variantes: [
          { tipo: 'Horma completa', precio: 15310, unidad: '/kg', pesoAprox: 4 },
          { tipo: '½ Horma', precio: 16073, unidad: '/kg', pesoAprox: 2 },
        ],
      },
    ],
  },
  {
    id: 'barras',
    nombre: 'Barras',
    emoji: '🧀',
    slug: 'quesos-en-barra',
    productos: [
      {
        id: 'mozzarella',
        nombre: 'Mozzarella',
        slug: 'queso-mozzarella-arroyo-cabral',
        img: AC_IMG + 'semiblandos/mozzarella.jpg',
        alt: 'Queso Mozzarella en barra Arroyo Cabral — Córdoba',
        variantes: [
          { tipo: 'Horma completa', precio: 11690, unidad: '/kg', pesoAprox: 4.3 },
          { tipo: '½ Horma', precio: 12280, unidad: '/kg', pesoAprox: 2.15 },
        ],
      },
      {
        id: 'cheddar',
        nombre: 'Cheddar',
        slug: 'queso-cheddar-arroyo-cabral',
        img: AC_IMG + 'semiblandos/cheddar-barra.jpg',
        alt: 'Queso Cheddar en barra Arroyo Cabral — Córdoba',
        variantes: [
          { tipo: 'Horma completa', precio: 11690, unidad: '/kg', pesoAprox: 4.5 },
          { tipo: '½ Horma', precio: 12280, unidad: '/kg', pesoAprox: 2.25 },
        ],
      },
      {
        id: 'tybo',
        nombre: 'Tybo',
        slug: 'queso-tybo-arroyo-cabral',
        img: AC_IMG + 'semiblandos/tybo.jpg',
        alt: 'Queso Tybo Arroyo Cabral',
        variantes: [
          { tipo: 'Horma completa', precio: 11690, unidad: '/kg' },
          { tipo: '½ Horma', precio: 12280, unidad: '/kg' },
        ],
      },
      {
        id: 'pategras',
        nombre: 'Pategras',
        slug: 'queso-pategras-arroyo-cabral',
        img: AC_IMG + 'semiblandos/pategras.jpg',
        alt: 'Queso Pategras Arroyo Cabral',
        variantes: [
          { tipo: 'Horma completa', precio: 11690, unidad: '/kg', pesoAprox: 3.9 },
          { tipo: '½ Horma', precio: 12280, unidad: '/kg', pesoAprox: 1.95 },
        ],
      },
    ],
  },
  {
    id: 'especiales',
    nombre: 'Especiales',
    emoji: '⭐',
    slug: 'quesos-especiales',
    productos: [
      {
        id: 'camembert',
        nombre: 'Camembert',
        slug: 'queso-camembert-arroyo-cabral',
        img: AC_IMG + 'especiales/camembert.jpg',
        alt: 'Queso Camembert Arroyo Cabral — especial Córdoba',
        variantes: [{ tipo: 'Por unidad', precio: 6060, unidad: 'c/u' }],
      },
      {
        id: 'briecuna',
        nombre: 'Brie Cuna',
        slug: 'queso-brie-cuna-arroyo-cabral',
        img: AC_IMG + 'especiales/brie.jpg',
        alt: 'Queso Brie Cuna Arroyo Cabral',
        variantes: [{ tipo: 'Por unidad', precio: 4310, unidad: 'c/u' }],
      },
    ],
  },
  {
    id: 'fundidos',
    nombre: 'Fundidos',
    emoji: '🧈',
    slug: 'quesos-fundidos-untables',
    desc: 'Sabores: Tybo · Gruyere · Azul · Salame · Jamón · Cheddar',
    sabores: ['Tybo', 'Gruyere', 'Azul', 'Salame', 'Jamón', 'Cheddar'],
    saboresImgs: {
      Tybo: AC_IMG + 'fundidos/tybo.jpg',
      Gruyere: AC_IMG + 'fundidos/gruyere.jpg',
      Azul: AC_IMG + 'fundidos/azul.jpg',
      Salame: AC_IMG + 'fundidos/salame.jpg',
      Jamón: AC_IMG + 'fundidos/jamon.jpg',
      Cheddar: AC_IMG + 'fundidos/cheddar.jpg',
    },
    productos: [
      {
        id: 'fundido',
        nombre: 'Queso Fundido',
        slug: 'queso-fundido-untable-arroyo-cabral',
        img: AC_IMG + 'fundidos/tybo.jpg',
        alt: 'Queso Fundido Untable Arroyo Cabral — 6 sabores',
        esFundido: true,
        variantes: [{ tipo: 'Por unidad', precio: 1760, unidad: 'c/u' }],
      },
    ],
  },
  {
    id: 'durosest',
    nombre: 'Duros Estacionados',
    emoji: '🏅',
    slug: 'quesos-duros-estacionados',
    productos: [
      {
        id: 'romanito-est',
        nombre: 'Romanito',
        slug: 'queso-romanito-estacionado-arroyo-cabral',
        img: AC_IMG + 'duros/romano.jpg',
        alt: 'Queso Romanito Estacionado Arroyo Cabral',
        variantes: [
          { tipo: 'Horma completa', precio: 23030, unidad: '/kg', pesoAprox: 3.7 },
          { tipo: '½ Horma', precio: 23800, unidad: '/kg', pesoAprox: 1.85 },
        ],
      },
      {
        id: 'sardo-est',
        nombre: 'Sardo',
        slug: 'queso-sardo-estacionado-arroyo-cabral',
        img: AC_IMG + 'duros/sardo.jpg',
        alt: 'Queso Sardo Estacionado Arroyo Cabral',
        variantes: [
          { tipo: 'Horma completa', precio: 23030, unidad: '/kg', pesoAprox: 3.5 },
          { tipo: '½ Horma', precio: 23800, unidad: '/kg', pesoAprox: 1.75 },
        ],
      },
      {
        id: 'reggianito',
        nombre: 'Reggianito',
        slug: 'queso-reggianito-arroyo-cabral',
        img: AC_IMG + 'duros/reggianito.jpg',
        alt: 'Queso Reggianito Arroyo Cabral — duro estacionado cordobés',
        variantes: [
          { tipo: 'Horma completa', precio: 24930, unidad: '/kg', pesoAprox: 7 },
          { tipo: '½ Horma', precio: 25650, unidad: '/kg', pesoAprox: 3.5 },
        ],
      },
    ],
  },
  {
    id: 'durosfr',
    nombre: 'Duros Frescos',
    emoji: '🔶',
    slug: 'quesos-duros-frescos',
    productos: [
      {
        id: 'sbrinz',
        nombre: 'Sbrinz',
        slug: 'queso-sbrinz-arroyo-cabral',
        img: AC_IMG + 'duros/sbrinz.jpg',
        alt: 'Queso Sbrinz Arroyo Cabral',
        variantes: [
          { tipo: 'Horma completa', precio: 20000, unidad: '/kg', pesoAprox: 7 },
          { tipo: '½ Horma', precio: 21800, unidad: '/kg', pesoAprox: 3.5 },
        ],
      },
      {
        id: 'romanito-fr',
        nombre: 'Romanito',
        slug: 'queso-romanito-fresco-arroyo-cabral',
        img: AC_IMG + 'duros/romano.jpg',
        alt: 'Queso Romanito Fresco Arroyo Cabral',
        variantes: [
          { tipo: 'Horma completa', precio: 19970, unidad: '/kg', pesoAprox: 3.7 },
          { tipo: '½ Horma', precio: 20700, unidad: '/kg', pesoAprox: 1.85 },
        ],
      },
      {
        id: 'sardo-fr',
        nombre: 'Sardo',
        slug: 'queso-sardo-fresco-arroyo-cabral',
        img: AC_IMG + 'duros/sardo.jpg',
        alt: 'Queso Sardo Fresco Arroyo Cabral',
        variantes: [
          { tipo: 'Horma completa', precio: 19970, unidad: '/kg', pesoAprox: 3.5 },
          { tipo: '½ Horma', precio: 20700, unidad: '/kg', pesoAprox: 1.75 },
        ],
      },
    ],
  },
  {
    id: 'provoletas',
    nombre: 'Provoletas',
    emoji: '🔥',
    slug: 'provoletas-arroyo-cabral',
    productos: [
      {
        id: 'parrillero-dos',
        nombre: 'Parrillero (dos rodajas)',
        slug: 'provoleta-parrillero-arroyo-cabral',
        img: AC_IMG + 'duros/provolone-parr.jpg',
        alt: 'Provoleta Parrillero Arroyo Cabral — dos rodajas',
        variantes: [{ tipo: 'Por kg', precio: 22082, unidad: '/kg' }],
      },
      {
        id: 'parrillero-mitad',
        nombre: 'Parrillero en Mitad',
        slug: 'provoleta-mitad-arroyo-cabral',
        img: AC_IMG + 'duros/provolone-hilado.jpg',
        alt: 'Provoleta Parrillero en Mitad Arroyo Cabral',
        variantes: [{ tipo: 'Por kg', precio: 22082, unidad: '/kg' }],
      },
    ],
  },
  {
    id: 'dulces',
    nombre: 'Dulces',
    emoji: '🍮',
    slug: 'dulce-de-leche-arroyo-cabral',
    productos: [
      {
        id: 'ddl-clasico',
        nombre: 'Dulce de Leche Clásico (1kg)',
        slug: 'dulce-de-leche-clasico-arroyo-cabral',
        img: AC_IMG + 'dulces/clasico.jpg',
        alt: 'Dulce de Leche Clásico Arroyo Cabral 1kg — Córdoba',
        variantes: [{ tipo: 'Por unidad', precio: 4400, unidad: 'c/u' }],
      },
      {
        id: 'ddl-repostero',
        nombre: 'Dulce de Leche Repostero (1kg)',
        slug: 'dulce-de-leche-repostero-arroyo-cabral',
        img: AC_IMG + 'dulces/repostero.jpg',
        alt: 'Dulce de Leche Repostero Arroyo Cabral 1kg',
        variantes: [{ tipo: 'Por unidad', precio: 5000, unidad: 'c/u' }],
      },
    ],
  },
  {
    id: 'crema',
    nombre: 'Crema',
    emoji: '🥛',
    slug: 'crema-de-leche-arroyo-cabral',
    productos: [
      {
        id: 'crema-leche',
        nombre: 'Crema de Leche (200g)',
        slug: 'crema-de-leche-arroyo-cabral',
        img: AC_IMG + 'crema/crema-leche.jpg',
        alt: 'Crema de Leche Arroyo Cabral 200g',
        variantes: [{ tipo: 'Por unidad', precio: 2340, unidad: 'c/u' }],
      },
    ],
  },
];

export const formatPrecio = (precio: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(precio);

export function buscarVariante(productoId: string, varianteIdx: number): { categoria: Categoria; producto: Producto; variante: Variante } | null {
  for (const categoria of CATALOGO) {
    const producto = categoria.productos.find(p => p.id === productoId);
    if (producto && producto.variantes[varianteIdx]) {
      return { categoria, producto, variante: producto.variantes[varianteIdx] };
    }
  }
  return null;
}
