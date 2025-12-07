import imageUrlBuilder from '@sanity/image-url';
import type { SanityImage } from './types';

// Client-safe image URL builder
// Uses hardcoded project config since it's public information
const projectId = 'qibofery';
const dataset = 'production';

const builder = imageUrlBuilder({
  projectId,
  dataset,
});

export function urlFor(source: SanityImage) {
  return builder.image(source);
}
