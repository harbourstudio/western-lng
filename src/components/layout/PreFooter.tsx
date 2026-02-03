import { siteSanityFetch } from '@/lib/sanity/client/fetch';
import { settingsQuery } from '@/lib/sanity/queries/queries';
import { Image } from 'next-sanity/image';
import { urlForImage } from '@/lib/sanity/client/utils';
import type { PortableTextBlock } from 'next-sanity';
import PortableText from '@/components/modules/PortableText';
import type { SettingsQueryResult } from '@/sanity.types';

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
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 flex flex-col justify-center">
            <div className='pr-8'>
              {heading && (
              <h3 className="text-white">{heading}</h3>
            )}
            {content && (
              <PortableText value={content as PortableTextBlock[]} className='text-white max-w-lg'/>
            )}
            <div className="flex border-solid border-1 border-gray-300 rounded-sm px-4 py-5 mt-5">
              <form className='form-subscribe flex justify-between w-full'>
                <input
                  type="email"
                  placeholder="Enter your email address"
                />
                <input type="submit" value={'Subscribe'} className='text-white font-medium'/>
              </form>
            </div>
            </div>
          </div>
          <div className="lg:w-1/2 relative aspect-square">
            <figure className='h-full rounded-none !mb-0 absolute top-0 left-1/2 lg:left-0 w-screen lg:w-[50vw]'>
              {image?.asset && (
                <Image
                  alt={image.alt || ''}
                  width={800}
                  height={600}
                  src={urlForImage(image)?.width(800).height(600).url() as string}
                />
              )}
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
