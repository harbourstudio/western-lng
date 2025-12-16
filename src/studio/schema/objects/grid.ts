import { defineField, defineType } from 'sanity';
import { backgroundColor } from '../fields/backgroundColor';
import { textColor } from '../fields/textColor';
import { spacing } from '../fields/spacing';

export default defineType({
  name: 'grid',
  type: 'object',
  title: 'Grid',
  fields: [
    defineField({
      name: 'items',
      title: 'Grid Items',
      type: 'array',
      of: [{ type: 'gridItem' }],
      validation: (Rule) => Rule.min(1).error('Add at least one grid item'),
    }),
    defineField({
      name: 'borderColor',
      title: 'Border Color',
      type: 'string',
      options: {
        list: [
          { title: 'Dark', value: 'dark' },
          { title: 'Light', value: 'light' },
        ]
      },
      initialValue: 'dark'
    }),
    defineField({
      name: 'tabletColumns',
      title: 'Tablet Columns',
      type: 'number',
      description: 'Number of columns on tablet screens (md)',
      initialValue: 2,
      options: {
        list: [
          { title: '1 Column', value: 1 },
          { title: '2 Columns', value: 2 },
          { title: '3 Columns', value: 3 },
          { title: '4 Columns', value: 4 },
          { title: '5 Columns', value: 5 },
          { title: '6 Columns', value: 6 },
        ],
      },
    }),
    defineField({
      name: 'desktopColumns',
      title: 'Desktop Columns',
      type: 'number',
      description: 'Number of columns on desktop screens (lg)',
      initialValue: 3,
      options: {
        list: [
          { title: '1 Column', value: 1 },
          { title: '2 Columns', value: 2 },
          { title: '3 Columns', value: 3 },
          { title: '4 Columns', value: 4 },
          { title: '5 Columns', value: 5 },
          { title: '6 Columns', value: 6 },
        ],
      },
    }),
    spacing,
    backgroundColor,
    textColor
  ],
  preview: {
    select: {
      items: 'items',
      tabletColumns: 'tabletColumns',
      desktopColumns: 'desktopColumns',
    },
    prepare({ items, tabletColumns, desktopColumns }) {
      const itemCount = items?.length || 0;
      return {
        title: 'Grid',
        subtitle: `${itemCount} item${itemCount !== 1 ? 's' : ''} • ${tabletColumns || 2}/${desktopColumns || 3} cols`,
      };
    },
  },
});