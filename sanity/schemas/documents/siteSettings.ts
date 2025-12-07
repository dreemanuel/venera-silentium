import { defineType, defineField } from 'sanity';
import { Cog } from 'lucide-react';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: Cog,
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'localizedString',
      description: 'Main headline on the homepage hero section',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'localizedString',
      description: 'Supporting text below the hero title',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Background or featured image for the hero section',
    }),
    defineField({
      name: 'heroCtaText',
      title: 'Hero CTA Text',
      type: 'localizedString',
      description: 'Call-to-action button text',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'Include country code (e.g., +62)',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'localizedString',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        }),
        defineField({
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        }),
        defineField({
          name: 'telegram',
          title: 'Telegram URL',
          type: 'url',
        }),
      ],
    }),
    defineField({
      name: 'seoTitle',
      title: 'Default SEO Title',
      type: 'localizedString',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Default SEO Description',
      type: 'localizedString',
    }),
    // About Dr. Venera Section
    defineField({
      name: 'aboutDrVenera',
      title: 'About Dr. Venera',
      type: 'object',
      fields: [
        defineField({
          name: 'photo',
          title: 'Photo',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'name',
          title: 'Name',
          type: 'localizedString',
        }),
        defineField({
          name: 'title',
          title: 'Professional Title',
          type: 'localizedString',
          description: 'e.g., "Aesthetic Cosmetologist MD"',
        }),
        defineField({
          name: 'story',
          title: 'Story',
          type: 'localizedText',
          description: "Dr. Venera's personal story and philosophy",
        }),
        defineField({
          name: 'credentials',
          title: 'Credentials',
          type: 'array',
          of: [{ type: 'localizedString' }],
          description: 'List of credentials and certifications',
        }),
        defineField({
          name: 'experience',
          title: 'Years of Experience',
          type: 'string',
          description: 'e.g., "10+ years"',
        }),
      ],
    }),
    // About Silentium Section
    defineField({
      name: 'aboutSilentium',
      title: 'About Silentium Philosophy',
      type: 'object',
      fields: [
        defineField({
          name: 'tagline',
          title: 'Tagline',
          type: 'localizedString',
          description: 'e.g., "Where science meets spirit"',
        }),
        defineField({
          name: 'philosophy',
          title: 'Philosophy',
          type: 'localizedText',
          description: 'The Silentium philosophy and approach',
        }),
        defineField({
          name: 'image',
          title: 'Section Image',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
});
