import { defineField, defineType } from 'sanity';
import { heading } from '../fields/heading';
import { content } from '../fields/content';
import { image } from '../fields/image';


export default defineType({
  name: 'card',
  type: 'object',
  title: 'Card',
  fields: [
    image,
    defineField({
        name: 'imageType',
        title: 'Image Type',
        type: 'string',
        options: {
            list: [
                { title: 'Default', value: '' },
                { title: 'Logo', value: 'logo' },
            ],
        },
    }),
    defineField({
      ...heading,
      fields: heading.fields.filter((field) => field.name !== 'level' && field.name !== 'size' && field.name !== 'color' ),
    }),
    content,
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
      description: 'Optional link for the card',
    }),
  ],
  preview: {
    select: {
      headingContent: 'heading.content',
      image: 'image',
      linkType: 'link.type',
    },
    prepare({ image, headingContent, linkType }) {
      return {
        title: headingContent || 'Card',
        subtitle: linkType ? `Has link (${linkType})` : 'No link',
        media: image,
      };
    },
  },
});
