import { defineField } from 'sanity';

export const heading =  defineField({
    name: 'heading',
    type: 'object',
    fields: [
        defineField({
            name: 'content',
            type: 'string',
            title: 'Heading',
        }),
        defineField({
            name: 'level',
            title: 'Heading Level',
            type: 'string',
            options: {
                list: [
                    { title: 'H1', value: 'h1' },
                    { title: 'H2', value: 'h2' },
                    { title: 'H3', value: 'h3' },
                    { title: 'H4', value: 'h4' },
                    { title: 'H5', value: 'h5' },
                    { title: 'H6', value: 'h6' },
                ],
            },
            initialValue: 'h2',
        }),
        defineField({
            name: 'size',
            title: 'Font Size',
            type: 'string',
            options: {
                list: [
                    { title: 'X Small', value: 'text-xs' },
                    { title: 'Small', value: 'text-sm' },
                    { title: 'Medium', value: 'text-md' },
                    { title: 'Large', value: 'text-lg' },
                    { title: 'X Large', value: 'text-xl' },
                    { title: '2X Large', value: 'text-2xl' },
                    { title: '3X Large', value: 'text-3xl' },
                    { title: '4X Large', value: 'text-4xl' },
                ],
            },
        }),
        defineField({
            name: 'color',
            title: 'Color',
            type: 'string',
            options: {
                list: [
                    { title: 'Default', value: '' },
                    { title: 'White', value: 'text-white' },
                    { title: 'Base', value: 'text-base' },
                    { title: 'Dark', value: 'text-dark' },
                    { title: 'Primary', value: 'text-primary' },
                ],
            },
        })
    ],
})