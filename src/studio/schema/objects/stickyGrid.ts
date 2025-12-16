import { defineField, defineType } from 'sanity';
import { content } from '../fields/content';
import { spacing } from '../fields/spacing';

export default defineType({
  name: 'stickyGrid',
  type: 'object',
  title: 'Sticky Card Grid',
  fields: [
    defineField({
      name: 'cards',
      type: 'array',
      of: [{ type: 'mediaCard' }],
    }),
    content,
    spacing
  ],
  preview: {
    select: {
      cards: 'cards',
      tabletColumns: 'tabletColumns',
      desktopColumns: 'desktopColumns',
    },
    prepare({ cards }) {
      const cardsCount = cards?.length || 0;
      return {
        title: 'Sticky Grid',
        subtitle: `${cardsCount} card${cardsCount !== 1 ? 's' : ''}`,
      };
    },
  },
});