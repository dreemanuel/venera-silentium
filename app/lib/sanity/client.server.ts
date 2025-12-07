import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImage } from './types';

// Server-side Sanity client for use in Remix loaders
const projectId = process.env.SANITY_PROJECT_ID || '';
const dataset = process.env.SANITY_DATASET || 'production';
const apiVersion = '2024-01-01';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Enable CDN for read-only operations
  perspective: 'published', // Only fetch published content
});

// Preview client with draft content
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'previewDrafts',
  token: process.env.SANITY_API_TOKEN, // Required for draft content
});

// Get the appropriate client based on preview mode
export function getClient(preview = false) {
  return preview ? previewClient : sanityClient;
}

// Image URL builder
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}
