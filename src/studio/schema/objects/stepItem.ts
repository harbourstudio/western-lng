import { defineField, defineType } from 'sanity';
import { heading } from '../fields/heading';
import { content } from '../fields/content';

export default defineType({
  name: 'stepItem',
  type: 'object',
  title: 'Step Item',
  fields: [
    defineField({
      ...heading,
      fields: heading.fields.filter((field) => field.name !== 'level' && field.name !== 'size'),
    }),
    content,
  ],
  preview: {
    select: {
      headingContent: 'heading.content',
    },
    prepare({ headingContent }) {
      return {
        title: headingContent || 'Step Item',
      };
    },
  },
});
