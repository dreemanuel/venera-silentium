import { defineType, defineField } from 'sanity';

export const localizedText = defineType({
  name: 'localizedText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'ru',
      title: 'Russian',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'id',
      title: 'Indonesian',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
});
