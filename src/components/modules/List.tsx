import type { ListFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import PortableText from '@/components/modules/PortableText';

// Function to remove zero-width and invisible Unicode characters
function cleanString(str: string | undefined): string {
  if (!str) return '';
  return str
    .replace(/[\u200B-\u200D\uFEFF\u202A-\u202E]/g, '')
    .replace(/[\u061C\u180E\u2066-\u2069]/g, '')
    .trim();
}

export default function List({ section }: { section: ListFragmentType }) {
  const items = section?.items || [];
  const spacingTop = cleanString(section?.spacing?.top) || '';
  const spacingBottom = cleanString(section?.spacing?.bottom) || '';

  return (
    <ul className={`${spacingTop} ${spacingBottom}`}>
        {items.map((item) => (
          <li key={item._key} className="item py-5 border-solid border-base border-t-1 lg:flex lg:justify-between lg:gap-5">
            {item?.heading && (
              <h6 className="mb-0">{item.heading}</h6>
            )}
            {item?.content && (
              <PortableText value={item.content as PortableTextBlock[]} />
            )}
          </li>
        ))}
    </ul>
  );
}