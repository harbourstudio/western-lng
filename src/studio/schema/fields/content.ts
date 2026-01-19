import { defineField } from "sanity";

export const content = defineField({
  name: 'content',
  type: 'blockContent',
  initialValue: [],
})