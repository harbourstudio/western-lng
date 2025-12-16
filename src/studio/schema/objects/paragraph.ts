import { defineType } from 'sanity';

export default defineType({
  name: 'paragraph',
  title: 'Paragraph',
  type: 'object',
  fields: [
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Underline', value: 'underline' },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'text-left' },
          { title: 'Center', value: 'text-center' },
          { title: 'Right', value: 'text-right' },
          { title: 'Justify', value: 'text-justify' },
        ],
      },
      initialValue: 'text-left',
    },
    {
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          { title: 'Extra Small', value: 'text-xs' },
          { title: 'Small', value: 'text-sm' },
          { title: 'Base', value: 'text-base' },
          { title: 'Medium', value: 'text-md' },
          { title: 'Large', value: 'text-lg' },
          { title: 'Extra Large', value: 'text-xl' },
          { title: '2x Large', value: 'text-2xl' },
          { title: '3x Large', value: 'text-3xl' },
          { title: '4x Large', value: 'text-4xl' },
          { title: '5x Large', value: 'text-5xl' },
        ],
      },
      initialValue: 'text-base',
    },
    {
      name: 'color',
      title: 'Color',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: '' },
          { title: 'Primary', value: 'text-primary' },
          { title: 'Secondary', value: 'text-secondary' },
          { title: 'Muted', value: 'text-muted-foreground' },
        ],
      },
      initialValue: '',
    },
  ],
  preview: {
    select: {
      content: 'content',
    },
    prepare(selection) {
      const text = selection.content?.[0]?.children?.[0]?.text || 'Paragraph';
      return {
        title: text,
      };
    },
  },
});