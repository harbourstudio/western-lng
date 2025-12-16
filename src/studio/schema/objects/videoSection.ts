import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'videoSection',
  type: 'object',
  title: 'Video',
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
  preview: {
    select: {
      videoUrl: 'videoUrl',
      coverImage: 'coverImage',
    },
    prepare({ videoUrl, coverImage }) {
      return {
        title: 'Video',
        subtitle: videoUrl || 'Uploaded file',
        media: coverImage,
      };
    },
  },
});