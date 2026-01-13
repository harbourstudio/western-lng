import Header from '../modules/Header';
import Accordion from '../modules/Accordion';
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
            return ComponentType ? (
              <ComponentType key={key} section={component} />
            ) : (
              <div key={key} className="text-red-500">
                Unknown component type: {component._type}
              </div>
            );
          })
        ) : (
          <p className="text-gray-500">No components added</p>
        )}
      </div>
    </section>
  );
}