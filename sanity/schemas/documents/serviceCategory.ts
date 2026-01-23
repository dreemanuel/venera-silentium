import { defineType, defineField } from 'sanity';
import { FolderOpen } from 'lucide-react';

export const serviceCategory = defineType({
  name: 'serviceCategory',
  title: 'Service Category',
  type: 'document',
  icon: FolderOpen,
  fields: [
    defineField({
      name: 'key',
      title: 'Category Key',
      type: 'string',
      description: 'Unique identifier (e.g., "anti-aging-injectables")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Category Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Category Description',
      type: 'localizedString',
      description: 'Short description shown when category is expanded',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'image',
      title: 'Category Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional preview image for the category',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      order: 'order',
      media: 'image',
    },
    prepare({ title, order, media }) {
      return {
        title: title || 'Untitled Category',
        subtitle: `Order: ${order || 'unset'}`,
        media,
      };
    },
  },
});
