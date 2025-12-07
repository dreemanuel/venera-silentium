import { defineType, defineField } from 'sanity';

export const localizedString = defineType({
  name: 'localizedString',
  title: 'Localized String',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'string',
    }),
    defineField({
      name: 'ru',
      title: 'Russian',
      type: 'string',
    }),
    defineField({
      name: 'id',
      title: 'Indonesian',
      type: 'string',
    }),
  ],
});
