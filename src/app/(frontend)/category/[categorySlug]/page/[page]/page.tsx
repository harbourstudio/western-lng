import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Page from '@/components/templates/Page';
import PostRiver from '@/components/templates/PostRiver';
import { POSTS_PER_PAGE } from '@/lib/constants';
import { getDocumentLink } from '@/lib/links';
import { paginatedData } from '@/lib/pagination';
import { siteSanityFetch } from '@/lib/sanity/client/fetch';
import { categoryQuery, postsArchiveQuery } from '@/lib/sanity/queries/queries';

type Props = {
  params: Promise<{ categorySlug: string; page: string }>;
};

const loadData = async (props: Props) => {
  const { categorySlug, page } = await props.params;

  const pageNumber = parseInt(page, 10);

  if (!pageNumber) {
    notFound();
  }

  const from = (pageNumber - 1) * POSTS_PER_PAGE;
  const to = pageNumber * POSTS_PER_PAGE - 1;

  const [archiveData, categoryData] = await Promise.all([
    siteSanityFetch({
      query: postsArchiveQuery,
      params: { from, to, filters: { categorySlug } },
      tags: ['post'],
    }),
    siteSanityFetch({
      query: categoryQuery,
      params: { slug: categorySlug },
      tags: ['category'],
    }),
  ]);

  return {
    category: categoryData,
    posts: paginatedData(archiveData, pageNumber, POSTS_PER_PAGE),
  };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { category } = (await loadData(props)) || {};

  if (!category) {
    return notFound();
  }

  return {
    title: `Category ${category.title}`,
    alternates: {
      canonical: getDocumentLink(category, true),
    },
  };
}

export async function generateStaticParams() {
  return [];
}

export default async function PostPage(props: Props) {
  const { posts, category } = (await loadData(props)) || {};

  if (!category) {
    notFound();
  }

  return (
    <Page title={'Category: ' + category.title}>
      <PostRiver
        listingData={posts.data}
        currentPage={posts.currentPage}
        totalPages={posts.totalPages}
        paginationBase={`/category/${category.slug}`}
      />
    </Page>
  );
}
