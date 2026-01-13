import { defineField, defineType } from 'sanity';
import { heading } from '../fields/heading';
import { content } from '../fields/content';
import { image } from '../fields/image';

export default defineType({
  name: 'timelineItem',
  type: 'object',
  title: 'Timeline Item',
  fields: [
    image,
    defineField({
      ...heading,
      fields: heading.fields.filter((field) => field.name !== 'level' && field.name !== 'size'),
    }),
    content,
  ],
  preview: {
    select: {
      headingContent: 'heading.content',
      image: 'image',
    },
    prepare({ image, headingContent }) {
      return {
        title: headingContent || 'Timeline Item',
        media: image,
      };
    },
  },
});
