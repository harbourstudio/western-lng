import { Square } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'detail',
  type: 'object',
  icon: Square,
  title: 'Detail',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Detail',
      };
    },
  },
});