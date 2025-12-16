import { Image } from 'next-sanity/image';
import type { GalleryFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import { urlForImage } from '@/lib/sanity/client/utils';


// Function to remove zero-width and invisible Unicode characters so that TW can match classes
function cleanString(str: string | undefined): string {
  if (!str) return '';
  return str
    .replace(/[\u200B-\u200D\uFEFF\u202A-\u202E]/g, '') // Zero-width characters
    .replace(/[\u061C\u180E\u2066-\u2069]/g, '') // Other invisible formatters
    .trim();
}

export default function Gallery({ section }: { section: GalleryFragmentType }) {
  
  const spacingTop = cleanString(section?.spacing?.top) || '';
  const spacingBottom = cleanString(section?.spacing?.bottom) || '';
  
  const images = section?.images || [];
  if (images.length < 4) return null;

  // Get images for each position (up to 8)
  const [img1, img2, img3, img4, img5, img6, img7, img8] = images;

  return (
    <div className={`${spacingTop} ${spacingBottom}`}>
      <div className="h-[33.375rem] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {/* Column 1 */}
        <div className="h-full flex flex-col gap-5 overflow-hidden">
          {img1?.asset && (
            <figure className="h-[45%] min-h-0 rounded-sm overflow-hidden">
              <Image
                src={urlForImage(img1)?.width(600).height(600).url() as string}
                alt={img1.alt || ''}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </figure>
          )}
          {img2?.asset && (
            <figure className="h-[55%] min-h-0 rounded-sm overflow-hidden">
              <Image
                src={urlForImage(img2)?.width(600).height(800).url() as string}
                alt={img2.alt || ''}
                width={600}
                height={800}
                className="w-full h-full object-cover"
              />
            </figure>
          )}
        </div>

        {/* Column 2 */}
        <div className="h-full flex flex-col gap-5 overflow-hidden">
          {img3?.asset && (
            <figure className="h-[60%] min-h-0 rounded-sm overflow-hidden">
              <Image
                src={urlForImage(img3)?.width(600).height(800).url() as string}
                alt={img3.alt || ''}
                width={600}
                height={800}
                className="w-full h-full object-cover"
              />
            </figure>
          )}
          {img4?.asset && (
            <figure className="h-[40%] min-h-0 rounded-sm overflow-hidden">
              <Image
                src={urlForImage(img4)?.width(600).height(600).url() as string}
                alt={img4.alt || ''}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </figure>
          )}
        </div>

        {/* Column 3 - Hidden on mobile */}
        <div className="hidden md:flex h-full flex-col gap-5 overflow-hidden">
          {img5?.asset && (
            <figure className="h-[45%] min-h-0 rounded-sm overflow-hidden">
              <Image
                src={urlForImage(img5)?.width(600).height(600).url() as string}
                alt={img5.alt || ''}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </figure>
          )}
          {img6?.asset && (
            <figure className="h-[55%] min-h-0 rounded-sm overflow-hidden">
              <Image
                src={urlForImage(img6)?.width(600).height(800).url() as string}
                alt={img6.alt || ''}
                width={600}
                height={800}
                className="w-full h-full object-cover"
              />
            </figure>
          )}
        </div>

        {/* Column 4 - Hidden on mobile and tablet */}
        <div className="hidden lg:flex h-full flex-col gap-5 overflow-hidden">
          {img7?.asset && (
            <figure className="h-[40%] min-h-0 rounded-sm overflow-hidden">
              <Image
                src={urlForImage(img7)?.width(800).height(600).url() as string}
                alt={img7.alt || ''}
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </figure>
          )}
          {img8?.asset && (
            <figure className="h-[60%] min-h-0 rounded-sm overflow-hidden">
              <Image
                src={urlForImage(img8)?.width(600).height(800).url() as string}
                alt={img8.alt || ''}
                width={600}
                height={800}
                className="w-full h-full object-cover"
              />
            </figure>
          )}
        </div>
      </div>
    </div>
  );
}