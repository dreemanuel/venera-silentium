import { defineType, defineField } from 'sanity';
import { Award } from 'lucide-react';

export const brand = defineType({
  name: 'brand',
  title: 'Brand',
  type: 'document',
  icon: Award,
  fields: [
    defineField({
      name: 'name',
      title: 'Brand Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Brand Logo',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the logo for accessibility',
        },
      ],
    }),
    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'url',
      description: 'Brand official website (optional)',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedString',
      description: 'Brief description of the brand (optional)',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
      order: 'order',
    },
    prepare({ title, media, order }) {
      return {
        title: title || 'Untitled Brand',
        subtitle: `Order: ${order || 0}`,
        media,
      };
    },
  },
});
