import type { PortableTextBlock } from 'next-sanity';
import Link from 'next/link';
import type { LinkListFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import PortableText from '@/components/modules/PortableText';
import { cn } from '@/lib/utils';

// Function to remove zero-width and invisible Unicode characters
function cleanString(str: string | undefined): string {
  if (!str) return '';
  return str
    .replace(/[\u200B-\u200D\uFEFF\u202A-\u202E]/g, '')
    .replace(/[\u061C\u180E\u2066-\u2069]/g, '')
    .trim();
}

const validHeadingLevels = ['h2', 'h3', 'h4', 'h5', 'h6'] as const;
type HeadingLevel = (typeof validHeadingLevels)[number];

function getHeadingTag(level: string | undefined): HeadingLevel {
  const cleaned = cleanString(level);
  if (validHeadingLevels.includes(cleaned as HeadingLevel)) {
    return cleaned as HeadingLevel;
  }
  return 'h3';
}

// Helper to resolve link href
function resolveLinkHref(link: {
  type?: string;
  external?: string;
  internal?: { _type?: string; slug?: { current?: string } };
}): string {
  if (link.type === 'external') {
    return link.external || '#';
  }
  if (link.type === 'internal' && link.internal?.slug?.current) {
    const prefix = link.internal._type === 'post' ? '/news' : '';
    return `${prefix}/${link.internal.slug.current}`;
  }
  return '#';
}

// Map column numbers to Tailwind grid classes
const tabletColumnClasses: Record<number, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
};

const desktopColumnClasses: Record<number, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
};

export default function LinkList({ section }: { section: LinkListFragmentType }) {
  const spacingTop = cleanString(section?.spacing?.top) || '';
  const spacingBottom = cleanString(section?.spacing?.bottom) || '';
  const bgColor = cleanString(section?.backgroundColor) || '';
  const borderColor = cleanString(section?.borderColor) || '';

  const tabletCols = section?.tabletColumns || 2;
  const desktopCols = section?.desktopColumns || 3;
  const tabletColClass = tabletColumnClasses[tabletCols] || 'md:grid-cols-2';
  const desktopColClass = desktopColumnClasses[desktopCols] || 'lg:grid-cols-3';

  const borderClass = borderColor === 'dark' ? 'border-dark' : 'border-gray-200';

  // Heading level set at the list level, applies to all items
  const HeadingTag = getHeadingTag(section?.headingLevel);

  const items = section?.items || [];
  if (items.length === 0) return null;

  return (
    <div className={cn(bgColor, spacingTop, spacingBottom)}>
      <div className={cn('grid grid-cols-1 gap-5', tabletColClass, desktopColClass)}>
        {items.map((item) => {
          const href = item?.link ? resolveLinkHref(item.link) : null;
          const openInNewTab = item?.link?.openInNewTab;

          const headingContent = item?.heading && (
            <HeadingTag className="mb-3">{item.heading}</HeadingTag>
          );

          return (
            <div
              key={item._key}
              className={cn('grid-item flex flex-col py-5 border-t', borderClass)}
            >
              {href ? (
                <Link
                  href={href}
                  target={openInNewTab ? '_blank' : undefined}
                  rel={openInNewTab ? 'noopener noreferrer' : undefined}
                >
                  {headingContent}
                </Link>
              ) : (
                headingContent
              )}
              {item?.content && (
                <PortableText value={item.content as PortableTextBlock[]} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}