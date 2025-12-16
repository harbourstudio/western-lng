import { defineField, defineType } from 'sanity';
import { heading } from '../fields/heading';
import { content } from '../fields/content';
import { buttons } from '../fields/buttons';
import { spacing } from '../fields/spacing';
import { orientation } from '../fields/orientation';
import { image } from '../fields/image';
import { video } from '../fields/video';

export default defineType({
  name: 'mediaText',
  type: 'object',
  title: 'Media & Text',
  fields: [
    heading,
    content,
    buttons,
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      description: 'Add links below the content',
      of: [
        {
          type: 'object',
          name: 'linkWithText',
          fields: [
            defineField({
              name: 'text',
              title: 'Link Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'link',
            }),
          ],
          preview: {
            select: {
              title: 'text',
              linkType: 'link.type',
            },
            prepare({ title, linkType }) {
              return {
                title: title || 'Untitled Link',
                subtitle: linkType === 'internal' ? 'Internal' : 'External',
              };
            },
          },
        },
      ],
    }),
    orientation,
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Dual Image', value: 'dual-image' },
          { title: 'Video', value: 'video' },
        ],
      },
      initialValue: 'image',
    }),
    defineField({
      ...image,
      hidden: ({ parent }) => parent?.mediaType !== 'image',
    }),
    defineField({
      name: 'image2',
      title: 'Second Image (Optional)',
      description: 'Creates an overlapping image layout',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
      hidden: ({ parent }) => parent?.mediaType !== 'dual-image',
    }),
    defineField({
      ...video,
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    }),
    spacing,
  ],
  preview: {
    select: {
      heading: 'heading.content',
      mediaType: 'mediaType',
      image: 'image',
    },
    prepare({ heading, mediaType, image }) {
      return {
        title: 'Media & Text',
        subtitle: `${heading} • Media: ${mediaType || 'undefined'}`,
        media: image,
      };
    },
  },
});