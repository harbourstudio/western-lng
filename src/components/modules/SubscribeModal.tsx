import { useEffect } from 'react';
import type { PortableTextBlock } from 'next-sanity';
import { Image } from 'next-sanity/image';
import { urlForImage } from '@/lib/sanity/client/utils';
import PortableText from '@/components/modules/PortableText';
import { X } from 'lucide-react';

interface SubscribeModalData {
  heading?: string | null;
  content?: PortableTextBlock[] | null;
  image?: {
    asset?: { _ref?: string } | null;
    alt?: string | null;
  } | null;
}

interface SubscribeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: SubscribeModalData | null;
}

export default function SubscribeModal({ open, onOpenChange, data }: SubscribeModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, onOpenChange]);

  if (!data || !open) return null;

  const { heading, content, image } = data;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center h-screen">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 transition-opacity h-screen"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-base shadow-xl max-w-4xl w-full mx-4 max-h-[75vh] overflow-hidden animate-in fade-in zoom-in-95 duration-500">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-10 rounded-full lg:text-white ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col lg:flex-row max-h-[90vh]">
          <div className="lg:w-1/2 flex flex-col justify-center px-7 py-10">
            {heading && (
              <h3>
                {heading}
              </h3>
            )}

            {content && (
              <PortableText
                value={content as PortableTextBlock[]}
                className="max-w-lg mb-6"
              />
            )}

            <div className="flex border border-gray-300 rounded-sm px-5 py-4">
              <form className="flex justify-between w-full gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 outline-none"
                  required
                />
                <input
                  type="submit"
                  value="Subscribe"
                  className="font-medium cursor-pointer hover:opacity-80 transition-opacity"
                />
              </form>
            </div>
          </div>

          {image?.asset && (
            <div className="lg:w-1/2 relative aspect-video lg:aspect-auto">
              <figure className="h-full rounded-none m-0">
                <Image
                  alt={image.alt || ''}
                  width={800}
                  height={600}
                  src={urlForImage(image)?.width(800).height(600).url() as string}
                  className="object-cover w-full h-full"
                />
              </figure>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
