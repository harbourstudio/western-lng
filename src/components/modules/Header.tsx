import type { PortableTextBlock } from 'next-sanity';
import PortableText from '@/components/modules/PortableText';
import ButtonsGroup from '@/components/modules/ButtonsGroup';
import type { HeaderFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
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

export default function Header({ section }: { section: HeaderFragmentType }) {
  // Get heading level from reusable heading field
  const HeadingTag = getHeadingTag(section?.heading?.level);
  const headingContent = section?.heading?.content;
  
  const spacingTop = cleanString(section?.spacing?.top) || '';
  const spacingBottom = cleanString(section?.spacing?.bottom) || '';

  return (
    <>
      {section?.layout === 'split' ? (
        <div className={cn('flex gap-5 justify-between', spacingTop, spacingBottom)}>
          <div className="w-full lg:w-6/12 lg:pr-7">
            {headingContent && (
              <HeadingTag className="mb-0">
                {headingContent}
              </HeadingTag>
            )}
          </div>

          <div className="w-full lg:w-6/12 flex justify-end">
            {section?.content && (
              <PortableText 
                value={section.content as PortableTextBlock[]} 
                className="mt-4 font-semibold text-lg"
              />
            )}
            {section?.buttons && section.buttons.length > 0 && (
              <ButtonsGroup buttons={section.buttons} />
            )}
          </div>
        </div>
      ) : section?.layout === 'vertical-narrow' ? (
        <div className={cn('flex flex-wrap justify-between items-end', spacingTop, spacingBottom)}>
          <div className="w-full lg:w-8/12">
            {headingContent && (
              <HeadingTag className="mb-0">
                {headingContent}
              </HeadingTag>
            )}

            {section?.content && (
              <PortableText 
                value={section.content as PortableTextBlock[]} 
                className="font-semibold text-lg max-w-3xl mt-5"
              />
            )}
          </div>

          {section?.buttons && section.buttons.length > 0 && (
            <div className="w-full lg:w-4/12 flex justify-end">
              <ButtonsGroup buttons={section.buttons} />
            </div>
          )}
        </div>
      ) : (
        <div className={cn(spacingTop, spacingBottom)}>
          {headingContent && (
            <HeadingTag className="mb-0">
              {headingContent}
            </HeadingTag>
          )}
          {section?.content && (
            <PortableText 
              value={section.content as PortableTextBlock[]} 
              className="font-semibold text-lg max-w-3xl mt-5"
            />
          )}
          {section?.buttons && section.buttons.length > 0 && (
            <ButtonsGroup buttons={section.buttons} />
          )}
        </div>
      )}
    </>
  );
}