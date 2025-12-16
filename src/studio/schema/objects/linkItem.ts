import { defineField, defineType } from 'sanity';
import { content } from '../fields/content';
import { link } from '../fields/link';

export default defineType({
  name: 'linkItem',
  type: 'object',
  title: 'Link Item',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    content,
    link,
  ],
  preview: {
    select: {
      heading: 'heading',
    },
    prepare({ heading }) {
      return {
        title: 'Link Item',
        subtitle: heading
      };
    },
  },
});