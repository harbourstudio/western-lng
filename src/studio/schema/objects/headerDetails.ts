import { defineField, defineType } from 'sanity';
import { heading } from '../fields/heading';
import { content } from '../fields/content';
import { spacing } from '../fields/spacing';
import { buttons } from '../fields/buttons';

export default defineType({
  name: 'headerDetails',
  title: 'Header with Details',
  type: 'object',
  fields: [
    defineField({
      name: 'details',
      title: 'Details',
      type: 'array',
      of: [{ type: 'detail' }],
    }),
    heading,
    content,
    buttons,
    spacing,
  ],
  preview: {
    select: {
      headingContent: 'heading.content',
      layout: 'layout',
      details : 'details'
    },
    prepare({ headingContent, details }) {
      const detailsCount = details?.length || 0;
      return {
        title: 'Section Header with Details',
        subtitle: `${headingContent} • ${detailsCount} detail${detailsCount !== 1 ? 's' : ''} `,
      }
    },
  },
});