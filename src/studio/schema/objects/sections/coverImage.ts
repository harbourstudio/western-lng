import { defineField, defineType } from 'sanity';
import { image } from '../../fields/image';

export default defineType({
  name: 'coverImage',
  title: 'Cover Image',
  type: 'object',
  fields: [
    image,
    defineField({
      name: 'minHeight',
      title: 'Minimum Height',
      type: 'number',
      description: 'Minimum height in pixels',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'maxHeight',
      title: 'Maximum Height',
      type: 'number',
      description: 'Maximum height in pixels',
      validation: (Rule) => Rule.min(0),
    }),
  ],
  validation: (Rule) =>
    Rule.custom((fields) => {
      if (fields?.minHeight && fields?.maxHeight && fields.minHeight > fields.maxHeight) {
        return 'Minimum height cannot be greater than maximum height';
      }
      return true;
    }),
  preview: {
    select: {
      headingContent: 'heading.content',
      image: 'image',
    },
    prepare({ image }) {
      return {
        title: 'Cover Image',
        media:  image
      };
    },
  },

});