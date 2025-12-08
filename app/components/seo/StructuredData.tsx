import { SITE_URL, SITE_NAME } from '~/lib/seo';

/**
 * LocalBusiness structured data for SEO
 * Implements MedicalBusiness schema for aesthetic cosmetology practice
 */
export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: `${SITE_NAME} - Dr. Venera Frolova`,
    alternateName: 'Woman Silentium Aesthetic Cosmetology',
    description:
      'Premium aesthetic cosmetology practice specializing in non-surgical injectable treatments. Where science meets spirit.',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    image: `${SITE_URL}/images/og-default.jpg`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bali',
      addressCountry: 'ID',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -8.4095,
      longitude: 115.1889,
    },
    priceRange: '$$',
    medicalSpecialty: 'Cosmetic Medicine',
    availableService: [
      {
        '@type': 'MedicalProcedure',
        name: 'Botox',
        procedureType: 'NoninvasiveProcedure',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Dermal Fillers',
        procedureType: 'NoninvasiveProcedure',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Mesotherapy',
        procedureType: 'NoninvasiveProcedure',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Skin Rejuvenation',
        procedureType: 'NoninvasiveProcedure',
      },
    ],
    sameAs: [
      // Add social media URLs when available
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Person structured data for Dr. Venera
 */
export function PersonSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: 'Dr. Venera Frolova',
    jobTitle: 'Aesthetic Cosmetologist MD',
    worksFor: {
      '@id': `${SITE_URL}/#business`,
    },
    description: 'Certified aesthetic cosmetologist specializing in non-surgical rejuvenation treatments.',
    url: `${SITE_URL}/en/about`,
    image: `${SITE_URL}/images/dr-venera.jpg`,
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * WebSite structured data for sitelinks search box
 */
export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: 'Premium aesthetic cosmetology in Bali by Dr. Venera Frolova. Where science meets spirit.',
    publisher: {
      '@id': `${SITE_URL}/#business`,
    },
    inLanguage: ['en', 'ru', 'id'],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  image?: string;
}

/**
 * Service structured data for individual service pages
 */
export function ServiceSchema({ name, description, url, image }: ServiceSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name,
    description,
    url,
    image: image || `${SITE_URL}/images/og-default.jpg`,
    procedureType: 'NoninvasiveProcedure',
    provider: {
      '@id': `${SITE_URL}/#business`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

/**
 * BreadcrumbList structured data
 */
export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
