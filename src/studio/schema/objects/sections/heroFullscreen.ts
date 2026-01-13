import { defineType, defineField } from 'sanity';
import { content } from '../../fields/content';
import { image } from '../../fields/image';
import { video } from '../../fields/video';
import { backgroundColor } from '../../fields/backgroundColor';

export default defineType({
  name: 'heroFullscreen',
  type: 'object',
  title: 'Hero - Fullscreen ',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    content,
    image,
    video,
    { ...backgroundColor,
      initialValue: 'bg-secondary',
    },
    defineField({
      name: 'gradientColor',
      title: 'Gradient Color',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'bg-white' },
          { title: 'Dark', value: 'bg-dark' },
          { title: 'Primary', value: 'bg-primary' },
          { title: 'Secondary', value: 'bg-secondary' },
        ],
      },
      initialValue: 'bg-secondary',
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      image: 'image'
    },
    prepare({ heading, image }) {
      return {
        title: 'Hero - Fullscreen',
        subtitle: `${heading}`,
        media: image,
      };
    },
  },
});
