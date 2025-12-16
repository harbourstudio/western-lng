import { defineField, defineType } from 'sanity';
import { image } from '../fields/image';

export default defineType({
  name: 'coverImage',
  title: 'Cover Image',
  type: 'object',
  fields: [
    defineField({
      ...image,
      name: 'image',
      title: 'Image',
    }),
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