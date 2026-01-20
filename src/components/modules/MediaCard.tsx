'use client';

import { useState } from 'react';
import type { PortableTextBlock } from 'next-sanity';
import { Image } from 'next-sanity/image';
import Link from 'next/link';
import type { MediaCardFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import { urlForImage } from '@/lib/sanity/client/utils';
import PortableText from './PortableText';

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
    const prefix = link.internal._type === 'post' ? '/news' : '';
    return `${prefix}/${link.internal.slug}`;
  }
  return null;
}

// Play button SVG component
function PlayButton() {
  return (
    <div className="w-[3rem] h-[3rem] flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform group-hover:scale-110">
      <svg width="36" height="43" viewBox="0 0 36 43" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.25 3.46875C4.78125 3.1875 4.21875 3.1875 3.75 3.375C3.28125 3.65625 2.90625 4.21875 2.90625 4.6875V37.6875C2.90625 38.25 3.28125 38.8125 3.75 39C4.21875 39.2812 4.78125 39.2812 5.25 39L32.25 22.5C32.7188 22.2188 33 21.75 33 21.1875C33 20.7188 32.7188 20.25 32.25 19.9688L5.25 3.46875ZM2.25 0.84375C3.65625 0 5.4375 0 6.84375 0.84375L33.8438 17.3438C35.1562 18.1875 36 19.6875 36 21.1875C36 22.7812 35.1562 24.2812 33.8438 25.0312L6.84375 41.5312C5.4375 42.4688 3.65625 42.4688 2.25 41.625C0.84375 40.875 0 39.375 0 37.6875V4.6875C0 3.09375 0.84375 1.59375 2.25 0.84375Z" fill="white"/>
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

export default function MediaCard({ card }: { card: MediaCardFragmentType }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { heading, content, mediaType, image, video, link } = card;

  // Get video URLs
  const videoFileUrl = video?.videoFile?.asset?.url || 
    (video?.videoFile?.asset?._ref ? buildFileUrl(video.videoFile.asset._ref) : null);
  const videoUrl = video?.videoUrl;
  const embedUrl = videoUrl && isEmbeddableUrl(videoUrl) ? getEmbedUrl(videoUrl) : null;

  const coverImageUrl = video?.coverImage?.asset
    ? urlForImage(video.coverImage)?.width(800).height(450).url()
    : null;

  const hasVideo = videoFileUrl || videoUrl;

  const handleVideoClick = () => {
    if (hasVideo) {
      setIsModalOpen(true);
    }
  };

  const renderMedia = () => {
    if (mediaType === 'video' && video) {
      return (
        <button
          onClick={handleVideoClick}
          className="grow relative w-full group cursor-pointer"
          aria-label="Play video"
        >
          {coverImageUrl ? (
            <Image
              src={coverImageUrl}
              alt={video.coverImage?.alt || ''}
              width={800}
              height={450}
              className="w-full h-full object-cover rounded-t-base"
            />
          ) : (
            <div className="w-full h-full bg-gray-700 rounded-t-base" />
          )}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors rounded-t-base" />
          <PlayButton />
        </button>
      );
    }

    if (mediaType === 'image' && image?.asset) {
      const imageUrl = urlForImage(image)?.width(800).height(450).url();
      
      if (!imageUrl) return null;

      return (
        <figure className="grow">
          <Image
            src={imageUrl}
            alt={image?.alt || ''}
            width={800}
            height={450}
            className="w-full h-full object-cover rounded-t-base"
          />
        </figure>
      );
    }

    return null;
  };

  // Resolve link if present (only for image mediaType)
  const href = link ? resolveLinkHref(link) : null;
  const openInNewTab = link?.openInNewTab;

  const cardContent = (
    <>
      {renderMedia()}

      {(heading || content) && (
        <div className="p-5 mt-auto">
          {heading && <h4 className="mb-0 !text-white">{heading}</h4>}

          {content && (
            <div className="text-white mt-2">
              <PortableText value={content as PortableTextBlock[]} />
            </div>
          )}
        </div>
      )}
    </>
  );

  // Wrap in link if href exists (only for image mediaType)
  if (href && mediaType === 'image') {
    return (
      <Link
        href={href}
        target={openInNewTab ? '_blank' : undefined}
        rel={openInNewTab ? 'noopener noreferrer' : undefined}
        className="bg-secondary relative aspect-4/5 overflow-hidden flex flex-col rounded-base block hover:opacity-90 transition-opacity"
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <>
      <div className="bg-secondary relative aspect-4/5 overflow-hidden flex flex-col rounded-base">
        {cardContent}
      </div>

      {/* Modal for all video types */}
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