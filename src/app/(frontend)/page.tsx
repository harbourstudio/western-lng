import { notFound } from 'next/navigation';
import PageSections from '@/components/sections/PageSections';
import { siteSanityFetch } from '@/lib/sanity/client/fetch';
import { formatMetaData } from '@/lib/sanity/client/seo';
import { homePageQuery } from '@/lib/sanity/queries/queries';
import { getCurrentSite } from '@/lib/get-current-site.app';
import type { HomePageQueryResult } from '@/sanity.types';

export async function generateMetadata() {
  const homePage = await siteSanityFetch<HomePageQueryResult>({
    query: homePageQuery,
    tags: ['homePage'],
  });

  if (!homePage?.seo) {
    return {};
  }

  return formatMetaData(homePage.seo, homePage?.name || '');
}

export default async function Page() {
  const site = await getCurrentSite();
  const homePage = await siteSanityFetch<HomePageQueryResult>({
    query: homePageQuery,
    tags: ['homePage'],
  });

  if (!homePage) {
    notFound();
  }

  const { _id, _type, pageSections, headerType } = homePage;

  return <PageSections documentId={_id} documentType={_type} sections={pageSections} siteId={site.id} headerType={headerType} />;
}
