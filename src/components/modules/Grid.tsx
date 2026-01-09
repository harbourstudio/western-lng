import type { PortableTextBlock } from 'next-sanity';
import { Image } from 'next-sanity/image';
import { urlForImage } from '@/lib/sanity/client/utils';
import type { GridFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
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

const validHeadingLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
type HeadingLevel = (typeof validHeadingLevels)[number];

function getHeadingTag(level: string | undefined): HeadingLevel {
  const cleaned = cleanString(level);
  if (validHeadingLevels.includes(cleaned as HeadingLevel)) {
    return cleaned as HeadingLevel;
  }
  return 'h2';
}

// Map column numbers to Tailwind grid classes
const tabletColumnClasses: Record<number, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  5: 'md:grid-cols-5',
  6: 'md:grid-cols-6',
};

const desktopColumnClasses: Record<number, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-6',
};

export default function Grid({ section }: { section: GridFragmentType }) {
  const spacingTop = cleanString(section?.spacing?.top) || '';
  const spacingBottom = cleanString(section?.spacing?.bottom) || '';
  const bgColor = cleanString(section?.backgroundColor) || '';
  const borderColor = cleanString(section?.borderColor) || '';

  const tabletCols = section?.tabletColumns || 2;
  const desktopCols = section?.desktopColumns || 3;
  const tabletColClass = tabletColumnClasses[tabletCols] || 'md:grid-cols-2';
  const desktopColClass = desktopColumnClasses[desktopCols] || 'lg:grid-cols-3';

  const borderClass = borderColor === 'dark' ? 'border-dark' : borderColor === 'primary' ? 'border-primary' : 'border-gray-200';

  // Get the unified heading level for all grid items
  const HeadingTag = getHeadingTag(section?.level);

  const items = section?.items || [];
  if (items.length === 0) return null;

  return (
    <div className={cn(bgColor, spacingTop, spacingBottom)}>
      <div className={cn('grid grid-cols-1 gap-y-5', tabletColClass, desktopColClass)}>
        {items.map((item) => {
          return (
            <div 
              key={item._key} 
              className={cn(
                'grid-item flex flex-col pr-5 pb-5 [&:not(:first-child)]:ml-5 [&:not(:last-child)]:border-r',
                borderClass
              )}
            >
              {item.image?.asset && (
                <figure>
                  <Image
                    alt={item.image?.alt || ''}
                    width={600}
                    height={600}
                    src={urlForImage(item.image)?.width(1000).height(667).url() as string}
                  />
                </figure>
              )}
              {item?.heading?.content && (
                <HeadingTag className="mb-3">{item.heading.content}</HeadingTag>
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