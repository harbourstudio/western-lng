import { defineField, defineType } from 'sanity';
import { spacing } from '../fields/spacing';

export default defineType({
  name: 'postList',
  title: 'Post List',
  type: 'object',
  fields: [
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
      heading: 'heading',
    },
    prepare(selection) {
      const { heading } = selection;
      return {
        title: 'Post List',
      };
    },
  },
});
