import { LayoutGrid } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { backgroundColor } from '../fields/backgroundColor';
import { textColor } from '../fields/textColor';
import { spacing } from '../fields/spacing';

export default defineType({
  name: 'linkList',
  type: 'object',
  title: 'Link List',
  fields: [
    defineField({
      name: 'items',
      title: 'Link Items',
      type: 'array',
      of: [{ type: 'linkItem' }],
      validation: (Rule) => Rule.min(1).error('Add at least one link item'),
    }),
    defineField({
      name: 'headingLevel',
      title: 'Heading Level',
      type: 'string',
      description: 'Heading level for all items',
      options: {
        list: [
          { title: 'H2', value: 'h2' },
          { title: 'H3', value: 'h3' },
          { title: 'H4', value: 'h4' },
          { title: 'H5', value: 'h5' },
          { title: 'H6', value: 'h6' },
        ],
      },
      initialValue: 'h3',
    }),
    defineField({
      name: 'borderColor',
      title: 'Border Color',
      type: 'string',
      options: {
        list: [
          { title: 'Dark', value: 'dark' },
          { title: 'Light', value: 'light' },
        ],
      },
      initialValue: 'dark',
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
        ],
      },
    }),
    spacing,
    backgroundColor,
    textColor,
  ],
  preview: {
    select: {
      items: 'items',
      headingLevel: 'headingLevel',
      tabletColumns: 'tabletColumns',
      desktopColumns: 'desktopColumns',
    },
    prepare({ items, headingLevel, tabletColumns, desktopColumns }) {
      const itemCount = items?.length || 0;
      return {
        title: 'Link List',
        subtitle: `${itemCount} item${itemCount !== 1 ? 's' : ''} • ${headingLevel || 'h3'} • ${tabletColumns || 2}/${desktopColumns || 3} cols`,
      };
    },
  },
});