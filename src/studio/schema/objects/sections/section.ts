import { defineType } from 'sanity';
import { spacing } from '../../fields/spacing';
import { backgroundColor } from '../../fields/backgroundColor';
import { textColor } from '../../fields/textColor';

// Recursively search for the first heading in nested components
function findFirstHeading(obj: unknown): string | null {
  if (!obj || typeof obj !== 'object') return null;

  // Check if this object has a heading field with content
  if ('heading' in obj && typeof obj.heading === 'object' && obj.heading !== null) {
    const heading = obj.heading as { content?: string };
    if (heading.content) {
      return heading.content;
    }
  }

  // Recursively search through all properties
  for (const value of Object.values(obj)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        const found = findFirstHeading(item);
        if (found) return found;
      }
    } else if (typeof value === 'object' && value !== null) {
      const found = findFirstHeading(value);
      if (found) return found;
    }
  }

  return null;
}

// Convert component type to readable name (e.g., 'mediaText' -> 'Media Text')
function formatComponentName(type: string): string {
  return type
    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
    .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
    .trim();
}

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
        { type: 'list' },
        { type: 'timeline' },
      ],
    },
    backgroundColor,
    textColor,
    {
      ...spacing,
      fields: spacing.fields?.map((field) => {
        if (field.name === 'top') {
          return { ...field, initialValue: 'pt-10' };
        }
        if (field.name === 'bottom') {
          return { ...field, initialValue: 'pt-9' };
        }
        return field;
      }),
    }
  ],
  preview: {
    select: {
      components: 'components',
    },
    prepare({ components }) {
      const headingText = findFirstHeading(components);

      if (headingText) {
        return {
          title: 'Section',
          subtitle: `${headingText}`,
        };
      }

      // Fallback to first component name
      const firstComponent = components?.[0];
      const componentType = firstComponent?._type;
      const componentName = componentType 
        ? formatComponentName(componentType) 
        : 'Empty Section';

      return {
        title: 'Section',
        subtitle: `${componentName}`,
      };
    },
  },
});