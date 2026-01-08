import { defineType, defineField } from 'sanity';
import { content } from '../../fields/content';
import { image } from '../../fields/image';
import { video } from '../../fields/video';
import { backgroundColor } from '../../fields/backgroundColor';

export default defineType({
  name: 'heroFullscreen',
  type: 'object',
  title: 'Fullscreen Hero Banner',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    content,
    image,
    video,
    backgroundColor,
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
      headingContent: 'heading.content',
      image: 'image'
    },
    prepare({ headingContent, image }) {
      return {
        title: 'Fullscreen Hero Banner',
        subtitle: `${headingContent}`,
        media: image,
      };
    },
  },
});
