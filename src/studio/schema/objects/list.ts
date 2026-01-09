import { defineField, defineType } from 'sanity';
import { spacing } from '../fields/spacing';

export default defineType({
  name: 'list',
  type: 'object',
  title: 'List',
  fields: [
    defineField({
      name: 'items',
      title: 'List Items',
      type: 'array',
      of: [{ type: 'detail' }],
      validation: (Rule) => Rule.min(1).error('Add at least one list item'),
    }),
    spacing,
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare({ items }) {
      const itemCount = items?.length || 0;
      return {
        title: 'List',
        subtitle: `${itemCount} item${itemCount !== 1 ? 's' : ''} `,
      };
    },
  },
});