import { useEffect, useState } from 'react';
import type { PortableTextBlock } from 'next-sanity';
import PortableText from '@/components/modules/PortableText';
import { Image } from 'next-sanity/image';
import { urlForImage } from '@/lib/sanity/client/utils';
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
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onOpenChange(false);
      setIsClosing(false);
    }, 300); // Set as animation duration
  };

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
        handleClose();
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
    <div id="modal-subscribe" className="fixed inset-0 z-50 flex items-center justify-center h-screen">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        aria-hidden="true"
        className={`fixed inset-0 bg-black/50 transition-opacity h-screen duration-400 animate-in ${
          isClosing ? 'opacity-0' : 'opacity-100 animate-in fade-in'
        }`}
      />

      {/* Modal Content */}
      <div className={`relative bg-white rounded-base shadow-xl max-w-5xl mx-5 w-full h-[75vh] max-h-[75vh] overflow-hidden flex flex-col lg:flex-row-reverse transition-all duration-400 ${
        isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100 animate-in fade-in zoom-in-95'
      }`}>
        
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 rounded-full text-white ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {image?.asset && (
          <div className="relative max-h-1/2 lg:max-h-none lg:basis-1/2 lg:aspect-auto">
            <div className="lg:hidden absolute w-full h-[60%] bottom-0 left-0 bg-linear-to-b from-transparent via-white/80 to-white z-10 pointer-events-none"></div>
            <figure className="h-full rounded-none m-0">
              <Image
                alt={image.alt || ''}
                width={800}
                height={600}
                src={urlForImage(image)?.width(800).height(600).url() as string}
                className="object-cover object-[50%_45%] w-full h-full"
              />
            </figure>
          </div>
        )} 

        <div className="min-h-1/2 lg:basis-1/2 flex flex-col justify-center px-7 py-8 lg:px-7 lg:py-10">
          {heading &&
            <h3>{heading}</h3>
          }
          {content &&
            <PortableText
              value={content as PortableTextBlock[]}
              className="max-w-lg mb-6"
            />
          }
          <div className="flex border border-gray-300 rounded-sm px-4 py-3">
            <form className="form-subscribe flex justify-between w-full gap-4">
              <input
                type="email"
                placeholder="Your email"
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

        
      </div>
    </div>
  );
}
