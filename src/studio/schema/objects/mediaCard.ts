import { defineField, defineType } from 'sanity';
import { mediaType } from '../fields/mediaType';
import { image } from '../fields/image';
import { video } from '../fields/video';
import { link } from '../fields/link';

export default defineType({
  name: 'mediaCard',
  type: 'object',
  title: 'Media Card',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    mediaType,
    defineField({
      ...image,
      hidden: ({ parent }) => parent?.mediaType !== 'image',
    }),
    defineField({
      ...link,
      title: 'Link',
      description: 'Optional link for the card',
      hidden: ({ parent }) => parent?.mediaType !== 'image',
    }),
    defineField({
      ...video,
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      mediaType: 'mediaType',
      image: 'image',
    },
    prepare({ heading, mediaType, image }) {
      return {
        title: 'Media Card',
        subtitle: `${heading} • Media: ${mediaType || 'undefined'}`,
        media: image,
      };
    },
  },
});