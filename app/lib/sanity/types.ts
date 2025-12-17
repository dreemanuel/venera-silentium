// Sanity document types for TypeScript

export interface LocalizedString {
  en?: string;
  ru?: string;
  id?: string;
}

export interface LocalizedText {
  en?: PortableTextBlock[];
  ru?: PortableTextBlock[];
  id?: PortableTextBlock[];
}

export interface PortableTextBlock {
  _type: 'block';
  _key: string;
  style?: string;
  children: {
    _type: string;
    _key: string;
    text: string;
    marks?: string[];
  }[];
  markDefs?: {
    _type: string;
    _key: string;
    href?: string;
  }[];
}

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

// Hero slideshow types
export type KenBurnsDirection = 'zoomIn' | 'zoomOut' | 'panLeft' | 'panRight';

export interface HeroMediaItem {
  _key: string;
  mediaType: 'image' | 'video';
  // Image fields
  image?: SanityImage & { alt?: string };
  // Video fields
  videoFileUrl?: string; // Resolved URL from GROQ query
  videoPoster?: SanityImage;
  enableAudio?: boolean;
  useVideoDuration?: boolean;
  // Common fields
  duration?: number;
  kenBurnsDirection?: KenBurnsDirection;
}

// About section slideshow types
export interface AboutMediaItem {
  _key: string;
  mediaType: 'image' | 'video';
  // Image fields
  image?: SanityImage & { alt?: string };
  // Video fields
  videoFileUrl?: string; // Resolved URL from GROQ query
  videoPoster?: SanityImage;
  enableAudio?: boolean;
  useVideoDuration?: boolean;
  // Common fields
  duration?: number;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  telegram?: string;
}

export interface AboutDrVenera {
  photo?: SanityImage;
  // Slideshow fields
  slideshowEnabled?: boolean;
  media?: AboutMediaItem[];
  slideshowInterval?: number;
  // Content fields
  name?: LocalizedString;
  title?: LocalizedString;
  story?: LocalizedText;
  credentials?: LocalizedString[];
  experience?: string;
}

export interface AboutSilentium {
  tagline?: LocalizedString;
  philosophy?: LocalizedText;
  image?: SanityImage;
}

export interface SiteSettings {
  heroTitle?: LocalizedString;
  heroSubtitle?: LocalizedString;
  heroImage?: SanityImage;
  heroCtaText?: LocalizedString;
  // Slideshow fields
  heroSlideshowEnabled?: boolean;
  heroMedia?: HeroMediaItem[];
  heroSlideshowInterval?: number;
  // Contact fields
  contactEmail?: string;
  contactPhone?: string;
  whatsappNumber?: string;
  address?: LocalizedString;
  socialLinks?: SocialLinks;
  seoTitle?: LocalizedString;
  seoDescription?: LocalizedString;
  aboutDrVenera?: AboutDrVenera;
  aboutSilentium?: AboutSilentium;
}

export type ServiceCategory =
  | 'anti-aging-injectables'
  | 'skin-rejuvenation'
  | 'problem-specific'
  | 'specialized'
  | 'preparatory'
  | 'consultation';

export interface Service {
  _id: string;
  title: LocalizedString;
  slug: {
    current: string;
  };
  category: ServiceCategory;
  shortDescription?: LocalizedString;
  description?: LocalizedText;
  benefits?: LocalizedString[];
  idealFor?: LocalizedString;
  duration?: string;
  image?: SanityImage;
  gallery?: SanityImage[];
  order?: number;
  featured?: boolean;
}

export type PageType =
  | 'about-venera'
  | 'about-silentium'
  | 'contact'
  | 'services'
  | 'custom';

export interface Page {
  _id: string;
  title: LocalizedString;
  slug: {
    current: string;
  };
  pageType: PageType;
  content?: LocalizedText;
  heroTitle?: LocalizedString;
  heroSubtitle?: LocalizedString;
  heroImage?: SanityImage;
  seoTitle?: LocalizedString;
  seoDescription?: LocalizedString;
}

export interface Testimonial {
  _id: string;
  clientName: string;
  clientTitle?: LocalizedString;
  quote: LocalizedString;
  service?: {
    _id: string;
    title: LocalizedString;
    slug: {
      current: string;
    };
  };
  rating?: number;
  clientPhoto?: SanityImage;
  featured?: boolean;
  publishedAt?: string;
}

export type BlogPostCategory = 'skincare-tips' | 'treatment-guides' | 'wellness' | 'news';

export interface BlogPost {
  _id: string;
  title: LocalizedString;
  slug: {
    current: string;
  };
  excerpt?: LocalizedString;
  content?: LocalizedText;
  featuredImage?: SanityImage & { alt?: string };
  category: BlogPostCategory;
  author?: string;
  publishedAt: string;
  featured?: boolean;
  relatedServices?: {
    _id: string;
    title: LocalizedString;
    slug: {
      current: string;
    };
  }[];
}

export interface Brand {
  _id: string;
  name: string;
  logo: SanityImage & { alt?: string };
  website?: string;
  description?: LocalizedString;
  order?: number;
}

export type GalleryCategory = 'clinic' | 'treatments' | 'before-after' | 'team';

export interface GalleryImage {
  _id: string;
  title?: LocalizedString;
  image: SanityImage & { alt: string };
  category: GalleryCategory;
  order?: number;
  featured?: boolean;
}

export type PromoBannerColor = 'tea-green' | 'beige' | 'paynes-gray' | 'cornsilk' | 'papaya-whip';
export type PromoBannerTextColor = 'dark' | 'light';
export type PromoBannerPosition = 'top' | 'bottom';
export type PromoBannerPage = 'all' | 'home' | 'about' | 'services' | 'contact' | 'blog';

export interface PromoBanner {
  _id: string;
  title: string;
  message: LocalizedString;
  backgroundColor?: PromoBannerColor;
  textColor?: PromoBannerTextColor;
  linkUrl?: string;
  linkText?: LocalizedString;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  position?: PromoBannerPosition;
  dismissible?: boolean;
  showOnPages?: PromoBannerPage[];
  priority?: number;
}

// Helper type for getting localized value
export type Language = 'en' | 'ru' | 'id';

export function getLocalizedValue<T>(
  localizedField: { en?: T; ru?: T; id?: T } | undefined,
  lang: Language,
  fallback?: T
): T | undefined {
  if (!localizedField) return fallback;
  return localizedField[lang] ?? localizedField.en ?? fallback;
}
