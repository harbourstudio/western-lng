import type { RowFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import Heading from '../modules/Heading';
import Paragraph from './Paragraph';

const componentMap = {
  heading: Heading,
  paragraph: Paragraph,
};

function cleanString(str: string | undefined): string {
  if (!str) return '';
  return str
    .replace(/[\u200B-\u200D\uFEFF\u202A-\u202E]/g, '')
    .replace(/[\u061C\u180E\u2066-\u2069]/g, '')
    .trim();
}

export default function Row({ section }: { section: RowFragmentType }) {
  const gap = cleanString(section?.spacing?.gap) || 'gap-5';

  const containerClass = `flex ${gap}`;

  return (
    <div className={containerClass}>
      {section?.components && section.components.length > 0 ? (
        section.components.map((component, index) => {
          const Component = componentMap[component._type];
          const key = component._key || `row-component-${index}`;
          return Component ? (
            <Component key={key} section={component} />
          ) : (
            <div key={key} className="text-red-500">
              Unknown component type: {component._type}
            </div>
          );
        })
      ) : (
        <p className="text-gray-500">No components added to row</p>
      )}
    </div>
  );
}