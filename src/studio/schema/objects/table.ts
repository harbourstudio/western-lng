import { defineField, defineType } from 'sanity';
import { spacing } from '../fields/spacing';

export default defineType({
  name: 'table',
  type: 'object',
  title: 'Table',
  fields: [
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'array',
      description: 'Define the table columns with their headers',
      of: [
        {
          type: 'object',
          name: 'column',
          fields: [
            defineField({
              name: 'header',
              title: 'Header Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'header',
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).error('Add at least one column'),
    }),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      description: 'Add table rows. Each row should have cells matching the number of columns.',
      of: [
        {
          type: 'object',
          name: 'row',
          fields: [
            defineField({
              name: 'cells',
              title: 'Cells',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'cell',
                  fields: [
                    defineField({
                      name: 'value',
                      title: 'Cell Value',
                      type: 'text',
                      rows: 2,
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'value',
                    },
                    prepare({ title }) {
                      return {
                        title: title || 'Empty cell',
                      };
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {
              cells: 'cells',
            },
            prepare({ cells }) {
              const firstCell = cells?.[0]?.value || 'Empty row';
              const cellCount = cells?.length || 0;
              return {
                title: firstCell,
                subtitle: `${cellCount} cell${cellCount !== 1 ? 's' : ''}`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'caption',
      title: 'Table Caption',
      type: 'string',
      description: 'Optional caption displayed below the table',
    }),
    defineField({
      name: 'headerBackgroundColor',
      title: 'Header Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'bg-primary-wlng' },
          { title: 'Secondary', value: 'bg-secondary-wlng' },
          { title: 'Dark', value: 'bg-dark' },
          { title: 'Gray', value: 'bg-gray-700' },
        ],
      },
      initialValue: 'bg-secondary-wlng',
    }),
    spacing,
  ],
  preview: {
    select: {
      columns: 'columns',
      rows: 'rows',
      caption: 'caption',
    },
    prepare({ columns, rows, caption }) {
      const colCount = columns?.length || 0;
      const rowCount = rows?.length || 0;
      return {
        title: 'Table',
        subtitle: `${colCount} column${colCount !== 1 ? 's' : ''} × ${rowCount} row${rowCount !== 1 ? 's' : ''}`,
      };
    },
  },
});