import { defineType, defineField } from 'sanity';
import { FileText } from 'lucide-react';

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: FileText,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      options: {
        list: [
          { title: 'About Dr. Venera', value: 'about-venera' },
          { title: 'About Silentium', value: 'about-silentium' },
          { title: 'Contact', value: 'contact' },
          { title: 'Services Index', value: 'services' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'localizedText',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'localizedString',
      description: 'Override title for the page hero section',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'localizedString',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'localizedString',
      description: 'Override for browser tab title',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'localizedString',
      description: 'Meta description for search engines',
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      pageType: 'pageType',
      media: 'heroImage',
    },
    prepare({ title, pageType, media }) {
      return {
        title: title || 'Untitled Page',
        subtitle: pageType,
        media,
      };
    },
  },
});
