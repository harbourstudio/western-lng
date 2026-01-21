export const twitterFragment = /* groq */ `
  _type,
  site,
  creator,
  cardType,
  handle,
`;

export const imageFragment = /* groq */ `
  _type,
  crop,
  hotspot,
  asset,
`;

export const galleryFragment = /* groq */ `
  _type,
  _key,
  spacing,
  images[] {
    ${imageFragment}
    alt
  },
`;

// Video field fragment (for embedding inside other components like mediaText)
export const videoFieldFragment = /* groq */ `
  videoUrl,
  videoFile {
    asset-> {
      _id,
      url
    },
    "assetRef": asset._ref
  },
  coverImage {
    ${imageFragment}
    alt,
    asset-> {
      _id,
      url
    }
  },
`;

// Video section fragment (for standalone videoSection component)
export const videoSectionFragment = /* groq */ `
  _type,
  _key,
  videoUrl,
  videoFile {
    asset-> {
      _id,
      url
    },
    "assetRef": asset._ref
  },
  coverImage {
    ${imageFragment}
    alt,
    asset-> {
      _id,
      url
    }
  },
  spacing
`;

export const openGraphFragment = /* groq */ `
  _type,
  siteName,
  url,
  description,
  title,
  image {
    ${imageFragment}
  },
`;

export const metaAttributesFragment = /* groq */ `
  _type,
  attributeValueString,
  attributeType,
  attributeKey,
  attributeValueImage {
    ${imageFragment}
  },
`;

export const additionalMetaTagFragment = /* groq */ `
  _key,
  _type,
  metaAttributes[] {
    ${metaAttributesFragment}
  },
`;

export const seoFragment = /* groq */ `
  _type,
  metaTitle,
  noIndex,
  seoKeywords,
  metaDescription,
  metaImage{
    ${imageFragment}
  },
  additionalMetaTags[]{
    ${additionalMetaTagFragment}
  },
  openGraph {
    ${openGraphFragment}
  },
  twitter {
    ${twitterFragment}
  }
`;

export const linkFragment = /* groq */ `
  _type,
  type,
  openInNewTab,
  external,
  href,
  internal->{
    _type,
    _id,
    "slug": slug.current
  },
`;

const customLinkFragment = /* groq */ `
  ...customLink{
    ${linkFragment}
  },
`;

const markDefsFragment = /* groq */ `
  markDefs[]{
    ...,
    ${customLinkFragment}
  },
`;

const contentFragment = /* groq */ `
  content[]{
    ...,
    ${markDefsFragment}
  },
`;

export const buttonFragment = /* groq */ `
  _key,
  _type,
  variant,
  icon,
  text,
  link {
    ${linkFragment}
  },
`;

export const buttonsFragment = /* groq */ `
  buttons[]{
    ${buttonFragment}
  },
`;

export const heroSectionFragment = /* groq */ `
  _type,
  heading,
  text,
  ${buttonsFragment}
`;

export const categoryFragment = /* groq */ `
  _id,
  _type,
  title,
  "slug": slug.current,
  description,
`;

export const personFragment = /* groq */ `
  _id,
  _type,
  firstName,
  lastName,
  image,
  role,
  biography,
  "slug": slug.current,
`;

export const postCardFragment = /* groq */ `
  _type,
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  "excerpt": coalesce(
    excerpt,
    select(
      defined(pt::text(content)) => array::join(string::split(pt::text(content), " ")[0...30], " ") + "...",
      null
    )
  ),
  image,
  "categories": categories[]->{${categoryFragment}},
  "date": coalesce(date, _updatedAt),
  "author": author->{${personFragment}},
  "wordCount": count(string::split(coalesce(pt::text(content), ''), " ")),
`;

export const postFragment = /* groq */ `
  ${postCardFragment}
  ${contentFragment}
  site->{
    _id,
    _type,
    title,
    "slug": slug.current
  },
  seo {
    ${seoFragment}
  },
`;

export const postListSectionFragment = /* groq */ `
    _type,
    heading,
    numberOfPosts,
    layout,
    spacing,
    categories,
    "posts": *[_type == 'post'] | order(_createdAt desc, _id desc) [0...20] {
      ${postFragment}
    }
`;

export const dividerSectionFragment = /* groq */ `
  _type,
  height
`;

export const ctaFragment = /* groq */ `
  _type,
  heading,
  ${contentFragment}
  backgroundColor,
  innerBackgroundColor,
  spacing
`;

export const subnavigationSectionFragment = /* groq */ `
  _type,
  _key,
  items[] {
    _key,
    label,
    type,
    anchor,
    external,
    openInNewTab,
    internal->{
      _type,
      slug
    }
  }
`;

export const mediaCardFragment = /* groq */ `
  _key,
  _type,
  heading,
  mediaType,
  image {
    ${imageFragment}
    alt
  },
  link {
    ${linkFragment}
  },
  video {
    ${videoFieldFragment}
  },
`;

export const stickyGridFragment = /* groq */ `
  _type,
  _key,
  ${contentFragment}
  spacing,
  cards[] {
    ${mediaCardFragment}
  },
`;

export const featuredTextFragment = /* groq */ `
  _type,
  ${contentFragment}
  ${buttonsFragment}
  spacing,
`;

export const heroFullscreenFragment = /* groq */ `
  _type,
  _key,
  heading,
  ${contentFragment}
  image {
    ${imageFragment}
    alt
  },
  video {
    ${videoFieldFragment}
  },
  backgroundColor,
  gradientColor,
`;

export const heroMinimalFragment = /* groq */ `
  _type,
  _key,
  heading {
    content,
    headingLevel
  },
  ${contentFragment}
  image {
    ${imageFragment}
    alt
  },
  layout,
  spacing,
  backgroundColor,
`;

export const accordionItemFragment = /* groq */ `
  _key,
  _type,
  title,
  ${contentFragment}
`;

export const accordionFragment = /* groq */ `
  _type,
  _key,
  items[] {
    ${accordionItemFragment}
  },
  orientation,
  mediaType,
  image {
    ${imageFragment}
    alt
  },
  video {
    ${videoFieldFragment}
  },
  allowMultiple,
  alignment,
  spacing,
`;

export const headerSectionFragment = /* groq */ `
  _type,
  _key,
  heading,
  headingLevel,
  headingSize,
  content[]{
    ...,
    markDefs[]{
      ...,
      ...customLink{
        ${linkFragment}
      },
    },
  },
  layout,
  spacing,
  ${buttonsFragment},
  hasDetails,
  details[]{
    heading,
    content
  }
`;

export const detailFragment = /* groq */ `
  _key,
  _type,
  heading,
  ${contentFragment}
`;

export const gridItemFragment = /* groq */ `
  _key,
  _type,
  icon,
  heading {
    content
  },
  ${contentFragment}
`;

export const cardFragment = /* groq */ `
  _key,
  _type,
  image {
    ${imageFragment}
    alt
  },
  heading {
    content
  },
  ${contentFragment}
  link {
    ${linkFragment}
  }
`;

export const timelineItemFragment = /* groq */ `
  _key,
  _type,
  image {
    ${imageFragment}
    alt
  },
  heading {
    content
  },
  ${contentFragment}
`;

export const linkItemFragment = /* groq */ `
  _key,
  _type,
  heading,
  ${contentFragment}
  link {
    ${linkFragment}
  },
`;

export const stepItemFragment = /* groq */ `
  _key,
  _type,
  heading {
    content
  },
  ${contentFragment}
`;

export const gridFragment = /* groq */ `
  _type,
  _key,
  items[]{
    _type == 'gridItem' => {
      ${gridItemFragment}
    },
    _type == 'card' => {
      ${cardFragment}
    },
    _type == 'linkItem' => {
      ${linkItemFragment}
    },
    _type == 'stepItem' => {
      ${stepItemFragment}
    }
  },
  headingLevel,
  borderColor,
  tabletColumns,
  desktopColumns,
  spacing,
  backgroundColor,
  textColor,
`;

// LinkList fields only (for embedding in other components)
export const linkListFields = /* groq */ `
  _type,
  _key,
  items[] {
    ${linkItemFragment}
  },
  headingLevel,
  tabletColumns,
  desktopColumns,
  borderColor,
  spacing,
  backgroundColor,
  textColor,
`;

// List
export const listFragment = /* groq */ `
  _type,
  _key,
  items[]{
    ${detailFragment}
  },
  spacing,
`;

// Full linkList fragment for standalone use
export const linkListFragment = /* groq */ `
  ${linkListFields}
`;

export const timelineFragment = /* groq */ `
  _type,
  _key,
  heading,
  borderColor,
  spacing,
  items[] {
    ${timelineItemFragment}
  },
`;

export const coverImageFragment = /* groq */ `
  _type,
  _key,
  layout,
  image {
    asset-> {
      _id,
      url
    },
    alt,
    hotspot {
      x,
      y
    },
    crop {
      top,
      bottom,
      left,
      right
    }
  },
  minHeight,
  maxHeight,
  layout,
  spacing
`;

export const mediaTextFragment = /* groq */ `
  _type,
  _key,
  mediaType,
  image {
    ${imageFragment}
    alt
  },
  image2 {
    ${imageFragment}
    alt
  },
  video {
    ${videoFieldFragment}
  },
  orientation,
  heading {
    content,
    headingLevel
  },
  ${contentFragment}
  ${buttonsFragment}
  links[] {
    _key,
    text,
    link {
      ${linkFragment}
    }
  },
  spacing,
`;

export const tableFragment = /* groq */ `
  _type,
  _key,
  columns[] {
    _key,
    header
  },
  rows[] {
    _key,
    cells[] {
      _key,
      value
    }
  },
  caption,
  headerBackgroundColor,
  spacing,
`;

export const sectionFragment = /* groq */ `
  _type,
  _key,
  anchorId,
  components[]{
    _key,
    _type,
    _type == 'header' => {${headerSectionFragment}},
    _type == 'accordion' => {${accordionFragment}},
    _type == 'gallery' => {${galleryFragment}},
    _type == 'grid' => {${gridFragment}},
    _type == 'stickyGrid' => {${stickyGridFragment}},
    _type == 'timeline' => {${timelineFragment}},
    _type == 'linkList' => {${linkListFragment}},
    _type == 'list' => {${listFragment}},
    _type == 'videoSection' => {${videoSectionFragment}},
    _type == 'mediaText' => {${mediaTextFragment}},
    _type == 'coverImage' => {${coverImageFragment}},
    _type == 'table' => {${tableFragment}},
    _type == 'featuredText' => {${featuredTextFragment}},
    _type == 'cta' => {${ctaFragment}},
    _type == 'postList' => {${postListSectionFragment}},
  },
  spacing,
  backgroundColor,
  textColor,
`;

export const pageBuilderFragment = /* groq */ `
  pageSections[]{
    ...,
    _key,
    _type,
    _type == 'divider' => {${dividerSectionFragment}},
    _type == 'hero' => {${heroSectionFragment}},
    _type == 'heroFullscreen' => {${heroFullscreenFragment}},
    _type == 'heroMinimal' => {${heroMinimalFragment}},
    _type == 'subnavigation' => {${subnavigationSectionFragment}},
    _type == 'coverImage' => {${coverImageFragment}},
  },
`;

export const menuItemFragment = /* groq */ `
  _type,
  _key,
  text,
  type,
  link {
    ${linkFragment}
  },
`;

export const menuFragment = /* groq */ `
  menu[]{
    ${menuItemFragment}
    childMenu[]{
      ${menuItemFragment}
    }
  }
`;

export const pageFragment = /* groq */ `
  ${pageBuilderFragment}
  site->{
    _id,
    _type,
    title,
    "slug": slug.current
  },
  seo {
    ${seoFragment}
  },
`;