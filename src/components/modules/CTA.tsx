import type { CtaFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import type { PortableTextBlock } from 'next-sanity';
import PortableText from '@/components/modules/PortableText';
import { MailIcon } from 'lucide-react';

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
    const colorScheme = cleanString(section?.colorScheme) || '';

  return (
      <div className={`${spacingTop} ${spacingBottom} ${bgColor} flex flex-wrap justify-between gap-5 p-7 rounded-base overflow-hidden
      ${colorScheme == 'light' ? 'text-white' : 'text-dark' }
      `}>
        {section?.heading &&
          <div className='lg:w-4/12'>
            <h4 className={`${colorScheme == 'light' ? '!text-white' : '!text-dark' }`}>{section?.heading}</h4>
            {section?.content && (
              <PortableText
                value={section.content as PortableTextBlock[]}
                className="[&_*]:not-last:mb-5"
              />
            )}
          </div>
        }
        <div className='lg:w-7/12'>
            <div className={`flex border-solid border-1 rounded-sm py-4 px-4
              ${colorScheme == 'light' ? 'border-white' : 'border-dark' }`}>
              <form className='flex justify-between items-center w-full'>
                <MailIcon className='opacity-50 mx-4'/>
                <input
                  type="email"
                  placeholder="Please enter your email address"
                  className='grow border-0 px-0 py-4 placeholder:text-inherit placeholder:opacity-50 focus:outline-none focus:shadow-none focus:ring-offset-0 focus:ring-0'
                />
                <input type="submit" value={'Subscribe'} className={`grow-0 w-fit border-0 p-0 ml-5 font-medium ${colorScheme == 'light' ? 'text-white' : 'text-dark' }`}/>
              </form>
            </div>
        </div>
      </div>
  );
}
