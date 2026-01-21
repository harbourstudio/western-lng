import { Image } from 'next-sanity/image';
import { urlForImage } from '@/lib/sanity/client/utils';
import { cn } from '@/lib/utils';
import type { CoverImageFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';

// Function to remove zero-width and invisible Unicode characters
function cleanString(str: string | undefined): string {
  if (!str) return '';
  return str
    .replace(/[\u200B-\u200D\uFEFF\u202A-\u202E]/g, '')
    .replace(/[\u061C\u180E\u2066-\u2069]/g, '')
    .trim();
}

export default function CoverImage({ section }: { section: CoverImageFragmentType }) {
  const spacingTop = cleanString(section?.spacing?.top) || '';
  const spacingBottom = cleanString(section?.spacing?.bottom) || '';
  
  const minHeight = section?.minHeight;
  const maxHeight = section?.maxHeight;

  const layout = section?.layout || '';

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
    <div className={cn(spacingTop, spacingBottom)}>
      <div className={`relative w-full overflow-hidden ${
        layout === 'contained' 
          ? 'aspect-20/9 rounded-base' 
          : 'aspect-32/9'
      }`}>
        <Image
          alt={section.image?.alt || ''}
          fill
          className="object-cover"
          style={{ objectPosition }}
          src={imageUrl}
        />
      </div>
    </div>
  );
}