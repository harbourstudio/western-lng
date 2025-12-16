import { ImageIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';
/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 *
 * Learn more: https://www.sanity.io/docs/block-content
 */
export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Extra Small', value: 'text-xs' },
        { title: 'Small', value: 'text-sm' },
        { title: 'Base', value: 'text-base' },
        { title: 'Medium', value: 'text-medium' },
        { title: 'Large', value: 'text-lg' },
        { title: 'XL', value: 'text-xl' },
        { title: ' 2XL', value: 'text-2xl' },
        { title: ' 3XL', value: 'text-3xl' },
        { title: ' 4XL', value: 'text-4xl' },
      ],
      marks: {
        decorators: [
          { title: 'Code', value: 'code' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Strike', value: 'strike-through' },
          { title: 'Strong', value: 'strong' },
          { title: 'Underline', value: 'underline' },
          {
            title: 'Sup',
            value: 'sup',
            icon: () => (
              <div>
                x<sup>2</sup>
              </div>
            ),
            component: ({ children }) => <sup>{children}</sup>,
          },
          {
            title: 'Sub',
            value: 'sub',
            icon: () => (
              <div>
                x<sub>2</sub>
              </div>
            ),
            component: ({ children }) => <sub>{children}</sub>,
          },
        ],
        annotations: [
          {
            name: 'customLink',
            type: 'object',
            title: 'Link',
            fields: [
              defineField({
                name: 'customLink',
                type: 'link',
              }),
            ],
          },
          {
            name: 'colorStyle',
            title: 'Color Style',
            type: 'object',
            fields: [
              {
                name: 'className',
                title: 'Color Style',
                type: 'string',
                options: {
                  list: [
                    { title: 'Black', value: 'text-black' },
                    { title: 'Primary', value: 'text-primary' },
                    { title: 'Secondary', value: 'text-secondary' },
                    { title: 'Accent', value: 'text-accent' },
                  ],
                },
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        },
      ],
    }),
  ],
});
