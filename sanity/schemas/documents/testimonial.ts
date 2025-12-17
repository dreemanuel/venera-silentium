import { defineType, defineField } from 'sanity';
import { MessageCircle, ImageIcon, PlayIcon } from 'lucide-react';

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
    // Toggle between card and media mode
    defineField({
      name: 'isMediaTestimonial',
      title: 'Use Media Instead of Card',
      type: 'boolean',
      description: 'Check this to upload an image or video (e.g., Instagram story screenshot) instead of creating a text-based testimonial card',
      initialValue: false,
    }),
    // --- CARD MODE FIELDS (hidden when isMediaTestimonial is true) ---
    defineField({
      name: 'clientTitle',
      title: 'Client Title/Occupation',
      type: 'localizedString',
      description: 'e.g., "Entrepreneur, Bali"',
      hidden: ({ parent }) => parent?.isMediaTestimonial === true,
    }),
    defineField({
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'localizedString',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { isMediaTestimonial?: boolean };
          if (!parent?.isMediaTestimonial && !value) {
            return 'Quote is required for card testimonials';
          }
          return true;
        }),
      hidden: ({ parent }) => parent?.isMediaTestimonial === true,
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
      hidden: ({ parent }) => parent?.isMediaTestimonial === true,
    }),
    defineField({
      name: 'clientPhoto',
      title: 'Client Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional profile photo',
      hidden: ({ parent }) => parent?.isMediaTestimonial === true,
    }),
    // --- MEDIA MODE FIELDS (hidden when isMediaTestimonial is false) ---
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
      hidden: ({ parent }) => parent?.isMediaTestimonial !== true,
    }),
    defineField({
      name: 'mediaImage',
      title: 'Testimonial Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Upload a screenshot, Instagram story, or review image',
      hidden: ({ parent }) =>
        parent?.isMediaTestimonial !== true || parent?.mediaType !== 'image',
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for accessibility',
        },
      ],
    }),
    defineField({
      name: 'mediaVideo',
      title: 'Testimonial Video',
      type: 'file',
      options: {
        accept: 'video/mp4,video/webm',
      },
      description: 'Upload MP4 or WebM video (recommended: under 50MB)',
      hidden: ({ parent }) =>
        parent?.isMediaTestimonial !== true || parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'videoPoster',
      title: 'Video Poster Image',
      type: 'image',
      description: 'Fallback image shown while video loads',
      hidden: ({ parent }) =>
        parent?.isMediaTestimonial !== true || parent?.mediaType !== 'video',
      options: { hotspot: true },
    }),
    defineField({
      name: 'enableAudio',
      title: 'Enable Audio',
      type: 'boolean',
      description: 'Allow video audio to play (videos are muted by default)',
      initialValue: false,
      hidden: ({ parent }) =>
        parent?.isMediaTestimonial !== true || parent?.mediaType !== 'video',
    }),
    // --- COMMON FIELDS ---
    defineField({
      name: 'service',
      title: 'Related Service',
      type: 'reference',
      to: [{ type: 'service' }],
      description: 'Which service did this client receive?',
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
      isMedia: 'isMediaTestimonial',
      mediaType: 'mediaType',
      quote: 'quote.en',
      clientPhoto: 'clientPhoto',
      mediaImage: 'mediaImage',
      videoPoster: 'videoPoster',
    },
    prepare({ title, isMedia, mediaType, quote, clientPhoto, mediaImage, videoPoster }) {
      const isMediaMode = isMedia === true;
      const isVideo = mediaType === 'video';

      let subtitle = '';
      if (isMediaMode) {
        subtitle = isVideo ? '🎬 Video testimonial' : '🖼️ Image testimonial';
      } else {
        subtitle = quote ? quote.substring(0, 50) + '...' : 'Text testimonial';
      }

      // Choose preview media based on mode
      let media;
      if (isMediaMode) {
        media = isVideo ? (videoPoster || PlayIcon) : (mediaImage || ImageIcon);
      } else {
        media = clientPhoto;
      }

      return {
        title: title || 'Anonymous',
        subtitle,
        media,
      };
    },
  },
});
