export const AC_IMG = 'https://www.cooparroyocabral.com.ar/assets/img/productos/';

export const WHATSAPP_VENDEDOR = '5493515556425';

export interface Variante {
  tipo: string;
  precio: number;
  unidad: string;
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
        img: AC_IMG + 'QUESOS-FRESCOS/CREMOSO-VACIO%20-%20FOTO.jpg',
        alt: 'Queso Cremoso al Vacío Arroyo Cabral — distribuidor oficial Córdoba',
        variantes: [
          { tipo: 'Horma completa', precio: 10081, unidad: '/kg' },
          { tipo: '½ Horma', precio: 10585, unidad: '/kg' },
        ],
      },
      {
        id: 'port-salut',
        nombre: 'Port Salut',
        slug: 'queso-port-salut-arroyo-cabral',
        img: AC_IMG + 'QUESOS-FRESCOS/PORT-SALUT%20-%20FOTO.jpg',
        alt: 'Queso Port Salut Arroyo Cabral — venta en Córdoba Capital',
        variantes: [
          { tipo: 'Horma completa', precio: 10081, unidad: '/kg' },
          { tipo: '½ Horma', precio: 10585, unidad: '/kg' },
        ],
      },
      {
        id: 'cremoso-light',
        nombre: 'Cremoso Light',
        slug: 'queso-cremoso-light-arroyo-cabral',
        img: AC_IMG + 'QUESOS-FRESCOS/CREMOSO-LIGHT%20-%20FOTO.jpg',
        alt: 'Queso Cremoso Light Arroyo Cabral — bajo en grasas, Córdoba',
        variantes: [
          { tipo: 'Horma completa', precio: 10081, unidad: '/kg' },
          { tipo: '½ Horma', precio: 10585, unidad: '/kg' },
        ],
      },
      {
        id: 'barra-light',
        nombre: 'Barra Light',
        slug: 'queso-barra-light-arroyo-cabral',
        img: AC_IMG + 'QUESOS-FRESCOS/BARRA-LIGHT%20-%20FOTO.jpg',
        alt: 'Queso Barra Light Arroyo Cabral — bajo en grasas',
        variantes: [
          { tipo: 'Horma completa', precio: 9451, unidad: '/kg' },
          { tipo: '½ Horma', precio: 9924, unidad: '/kg' },
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
        img: AC_IMG + 'QUESOS-SEMIDUROS/FYNBO%20-%20FOTO.jpg',
        alt: 'Queso Fynbo Arroyo Cabral — semiblando cordobés',
        variantes: [
          { tipo: 'Horma completa', precio: 16700, unidad: '/kg' },
          { tipo: '½ Horma', precio: 17301, unidad: '/kg' },
        ],
      },
      {
        id: 'minifynbo',
        nombre: 'Mini Fynbo',
        slug: 'queso-mini-fynbo-arroyo-cabral',
        img: AC_IMG + 'QUESOS-SEMIDUROS/MINI-FYMBO%20-%20FOTO.jpg',
        alt: 'Queso Mini Fynbo Arroyo Cabral',
        variantes: [{ tipo: 'Horma completa', precio: 14850, unidad: '/kg' }],
      },
      {
        id: 'holanda',
        nombre: 'Holanda',
        slug: 'queso-holanda-arroyo-cabral',
        img: AC_IMG + 'QUESOS-SEMIDUROS/HOLANDA%20%20-%20%20FOTO.jpg',
        alt: 'Queso Holanda Arroyo Cabral',
        variantes: [
          { tipo: 'Horma completa', precio: 12349, unidad: '/kg' },
          { tipo: '½ Horma', precio: 12972, unidad: '/kg' },
        ],
      },
      {
        id: 'fontina',
        nombre: 'Fontina',
        slug: 'queso-fontina-arroyo-cabral',
        img: AC_IMG + 'QUESOS-SEMIDUROS/FONTINA%20-%20FOTO.jpg',
        alt: 'Queso Fontina Arroyo Cabral',
        variantes: [
          { tipo: 'Horma completa', precio: 13097, unidad: '/kg' },
          { tipo: '½ Horma', precio: 13755, unidad: '/kg' },
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
        img: AC_IMG + 'QUESOS-SEMIDUROS/MOZZARELLA%20-%20FOTO.jpg',
        alt: 'Queso Mozzarella en barra Arroyo Cabral — Córdoba',
        variantes: [
          { tipo: 'Horma completa', precio: 10290, unidad: '/kg' },
          { tipo: '½ Horma', precio: 10815, unidad: '/kg' },
        ],
      },
      {
        id: 'tybolight',
        nombre: 'Tybo Light',
        slug: 'queso-tybo-light-arroyo-cabral',
        img: AC_IMG + 'QUESOS-SEMIDUROS/TYBO-LIGHT%20-%20FOTO.jpg',
        alt: 'Queso Tybo Light Arroyo Cabral',
        variantes: [
          { tipo: 'Horma completa', precio: 10290, unidad: '/kg' },
          { tipo: '½ Horma', precio: 10815, unidad: '/kg' },
        ],
      },
      {
        id: 'cheddar-barra',
        nombre: 'Cheddar',
        slug: 'queso-cheddar-arroyo-cabral',
        img: AC_IMG + 'QUESOS-SEMIDUROS/TYBO%20-%20FOTO.jpg',
        alt: 'Queso Cheddar Arroyo Cabral',
        variantes: [
          { tipo: 'Horma completa', precio: 10290, unidad: '/kg' },
          { tipo: '½ Horma', precio: 10815, unidad: '/kg' },
        ],
      },
      {
        id: 'pategras',
        nombre: 'Pategras',
        slug: 'queso-pategras-arroyo-cabral',
        img: AC_IMG + 'QUESOS-SEMIDUROS/PATEGRAS%20-%20FOTO.jpg',
        alt: 'Queso Pategras Arroyo Cabral',
        variantes: [
          { tipo: 'Horma completa', precio: 10290, unidad: '/kg' },
          { tipo: '½ Horma', precio: 10815, unidad: '/kg' },
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
        img: AC_IMG + 'QUESOS-ESPECIALES/CAMEMBERT%20-%20FOTO.jpg',
        alt: 'Queso Camembert Arroyo Cabral — especial Córdoba',
        variantes: [{ tipo: 'Por unidad', precio: 5491, unidad: 'c/u' }],
      },
      {
        id: 'briecuna',
        nombre: 'Brie Cuna',
        slug: 'queso-brie-cuna-arroyo-cabral',
        img: AC_IMG + 'QUESOS-ESPECIALES/BRIE%20-%20FOTO.jpg',
        alt: 'Queso Brie Cuna Arroyo Cabral',
        variantes: [{ tipo: 'Por unidad', precio: 3910, unidad: 'c/u' }],
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
      Tybo: AC_IMG + 'QUESOS-UNTABLES/UNTABLE-TYBO%20-%20FOTO.jpg',
      Gruyere: AC_IMG + 'QUESOS-UNTABLES/UNTABLE-GRUYERE%20-%20FOTO.jpg',
      Azul: AC_IMG + 'QUESOS-UNTABLES/UNTABLE-AZUL%20-%20FOTO.jpg',
      Salame: AC_IMG + 'QUESOS-UNTABLES/UNTABLE-SALAME%20-%20FOTO.jpg',
      Jamón: AC_IMG + 'QUESOS-UNTABLES/UNTABLE-JAMON%20-%20FOTO.jpg',
      Cheddar: AC_IMG + 'QUESOS-UNTABLES/UNTABLE-CHEDDAR%20-%20FOTO.jpg',
    },
    productos: [
      {
        id: 'fundido',
        nombre: 'Queso Fundido',
        slug: 'queso-fundido-untable-arroyo-cabral',
        img: AC_IMG + 'QUESOS-UNTABLES/UNTABLE-TYBO%20-%20FOTO.jpg',
        alt: 'Queso Fundido Untable Arroyo Cabral — 6 sabores',
        esFundido: true,
        variantes: [{ tipo: 'Por unidad', precio: 1543, unidad: 'c/u' }],
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
        img: AC_IMG + 'QUESOS-DUROS/ROMANO%20-%20FOTO.jpg',
        alt: 'Queso Romanito Estacionado Arroyo Cabral',
        variantes: [
          { tipo: 'Horma completa', precio: 19708, unidad: '/kg' },
          { tipo: '½ Horma', precio: 20332, unidad: '/kg' },
        ],
      },
      {
        id: 'sardo-est',
        nombre: 'Sardo',
        slug: 'queso-sardo-estacionado-arroyo-cabral',
        img: AC_IMG + 'QUESOS-DUROS/SARDO%20-%20FOTO.jpg',
        alt: 'Queso Sardo Estacionado Arroyo Cabral',
        variantes: [
          { tipo: 'Horma completa', precio: 19708, unidad: '/kg' },
          { tipo: '½ Horma', precio: 20332, unidad: '/kg' },
        ],
      },
      {
        id: 'reggianito',
        nombre: 'Reggianito',
        slug: 'queso-reggianito-arroyo-cabral',
        img: AC_IMG + 'QUESOS-DUROS/REGGIANITO%20-%20FOTO.jpg',
        alt: 'Queso Reggianito Arroyo Cabral — duro estacionado cordobés',
        variantes: [
          { tipo: 'Horma completa', precio: 21329, unidad: '/kg' },
          { tipo: '½ Horma', precio: 21945, unidad: '/kg' },
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
        img: AC_IMG + 'QUESOS-DUROS/SBRINZ%20-%20FOTO.jpg',
        alt: 'Queso Sbrinz Arroyo Cabral',
        variantes: [
          { tipo: 'Horma completa', precio: 17962, unidad: '/kg' },
          { tipo: '½ Horma', precio: 18586, unidad: '/kg' },
        ],
      },
      {
        id: 'romanito-fr',
        nombre: 'Romanito',
        slug: 'queso-romanito-fresco-arroyo-cabral',
        img: AC_IMG + 'QUESOS-DUROS/ROMANO%20-%20FOTO.jpg',
        alt: 'Queso Romanito Fresco Arroyo Cabral',
        variantes: [
          { tipo: 'Horma completa', precio: 17088, unidad: '/kg' },
          { tipo: '½ Horma', precio: 17712, unidad: '/kg' },
        ],
      },
      {
        id: 'sardo-fr',
        nombre: 'Sardo',
        slug: 'queso-sardo-fresco-arroyo-cabral',
        img: AC_IMG + 'QUESOS-DUROS/SARDO%20-%20FOTO.jpg',
        alt: 'Queso Sardo Fresco Arroyo Cabral',
        variantes: [
          { tipo: 'Horma completa', precio: 17088, unidad: '/kg' },
          { tipo: '½ Horma', precio: 17712, unidad: '/kg' },
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
        img: AC_IMG + 'QUESOS-DUROS/PROVOLONE-PARR%20-%20FOTO.jpg',
        alt: 'Provoleta Parrillero Arroyo Cabral — dos rodajas',
        variantes: [{ tipo: 'Por kg', precio: 18942, unidad: '/kg' }],
      },
      {
        id: 'parrillero-mitad',
        nombre: 'Parrillero en Mitad',
        slug: 'provoleta-mitad-arroyo-cabral',
        img: AC_IMG + 'QUESOS-DUROS/PROVOLONE-HILADO%20-%20FOTO.jpg',
        alt: 'Provoleta Parrillero en Mitad Arroyo Cabral',
        variantes: [{ tipo: 'Por kg', precio: 18942, unidad: '/kg' }],
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
        nombre: 'Dulce de Leche Clásico',
        slug: 'dulce-de-leche-clasico-arroyo-cabral',
        img: AC_IMG + 'DULCE-DE-LECHE/CLASICO%20-%20FOTO.jpg',
        alt: 'Dulce de Leche Clásico Arroyo Cabral — Córdoba',
        variantes: [{ tipo: 'Por unidad', precio: 3800, unidad: 'c/u' }],
      },
      {
        id: 'ddl-repostero',
        nombre: 'Dulce de Leche Repostero',
        slug: 'dulce-de-leche-repostero-arroyo-cabral',
        img: AC_IMG + 'DULCE-DE-LECHE/REPOSTERO%20-%20FOTO.jpg',
        alt: 'Dulce de Leche Repostero Arroyo Cabral',
        variantes: [{ tipo: 'Por unidad', precio: 4300, unidad: 'c/u' }],
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
        img: AC_IMG + 'CREMA/CREMA-LECHE%20-%20FOTO.jpg',
        alt: 'Crema de Leche Arroyo Cabral 200g',
        variantes: [{ tipo: 'Por unidad', precio: 1982, unidad: 'c/u' }],
      },
    ],
  },
];

export const formatPrecio = (precio: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(precio);
