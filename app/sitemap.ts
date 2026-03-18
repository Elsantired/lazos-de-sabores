import { MetadataRoute } from 'next';
import { CATALOGO } from '@/data/catalog';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://lazosdesabores.com.ar';

  const productRoutes = CATALOGO.flatMap(cat =>
    cat.productos.map(prod => ({
      url: `${base}/productos/${prod.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  );

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/#nosotros`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/#productos`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/#contacto`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ...productRoutes,
  ];
}
