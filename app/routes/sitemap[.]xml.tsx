import { sanityClient } from '~/lib/sanity/client.server';
import { servicesQuery, type Service } from '~/lib/sanity';
import { SITE_URL, SUPPORTED_LANGUAGES } from '~/lib/seo';

export async function loader() {
  // Fetch all services for dynamic URLs
  let services: Service[] = [];
  try {
    services = await sanityClient.fetch<Service[]>(servicesQuery);
  } catch {
    console.log('Failed to fetch services for sitemap');
  }

  // Static pages (without language prefix - we'll add all language variants)
  const staticPages = ['', '/about', '/services', '/contact'];

  // Build XML sitemap
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  // Add static pages with hreflang alternates
  for (const page of staticPages) {
    for (const lang of SUPPORTED_LANGUAGES) {
      const pagePath = page === '' ? '' : page;
      xml += `
  <url>
    <loc>${SITE_URL}/${lang}${pagePath}</loc>`;

      // Add hreflang alternates
      for (const altLang of SUPPORTED_LANGUAGES) {
        xml += `
    <xhtml:link rel="alternate" hreflang="${altLang}" href="${SITE_URL}/${altLang}${pagePath}"/>`;
      }
      xml += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/en${pagePath}"/>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`;
    }
  }

  // Add service pages with hreflang alternates
  for (const service of services) {
    if (!service.slug?.current) continue;

    for (const lang of SUPPORTED_LANGUAGES) {
      const servicePath = `/services/${service.slug.current}`;
      xml += `
  <url>
    <loc>${SITE_URL}/${lang}${servicePath}</loc>`;

      // Add hreflang alternates
      for (const altLang of SUPPORTED_LANGUAGES) {
        xml += `
    <xhtml:link rel="alternate" hreflang="${altLang}" href="${SITE_URL}/${altLang}${servicePath}"/>`;
      }
      xml += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/en${servicePath}"/>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }
  }

  xml += `
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'X-Robots-Tag': 'noindex',
    },
  });
}
