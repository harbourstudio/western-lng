import { defineField, defineType } from 'sanity';
import { spacing } from '../fields/spacing';

export default defineType({
  name: 'postList',
  title: 'Post List',
  type: 'object',
  fields: [
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { value: 'columns', title: 'Columns' },
          { value: 'featured', title: 'Featured' },
        ]
      },
      initialValue: 'columns',
    }),
    // defineField({
    //   name: 'heading',
    //   title: 'Heading',
    //   type: 'string',
    //   initialValue: 'News & Stories'
    // }),
    defineField({
      name: 'categories',
      title: 'Filter by Categories',
      description: 'Only show posts from selected categories. Leave empty to show all posts.',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'category' }],
          options: {
            filter: ({ document }) => {
              const siteRef = (document?.site as { _ref?: string })?._ref;
              if (siteRef) {
                return {
                  filter: 'site._ref == $siteId',
                  params: { siteId: siteRef },
                };
              }
              return {};
            },
          },
        },
      ],
    }),
    defineField({
      name: 'numberOfPosts',
      title: 'Number of Posts to Show',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(20),
      initialValue: 3,
    }),
    spacing
  ],
  preview: {
    select: {
      numberOfPosts: 'numberOfPosts',
      layout: 'layout'
    },
    prepare({ numberOfPosts, layout }) {
      return {
        title: 'Post List',
        subtitle: `Number of Posts: ${numberOfPosts} • Layout: ${layout} `
      };
    },
  },
});
