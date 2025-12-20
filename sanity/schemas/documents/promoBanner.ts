import { defineType, defineField } from 'sanity';
import { Megaphone } from 'lucide-react';

export const promoBanner = defineType({
  name: 'promoBanner',
  title: 'Promotional Banner',
  type: 'document',
  icon: Megaphone,
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'For internal reference only (not shown on site)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'Banner Message',
      type: 'localizedString',
      description: 'The text displayed on the banner',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'Tea Green', value: 'tea-green' },
          { title: 'Beige', value: 'beige' },
          { title: 'Payne\'s Gray', value: 'paynes-gray' },
          { title: 'Cornsilk', value: 'cornsilk' },
          { title: 'Papaya Whip', value: 'papaya-whip' },
        ],
      },
      initialValue: 'tea-green',
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      options: {
        list: [
          { title: 'Dark (Payne\'s Gray)', value: 'dark' },
          { title: 'Light (Cornsilk)', value: 'light' },
        ],
      },
      initialValue: 'dark',
    }),
    defineField({
      name: 'linkUrl',
      title: 'Link URL',
      type: 'string',
      description: 'Optional link (can be internal path like /en/services or external URL)',
    }),
    defineField({
      name: 'linkText',
      title: 'Link Text',
      type: 'localizedString',
      description: 'Text for the clickable link (e.g., "Learn More")',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
      description: 'When the banner should start showing',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
      description: 'When the banner should stop showing',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Master toggle to enable/disable this banner',
      initialValue: true,
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      options: {
        list: [
          { title: 'Top of Page', value: 'top' },
          { title: 'Bottom of Page', value: 'bottom' },
        ],
      },
      initialValue: 'top',
    }),
    defineField({
      name: 'dismissible',
      title: 'Dismissible',
      type: 'boolean',
      description: 'Allow users to close the banner',
      initialValue: true,
    }),
    defineField({
      name: 'enableMarquee',
      title: 'Enable Marquee Effect',
      type: 'boolean',
      description: 'Animate the text in a scrolling marquee style',
      initialValue: false,
    }),
    defineField({
      name: 'showOnPages',
      title: 'Show on Pages',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'All Pages', value: 'all' },
          { title: 'Home', value: 'home' },
          { title: 'About', value: 'about' },
          { title: 'Services', value: 'services' },
          { title: 'Contact', value: 'contact' },
          { title: 'Blog', value: 'blog' },
        ],
      },
      initialValue: ['all'],
      description: 'Select which pages should show this banner',
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description: 'Higher numbers show first when multiple banners are active',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Priority (Highest First)',
      name: 'priorityDesc',
      by: [{ field: 'priority', direction: 'desc' }],
    },
    {
      title: 'Start Date',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      message: 'message.en',
      isActive: 'isActive',
      startDate: 'startDate',
      endDate: 'endDate',
    },
    prepare({ title, message, isActive, startDate, endDate }) {
      const status = isActive ? 'Active' : 'Inactive';
      const dateRange =
        startDate && endDate
          ? `${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`
          : startDate
          ? `From ${new Date(startDate).toLocaleDateString()}`
          : endDate
          ? `Until ${new Date(endDate).toLocaleDateString()}`
          : 'No date range';

      return {
        title: title || 'Untitled Banner',
        subtitle: `${status} • ${dateRange}`,
      };
    },
  },
});
