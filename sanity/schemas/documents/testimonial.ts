import { defineType, defineField } from 'sanity';
import { MessageCircle } from 'lucide-react';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: MessageCircle,
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'clientTitle',
      title: 'Client Title/Occupation',
      type: 'localizedString',
      description: 'e.g., "Entrepreneur, Bali"',
    }),
    defineField({
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'service',
      title: 'Related Service',
      type: 'reference',
      to: [{ type: 'service' }],
      description: 'Which service did this client receive?',
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: 'clientPhoto',
      title: 'Client Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional profile photo',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show on homepage',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
    }),
  ],
  orderings: [
    {
      title: 'Newest First',
      name: 'dateDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'clientName',
      subtitle: 'quote.en',
      media: 'clientPhoto',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Anonymous',
        subtitle: subtitle ? subtitle.substring(0, 60) + '...' : '',
        media,
      };
    },
  },
});
