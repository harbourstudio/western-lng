import { defineType } from 'sanity';
import { spacing } from '../../fields/spacing';
import { backgroundColor } from '../../fields/backgroundColor';
import { textColor } from '../../fields/textColor';

export default defineType({
  name: 'section',
  title: 'Section',
  type: 'object',
  fields: [
    {
      name: 'components',
      title: 'Components',
      type: 'array',
      of: [
        { type: 'row' },
        { type: 'heading' },
        { type: 'paragraph' },
        { type: 'header' },
        { type: 'accordion' },
        { type: 'gallery' },
        { type: 'grid' },
        { type: 'stickyGrid' },
        { type: 'videoSection' },
        { type: 'mediaText' },
        { type: 'headerDetails' },
        { type: 'divider' },
        { type: 'coverImage' },
        { type: 'linkList' },
        { type: 'table' },
        { type: 'featuredText' },
        { type: 'cta' },
        { type: 'postList' },
      ],
    },
    backgroundColor,
    textColor,
    spacing,
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare() {
      return {
        title: 'Section',
      };
    },
  },
});