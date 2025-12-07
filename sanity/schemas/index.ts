import { localizedString, localizedText, portableText } from './objects';
import { siteSettings, service, page, testimonial } from './documents';

export const schemaTypes = [
  // Object types
  localizedString,
  localizedText,
  portableText,
  // Document types
  siteSettings,
  service,
  page,
  testimonial,
];
