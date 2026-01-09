import type { TimelineFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import type { PortableTextBlock } from 'next-sanity';
import PortableText from '@/components/modules/PortableText';
import { Image } from 'next-sanity/image';
import { urlForImage } from '@/lib/sanity/client/utils';

// Function to remove zero-width and invisible Unicode characters so that TW can match classes
function cleanString(str: string | undefined): string {
  if (!str) return '';
  return str
    .replace(/[\u200B-\u200D\uFEFF\u202A-\u202E]/g, '') // Zero-width characters
    .replace(/[\u061C\u180E\u2066-\u2069]/g, '') // Other invisible formatters
    .trim();
}

export default function Timeline( { section, }: { section: TimelineFragmentType; }) {

  const spacingTop = cleanString(section?.spacing?.top) || '';
  const spacingBottom = cleanString(section?.spacing?.bottom) || '';
  const heading = cleanString(section?.heading) || '';
  const borderColor = cleanString(section?.borderColor) || '';


  return (
      <div className={`lg:flex gap-5 ${spacingBottom} ${spacingTop}`}>
        {heading && (
          <div className='w-full lg:w-1/3 lg:pr-7 '>
            <h2 className='!text-inherit lg:sticky lg:top-8'>{heading}</h2>
          </div>
        )}
        
        {section?.items?.length > 0  && 
          <ul className='lg:w-2/3'>
            {section?.items.map((item) => {
          return (
            <li 
              key={item._key} 
              className={`timeline-item flex flex-col lg:flex-row gap-5 py-4 border-solid border-t-1 border-${borderColor}`}
            >
              {item.image?.asset && (
                <figure className='lg:max-w-[13.5rem] lg:aspect-square lg:rounded-sm'>
                  <Image
                    alt={item.image?.alt || ''}
                    width={600}
                    height={600}
                    src={urlForImage(item.image)?.width(1000).height(667).url() as string}
                    className=''
                  />
                </figure>
              )}
              <div className='grow'>
                {item?.heading?.content && (
                    <h4 className='!text-inherit'>{item.heading.content}</h4>
                )}
                {item?.content && (
                    <PortableText value={item.content as PortableTextBlock[]} />
                )}
              </div>
            </li>
          );
        })}
          </ul>
        }
      </div>
  );
}