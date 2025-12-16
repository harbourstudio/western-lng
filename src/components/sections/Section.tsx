import type { SectionFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import Row from '../modules/Row';
import Heading from '../modules/Heading';
import Paragraph from '../modules/Paragraph';
import Header from '../modules/Header';
import Accordion from '../modules/Accordion';
import Gallery from '../modules/Gallery';
import Grid from '../modules/Grid';
import StickyGrid from '../modules/StickyGrid';
import LinkList from '../modules/LinkList';
import VideoSection from '../modules/VideoSection';
import MediaText from '../modules/MediaText';
import HeaderDetails from '../modules/HeaderDetails';
import Divider from '../modules/Divider';
import CoverImage from './CoverImage';
import Table from '../modules/Table';
import FeaturedText from '../modules/FeaturedText';
import Cta from '../modules/CTA';
import PostList from '../modules/PostList';

const componentMap = {
  row: Row,
  heading: Heading,
  paragraph: Paragraph,
  header: Header,
  accordion: Accordion,
  gallery: Gallery,
  grid: Grid,
  videoSection: VideoSection,
  mediaText: MediaText,
  headerDetails: HeaderDetails,
  divider: Divider,
  coverImage: CoverImage,
  linkList: LinkList,
  stickyGrid: StickyGrid,
  table: Table,
  featuredText: FeaturedText,
  cta: Cta,
  postList: PostList,
};

// Function to remove zero-width and invisible Unicode characters so that TW can match classes
function cleanString(str: string | undefined): string {
  if (!str) return '';
  return str
    .replace(/[\u200B-\u200D\uFEFF\u202A-\u202E]/g, '') // Zero-width characters
    .replace(/[\u061C\u180E\u2066-\u2069]/g, '') // Other invisible formatters
    .trim();
}

export default function Section({
  section,
}: {
  section: SectionFragmentType;
}) {
  const spacingTop = cleanString(section?.spacing?.top) || '';
  const spacingBottom = cleanString(section?.spacing?.bottom) || '';
  const bgColor = cleanString(section?.backgroundColor) || '';
  const textColor = cleanString(section?.textColor) || '';

  return (
    <section className={`${bgColor} ${textColor}`}>
      <div className={`container mx-auto ${spacingTop} ${spacingBottom}`}>
        {section?.components && section.components.length > 0 ? (
          section.components.map((component, index) => {
              
            const Component = componentMap[component._type];
            const key = component._key || `component-${index}`;
            return Component ? (
              <Component key={key} section={component} />
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