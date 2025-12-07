# Story 5.1: Implement SEO Foundation

**Epic**: 5 - Polish, SEO & Launch
**Status**: Complete

## User Story

As a **business owner**,
I want **the website optimized for search engines**,
so that **potential clients can find me through Google searches**.

## Acceptance Criteria

- [x] **AC1**: Dynamic meta tags (title, description) generated for all pages from CMS content
- [x] **AC2**: Open Graph tags implemented for social media sharing
- [x] **AC3**: Structured data (JSON-LD) for LocalBusiness schema
- [x] **AC4**: `sitemap.xml` generated and accessible at `/sitemap.xml`
- [x] **AC5**: `robots.txt` configured to allow indexing
- [x] **AC6**: Canonical URLs set for all pages
- [x] **AC7**: Hreflang tags for multilingual SEO

## Technical Tasks

1. Create reusable meta function helper `app/lib/seo.ts`:
   ```typescript
   interface SeoMeta {
     title: string;
     description: string;
     image?: string;
     url: string;
     type?: 'website' | 'article';
   }

   export function generateMeta({
     title,
     description,
     image,
     url,
     type = 'website'
   }: SeoMeta) {
     return [
       { title },
       { name: 'description', content: description },
       { property: 'og:title', content: title },
       { property: 'og:description', content: description },
       { property: 'og:url', content: url },
       { property: 'og:type', content: type },
       { property: 'og:image', content: image },
       { property: 'og:site_name', content: 'Silentium' },
       { name: 'twitter:card', content: 'summary_large_image' },
       { name: 'twitter:title', content: title },
       { name: 'twitter:description', content: description },
       { name: 'twitter:image', content: image },
     ].filter(Boolean);
   }
   ```

2. Add hreflang links to `app/root.tsx`:
   ```typescript
   export const links: LinksFunction = ({ params }) => {
     const lang = params.lang || 'en';
     const path = /* current path without lang */;

     return [
       { rel: 'alternate', hrefLang: 'en', href: `https://silentium.com/en${path}` },
       { rel: 'alternate', hrefLang: 'ru', href: `https://silentium.com/ru${path}` },
       { rel: 'alternate', hrefLang: 'id', href: `https://silentium.com/id${path}` },
       { rel: 'alternate', hrefLang: 'x-default', href: `https://silentium.com/en${path}` },
       { rel: 'canonical', href: `https://silentium.com/${lang}${path}` },
     ];
   };
   ```

3. Create `app/routes/sitemap[.]xml.tsx`:
   ```typescript
   export async function loader() {
     const services = await getAllServices('en');
     const baseUrl = 'https://silentium.com';
     const langs = ['en', 'ru', 'id'];

     const staticPages = ['', '/about', '/services', '/contact', '/privacy', '/terms'];

     let xml = `<?xml version="1.0" encoding="UTF-8"?>
       <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
               xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

     // Static pages
     for (const page of staticPages) {
       for (const lang of langs) {
         xml += `
           <url>
             <loc>${baseUrl}/${lang}${page}</loc>
             <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en${page}"/>
             <xhtml:link rel="alternate" hreflang="ru" href="${baseUrl}/ru${page}"/>
             <xhtml:link rel="alternate" hreflang="id" href="${baseUrl}/id${page}"/>
             <changefreq>weekly</changefreq>
             <priority>${page === '' ? '1.0' : '0.8'}</priority>
           </url>`;
       }
     }

     // Service pages
     for (const service of services) {
       for (const lang of langs) {
         xml += `
           <url>
             <loc>${baseUrl}/${lang}/services/${service.slug}</loc>
             <changefreq>monthly</changefreq>
             <priority>0.7</priority>
           </url>`;
       }
     }

     xml += '</urlset>';

     return new Response(xml, {
       headers: {
         'Content-Type': 'application/xml',
         'Cache-Control': 'public, max-age=3600',
       },
     });
   }
   ```

4. Create `public/robots.txt`:
   ```
   User-agent: *
   Allow: /

   Sitemap: https://silentium.com/sitemap.xml
   ```

5. Create `app/components/seo/StructuredData.tsx`:
   ```typescript
   export function LocalBusinessSchema() {
     const schema = {
       '@context': 'https://schema.org',
       '@type': 'MedicalBusiness',
       name: 'Silentium - Dr. Venera Frolova',
       description: 'Aesthetic cosmetology practice specializing in non-surgical injectable treatments',
       url: 'https://silentium.com',
       telephone: '+62xxxxxxxxxx',
       address: {
         '@type': 'PostalAddress',
         addressLocality: 'Bali',
         addressCountry: 'ID',
       },
       priceRange: '$$',
       medicalSpecialty: 'Cosmetic Medicine',
     };

     return (
       <script
         type="application/ld+json"
         dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
       />
     );
   }
   ```

6. Add structured data to root layout

7. Update all page meta functions to use generateMeta helper

## Dependencies

- All previous stories (pages need to exist)

## Definition of Done

- [x] All acceptance criteria met
- [x] Meta tags correct on all pages
- [x] Sitemap accessible and valid
- [x] Robots.txt allows crawling
- [x] Hreflang tags present
- [x] Structured data valid (test with Google's tool)

## Notes

- Replace silentium.com with actual domain
- Test with Google Search Console after deployment
- Validate structured data with schema.org validator

## Reference Documents

- `/venera_docs/prd.md` - FR14, FR15 SEO requirements
- `/venera_docs/architecture.md` - SEO implementation
