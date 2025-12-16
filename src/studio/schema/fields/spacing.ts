import { defineField } from "sanity";

export const spacing = defineField({
    name: 'spacing',
    title: 'Spacing',
    type: 'object',
    fields: [
        defineField({
            name: 'top',
            title: 'Top Padding',
            type: 'string',
            options: {
                list: [
                    { title: 'None', value: '' },
                    { title: 'Spacing 1', value: 'pt-1' },
                    { title: 'Spacing 2', value: 'pt-2' },
                    { title: 'Spacing 3', value: 'pt-3' },
                    { title: 'Spacing 4', value: 'pt-4' },
                    { title: 'Spacing 5', value: 'pt-5' },
                    { title: 'Spacing 6', value: 'pt-6' },
                    { title: 'Spacing 7', value: 'pt-7' },
                    { title: 'Spacing 8', value: 'pt-8' },
                    { title: 'Spacing 9', value: 'pt-9' },
                    { title: 'Spacing 10', value: 'pt-10' },
                    { title: 'Spacing 11', value: 'pt-11' },
                    { title: 'Spacing 12', value: 'pt-12' },
                ],
            },
            initialValue: '',
        }),
        defineField({
            name: 'bottom',
            title: 'Bottom Padding',
            type: 'string',
            options: {
                list: [
                    { title: 'None', value: '' },
                    { title: 'Spacing 1', value: 'pb-1' },
                    { title: 'Spacing 2', value: 'pb-2' },
                    { title: 'Spacing 3', value: 'pb-3' },
                    { title: 'Spacing 4', value: 'pb-4' },
                    { title: 'Spacing 5', value: 'pb-5' },
                    { title: 'Spacing 6', value: 'pb-6' },
                    { title: 'Spacing 7', value: 'pb-7' },
                    { title: 'Spacing 8', value: 'pb-8' },
                    { title: 'Spacing 9', value: 'pb-9' },
                    { title: 'Spacing 10', value: 'pb-10' },
                    { title: 'Spacing 11', value: 'pb-11' },
                    { title: 'Spacing 12', value: 'pb-12' },
                ],
            },
            initialValue: '',
        }),
    ],
})