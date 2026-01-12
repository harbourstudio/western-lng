import { defineField } from 'sanity';

export const textColor = defineField({
    name: 'textColor',
    title: 'Text Color',
    type: 'string',
    options: {
      list: [
        { title: 'White', value: 'text-white' },
        { title: 'Base', value: 'text-base' },
        { title: 'Dark', value: 'text-dark' },
      ],
    },
    initialValue: '',
})