import { defineField, defineType } from 'sanity';
import { heading } from '../fields/heading';
import { content } from '../fields/content';

// Use the global heading schema field, but don't use headingLevel 
const gridItemHeading = defineField({
  ...heading,
  fields: heading.fields.filter((field) => field.name !== 'level' && field.name !== 'size' ),
});

export default defineType({
  name: 'gridItem',
  type: 'object',
  title: 'Grid Item',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Select an icon for this grid item',
      options: {
        list: [
          { title: 'Clock', value: 'IconClock' },
          { title: 'Fish', value: 'IconFish' },
          { title: 'Gauge', value: 'IconGauge' },
          { title: 'Ship', value: 'IconShip' },
          { title: 'Whale', value: 'IconWhale' },
          { title: 'Hard Hat', value: 'IconHardHat' },
          { title: 'Tree', value: 'IconTree' },
          { title: 'Worker', value: 'IconWorker' },
        ],
      },
    }),
    gridItemHeading,
    content,
  ],
  preview: {
    select: {
      headingContent: 'heading.content',
      icon: 'icon',
    },
    prepare({ icon, headingContent }) {
      return {
        title: 'Grid Item',
        subtitle: `${headingContent ? headingContent : '' } • ${icon ? icon : ''}`,
      };
    },
  },
});