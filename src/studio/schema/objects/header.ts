import { defineField, defineType } from 'sanity';
import { heading } from '../fields/heading';
import { buttons } from '../fields/buttons';
import { content } from '../fields/content';
import { spacing } from '../fields/spacing';

export default defineType({
  name: 'header',
  title: 'Header',
  type: 'object',
  fields: [
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Vertical - Full Width', value: 'vertical-full' },
          { title: 'Vertical - Narrow Width', value: 'vertical-narrow' },
          { title: 'Split', value: 'split' }
        ]
      },
      initialValue: 'vertical',
      description: 'Set the content layout to that positions the heading and description. ',
    }),
    heading,
    content,
    buttons,
    spacing
  ],
  preview: {
    select: {
      headingContent: 'heading.content',
      layout: 'layout',
    },
    prepare: ({ headingContent, layout }) => ({
      title: 'Section Header',
      subtitle: `${headingContent} • Layout: ${layout || 'undefined'}`,
    }),
  },
});