import { sanityFetch } from '@/lib/sanity/client/live';
import { settingsQuery } from '@/lib/sanity/queries/queries';
import { Image } from 'next-sanity/image';
import { urlForImage } from '@/lib/sanity/client/utils';
import type { PortableTextBlock } from 'next-sanity';
import PortableText from '@/components/modules/PortableText';

export default async function PreFooter() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  });

    // console.log('Settings:', JSON.stringify(settings, null, 2));
  // console.log('PreFooter:', settings?.preFooter);
  const { heading, content, image } = settings.preFooter;

  return (
    <section className="bg-[#02365D]">
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
            <div className="flex border-solid border-1 border-gray-300 rounded-sm px-5 py-4 mt-5">
              <form className='flex justify-between w-full'>
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