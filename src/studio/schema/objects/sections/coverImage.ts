import { defineField, defineType } from 'sanity';
import { image } from '../../fields/image';
import { spacing } from '../fields/spacing';

export default defineType({
  name: 'coverImage',
  title: 'Cover Image',
  type: 'object',
  fields: [
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
          list: [
              { title: 'Full-Width', value: '' },
              { title: 'Contained', value: 'contained' },
          ],
      },
      initialValue: '',
    }),
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