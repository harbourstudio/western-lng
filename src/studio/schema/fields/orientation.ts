import { defineField } from 'sanity';

export const orientation = defineField({
    name: 'orientation',
    title: 'Media and Content Orientation',
    type: 'string',
    initialValue: 'right',
    options: {
      list: [
        { title: 'Media on Left', value: 'left' },
        { title: 'Media on Right', value: 'right' },
      ],
      layout: 'radio',
      direction: 'horizontal',
    },
    description: 'Set the layout of Media and content on desktop screens. Media and content will stack vertically on mobile.',
})