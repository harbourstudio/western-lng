import { Square } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { heading } from '../fields/heading';
import { content } from '../fields/content';

export default defineType({
  name: 'gridItem',
  type: 'object',
  icon: Square,
  title: 'Grid Item',
  fields: [
    heading,
    content,
  ],
  preview: {
    select: {
      headingContent: 'heading.content',
    },
    prepare({ headingContent }) {
      return {
        title: 'Grid Item',
        subtitle:  headingContent
      };
    },
  },
});