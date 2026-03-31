import { defineField } from 'sanity';

export const visibility = defineField({
    name: 'visibility',
    title: 'Section Visibility',
    type: 'string',
    initialValue: 'visible',
    options: {
      list: [
        { title: 'Visible', value: 'visible' },
        { title: 'Hidden', value: 'hidden' },
      ],
      layout: 'radio',
      direction: 'horizontal',
    },
    description: 'Allows you to hide the section without needing to delete it.',
})