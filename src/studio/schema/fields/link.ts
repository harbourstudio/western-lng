import { Link } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { createRadioListLayout } from '@/utils/schema';

const allLinkableTypes = [{ type: 'post' }, { type: 'page' }, { type: 'blogPage' }];

export const link = defineType({
  name: 'link',
  type: 'object',
  icon: Link,
  fields: [
    defineField({
      name: 'type',
      type: 'string',
      options: createRadioListLayout(['internal', 'external']),
      initialValue: () => 'external',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in new tab',
      type: 'boolean',
      description: 'If checked, the link will open in a new tab.',
      initialValue: () => false,
    }),
    defineField({
      name: 'external',
      type: 'string',
      title: 'URL',
      hidden: ({ parent }) => parent?.type !== 'external',
    }),
    defineField({
      name: 'href',
      type: 'string',
      initialValue: () => '#',
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: 'internal',
      type: 'reference',
      options: {
        disableNew: true,
        filter: ({ document }) => {
          // Get the site reference from the parent document
          const siteRef = (document?.site as { _ref?: string })?._ref;
          if (siteRef) {
            return {
              filter: 'site._ref == $siteId',
              params: { siteId: siteRef },
            };
          }
          // Fallback: show all if no site is set
          return {};
        },
      },
      hidden: ({ parent }) => parent?.type !== 'internal',
      to: allLinkableTypes,
    }),
  ]
});
