import { defineField } from 'sanity';

export const backgroundColor = defineField({
  name: 'backgroundColor',
  title: 'Background Color',
  type: 'string',
  options: {
    list: [
      { title: '', value: 'None' },
      { title: 'White', value: 'bg-white' },
      { title: 'Gray', value: 'bg-gray-100' },
      { title: 'Dark', value: 'bg-gray-900' },
      { title: 'Primary', value: 'bg-primary' },
      { title: 'Secondary', value: 'bg-secondary' },
    ],
  },
  initialValue: '',
})