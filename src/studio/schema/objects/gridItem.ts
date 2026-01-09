import { Square } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { heading } from '../fields/heading';
import { content } from '../fields/content';
import { image } from '../fields/image';

// Use the global heading schema field, but don't use headingLevel 
const gridItemHeading = defineField({
  ...heading,
  fields: heading.fields.filter((field) => field.name !== 'level' && field.name !== 'size' ),
});

export default defineType({
  name: 'gridItem',
  type: 'object',
  icon: Square,
  title: 'Grid Item',
  fields: [
    image,
    gridItemHeading,
    content,
  ],
  preview: {
    select: {
      headingContent: 'heading.content',
      image: 'image'
    },
    prepare({ image, headingContent }) {
      return {
        title: 'Grid Item',
        subtitle: headingContent,
        media: image
      };
    },
  },
});