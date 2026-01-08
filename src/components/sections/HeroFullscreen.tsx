'use client';

import { useState, useCallback } from 'react';
import type { HeroFullscreenFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import type { PortableTextBlock } from 'next-sanity';
import { Image } from 'next-sanity/image';
import PortableText from '@/components/modules/PortableText';
import { urlForImage } from '@/lib/sanity/client/utils';
import { cn } from '@/lib/utils';

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

// Helper to get YouTube/Vimeo embed URL
function getEmbedUrl(url: string): string | null {
  const youtubeMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/
  );
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1`;
  }

  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
  }

  return null;
}

// Helper to check if URL is embeddable (YouTube/Vimeo)
function isEmbeddableUrl(url: string): boolean {
  return /youtube\.com|youtu\.be|vimeo\.com/.test(url);
}

export default function HeroFullscreen({ section }: { section: HeroFullscreenFragmentType }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const bgColor = cleanString(section?.backgroundColor) || '';
  const gradientColor = cleanString(section?.gradientColor) || 'bg-secondary';

  // Get video URLs using reusable video field structure (videoUrl, videoFile)
  const videoUrl = section?.video?.videoUrl;
  const videoFileUrl = 
    section?.video?.videoFile?.asset?.url || 
    (section?.video?.videoFile?.asset?._ref ? buildFileUrl(section.video.videoFile.asset._ref) : null);

  const hasVideo = !!(videoUrl || videoFileUrl);
  const hasImage = !!section?.image?.asset;

  // Background video: prefer uploaded file, or use videoUrl if it's a direct video (not embed)
  const backgroundVideoSrc = videoFileUrl || (videoUrl && !isEmbeddableUrl(videoUrl) ? videoUrl : null);

  // Modal video: use videoUrl for embeds, or videoFileUrl for uploaded files
  const isEmbed = videoUrl && isEmbeddableUrl(videoUrl);
  const embedUrl = isEmbed ? getEmbedUrl(videoUrl) : null;
  const modalVideoSrc = videoFileUrl || videoUrl;

  // Gradient color mapping for the bottom overlay
  const gradientColorMap: Record<string, string> = {
    'bg-white': 'from-white via-white/80',
    'bg-dark': 'from-dark via-dark/80',
    'bg-primary': 'from-primary via-primary/80',
    'bg-secondary': 'from-secondary via-secondary/80',
  };
  const gradientClasses = gradientColorMap[gradientColor] || 'from-secondary via-secondary/80';

  const openModal = useCallback(() => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    document.body.style.overflow = '';
  }, []);

  // Handle escape key to close modal
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    },
    [closeModal]
  );

  return (
    <>
      <section className={cn('h-screen relative text-white', bgColor)}>
        {/* Background Media */}
        {(hasVideo || hasImage) && (
          <div
            className='absolute inset-0 z-0 before:block before:absolute before:content-[""] before:bg-linear-to-b before:from-black/20 before:via-19% before:to-transparent before:inset-0 before:z-[1]
            after:block after:absolute after:z-[1] after:content-[""] after:bg-black/20 after:inset-0'
          >
            {/* Background Video (uploaded file or direct URL) */}
            {backgroundVideoSrc ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={backgroundVideoSrc} type="video/mp4" />
              </video>
            ) : hasImage ? (
              /* Fallback to Image */
              <Image
                src={urlForImage(section.image)?.width(1920).height(1080).url() as string}
                alt={section?.image?.alt || ''}
                fill={true}
                className="object-cover"
                priority
              />
            ) : null}

            {/* Bottom Gradient Overlay */}
            <div 
              className={cn(
                'absolute w-full h-[60%] bottom-0 left-0 bg-linear-to-t via-40% to-transparent',
                gradientClasses
              )}
            />
          </div>
        )}

        {/* Content */}
        <div className="container mx-auto relative z-[1] pt-7 pb-8 h-full flex flex-col justify-between">
          {section?.heading && (
            <div className="lg:w-8/12">
              <h1 className="!text-white">{section.heading}</h1>
            </div>
          )}

          <div className="flex justify-between items-end gap-4 mt-auto">
            {section?.content && (
              <PortableText
                className="text-md font-medium lg:w-5/12"
                value={section.content as PortableTextBlock[]}
              />
            )}

            {hasVideo && (
              <button
                onClick={openModal}
                aria-label="Play video"
                className="transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent rounded-full"
              >
                <svg
                  width="75"
                  height="75"
                  viewBox="0 0 75 75"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.848485"
                    y="0.848485"
                    width="72.9697"
                    height="72.9697"
                    rx="36.4848"
                    stroke="white"
                    strokeWidth="1.69697"
                  />
                  <path
                    d="M48.3636 37.5454L30.5454 47.9393V27.1514L48.3636 37.5454Z"
                    fill="white"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isModalOpen && modalVideoSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          aria-label="Video player"
          tabIndex={-1}
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close video"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Video container */}
          <div
            className="relative w-full max-w-5xl mx-4 aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            {embedUrl ? (
              <iframe
                src={embedUrl}
                className="w-full h-full rounded-base"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Video player"
              />
            ) : (
              <video
                className="w-full h-full rounded-base bg-black"
                controls
                autoPlay
                playsInline
              >
                <source src={modalVideoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      )}
    </>
  );
}