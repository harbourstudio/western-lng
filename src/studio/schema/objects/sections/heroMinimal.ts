import { defineField, defineType } from 'sanity';
import { heading } from '../../fields/heading.ts';
import { content } from '../../fields/content';
import { image } from '../../fields/image';
import { spacing } from '../../fields/spacing';
import { backgroundColor } from '../../fields/backgroundColor';
export default defineType({
  name: 'heroMinimal',
  type: 'object',
  title: 'Hero - Minimal',
  fields: [
    {...heading, 
      fields: heading.fields?.map((field) => {
        if (field.name === 'size') {
          return { ...field, initialValue: 'text-4xl'}
        }
        return field;
      })
    },
    content,
    image,
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      initialValue: 'split',
      options: {
        list: [
          { title: 'Split (Heading left, content right)', value: 'split' },
          { title: 'Vertical (Stacked)', value: 'vertical' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    },
    {
      ...spacing,
      fields: spacing.fields?.map((field) => {
        if (field.name === 'top') {
          return { ...field, initialValue: 'pt-9' };
        }
        if (field.name === 'bottom') {
          return { ...field, initialValue: 'pb-8' };
        }
        return field;
      }),
    },
    { ...backgroundColor,
      initialValue: 'bg-secondary',
    }
  ],
  preview: {
    select: {
      headingContent: 'heading.content',
      layout: 'layout',
    },
    prepare({ headingContent, layout }) {
      return {
        title: `Hero - Minimal`,
        subtitle: `${headingContent} • Layout: ${layout || 'split'}`,
      };
    },
  },
});