import category from './documents/category';
import page from './documents/page';
import person from './documents/person';
import post from './documents/post';
import site from './documents/site';

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
import subnavigation from './objects/sections/subnavigation';

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
import card from './objects/card';
import stepItem from './objects/stepItem';

import linkList from './objects/linkList';
import linkItem from './objects/linkItem';

import list from './objects/list';
import timeline from './objects/timeline';
import timelineItem from './objects/timelineItem';

import coverImage from './objects/coverImage';
import videoSection from './objects/videoSection';
import gallery from './objects/gallery';
import postList from './objects/postList';
import featuredText from './objects/featuredText';
import header from './objects/header';
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
  site,

  // Sections
  cta,
  hero,
  mediaText,
  mediaCard,
  stickyGrid,
  divider,
  subnavigation,

  section,
  featuredText,
  header,
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
  card,
  stepItem,
  linkList,
  linkItem,
  list,
  detail,
  videoSection,
  coverImage,
  table,
  postList,
  timeline,
  timelineItem,

  ...seoTypes,
];
