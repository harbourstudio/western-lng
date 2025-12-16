import type { PortableTextBlock } from 'next-sanity';
import { Image } from 'next-sanity/image';
import Link from 'next/link';
import PortableText from '@/components/modules/PortableText';
import ButtonsGroup from '@/components/modules/ButtonsGroup';
import { urlForImage } from '@/lib/sanity/client/utils';
import type { MediaTextSectionFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

// Function to remove zero-width and invisible Unicode characters
function cleanString(str: string | undefined): string {
  if (!str) return '';
  return str
    .replace(/[\u200B-\u200D\uFEFF\u202A-\u202E]/g, '')
    .replace(/[\u061C\u180E\u2066-\u2069]/g, '')
    .trim();
}

// Helper to build Sanity file URL from asset reference
// Format: file-{id}-{extension} -> https://cdn.sanity.io/files/{projectId}/{dataset}/{id}.{extension}
function buildFileUrl(assetRef: string): string | null {
  if (!assetRef) return null;
  
  // Parse the reference: "file-a67b0bc0b086316f7e51addc54917983a2261309-mp4"
  const match = assetRef.match(/^file-([a-zA-Z0-9]+)-(\w+)$/);
  if (!match) return null;
  
  const [, id, extension] = match;
  
  // You may need to adjust these values based on your Sanity project
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${extension}`;
}

// Helper to get YouTube/Vimeo embed URL
function getEmbedUrl(url: string): string | null {
  const youtubeMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/
  );
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }

  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  return null;
}

// Helper to resolve link href
function resolveLinkHref(link: {
  type?: string;
  external?: string;
  internal?: { _type?: string; slug?: string };
}): string | null {
  if (!link?.type) return null;
  
  if (link.type === 'external') {
    return link.external || null;
  }
  if (link.type === 'internal' && link.internal?.slug) {
    const prefix = link.internal._type === 'post' ? '/blog' : '';
    return `${prefix}/${link.internal.slug}`;
  }
  return null;
}

export default function MediaText({ section }: { section: MediaTextSectionFragmentType }) {
  const spacingTop = cleanString(section?.spacing?.top) || '';
  const spacingBottom = cleanString(section?.spacing?.bottom) || '';
  const orientation = cleanString(section?.orientation) || '';
  const mediaType = section?.mediaType || 'image';

  const renderMedia = () => {
    if (mediaType === 'video') {
      const video = section?.video;
      
      // Try to get URL from dereferenced asset first, then build from _ref as fallback
      const videoFileUrl = 
        video?.videoFile?.asset?.url || 
        (video?.videoFile?.asset?._ref ? buildFileUrl(video.videoFile.asset._ref) : null);
      
      const coverImageUrl = video?.coverImage?.asset
        ? urlForImage(video.coverImage)?.width(1000).url()
        : undefined;

      // Priority 1: Direct video file upload
      if (videoFileUrl) {
        return (
          <video
            controls
            className="w-full aspect-video rounded-base object-cover [&::-webkit-media-controls-panel]:bg-transparent"
            poster={coverImageUrl}
            preload="metadata"
            style={{
              objectFit: 'cover',
            }}
          >
            <source src={videoFileUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      }

      // Priority 2: YouTube/Vimeo embed
      if (video?.videoUrl) {
        const embedUrl = getEmbedUrl(video.videoUrl);
        
        if (embedUrl) {
          return (
            <div className="relative aspect-video rounded-base overflow-hidden">
              <iframe
                src={embedUrl}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Video"
              />
            </div>
          );
        }

        // Priority 3: Direct URL (non-embed, like .mp4 URL)
        return (
          <video
            controls
            className="w-full rounded-base"
            poster={coverImageUrl}
            preload="metadata"
          >
            <source src={video.videoUrl} />
            Your browser does not support the video tag.
          </video>
        );
      }

      return null;
    }

    // Image media type
    return (
      <div className="relative">
        {section.image?.asset && (
          <figure
            className={cn(
              'rounded-base',
              section.image2?.asset && 'w-4/6 absolute bottom-0 right-0'
            )}
          >
            <Image
              alt={section.image?.alt || ''}
              width={1000}
              height={667}
              src={urlForImage(section.image)?.width(1000).height(667).url() as string}
            />
          </figure>
        )}
        {section.image2?.asset && (
          <figure className="pb-9">
            <Image
              alt={section.image2?.alt || ''}
              width={1000}
              height={667}
              className="max-w-5/6 rounded-base aspect-square"
              src={urlForImage(section.image2)?.width(1000).height(667).url() as string}
            />
          </figure>
        )}
      </div>
    );
  };

  const renderLinks = () => {
    if (!section?.links?.length) return null;

    return (
      <ul className="mt-5 pt-5 space-y-0">
        {section.links.map((item) => {
          const href = item?.link ? resolveLinkHref(item.link) : null;
          if (!href) return null;

          const openInNewTab = item.link?.openInNewTab;

          return (
            <li key={item._key} className="border-t border-dark">
              <Link
                href={href}
                target={openInNewTab ? '_blank' : undefined}
                rel={openInNewTab ? 'noopener noreferrer' : undefined}
                className="font-semibold w-full inline-flex justify-between items-center gap-5 py-4 text-dark"
              >
                {item.text || 'Learn more'}
                <ArrowRight />
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        spacingTop,
        spacingBottom,
        orientation === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'
      )}
    >
      <div className="lg:w-1/2 relative">
        {renderMedia()}
      </div>

      <div
        className={cn(
          'flex items-center w-full',
          orientation === 'right' ? 'lg:w-5/12 lg:mr-auto' : 'lg:w-1/2 lg:ml-8'
        )}
      >
        <div className="max-w-xl">
          {/* Heading & Content */}
          {section?.heading?.content && <h3>{section.heading.content}</h3>}
          {section?.content && (
            <PortableText value={section.content as PortableTextBlock[]} className="pb-5" />
          )}

          {/* Links */}
          {renderLinks()}

          {/* Buttons */}
          {section?.buttons && section.buttons.length > 0 && (
            <div className="gap-4 flex">
              <ButtonsGroup className="w-full md:w-auto" buttons={section.buttons} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}