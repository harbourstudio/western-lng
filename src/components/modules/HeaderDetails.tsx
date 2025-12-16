import type { PortableTextBlock } from 'next-sanity';
import PortableText from '@/components/modules/PortableText';
import ButtonsGroup from '@/components/modules/ButtonsGroup';
import type { HeaderDetailsFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
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

export default function HeaderDetails({ section }: { section: HeaderDetailsFragmentType }) {
  const HeadingTag = getHeadingTag(section?.heading?.headingLevel);
  const details = section?.details || [];
  const spacingTop = cleanString(section?.spacing?.top) || '';
  const spacingBottom = cleanString(section?.spacing?.bottom) || '';

  return (
    <div className={cn('flex gap-5 justify-between', spacingTop, spacingBottom)}>
      <div className="w-full flex-1 lg:pr-9">
        {section?.heading?.content && (
          <HeadingTag className="mb-0">
            {section.heading.content}
          </HeadingTag>
        )}
        {/* Buttons */}
        {section?.buttons && section.buttons.length > 0 && (
          <ButtonsGroup className="w-full md:w-auto" buttons={section.buttons} />
        )}
      </div>

      <div className="w-full flex-1">
        {section?.content && (
          <PortableText 
            value={section.content as PortableTextBlock[]} 
            className="text-md font-semibold pb-5"
          />
        )}
        {details.length > 0 && (
          <div className="grid grid-cols-3 gap-7 pt-6">
            {details.map((detail) => (
              <div key={detail._key} className="detail pb-5">
                {detail?.heading && (
                  <h6 className="mb-3">{detail.heading}</h6>
                )}
                {detail?.content && (
                  <PortableText value={detail.content as PortableTextBlock[]} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}