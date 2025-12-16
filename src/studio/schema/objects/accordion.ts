import { defineField, defineType } from 'sanity';
import { mediaType } from '../fields/mediaType';
import { orientation } from '../fields/orientation';
import { image } from '../fields/image';
import { video } from '../fields/video';
import { spacing } from '../fields/spacing';

export default defineType({
  name: 'accordion',
  type: 'object',
  title: 'Accordion',
  fields: [
    defineField({
      name: 'items',
      title: 'Accordion Items',
      type: 'array',
      of: [{ type: 'accordionItem' }],
      validation: (Rule) => Rule.min(1).error('Add at least one accordion item'),
    }),
    orientation,
    mediaType,
    defineField({
      ...image,
      hidden: ({ parent }) => parent?.mediaType !== 'image',
    }),
    defineField({
      ...video,
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'allowMultiple',
      title: 'Allow Multiple Open',
      type: 'boolean',
      initialValue: false,
      description: 'Allow multiple accordion items to be open at the same time',
    }),
    defineField({
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      description: 'Set the alignment of the media and accordion',
      options: {
        list: [
          { title: 'Top', value: 'items-start' },
          { title: 'Center', value: 'items-center' },
          { title: 'Bottom', value: 'items-end' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'items-start',
    }),
    spacing
  ],
  preview: {
    select: {
      items: 'items',
      image: 'image',
    },
    prepare({ items, image }) {
      const itemCount = items?.length || 0;
      return {
        title: 'Accordion',
        subtitle: `${itemCount} Accordion Item${itemCount !== 1 ? 's' : ''}`,
        media: image,
      };
    },
  },
});