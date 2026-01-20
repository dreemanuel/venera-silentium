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
      title: 'Video File (WebM - Primary)',
      type: 'file',
      options: {
        accept: 'video/webm',
      },
      description: 'WebM format for modern browsers (smaller file size)',
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'videoFileFallback',
      title: 'Video File (MP4 - Fallback)',
      type: 'file',
      options: {
        accept: 'video/mp4',
      },
      description: 'MP4 format for Safari and older browsers',
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
    defineField({
      name: 'enableAudio',
      title: 'Enable Audio',
      type: 'boolean',
      description: 'Allow video audio to play (videos are muted by default)',
      initialValue: false,
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'useVideoDuration',
      title: 'Use Full Video Duration',
      type: 'boolean',
      description: 'Let the video play until it ends naturally (ignores duration setting)',
      initialValue: true,
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    }),
    // Common fields
    defineField({
      name: 'duration',
      title: 'Display Duration (seconds)',
      type: 'number',
      description: 'Override default interval. For videos, only used if "Use Full Video Duration" is off.',
      validation: (Rule) => Rule.min(3).max(60),
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
