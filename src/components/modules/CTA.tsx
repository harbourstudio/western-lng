import type { CtaFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import type { PortableTextBlock } from 'next-sanity';
import PortableText from '@/components/modules/PortableText';

// Function to remove zero-width and invisible Unicode characters so that TW can match classes
function cleanString(str: string | undefined): string {
  if (!str) return '';
  return str
    .replace(/[\u200B-\u200D\uFEFF\u202A-\u202E]/g, '') // Zero-width characters
    .replace(/[\u061C\u180E\u2066-\u2069]/g, '') // Other invisible formatters
    .trim();
}

export default function Cta({ section }: { section: CtaFragmentType }) {
    const spacingTop = cleanString(section?.spacing?.top) || '';
    const spacingBottom = cleanString(section?.spacing?.bottom) || '';
    const bgColor = cleanString(section?.backgroundColor) || '';

  return (
      <div className={`${spacingTop} ${spacingBottom} ${bgColor} flex flex-wrap justify-between gap-5 p-7 rounded-base overflow-hidden` }>
        {section?.heading &&
          <div className='lg:w-4/12'>
            <h4>{section?.heading}</h4>
          </div>
        }
        <div className='lg:w-7/12'>
            <div className="flex border-solid border-1 border-dark rounded-sm px-5 py-4">
              <form className='flex justify-between w-full gap-5'>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className='grow placeholder:text-dark placeholder:opacity-50'
                />
                <input type="submit" value={'Subscribe'} className='text-dark font-medium'/>
              </form>
            </div>
        </div>
      </div>
  );
}
