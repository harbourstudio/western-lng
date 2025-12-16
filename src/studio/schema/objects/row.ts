import { defineType } from 'sanity';

export default defineType({
  name: 'row',
  title: 'Row',
  type: 'object',
  fields: [
    {
      name: 'spacing',
      title: 'Spacing',
      type: 'object',
      fields: [
        {
          name: 'gap',
          title: 'Gap Between Items',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: '' },
              { title: 'Gap 1', value: 'gap-1' },
              { title: 'Gap 2', value: 'gap-2' },
              { title: 'Gap 3', value: 'gap-3' },
              { title: 'Gap 4', value: 'gap-4' },
              { title: 'Gap 5', value: 'gap-5' },
              { title: 'Gap 6', value: 'gap-6' },
              { title: 'Gap 7', value: 'gap-7' },
              { title: 'Gap 8', value: 'gap-8' },
              { title: 'Gap 9', value: 'gap-9' },
              { title: 'Gap 10', value: 'gap-10' },
            ],
          },
          initialValue: 'gap-6',
        },
      ],
    },
    {
      name: 'components',
      title: 'Components',
      type: 'array',
      of: [
        { type: 'heading' },
        { type: 'paragraph' },
      ],
    },
  ],
  preview: {
    select: {
      layout: 'layout',
    },
    prepare(selection) {
      return {
        title: `Row`,
      };
    },
  },
});