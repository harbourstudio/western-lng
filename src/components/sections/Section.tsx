import Header from '../modules/Header';
import Accordion from '../modules/Accordion';
import Form from '../modules/Form';
import Gallery from '../modules/Gallery';
import Grid from '../modules/Grid';
import StickyGrid from '../modules/StickyGrid';
import LinkList from '../modules/LinkList';
import VideoSection from '../modules/VideoSection';
import MediaText from '../modules/MediaText';
import Divider from '../modules/Divider';
import CoverImage from './CoverImage';
import Table from '../modules/Table';
import FeaturedText from '../modules/FeaturedText';
import Cta from '../modules/CTA';
import PostList from '../modules/PostList';
import List from '../modules/List';
import Timeline from '../modules/Timeline';

type SectionProps = {
  section: {
    anchorId?: string;
    spacing?: {
      top?: string;
      bottom?: string;
    };
    backgroundColor?: string;
    textColor?: string;
    components?: Array<{
      _key: string;
      _type: keyof typeof componentMap;
      [key: string]: any;
    }>;
  };
};

const componentMap = {
  header: Header,
  accordion: Accordion,
  form: Form,
  gallery: Gallery,
  grid: Grid,
  videoSection: VideoSection,
  mediaText: MediaText,
  divider: Divider,
  coverImage: CoverImage,
  linkList: LinkList,
  stickyGrid: StickyGrid,
  table: Table,
  featuredText: FeaturedText,
  cta: Cta,
  postList: PostList,
  list: List,
  timeline: Timeline,
};

// Function to remove zero-width and invisible Unicode characters so that TW can match classes
function cleanString(str: string | undefined): string {
  if (!str) return '';
  return str
    .replace(/[\u200B-\u200D\uFEFF\u202A-\u202E]/g, '') // Zero-width characters
    .replace(/[\u061C\u180E\u2066-\u2069]/g, '') // Other invisible formatters
    .trim();
}

export default function Section({ section }: SectionProps) {
  const spacingTop = cleanString(section?.spacing?.top) || '';
  const spacingBottom = cleanString(section?.spacing?.bottom) || '';
  const bgColor = cleanString(section?.backgroundColor) || '';
  const textColor = cleanString(section?.textColor) || '';
  const anchorId = section?.anchorId;

  return (
    <section
      className={`${bgColor} ${textColor}`}
      {...(anchorId && { id: anchorId })}
    >
      <div className={`container mx-auto ${spacingTop} ${spacingBottom}`}>
        {section?.components && section.components.length > 0 ? (
          section.components.map((component, index) => {
            const ComponentType = componentMap[component._type] as React.ComponentType<any>;
            const key = component._key || `component-${index}`;

            // Debug rendering - ALWAYS SHOW for form type
            if (!ComponentType || component._type === 'form') {
              return (
                <div key={key} className="border-4 border-blue-600 p-6 my-4 bg-blue-50">
                  <h3 className="text-blue-900 font-bold text-xl mb-4">🐛 DEBUG: Form Component Analysis</h3>
                  <div className="bg-white p-4 rounded space-y-4 text-sm">
                    <div>
                      <p className="font-bold text-lg">Component _type: "{component._type}"</p>
                      <p className="text-gray-600">ComponentType found: {ComponentType ? 'YES ✓' : 'NO ✗'}</p>
                    </div>

                    <div>
                      <p className="font-bold">Available types in componentMap:</p>
                      <pre className="text-xs overflow-auto bg-gray-100 p-2 rounded">{JSON.stringify(Object.keys(componentMap), null, 2)}</pre>
                    </div>

                    <div>
                      <p className="font-bold">Has 'use client' directive:</p>
                      <p className="text-gray-600">Check Form.tsx line 1</p>
                    </div>

                    <div>
                      <p className="font-bold">Full Component data:</p>
                      <pre className="text-xs overflow-auto bg-gray-100 p-2 rounded max-h-60">{JSON.stringify(component, null, 2)}</pre>
                    </div>
                  </div>

                  {ComponentType && (
                    <div className="mt-4 p-4 bg-green-100 border-2 border-green-600 rounded">
                      <p className="font-bold text-green-900 mb-2">Attempting to render Form component below:</p>
                      <ComponentType section={component} />
                    </div>
                  )}
                </div>
              );
            }

            return <ComponentType key={key} section={component} />;
          })
        ) : (
          <p className="text-gray-500">No components added</p>
        )}
      </div>
    </section>
  );
}