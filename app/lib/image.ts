/**
 * Image optimization utilities for Sanity images
 * Provides responsive images with WebP format and lazy loading
 */

import imageUrlBuilder from '@sanity/image-url';
import { createClient } from '@sanity/client';
import type { SanityImage } from './sanity';

// Create a lightweight client for image URL building only
const projectId = typeof window === 'undefined'
  ? process.env.SANITY_PROJECT_ID || ''
  : '';
const dataset = typeof window === 'undefined'
  ? process.env.SANITY_DATASET || 'production'
  : 'production';

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

/**
 * Base URL builder function
 */
export function urlFor(source: SanityImage) {
  return builder.image(source);
}

/**
 * Standard breakpoints for responsive images
 */
export const IMAGE_BREAKPOINTS = {
  sm: 400,
  md: 800,
  lg: 1200,
  xl: 1600,
  '2xl': 1920,
} as const;

/**
 * Generate responsive image props for <img> elements
 * Includes srcSet for responsive loading and WebP format
 */
export interface ResponsiveImageProps {
  src: string;
  srcSet: string;
  sizes: string;
  alt: string;
  width?: number;
  height?: number;
  loading: 'lazy' | 'eager';
  decoding: 'async' | 'sync' | 'auto';
  fetchPriority?: 'high' | 'low' | 'auto';
}

export interface ImageOptions {
  alt: string;
  sizes?: string;
  priority?: boolean;
  aspectRatio?: number;
  quality?: number;
  maxWidth?: number;
}

export function getResponsiveImageProps(
  source: SanityImage,
  options: ImageOptions
): ResponsiveImageProps {
  const {
    alt,
    sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    priority = false,
    aspectRatio,
    quality = 80,
    maxWidth = 1920,
  } = options;

  // Generate srcSet with multiple sizes
  const widths = [400, 800, 1200, 1600, 1920].filter(w => w <= maxWidth);

  const srcSetEntries = widths.map((width) => {
    let imageBuilder = urlFor(source)
      .width(width)
      .quality(quality)
      .auto('format'); // Auto-converts to WebP when supported

    if (aspectRatio) {
      imageBuilder = imageBuilder.height(Math.round(width / aspectRatio));
    }

    return `${imageBuilder.url()} ${width}w`;
  });

  // Default src (medium size for fallback)
  const defaultWidth = Math.min(800, maxWidth);
  let defaultBuilder = urlFor(source)
    .width(defaultWidth)
    .quality(quality)
    .auto('format');

  if (aspectRatio) {
    defaultBuilder = defaultBuilder.height(Math.round(defaultWidth / aspectRatio));
  }

  return {
    src: defaultBuilder.url(),
    srcSet: srcSetEntries.join(', '),
    sizes,
    alt,
    loading: priority ? 'eager' : 'lazy',
    decoding: priority ? 'sync' : 'async',
    ...(priority && { fetchPriority: 'high' as const }),
  };
}

/**
 * Get optimized hero image URL with preload hints
 * For above-the-fold images that need priority loading
 */
export function getHeroImageUrl(
  source: SanityImage,
  width: number = 1920,
  quality: number = 85
): string {
  return urlFor(source)
    .width(width)
    .quality(quality)
    .auto('format')
    .url();
}

/**
 * Get thumbnail image URL
 * For small previews and cards
 */
export function getThumbnailUrl(
  source: SanityImage,
  width: number = 400,
  height?: number,
  quality: number = 75
): string {
  let imageBuilder = urlFor(source)
    .width(width)
    .quality(quality)
    .auto('format');

  if (height) {
    imageBuilder = imageBuilder.height(height);
  }

  return imageBuilder.url();
}

/**
 * Get blur placeholder data URL (low quality)
 * For progressive image loading effect
 */
export function getBlurPlaceholder(source: SanityImage): string {
  return urlFor(source)
    .width(20)
    .quality(20)
    .blur(10)
    .auto('format')
    .url();
}

/**
 * Get OG image URL optimized for social sharing
 * Standard OG image size: 1200x630
 */
export function getOgImageUrl(source: SanityImage): string {
  return urlFor(source)
    .width(1200)
    .height(630)
    .quality(85)
    .auto('format')
    .url();
}

/**
 * Preload link attributes for critical images
 */
export interface PreloadImageLink {
  rel: 'preload';
  as: 'image';
  href: string;
  type: string;
  imageSrcSet?: string;
  imageSizes?: string;
  fetchPriority: 'high';
}

export function getImagePreloadLink(
  source: SanityImage,
  sizes: string = '100vw'
): PreloadImageLink {
  const widths = [400, 800, 1200, 1600, 1920];
  const srcSetEntries = widths.map((width) => {
    return `${urlFor(source).width(width).quality(85).auto('format').url()} ${width}w`;
  });

  return {
    rel: 'preload',
    as: 'image',
    href: urlFor(source).width(1200).quality(85).auto('format').url(),
    type: 'image/webp',
    imageSrcSet: srcSetEntries.join(', '),
    imageSizes: sizes,
    fetchPriority: 'high',
  };
}
