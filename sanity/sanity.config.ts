import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

// Get project ID and dataset from environment variables
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

export default defineConfig({
  name: 'venera-silentium',
  title: 'Venera Silentium',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Site Settings as singleton
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('Site Settings')
              ),
            S.divider(),
            // Services
            S.documentTypeListItem('service').title('Services'),
            // Blog Posts
            S.documentTypeListItem('blogPost').title('Blog Posts'),
            // Gallery Images
            S.documentTypeListItem('galleryImage').title('Gallery Images'),
            // Testimonials
            S.documentTypeListItem('testimonial').title('Testimonials'),
            // Brands
            S.documentTypeListItem('brand').title('Brands'),
            S.divider(),
            // Pages
            S.documentTypeListItem('page').title('Pages'),
            // Promo Banners
            S.documentTypeListItem('promoBanner').title('Promo Banners'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
