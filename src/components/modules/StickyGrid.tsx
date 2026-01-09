import type { PortableTextBlock } from 'next-sanity';
import type { StickyGridFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import MediaCard from './MediaCard';
import PortableText from '@/components/modules/PortableText';

// Function to remove zero-width and invisible Unicode characters so that TW can match classes
function cleanString(str: string | undefined): string {
  if (!str) return '';
  return str
    .replace(/[\u200B-\u200D\uFEFF\u202A-\u202E]/g, '') // Zero-width characters
    .replace(/[\u061C\u180E\u2066-\u2069]/g, '') // Other invisible formatters
    .trim();
}

export default function StickyGrid( { section, }: { section: StickyGridFragmentType; }) {

  const spacingTop = cleanString(section?.spacing?.top) || '';
  const spacingBottom = cleanString(section?.spacing?.bottom) || '';

  return (
      <div className={`lg:flex gap-5 ${spacingBottom} ${spacingTop}`}>
        {section?.content && (
          <div className='w-full lg:w-1/3 lg:pr-7 '>
            <PortableText
              className="text-lg font-semibold max-w-lg lg:sticky lg:top-8"
              value={section.content as PortableTextBlock[]}
            />
          </div>
        )}
        {section?.cards?.length > 0  && 
          <div className='lg:w-2/3 grid grid-cols-2 gap-5'>
            {section?.cards?.map((card) => (
              <MediaCard key={card._key} card={card} />
            ))}
          </div>
        }
      </div>
  );
}