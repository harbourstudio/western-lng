import { defineField, defineType } from 'sanity';
import { spacing } from '../fields/spacing';

export default defineType({
  name: 'gallery',
  type: 'object',
  title: 'Gallery',
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule) =>
        Rule.min(4).max(8).error('Gallery requires between 4 and 8 images'),
    }),
    spacing,
  ],
  preview: {
    select: {
      images: 'images',
      image0: 'images.0',
    },
    prepare({ images, image0 }) {
      const count = images?.length || 0;
      return {
        title: 'Gallery',
        subtitle: `${count} image${count !== 1 ? 's' : ''}`,
        media: image0,
      };
    },
  },
});