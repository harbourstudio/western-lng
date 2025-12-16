import { defineField } from 'sanity';

export const buttons = defineField({
    name: 'buttons',
    type: 'array',
    of: [{ type: 'button' }],
    validation: (Rule) => Rule.min(1).max(3),
})