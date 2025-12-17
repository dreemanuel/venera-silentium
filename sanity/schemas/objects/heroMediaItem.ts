import { defineType, defineField } from 'sanity';
import { ImageIcon, PlayIcon } from 'lucide-react';

export const heroMediaItem = defineType({
  name: 'heroMediaItem',
  title: 'Hero Media Item',
  type: 'object',
  fields: [
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
      validation: (Rule) => Rule.required(),
    }),
    // Image fields (shown when mediaType is 'image')
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.mediaType !== 'image',
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for accessibility',
        },
      ],
    }),
    // Video fields (shown when mediaType is 'video')
    defineField({
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/mp4,video/webm',
      },
      description: 'Upload MP4 or WebM video (recommended: under 50MB, 10-15 seconds)',
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'videoPoster',
      title: 'Video Poster Image',
      type: 'image',
      description: 'Fallback image shown while video loads',
      hidden: ({ parent }) => parent?.mediaType !== 'video',
      options: { hotspot: true },
    }),
    // Common fields
    defineField({
      name: 'duration',
      title: 'Display Duration (seconds)',
      type: 'number',
      description: 'Override default interval. Leave empty for default (6 seconds).',
      validation: (Rule) => Rule.min(3).max(30),
    }),
    defineField({
      name: 'kenBurnsDirection',
      title: 'Ken Burns Direction',
      type: 'string',
      description: 'Direction of zoom/pan animation (images only)',
      options: {
        list: [
          { title: 'Zoom In', value: 'zoomIn' },
          { title: 'Zoom Out', value: 'zoomOut' },
          { title: 'Pan Left', value: 'panLeft' },
          { title: 'Pan Right', value: 'panRight' },
        ],
      },
      hidden: ({ parent }) => parent?.mediaType !== 'image',
      initialValue: 'zoomIn',
    }),
  ],
  preview: {
    select: {
      mediaType: 'mediaType',
      imageMedia: 'image',
      videoPoster: 'videoPoster',
    },
    prepare({ mediaType, imageMedia, videoPoster }) {
      const isVideo = mediaType === 'video';
      return {
        title: isVideo ? 'Video Slide' : 'Image Slide',
        media: isVideo ? videoPoster || PlayIcon : imageMedia || ImageIcon,
        subtitle: mediaType,
      };
    },
  },
});
