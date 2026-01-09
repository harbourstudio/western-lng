import category from './documents/category';
import page from './documents/page';
import person from './documents/person';
import post from './documents/post';
import blockContent from './objects/blockContent';
import button from './objects/button';
import link from './objects/link';
import menuItem from './objects/menuItem';
import mediaCard from './objects/mediaCard';
import stickyGrid from './objects/stickyGrid';
import cta from './objects/cta';
import divider from './objects/sections/divider';
import hero from './objects/sections/hero';
import mediaText from './objects/mediaText';
import postList from './objects/sections/postList';
import subscribe from './objects/sections/subscribe';

import seoTypes from './objects/seo';
import blogPage from './singletons/blogPage';
import homePage from './singletons/homePage';
import settings from './singletons/settings';

// Custom
import section from './objects/sections/section';

import heroFullscreen from './objects/sections/heroFullscreen';
import heroMinimal from './objects/sections/heroMinimal';

import accordion from './objects/accordion';
import accordionItem from './objects/accordionItem';

import grid from './objects/grid';
import gridItem from './objects/gridItem';

import linkList from './objects/linkList';
import linkItem from './objects/linkItem';

import list from './objects/list';
import timeline from './objects/timeline';

import coverImage from './objects/coverImage';
import videoSection from './objects/videoSection';
import gallery from './objects/gallery';

import featuredText from './objects/featuredText';
import header from './objects/header';
import headerDetails from './objects/headerDetails';
import table from './objects/table';

import detail from './objects/detail';

export const schemaTypes = [
  // Singletons
  settings,
  homePage,
  blogPage,

  // Documents
  page,
  post,
  person,
  category,

  // Sections
  cta,
  hero,
  mediaText,
  postList,
  mediaCard,
  stickyGrid,
  divider,
  subscribe,

  section,
  featuredText,
  header,
  headerDetails,
  heroFullscreen,
  heroMinimal,
  accordion,

  // Objects
  blockContent,
  link,
  button,
  menuItem,
  accordionItem,
  gallery,
  grid,
  gridItem,
  linkList,
  linkItem,
  list,
  detail,
  videoSection,
  coverImage,
  table,
  timeline,

  ...seoTypes,
];
