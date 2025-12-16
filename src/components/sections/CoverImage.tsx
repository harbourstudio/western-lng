import { Image } from 'next-sanity/image';
import { urlForImage } from '@/lib/sanity/client/utils';
import type { CoverImageFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';

export default function CoverImage({ section }: { section: CoverImageFragmentType }) {
  const minHeight = section?.minHeight;
  const maxHeight = section?.maxHeight;

  const objectPosition = section?.image?.hotspot
    ? `${section.image.hotspot.x * 100}% ${section.image.hotspot.y * 100}%`
    : 'center';

  // Get image URL - try urlForImage first, fallback to direct asset URL
  const getImageUrl = () => {
    if (!section?.image) return null;
    
    // Try urlForImage builder
    const builtUrl = urlForImage(section.image)?.width(1920).url();
    if (builtUrl) return builtUrl;
    
    // Fallback to direct asset URL if dereferenced
    if (section.image.asset?.url) return section.image.asset.url;
    
    return null;
  };

  const imageUrl = getImageUrl();

  if (!imageUrl) return null;

  return (
    <div className="relative w-full overflow-hidden aspect-32/9">
      <Image
        alt={section.image?.alt || ''}
        fill
        className="object-cover"
        style={{ objectPosition }}
        src={imageUrl}
      />
    </div>
  );
}