import { HomeIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { defaultFieldGroups } from '../config/fieldGroups';
import pageSections from '../fields/pageSections';

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  groups: defaultFieldGroups,
  fields: [
    defineField({
      name: 'site',
      title: 'Site',
      type: 'reference',
      to: [{ type: 'site' }],
      description: 'Leave empty to share across all sites',
    }),
    defineField({
      name: 'name',
      hidden: true,
      readOnly: true,
      type: 'string',
      initialValue: 'Home Page',
      group: 'content',
    }),
    pageSections,
    defineField({
      name: 'headerType',
      title: 'Header Type',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Transparent', value: 'transparent' },
        ],
      },
      initialValue: 'default'
    }),
    defineField({
      name: 'prefooterType',
      title: 'Pre-Footer Type',
      type: 'string',
      options: {
        list: [
          { title: 'Subscribe Form', value: 'subscribe' },
          { title: 'Contact Information', value: 'Contact' },
        ],
      },
      initialValue: 'subscribe'
    }),
    defineField({
      title: 'SEO & Metadata',
      name: 'seo',
      type: 'seoMetaFields',
      group: 'seo',
    }),
  ],
});
