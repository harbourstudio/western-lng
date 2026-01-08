import { notFound } from 'next/navigation';
import PageSections from '@/components/sections/PageSections';
import { getCurrentSite } from '@/lib/get-current-site';
import { getLive } from '@/lib/sanity/client/live';
import { formatMetaData } from '@/lib/sanity/client/seo';
import { homePageQuery } from '@/lib/sanity/queries/queries';

export async function generateMetadata() {
  const site = await getCurrentSite();
  const { sanityFetch } = getLive(site.id);

  const { data: homePage } = await sanityFetch({
    query: homePageQuery,
  });

  if (!homePage?.seo) {
    return {};
  }

  return formatMetaData(homePage.seo, homePage?.name || '');
}

export default async function Page() {
  const site = await getCurrentSite();
  const { sanityFetch } = getLive(site.id);

  const { data: homePage } = await sanityFetch({
    query: homePageQuery,
  });

  if (!homePage) {
    notFound();
  }

  const { _id, _type, pageSections } = homePage;

  return <PageSections documentId={_id} documentType={_type} sections={pageSections} />;
}