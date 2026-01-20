import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageSections from '@/components/sections/PageSections';
import { siteSanityFetch } from '@/lib/sanity/client/fetch';
import { formatMetaData } from '@/lib/sanity/client/seo';
import { getPageQuery } from '@/lib/sanity/queries/queries';
import { getCurrentSite } from '@/lib/get-current-site';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  const page = await siteSanityFetch({
    query: getPageQuery,
    params,
    tags: ['page'],
  });

  if (!page?.seo) {
    return {};
  }

  return formatMetaData(page.seo, page?.name || '');
}

export default async function Page(props: Props) {
  const params = await props.params;
  const site = await getCurrentSite();

  const page = await siteSanityFetch({
    query: getPageQuery,
    params,
    tags: ['page'],
  });

  if (!page) {
    notFound();
  }

  const { _id, _type, pageSections } = page;

  return <PageSections documentId={_id} documentType={_type} sections={pageSections} siteId={site.id} />;
}
