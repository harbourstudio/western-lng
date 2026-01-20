import { useState, useCallback } from 'react';
import type { PortableTextBlock } from 'next-sanity';
import { Image } from 'next-sanity/image';
import type { AccordionFragmentType, AccordionItemFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import { urlForImage } from '@/lib/sanity/client/utils';
import { cn } from '@/lib/utils';
import PortableText from '@/components/modules/PortableText';

// Function to remove zero-width and invisible Unicode characters
function cleanString(str: string | undefined): string {
  if (!str) return '';
  return str
    .replace(/[\u200B-\u200D\uFEFF\u202A-\u202E]/g, '')
    .replace(/[\u061C\u180E\u2066-\u2069]/g, '')
    .trim();
}

// Helper to build Sanity file URL from asset reference
function buildFileUrl(assetRef: string): string | null {
  if (!assetRef) return null;
  
  const match = assetRef.match(/^file-([a-zA-Z0-9]+)-(\w+)$/);
  if (!match) return null;
  
  const [, id, extension] = match;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${extension}`;
}

// Helper to extract video embed URL
function getEmbedUrl(url: string): string | null {
  const youtubeMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1`;
  }

  const vimeoMatch = url.match(/(?:vimeo\.com\/)(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
  }

  return null;
}

// Helper to check if URL is embeddable (YouTube/Vimeo)
function isEmbeddableUrl(url: string): boolean {
  return /youtube\.com|youtu\.be|vimeo\.com/.test(url);
}

// Play button component
function PlayButton() {
  return (
    <div className="w-20 h-20 absolute inset-0 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all group-hover:scale-110">
      <svg
        width="54"
        height="58"
        viewBox="0 0 54 58"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M52.286 27.1873C53.6745 27.9456 53.6745 29.9396 52.286 30.6979L2.95863 57.6377C1.62586 58.3655 0 57.401 0 55.8824V2.00282C0 0.484236 1.62586 -0.480344 2.95863 0.247541L52.286 27.1873Z"
          fill="white"
        />
      </svg>
    </div>
  );
}

// Video Modal component
function VideoModal({ 
  isOpen, 
  onClose, 
  embedUrl,
  videoFileUrl,
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  embedUrl: string | null;
  videoFileUrl: string | null;
}) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl mx-4 aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
          aria-label="Close video"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        {embedUrl ? (
          <iframe
            src={embedUrl}
            className="w-full h-full rounded-base"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Video player"
          />
        ) : videoFileUrl ? (
          <video
            className="w-full h-full object-contain rounded-base bg-black"
            controls
            autoPlay
            playsInline
          >
            <source src={videoFileUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : null}
      </div>
    </div>
  );
}

interface AccordionItemProps {
  title: string;
  content: PortableTextBlock[];
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ title, content, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="accordion-item">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left border-solid border-t-1 border-secondary transition-colors hover:text-primary"
        aria-expanded={isOpen}
      >
        <h4 className="text-md">{title}</h4>
        <svg
          className={cn(
            'h-5 w-5 shrink-0 transition-transform duration-300',
            isOpen && 'rotate-180'
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={cn(
          'grid transition-all duration-300 ease-in-out',
          isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">
          <PortableText value={content} className="bg-white rounded-sm p-6" />
        </div>
      </div>
    </div>
  );
}

export default function Accordion({ section }: { section: AccordionFragmentType }) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const spacingTop = cleanString(section?.spacing?.top) || '';
  const spacingBottom = cleanString(section?.spacing?.bottom) || '';
  const orientation = cleanString(section?.orientation) || 'left';
  const alignment = cleanString(section?.alignment) || 'items-start';
  const mediaType = cleanString(section?.mediaType) || 'image';

  // Get video URLs using reusable video field structure
  const videoUrl = section?.video?.videoUrl;
  const videoFileUrl = section?.video?.videoFile?.asset?._ref
    ? buildFileUrl(section.video.videoFile.asset._ref)
    : null;

  const hasVideo = !!(videoUrl || videoFileUrl);
  const isEmbed = videoUrl && isEmbeddableUrl(videoUrl);
  const embedUrl = isEmbed ? getEmbedUrl(videoUrl) : null;

  // Cover image from video field or main image field
  const coverImageUrl = section?.video?.coverImage?.asset
    ? urlForImage(section.video.coverImage)?.width(800).height(600).url()
    : null;

  const imageUrl = section?.image?.asset
    ? urlForImage(section.image)?.width(800).height(600).url()
    : null;

  const allowMultiple = section?.allowMultiple ?? false;

  const toggleItem = useCallback(
    (key: string) => {
      setOpenItems((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(key)) {
          newSet.delete(key);
        } else {
          if (!allowMultiple) {
            newSet.clear();
          }
          newSet.add(key);
        }
        return newSet;
      });
    },
    [allowMultiple]
  );

  const handlePlay = () => {
    setIsModalOpen(true);
  };

  const renderMedia = () => {
    if (mediaType === 'video' && hasVideo) {
      // Use cover image from video field, or fall back to main image
      const posterImage = coverImageUrl || imageUrl;

      return (
        <div className="relative w-full aspect-video rounded-base overflow-hidden bg-dark">
          <button
            onClick={handlePlay}
            className="absolute inset-0 w-full h-full group cursor-pointer"
            aria-label="Play video"
          >
            {posterImage ? (
              <Image
                src={posterImage}
                alt={section.video?.coverImage?.alt || section.image?.alt || ''}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-700" />
            )}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <PlayButton />
          </button>
        </div>
      );
    }

    // Image
    if (mediaType === 'image' && imageUrl) {
      return (
        <figure className="rounded-base overflow-hidden aspect-square">
          <Image
            src={imageUrl}
            alt={section.image?.alt || ''}
            width={768}
            height={768}
          />
        </figure>
      );
    }

    return null;
  };

  const hasMedia = (mediaType === 'video' && hasVideo) || (mediaType === 'image' && imageUrl);

  return (
    <>
      <div className={cn(spacingTop, spacingBottom)}>
        <div
          className={cn(
            'flex flex-wrap lg:flex-nowrap gap-5',
            orientation === 'right' && 'lg:flex-row-reverse',
            alignment
          )}
        >
          {/* Media */}
          {hasMedia && (
            <div className="w-full lg:w-1/2">
              {renderMedia()}
            </div>
          )}

          {/* Content */}
          <div
            className={cn(
              'h-fit w-full flex flex-col',
              hasMedia && orientation === 'right' && 'lg:w-5/12 lg:mr-auto',
              hasMedia && orientation === 'left' && 'lg:max-w-lg lg:ml-8'
            )}
          >
            <div className="accordion-group">
              {section?.items?.map((item: AccordionItemFragmentType) => (
                <AccordionItem
                  key={item._key}
                  title={item.title || ''}
                  content={item.content as PortableTextBlock[]}
                  isOpen={openItems.has(item._key)}
                  onToggle={() => toggleItem(item._key)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {hasVideo && (
        <VideoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          embedUrl={embedUrl}
          videoFileUrl={videoFileUrl}
        />
      )}
    </>
  );
}