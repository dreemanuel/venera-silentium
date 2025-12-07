import { createClient, type SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';
const apiVersion = '2024-01-01';

export const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
});

// Image URL builder
const builder: ImageUrlBuilder = imageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}
