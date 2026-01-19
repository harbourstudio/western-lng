import { defineField, defineType } from 'sanity';
import { backgroundColor } from '../fields/backgroundColor';
import { spacing } from '../fields/spacing';
import { content } from '../fields/content';

export default defineType({
  name: 'cta',
  type: 'object',
  title: 'Call to Action',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string'
    }),
    content,
    defineField({
      name: 'colorScheme',
      title: 'Color Scheme',
      type: 'string',
      options: {
        list: [
          { title: 'Light Scheme', value: 'light' },
          { title: 'Dark Scheme', value: 'dark' },
        ],
      },
      initialValue: 'dark'
    }),
    backgroundColor,
    spacing,
  ],
  preview: {
    select: {
      heading: 'heading',
    },
    prepare({ heading }) {
      return {
        title: 'Call to Action',
        subtitle: `${heading}`
      };
    },
  },
});