import { defineField, defineType } from 'sanity';
import { backgroundColor } from '../fields/backgroundColor';
import { spacing } from '../fields/spacing';

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