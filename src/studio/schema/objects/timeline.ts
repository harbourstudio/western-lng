import { defineField, defineType } from 'sanity';
import { content } from '../fields/content';
import { spacing } from '../fields/spacing';

export default defineType({
  name: 'timeline',
  type: 'object',
  title: 'Timeline',
  fields: [
    defineField({
      name: 'items',
      type: 'array',
      of: [{ type: 'gridItem' }],
    }),
    defineField({
        name: 'heading',
        title: 'Heading',
        type: 'string'
    }),
    defineField({
        name: 'borderColor',
        title: 'Border Color',
        type: 'string',
        options: {
            list: [
            { title: 'Dark', value: 'dark' },
            { title: 'Light', value: 'light' },
            { title: 'Primary', value: 'primary' },
            ],
        },
        initialValue: 'dark'
    }),
    spacing
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare({ items }) {
      const itemsCount = items?.length || 0;
      return {
        title: 'Timeline',
        subtitle: `${itemsCount} item${itemsCount !== 1 ? 's' : ''}`,
      };
    },
  },
});