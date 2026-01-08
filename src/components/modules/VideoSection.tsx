'use client';

import { useState } from 'react';
import { Image } from 'next-sanity/image';
import type { VideoSectionFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
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

// Helper to extract video embed URL
function getEmbedUrl(url: string): string {
  // YouTube
  const youtubeMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1`;
  }

  // Vimeo
  const vimeoMatch = url.match(/(?:vimeo\.com\/)(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
  }

  // Direct video URL - return as is
  return url;
}

// Helper to check if URL is embeddable (YouTube/Vimeo)
function isEmbeddableUrl(url: string): boolean {
  return /youtube\.com|youtu\.be|vimeo\.com/.test(url);
}

export default function VideoSection({ section }: { section: VideoSectionFragmentType }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoUrl = section?.videoUrl;
  
  // Try to get video file URL from dereferenced asset, fallback to building from ref
  const videoFileUrl = 
    section?.videoFile?.asset?.url || 
    (section?.videoFile?.asset?._ref ? buildFileUrl(section.videoFile.asset._ref) : null);

  // Determine which video source to use
  const videoSrc = videoFileUrl || videoUrl;

  if (!videoSrc) return null;

  const handlePlay = () => {
    setIsPlaying(true);
  };

  // Get cover image URL
  const getCoverImageUrl = () => {
    if (!section?.coverImage) return null;
    
    const builtUrl = urlForImage(section.coverImage)?.width(1920).height(1080).url();
    if (builtUrl) return builtUrl;
    
    if (section.coverImage.asset?.url) return section.coverImage.asset.url;
    
    return null;
  };

  const coverImageUrl = getCoverImageUrl();

  return (
    <div className="relative aspect-video rounded-base overflow-hidden bg-dark">
        {!isPlaying && coverImageUrl ? (
          // Show cover image with play button
          <button
            onClick={handlePlay}
            className="absolute inset-0 w-full h-full group cursor-pointer"
            aria-label="Play video"
          >
            <Image
              src={coverImageUrl}
              alt={section.coverImage?.alt || 'Video cover'}
              fill
              className="object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            {/* Play button */}
            <div className="w-20 h-20 absolute inset-0 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all group-hover:scale-110">
              <svg width="54" height="58" viewBox="0 0 54 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M52.286 27.1873C53.6745 27.9456 53.6745 29.9396 52.286 30.6979L2.95863 57.6377C1.62586 58.3655 -2.77385e-06 57.401 -2.70747e-06 55.8824L-3.52324e-07 2.00282C-2.85944e-07 0.484236 1.62586 -0.480344 2.95863 0.247541L52.286 27.1873Z" fill="white"/>
              </svg>
            </div>
          </button>
        ) : (
          // Show video player
          <>
            {videoFileUrl ? (
              // Native video player (uploaded file)
              <video
                className="absolute inset-0 w-full h-full object-cover"
                controls
                autoPlay={isPlaying}
                playsInline
                preload="metadata"
              >
                <source src={videoFileUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : videoUrl && isEmbeddableUrl(videoUrl) ? (
              // Embedded video (YouTube/Vimeo)
              <iframe
                src={isPlaying || !coverImageUrl ? getEmbedUrl(videoUrl) : undefined}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Video player"
              />
            ) : videoUrl ? (
              // Direct URL video
              <video
                className="absolute inset-0 w-full h-full object-cover"
                controls
                autoPlay={isPlaying}
                playsInline
                preload="metadata"
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : null}
          </>
        )}
    </div>
  );
}