import { Heading1 } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { heading } from '../fields/heading.ts';

export default defineType({
  name: 'heading',
  type: 'object',
  title: 'Heading',
  icon: Heading1,
  fields: [
    heading,
    defineField({
      name: 'maxWidth',
      title: 'Max Width',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: '' },
          { title: 'Extra Small (xs)', value: 'max-w-xs' },
          { title: 'Small (sm)', value: 'max-w-sm' },
          { title: 'Medium (md)', value: 'max-w-md' },
          { title: 'Large (lg)', value: 'max-w-lg' },
          { title: 'Extra Large (xl)', value: 'max-w-xl' },
          { title: '2XL', value: 'max-w-2xl' },
          { title: '3XL', value: 'max-w-3xl' },
          { title: '4XL', value: 'max-w-4xl' },
          { title: '5XL', value: 'max-w-5xl' },
          { title: 'Full', value: 'max-w-full' },
        ],
      },
      initialValue: '',
    }),
  ],
  preview: {
    select: {
      headingContent: 'heading.content',
      level: 'heading.level',
    },
    prepare({ headingContent, level }) {
      return {
        title: headingContent || 'Heading',
        subtitle: level?.toUpperCase() || 'H2',
      };
    },
  },
});