import { siteSanityFetch } from '@/lib/sanity/client/fetch';
import { settingsQuery } from '@/lib/sanity/queries/queries';
import { Image } from 'next-sanity/image';
import { urlForImage } from '@/lib/sanity/client/utils';
import type { PortableTextBlock } from 'next-sanity';
import PortableText from '@/components/modules/PortableText';
import type { SettingsQueryResult } from '@/sanity.types';
import { MailIcon } from 'lucide-react';

export default async function PreFooter() {
  const settings = await siteSanityFetch<SettingsQueryResult>({
    query: settingsQuery,
    tags: ['settings'],
  });

  // Return null if settings or preFooter is not configured
  if (!settings?.preFooter) {
    return null;
  }

  const { heading, content, image } = settings.preFooter;

  return (
    <section id="pre-footer" className="bg-tertiary">
      <div className="container mx-auto flex flex-col lg:flex-row">

        {/* Form Wrapper */}
        <div className="lg:w-1/2 flex flex-col justify-center py-10 pr-8">
          {heading && (
            <h3 className="text-white">{heading}</h3>
          )}
          {content && (
            <PortableText value={content as PortableTextBlock[]} className='text-white max-w-lg'/>
          )}
          <form className='form-subscribe flex justify-between items-center w-full border-solid border-1 border-gray-300 rounded-sm px-4 mt-5 max-w-3xl'>
            <MailIcon className='opacity-50 mx-4'/>
            <input
              type="email"
              placeholder="Please enter your email address"
              className='grow border-0 px-0 py-5 placeholder:text-inherit placeholder:opacity-50 focus:outline-none focus:shadow-none focus:ring-offset-0 focus:ring-0'
            />
            <input type="submit" value={'Subscribe'} className='text-white font-medium'/>
          </form>
        </div>

        {/* Image Wrapper */}
        {image?.asset && (
          <div className="lg:w-1/2 relative aspect-[5/4] lg:aspect-square overflow-y-clip">
            <figure className='h-full rounded-none !mb-0 absolute top-0 left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 w-screen lg:w-[50vw]'>
              <Image
                alt={image.alt || ''}
                width={800}
                height={600}
                src={urlForImage(image)?.width(800).height(600).url() as string}
              />
            </figure>
          </div>
        )}
      </div>
    </section>
  );
}
