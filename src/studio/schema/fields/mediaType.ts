
import {defineField} from 'sanity'

export const mediaType = defineField({
    name: 'mediaType',
    title: 'Media Type',
    type: 'string',
    initialValue: 'image',
    options: {
        list: [
            { title: 'Image', value: 'image' },
            { title: 'Video', value: 'video' },
        ],
    },
})
