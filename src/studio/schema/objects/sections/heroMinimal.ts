import { defineField, defineType } from 'sanity';
import { heading } from '../../fields/heading.ts';
import { content } from '../../fields/content';
import { image } from '../../fields/image';
import { spacing } from '../../fields/spacing';
import { backgroundColor } from '../../fields/backgroundColor';
export default defineType({
  name: 'heroMinimal',
  type: 'object',
  title: 'Hero Minimal',
  fields: [
    heading,
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
    spacing,
    backgroundColor
  ],
  preview: {
    select: {
      headingContent: 'heading.content',
      layout: 'layout',
    },
    prepare({ headingContent, layout }) {
      return {
        title: `${headingContent}`,
        subtitle: `Hero (Minimal) • Layout: ${layout || 'split'}`,
      };
    },
  },
});