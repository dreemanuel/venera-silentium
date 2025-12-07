import { defineType, defineField } from 'sanity';
import { Sparkles } from 'lucide-react';

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: Sparkles,
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Anti-Aging Injectables', value: 'anti-aging-injectables' },
          { title: 'Skin Rejuvenation', value: 'skin-rejuvenation' },
          { title: 'Problem-Specific Treatments', value: 'problem-specific' },
          { title: 'Specialized Treatments', value: 'specialized' },
          { title: 'Preparatory Procedures', value: 'preparatory' },
          { title: 'Consultation', value: 'consultation' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'localizedString',
      description: 'Brief description for service cards (1-2 sentences)',
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'localizedText',
      description: 'Detailed service description with rich text',
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{ type: 'localizedString' }],
      description: 'List of key benefits',
    }),
    defineField({
      name: 'idealFor',
      title: 'Ideal For',
      type: 'localizedString',
      description: 'Who is this treatment best suited for?',
    }),
    defineField({
      name: 'duration',
      title: 'Treatment Duration',
      type: 'string',
      description: 'e.g., "30-45 minutes"',
    }),
    defineField({
      name: 'image',
      title: 'Service Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Service',
      type: 'boolean',
      description: 'Show on homepage featured section',
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
      return {
        title: title || 'Untitled Service',
        subtitle: category,
        media,
      };
    },
  },
});
