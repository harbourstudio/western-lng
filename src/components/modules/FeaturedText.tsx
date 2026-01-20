import type { FeaturedTextFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import type { PortableTextBlock } from 'next-sanity';
import { Image } from 'next-sanity/image';
import PortableText from '@/components/modules/PortableText';
import { urlForImage } from '@/lib/sanity/client/utils';
import ButtonsGroup from '../modules/ButtonsGroup';
import { cn } from '@/lib/utils';

// Function to remove zero-width and invisible Unicode characters so that TW can match classes
function cleanString(str: string | undefined): string {
  if (!str) return '';
  return str
    .replace(/[\u200B-\u200D\uFEFF\u202A-\u202E]/g, '') // Zero-width characters
    .replace(/[\u061C\u180E\u2066-\u2069]/g, '') // Other invisible formatters
    .trim();
}

export default function FeaturedText({ section }: { section: FeaturedTextFragmentType }) {
    const spacingTop = cleanString(section?.spacing?.top) || '';
    const spacingBottom = cleanString(section?.spacing?.bottom) || '';

  return (
    <div className={cn('flex gap-5 justify-between', spacingTop, spacingBottom)}>
      {section.image?.asset && (
          <div className='w-full lg:w-3/12'>
              <Image
                  src={urlForImage(section.image)?.width(1000).height(667).url() as string}
                  alt={section?.image?.alt || ''}
                  width={100}
                  height={100}
                  className='w-[5.8125rem]'
              />
          </div>
      )}

      <div className='w-full lg:w-8/12'>
          <PortableText className="text-xl font-semibold" value={section.content as PortableTextBlock[]} />
          {section?.buttons && section.buttons.length > 0 && (
            <ButtonsGroup className="w-full md:w-auto mt-7" buttons={section.buttons} />
          )}
      </div>
    </div>
  );
}