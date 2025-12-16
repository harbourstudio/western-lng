import { defineField, defineType } from 'sanity';
import { content } from '../fields/content';
import { image } from '../fields/image';
import { buttons } from '../fields/buttons';
import { spacing } from '../fields/spacing';

export default defineType({
  name: 'featuredText',
  type: 'object',
  title: 'Featured Text',
  fields: [
    content,
    image,
    buttons,
    spacing
  ],
  preview: {
    select: {
      image: 'image'
    },
    prepare({ image }) {
      return {
        title: 'Featured Text',
        media: image,
      };
    },
  },
});
