import { defineType, defineField } from 'sanity';
import { Image } from 'lucide-react';

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  icon: Image,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      description: 'Optional title for the image',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for accessibility',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Clinic', value: 'clinic' },
          { title: 'Treatments', value: 'treatments' },
          { title: 'Before & After', value: 'before-after' },
          { title: 'Team', value: 'team' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show on homepage gallery',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      category: 'category',
      media: 'image',
    },
    prepare({ title, category, media }) {
      const categoryLabels: Record<string, string> = {
        clinic: 'Clinic',
        treatments: 'Treatments',
        'before-after': 'Before & After',
        team: 'Team',
      };
      return {
        title: title || 'Untitled Image',
        subtitle: categoryLabels[category] || category,
        media,
      };
    },
  },
});
