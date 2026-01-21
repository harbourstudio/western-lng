import type { PortableTextBlock } from 'next-sanity';
import type { HeroMinimalFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import PortableText from '@/components/modules/PortableText';
import { cn } from '@/lib/utils';
import { Image } from 'next-sanity/image';
import { urlForImage } from '@/lib/sanity/client/utils';
import { textColor } from '@/studio/schema/fields/textColor';
// Function to remove zero-width and invisible Unicode characters
function cleanString(str: string | undefined): string {
  if (!str) return '';
  return str
    .replace(/[\u200B-\u200D\uFEFF\u202A-\u202E]/g, '')
    .replace(/[\u061C\u180E\u2066-\u2069]/g, '')
    .trim();
}

export default function HeroMinimal({ section }: { section: HeroMinimalFragmentType }) {
  const spacingTop = cleanString(section?.spacing?.top) || '';
  const spacingBottom = cleanString(section?.spacing?.bottom) || '';
  const bgColor = cleanString(section?.backgroundColor) || '';
  const layout = section?.layout || 'split';
  const isSplit = layout === 'split';

  // Determine text color based on background
  const isDarkBg = ['bg-primary', 'bg-secondary', 'bg-gray-900'].includes(bgColor);
  const textColorClass = isDarkBg ? 'text-white [&_h1,h2,h3,h4,h5,h6]:!text-white' : 'text-gray-900';

  const hasImage = !!section?.image?.asset;
  const imageUrl = hasImage
    ? urlForImage(section.image)?.width(1200).height(800).url()
    : null;


  return (
    <section className={`hero-minimal ${bgColor} ${textColorClass}`}>
      <div className={cn('container mx-auto', spacingTop, spacingBottom)}>
        {isSplit ? (
          // Split layout: heading left, content right
          <div className="flex flex-wrap justify-between items-start gap-5">
            <div className="lg:w-6/12">
              {section?.heading?.content && (
                <h1>
                  {section?.heading?.content}
                </h1>
              )}
            </div>
            <div className="lg:w-5/12 flex justify-end items-start">
              {section?.content && (
                <PortableText value={section.content as PortableTextBlock[]} className='max-w-sm' />
              )}
            </div>
          </div>
        ) : (
          // Vertical layout: stacked
          <div className="max-w-3xl">
            {section?.heading?.content && (
              <h1 className="text-4xl md:text-5xl tracking-tight mb-4">
                {section?.heading?.content}
              </h1>
            )}
            {section?.content && (
              <div className={cn('max-w-lg', isDarkBg ? 'text-white' : 'text-gray-600')}>
                <PortableText value={section.content as PortableTextBlock[]} />
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Image section */}
      {hasImage && imageUrl && (
        <figure className="aspect-[16/9] lg:aspect-[32/9] relative">
          <Image
            src={imageUrl}
            alt={section.image?.alt || ''}
            fill
            className="object-center"
            priority
          />
        </figure>
      )}
    </section>
  );
}