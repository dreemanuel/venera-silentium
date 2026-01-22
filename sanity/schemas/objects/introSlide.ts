import { defineType, defineField } from 'sanity';
import { Presentation } from 'lucide-react';

export const introSlide = defineType({
  name: 'introSlide',
  title: 'Intro Slide',
  type: 'object',
  icon: Presentation,
  fields: [
    defineField({
      name: 'headlinePrefix',
      title: 'Headline Prefix',
      type: 'localizedString',
      description: 'First part of headline, e.g., "A" or "Where"',
    }),
    defineField({
      name: 'headlineEmphasis',
      title: 'Headline Emphasis Word',
      type: 'localizedString',
      description: 'Emphasized word displayed in italics, e.g., "Sanctuary" or "Science"',
    }),
    defineField({
      name: 'headlineSuffix',
      title: 'Headline Suffix',
      type: 'localizedString',
      description: 'Second line of headline, e.g., "Of Silent Beauty" or "Meets Spirit"',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'localizedString',
      description: 'Small subtitle above headline, e.g., "Chapter I"',
    }),
    defineField({
      name: 'paragraph',
      title: 'Paragraph',
      type: 'localizedText',
      description: 'Descriptive text displayed alongside the image',
    }),
    defineField({
      name: 'leftImage',
      title: 'Left Panel Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Background image behind the headline (sepia → color transition)',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for accessibility',
        }),
      ],
    }),
    defineField({
      name: 'rightImage',
      title: 'Right Panel Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Background image behind the paragraph text',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for accessibility',
        }),
      ],
    }),
    defineField({
      name: 'kenBurnsDirection',
      title: 'Ken Burns Animation (Left Image)',
      type: 'string',
      description: 'Subtle animation direction for the left background image',
      options: {
        list: [
          { title: 'Zoom In', value: 'zoomIn' },
          { title: 'Zoom Out', value: 'zoomOut' },
          { title: 'Pan Left', value: 'panLeft' },
          { title: 'Pan Right', value: 'panRight' },
        ],
      },
      initialValue: 'zoomIn',
    }),
    defineField({
      name: 'overlayOpacity',
      title: 'Overlay Opacity',
      type: 'number',
      description: 'Darkness of overlay on both images (0-100). Higher = darker.',
      initialValue: 30,
      validation: (Rule) => Rule.min(0).max(100),
    }),
  ],
  preview: {
    select: {
      headlinePrefix: 'headlinePrefix.en',
      headlineEmphasis: 'headlineEmphasis.en',
      subtitle: 'subtitle.en',
      media: 'leftImage',
    },
    prepare({ headlinePrefix, headlineEmphasis, subtitle, media }) {
      return {
        title: `${headlinePrefix || ''} ${headlineEmphasis || ''}`.trim() || 'Untitled Slide',
        subtitle: subtitle || 'No subtitle',
        media,
      };
    },
  },
});
