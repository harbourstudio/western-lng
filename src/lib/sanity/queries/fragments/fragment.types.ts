import type { GetPageQueryResult, PostQueryResult, PostsArchiveQueryResult } from '@/sanity.types';

export type PostCardFragmentType = NonNullable<PostsArchiveQueryResult['results'][number]>;
export type PostFragmentType = NonNullable<PostQueryResult>;
export type PersonFragmentType = NonNullable<PostFragmentType['author']>;
export type CategoryFragmentType = NonNullable<PostFragmentType['categories']>[number];

export type PageFragmentType = NonNullable<GetPageQueryResult>;
export type SeoFragmentType = NonNullable<PageFragmentType['seo']>;

export type SectionsType = PageFragmentType['pageSections'];
export type SectionType = NonNullable<SectionsType>[number];

export type CtaFragmentType = Extract<SectionType, { _type: 'cta' }>;
export type DividerSectionFragmentType = Extract<SectionType, { _type: 'divider' }>;
export type HeroSectionFragmentType = Extract<SectionType, { _type: 'hero' }>;
export type mediaTextFragmentType = Extract<SectionType, { _type: 'mediaText' }>;
export type PostListSectionFragmentType = Extract<SectionType, { _type: 'postList' }>;
export type SubscribeSectionFragmentType = Extract<SectionType, { _type: 'subscribe' }>;

export type SectionFragmentType = Extract<SectionType, { _type: 'section' }>;
export type HeroFullscreenFragmentType = Extract<SectionType, { _type: 'heroFullscreen' }>;
export type HeroMinimalFragmentType = Extract<SectionType, { _type: 'heroMinimal' }>;

export type HeaderFragmentType = Extract<RowComponentType, { _type: 'header' }>;
export type TableFragmentType = Extract<RowComponentType, { _type: 'table' }>;
export type FeaturedTextFragmentType = Extract<RowComponentType, { _type: 'featuredText' }>;

export type HeaderDetailsFragmentType = Extract<RowComponentType, { _type: 'headerDetails' }>;
export type DetailFragmentType = NonNullable<HeaderDetailsFragmentType['details']>[number];

export type GridFragmentType = Extract<RowComponentType, { _type: 'grid' }>;
export type GridItemFragmentType = NonNullable<GridFragmentType['items']>[number];

export type LinkListFragmentType = Extract<RowComponentType, { _type: 'linkList' }>;
export type LinkItemFragmentType = NonNullable<LinkListFragmentType['items']>[number];

export type ListFragmentType = Extract<RowComponentType, { _type: 'list' }>;

export type AccordionFragmentType = Extract<RowComponentType, { _type: 'accordion' }>;
export type AccordionItemFragmentType = NonNullable<AccordionFragmentType['items']>[number];

export type StickyGridFragmentType = Extract<SectionType, { _type: 'stickyGrid' }>;
export type TimelineFragmentType = Extract<SectionType, { _type: 'timeline' }>;

export type MediaCardFragmentType = NonNullable<StickyGridFragmentType['items']>[number];

export type CoverImageFragmentType = Extract<RowComponentType, { _type: 'coverImage' }>;
export type VideoSectionFragmentType = Extract<RowComponentType, { _type: 'videoSection' }>;
export type GalleryFragmentType = Extract<RowComponentType, { _type: 'gallery' }>;

