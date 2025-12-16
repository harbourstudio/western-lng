import { defineField, defineType } from 'sanity';
import { content } from '../fields/content';

export default defineType({
  name: 'accordionItem',
  type: 'object',
  title: 'Accordion Item',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    content
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled Item',
      };
    },
  },
});