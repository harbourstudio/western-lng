import { defineField, defineType } from 'sanity';
import { image } from '../fields/image';
import { spacing } from '../fields/spacing';

export default defineType({
  name: 'coverImage',
  title: 'Cover Image',
  type: 'object',
  fields: [
    defineField({
      name: 'layout',
      title: 'Layout',
      description: 'Dictates if the image should span the full screen or be used within a section.',
      type: 'string',
      options: {
        list: [
          { title: 'Full Width', value: 'full-width' },
          { title: 'Contained', value: 'contained' },
        ]
      },
      initialValue: 'full-width'
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
    spacing,
  ],
  preview: {
    select: {
      image: 'image'
    },
    prepare({ image })  {
      return {
        title: 'Cover Image',
        media: image
      }
    }
  }
});