import { defineField } from 'sanity';

export const image = defineField({
    name: 'image',
    type: 'image',
    options: { hotspot: true },
    fields: [
        defineField({
            name: 'alt',
            type: 'string',
            title: 'Alternative text',
        }),
    ],
})