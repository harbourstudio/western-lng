'use client';

import type { SanityDocument } from 'next-sanity';
import { useOptimistic } from 'next-sanity/hooks';
import type { ElementType } from 'react';
import { dataAttr } from '@/lib/sanity/client/utils';
import type { SectionsType, SectionType } from '@/lib/sanity/queries/fragments/fragment.types';
import Divider from '../modules/Divider';
import Hero from './Hero';
import PostList from './PostList';
import Subscribe from './Subscribe';
import Subnavigation from './Subnavigation';

import Section from './Section';
import HeroFullscreen from './HeroFullscreen';
import HeroMinimal from './HeroMinimal';
import CoverImage from './CoverImage';


type PageSectionstype = SectionType['_type'];

const SECTION_COMPONENTS: Record<PageSectionstype, ElementType> = {
  hero: Hero,
  subscribe: Subscribe,
  postList: PostList,
  divider: Divider,
  subnavigation: Subnavigation,
  section: Section,
  heroFullscreen: HeroFullscreen,
  heroMinimal: HeroMinimal,
  coverImage: CoverImage
} as const;

type PageSectionsProps = {
  documentId: string;
  documentType: string;
  sections?: SectionsType;
};

type PageData = SanityDocument<{
  pageSections?: SectionsType;
}>;

export default function PageSections({
  documentId,
  documentType,
  sections: initialSections = [],
}: PageSectionsProps) {
  const sections = useOptimistic<SectionsType, PageData>(
    initialSections ?? [],
    (currentSections, action) => {
      if (action.id !== documentId || !action?.document?.pageSections) {
        return currentSections;
      }

      return action.document.pageSections.map(
        (section) =>
          currentSections?.find((currentSection) => currentSection._key === section?._key) ||
          section,
      );
    },
  );

  if (!sections?.length) {
    return null;
  }

  return (
    <div
      data-sanity={dataAttr({
        id: documentId,
        type: documentType,
        path: 'pageSections',
      })}
    >
      {sections?.map((section) => {
        const { _key, _type, ...sectionProps } = section;
        const SectionComponent = SECTION_COMPONENTS[_type];

        if (!SectionComponent) {
          return (
            <div
              key={_key}
              className="flex items-center justify-center p-8 my-8 text-center text-muted-foreground bg-muted rounded-lg"
            >
              Component not found for block type: <code>{_type}</code>
            </div>
          );
        }

        return (
          <div
            key={_key}
            data-sanity={dataAttr({
              id: documentId,
              type: documentType,
              path: `pageSections[_key=="${_key}"]`,
            })}
          >
            <SectionComponent section={sectionProps} />
          </div>
        );
      })}
    </div>
  );
}
