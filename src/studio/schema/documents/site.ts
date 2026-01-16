import { defineField, defineType } from 'sanity';
import { HomeIcon } from '@sanity/icons';

export default defineType({
  name: 'site',
  title: 'Sites',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Site Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: { source: 'name', maxLength: 96 },
    }),
    defineField({
      name: 'domains',
      title: 'Domains',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      description: 'Logo for this site',
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for accessibility',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'theme',
      title: 'Theme Colors',
      type: 'object',
      fields: [
        defineField({ name: 'primary', title: 'Primary Color', type: 'string' }),
        defineField({ name: 'secondary', title: 'Secondary Color', type: 'string' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'slug.current' },
  },
});
