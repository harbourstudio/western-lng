import { defineField, defineType } from 'sanity';
import { createRadioListLayout } from '@/utils/schema';

const allLinkableTypes = [{ type: 'post' }, { type: 'page' }];

export default defineType({
  name: 'subnavigation',
  type: 'object',
  title: 'Subnavigation',
  fields: [
    defineField({
      name: 'items',
      title: 'Navigation Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'type',
              title: 'Link Type',
              type: 'string',
              options: createRadioListLayout(['anchor', 'internal', 'external']),
              initialValue: 'anchor',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'anchor',
              title: 'Anchor (e.g., #section-1)',
              type: 'string',
              description: 'Anchor link within the same page. Include the # symbol.',
              hidden: ({ parent }) => parent?.type !== 'anchor',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as { type?: string };
                  if (parent?.type === 'anchor') {
                    if (!value) return 'Anchor is required';
                    if (!value.startsWith('#')) return 'Anchor must start with #';
                  }
                  return true;
                }),
            }),
            defineField({
              name: 'internal',
              title: 'Internal Link',
              type: 'reference',
              options: { disableNew: true },
              hidden: ({ parent }) => parent?.type !== 'internal',
              to: allLinkableTypes,
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as { type?: string };
                  if (parent?.type === 'internal' && !value) {
                    return 'Internal link is required';
                  }
                  return true;
                }),
            }),
            defineField({
              name: 'external',
              title: 'External URL',
              type: 'string',
              hidden: ({ parent }) => parent?.type !== 'external',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as { type?: string };
                  if (parent?.type === 'external' && !value) {
                    return 'External URL is required';
                  }
                  return true;
                }),
            }),
            defineField({
              name: 'openInNewTab',
              title: 'Open in new tab',
              type: 'boolean',
              description: 'If checked, the link will open in a new tab.',
              initialValue: false,
              hidden: ({ parent }) => parent?.type === 'anchor',
            }),
          ],
          preview: {
            select: {
              label: 'label',
              type: 'type',
              anchor: 'anchor',
              external: 'external',
              internal: 'internal.slug.current',
            },
            prepare({ label, type, anchor, external, internal }) {
              let subtitle = '';
              if (type === 'anchor') {
                subtitle = anchor || 'Anchor';
              } else if (type === 'external') {
                subtitle = external || 'External';
              } else if (type === 'internal') {
                subtitle = internal ? `/${internal}` : 'Internal';
              }
              return {
                title: label || 'Nav Item',
                subtitle,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).required().error('Add at least one navigation item'),
    }),
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare({ items }) {
      const itemCount = items?.length || 0;
      return {
        title: 'Subnavigation',
        subtitle: `${itemCount} item${itemCount !== 1 ? 's' : ''}`,
      };
    },
  },
});
