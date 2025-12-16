import { defineField } from 'sanity';

export const video = defineField({
  name: 'video',
  title: 'Video',
  type: 'object',
  fields: [
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube, Vimeo, or direct video URL',
    }),
    defineField({
      name: 'videoFile',
      title: 'Or Upload Video File',
      type: 'file',
      options: {
        accept: 'video/*',
      },
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
  ],
});