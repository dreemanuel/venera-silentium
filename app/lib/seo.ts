/**
 * SEO helper utilities for generating meta tags
 */

// Use environment variable for production URL, fallback to silentium.com
export const SITE_URL = typeof process !== 'undefined' && process.env?.SITE_URL
  ? process.env.SITE_URL
  : 'https://silentium.com';
export const SITE_NAME = 'Woman Silentium';
export const DEFAULT_OG_IMAGE = '/images/og-default.jpg';

export const SUPPORTED_LANGUAGES = ['en', 'ru', 'id'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export interface SeoMeta {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  locale?: string;
  noindex?: boolean;
}

export interface HreflangLink {
  rel: 'alternate';
  hrefLang: string;
  href: string;
}

export interface CanonicalLink {
  rel: 'canonical';
  href: string;
}

/**
 * Get the locale string for Open Graph tags
 */
export function getOgLocale(lang: string): string {
  const localeMap: Record<string, string> = {
    en: 'en_US',
    ru: 'ru_RU',
    id: 'id_ID',
  };
  return localeMap[lang] || 'en_US';
}

/**
 * Generate comprehensive meta tags for SEO
 */
export function generateMeta({
  title,
  description,
  image,
  url,
  type = 'website',
  locale,
  noindex = false,
}: SeoMeta) {
  const ogImage = image || `${SITE_URL}${DEFAULT_OG_IMAGE}`;
  const fullUrl = url?.startsWith('http') ? url : `${SITE_URL}${url || ''}`;
  const ogLocale = locale || 'en_US';

  const meta: Array<{ title?: string; name?: string; property?: string; content?: string }> = [
    { title },
    { name: 'description', content: description },
    // Open Graph
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: fullUrl },
    { property: 'og:type', content: type },
    { property: 'og:image', content: ogImage },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:locale', content: ogLocale },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: ogImage },
  ];

  if (noindex) {
    meta.push({ name: 'robots', content: 'noindex, nofollow' });
  }

  return meta;
}

/**
 * Generate hreflang links for multilingual SEO
 */
export function generateHreflangLinks(path: string, currentLang: string): (HreflangLink | CanonicalLink)[] {
  // Remove leading language prefix if present
  const cleanPath = path.replace(/^\/(en|ru|id)/, '') || '';

  const links: (HreflangLink | CanonicalLink)[] = [
    // Hreflang alternates
    ...SUPPORTED_LANGUAGES.map((lang) => ({
      rel: 'alternate' as const,
      hrefLang: lang,
      href: `${SITE_URL}/${lang}${cleanPath}`,
    })),
    // x-default (fallback for unmatched languages)
    {
      rel: 'alternate' as const,
      hrefLang: 'x-default',
      href: `${SITE_URL}/en${cleanPath}`,
    },
    // Canonical URL
    {
      rel: 'canonical' as const,
      href: `${SITE_URL}/${currentLang}${cleanPath}`,
    },
  ];

  return links;
}

/**
 * Get page-specific SEO content by language
 */
export function getLocalizedSeo(
  lang: string,
  seoContent: Record<string, { title: string; description: string }>
): { title: string; description: string } {
  return seoContent[lang] || seoContent.en || { title: SITE_NAME, description: '' };
}

/**
 * Page-specific SEO content
 */
export const pageSeo = {
  home: {
    en: {
      title: 'Woman Silentium - Aesthetic Cosmetology in Bali',
      description: 'Woman Silentium by Dr. Venera Frolova - Where science meets spirit. Premium aesthetic cosmetology in Bali.',
    },
    ru: {
      title: 'Woman Silentium - Эстетическая косметология на Бали',
      description: 'Woman Silentium от Др. Венеры Фроловой - Где наука встречается с духом. Премиум эстетическая косметология на Бали.',
    },
    id: {
      title: 'Woman Silentium - Kosmetologi Estetika di Bali',
      description: 'Woman Silentium oleh Dr. Venera Frolova - Di mana sains bertemu jiwa. Kosmetologi estetika premium di Bali.',
    },
  },
  about: {
    en: {
      title: 'About | Woman Silentium - Aesthetic Cosmetology',
      description: 'Learn about Dr. Venera Frolova and the Woman Silentium philosophy. Where science meets spirit in aesthetic cosmetology.',
    },
    ru: {
      title: 'О нас | Woman Silentium - Эстетическая косметология',
      description: 'Узнайте о Др. Венере Фроловой и философии Woman Silentium. Где наука встречается с духом.',
    },
    id: {
      title: 'Tentang | Woman Silentium - Kosmetologi Estetika',
      description: 'Pelajari tentang Dr. Venera Frolova dan filosofi Woman Silentium. Di mana sains bertemu jiwa.',
    },
  },
  services: {
    en: {
      title: 'Services | Woman Silentium - Aesthetic Cosmetology in Bali',
      description: 'Discover our range of aesthetic treatments at Woman Silentium. From anti-aging injectables to skin rejuvenation, find the perfect treatment for your needs.',
    },
    ru: {
      title: 'Услуги | Woman Silentium - Эстетическая косметология на Бали',
      description: 'Откройте для себя наш спектр эстетических процедур в Woman Silentium. От инъекций против старения до омоложения кожи — найдите идеальную процедуру.',
    },
    id: {
      title: 'Layanan | Woman Silentium - Kosmetologi Estetika di Bali',
      description: 'Temukan berbagai perawatan estetika kami di Woman Silentium. Dari suntikan anti-penuaan hingga peremajaan kulit, temukan perawatan yang tepat.',
    },
  },
  contact: {
    en: {
      title: 'Contact | Woman Silentium - Aesthetic Cosmetology',
      description: 'Book a consultation with Dr. Venera Frolova. Contact Woman Silentium for premium aesthetic cosmetology in Bali.',
    },
    ru: {
      title: 'Контакты | Woman Silentium - Эстетическая косметология',
      description: 'Запишитесь на консультацию к Др. Венере Фроловой. Свяжитесь с Woman Silentium для премиум эстетической косметологии на Бали.',
    },
    id: {
      title: 'Kontak | Woman Silentium - Kosmetologi Estetika',
      description: 'Pesan konsultasi dengan Dr. Venera Frolova. Hubungi Woman Silentium untuk kosmetologi estetika premium di Bali.',
    },
  },
};
