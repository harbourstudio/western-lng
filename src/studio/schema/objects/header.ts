import { defineField, defineType } from 'sanity';
import { heading } from '../fields/heading';
import { buttons } from '../fields/buttons';
import { content } from '../fields/content';
import { spacing } from '../fields/spacing';

export default defineType({
  name: 'header',
  title: 'Section Header',
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
      initialValue: 'vertical-narrow',
      description: 'Set the content layout to that positions the heading and description.',
    }),
    heading,
    content,
    buttons,
    defineField({
      name: 'hasDetails',
      title: 'Display List of Details',
      type: 'boolean',
      initialValue: false,
      description: 'Display a list of details, each with a heading and content.'
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'heading',
              subtitle: 'content',
            },
          },
        },
      ],
      hidden: ({ parent }) => !parent?.hasDetails,
      validation: (Rule) =>
        Rule.custom((details, context) => {
          const hasDetails = (context.parent as { hasDetails?: boolean })?.hasDetails;
          if (hasDetails && (!details || details.length === 0)) {
            return 'At least one detail is required when "Display List of Details" is enabled';
          }
          return true;
        }),
    }),
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