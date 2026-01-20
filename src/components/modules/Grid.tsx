import type { PortableTextBlock } from 'next-sanity';
import Link from 'next/link';
import { Image } from 'next-sanity/image';
import { urlForImage } from '@/lib/sanity/client/utils';
import type { GridFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import PortableText from '@/components/modules/PortableText';
import { cn } from '@/lib/utils';
import IconClock from '@/components/icons/IconClock';
import IconFish from '@/components/icons/IconFish';
import IconGauge from '@/components/icons/IconGauge';
import IconShip from '@/components/icons/IconShip';
import IconWhale from '@/components/icons/IconWhale';
import IconHardHat from '@/components/icons/IconHardHat';
import IconTree from '@/components/icons/IconTree';
import IconWorker from '@/components/icons/IconWorker';
import IconErosion from '@/components/icons/IconErosion';
import IconPlant from '@/components/icons/IconPlant';
import IconHollyBerry from '@/components/icons/IconHollyBerry';

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

// Helper to resolve link href
function resolveLinkHref(link: {
  type?: string;
  external?: string;
  href?: string;
  internal?: { _type?: string; slug?: { current?: string } };
}): string {
  if (link.type === 'external') {
    return link.href || link.external || '#';
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

// Map icon names to icon components
const iconComponents: Record<string, React.ComponentType> = {
  IconClock,
  IconFish,
  IconGauge,
  IconShip,
  IconWhale,
  IconHardHat,
  IconTree,
  IconWorker,
  IconErosion,
  IconPlant,
  IconHollyBerry
};

export default function Grid({ section }: { section: GridFragmentType }) {
  const spacingTop = cleanString(section?.spacing?.top) || '';
  const spacingBottom = cleanString(section?.spacing?.bottom) || '';
  const textColor = cleanString(section?.textColor) || '';
  const headingColor = cleanString(section?.headingColor) || '';

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

  // Check if any items are card types to apply border styling to grid wrapper
  const hasCardItems = items.some((item: { _type?: string }) => item._type === 'card');

  // Track step number for stepItem types
  let stepNumber = 0;

  return (
    <div className={cn(spacingTop, spacingBottom)}>
      <div className={cn(
        'grid grid-cols-1 gap-y-6',
        tabletColClass,
        desktopColClass,
        hasCardItems && 'pt-4 border-t-1 border-solid',
        hasCardItems && borderClass
      )}>
        {items.map((item) => {
          // Increment step number for stepItem types
          if (item._type === 'stepItem') {
            stepNumber++;
          }
          // Get icon component for gridItem types
          const IconComponent = item._type === 'gridItem' && item.icon
            ? iconComponents[item.icon]
            : null;

          // Determine border styling based on item type
          const borderStyle = item._type === 'linkItem' ?
              'py-5 border-t mb-4 mr-5'
            : item._type === 'stepItem' ?
              'pr-7 pb-5 [&:not(:first-child)]:ml-7 [&:not(:last-child)]:border-r'
            : 'pr-5 pb-5 [&:not(:first-child)]:ml-5 [&:not(:last-child)]:border-r';

          // Handle linkItem with link wrapping
          if (item._type === 'linkItem') {
            const href = item.link ? resolveLinkHref(item.link) : null;
            const openInNewTab = item.link?.openInNewTab;

            const headingContent = item.heading && (
              <HeadingTag className={`mb-3 ${headingColor}`}>{item.heading}</HeadingTag>
            );

            return (
              <div
                key={item._key}
                className={cn('link-item', borderStyle, borderClass, textColor)}
              >
                {href ? (
                  <Link
                    href={href}
                    target={openInNewTab ? '_blank' : undefined}
                    rel={openInNewTab ? 'noopener noreferrer' : undefined}
                    className='link-item-header flex justify-between gap-5'
                  >
                    {headingContent}
                    <span className='shrink-0 text-primary' aria-hidden>
                      <svg width="25" height="28" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.4688 7.45312L9.28125 13.3594C8.92969 13.6758 8.40234 13.6758 8.08594 13.3242C7.76953 12.9727 7.76953 12.4453 8.12109 12.1289L12.7969 7.66406H0.84375C0.351562 7.66406 0 7.3125 0 6.82031C0 6.36328 0.351562 5.97656 0.84375 5.97656H12.7969L8.12109 1.54688C7.76953 1.23047 7.76953 0.667969 8.08594 0.351562C8.40234 0 8.96484 0 9.28125 0.316406L15.4688 6.22266C15.6445 6.39844 15.75 6.60938 15.75 6.82031C15.75 7.06641 15.6445 7.27734 15.4688 7.45312Z" fill="currentColor"/>
                      </svg>
                    </span>
                  </Link>
                ) : (
                  <div className='link-item-header flex justify-between gap-5'>
                    {headingContent}
                    <span className='shrink-0 text-primary' aria-hidden>
                      <svg width="25" height="28" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.4688 7.45312L9.28125 13.3594C8.92969 13.6758 8.40234 13.6758 8.08594 13.3242C7.76953 12.9727 7.76953 12.4453 8.12109 12.1289L12.7969 7.66406H0.84375C0.351562 7.66406 0 7.3125 0 6.82031C0 6.36328 0.351562 5.97656 0.84375 5.97656H12.7969L8.12109 1.54688C7.76953 1.23047 7.76953 0.667969 8.08594 0.351562C8.40234 0 8.96484 0 9.28125 0.316406L15.4688 6.22266C15.6445 6.39844 15.75 6.60938 15.75 6.82031C15.75 7.06641 15.6445 7.27734 15.4688 7.45312Z" fill="currentColor"/>
                      </svg>
                    </span>
                  </div>
                )}
                {item.content && (
                  <PortableText value={item.content as PortableTextBlock[]} className='text-inherit pr-5' />
                )}
              </div>
            );
          }

          // Handle stepItem with auto-generated step number
          if (item._type === 'stepItem') {
            return (
              <div
                key={item._key}
                className={cn('step-item flex flex-col', borderStyle, borderClass, textColor)}
              >
                <span className="text-4xl font-semibold text-primary">
                  {stepNumber}
                </span>
                {item?.heading?.content && (
                  <HeadingTag className={`mb-3 ${headingColor}`}>{item.heading.content}</HeadingTag>
                )}
                {item?.content && (
                  <PortableText value={item.content as PortableTextBlock[]} className='text-inherit'/>
                )}
              </div>
            );
          }

          // Handle gridItem and card types
          return (
            <div
              key={item._key}
              className={cn('grid-item flex flex-col', borderStyle, borderClass, textColor)}
            >
              {IconComponent && (
                <div className="mb-5 w-[1.75rem] h-[1.75rem] fill-primary">
                  <IconComponent />
                </div>
              )}
              {item.image?.asset && (
                <figure className='mb-5 rounded-base aspect-[3/2]'>
                  <Image
                    alt={item.image?.alt || ''}
                    width={600}
                    height={600}
                    src={urlForImage(item.image)?.width(1000).height(667).url() as string}
                  />
                </figure>
              )}
              {item?.heading?.content && (
                <HeadingTag className={`mb-3 ${headingColor}`}>{item.heading.content}</HeadingTag>
              )}
              {item?.content && (
                <PortableText value={item.content as PortableTextBlock[]} className='text-inherit'/>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}