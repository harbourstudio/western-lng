import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageSections from '@/components/sections/PageSections';
import PostFilters from '@/components/modules/PostFilters';
import PostRiver from '@/components/templates/PostRiver';
import { POSTS_PER_PAGE } from '@/lib/constants';
import { type PaginatedResult, paginatedData } from '@/lib/pagination';
import { siteSanityFetch } from '@/lib/sanity/client/fetch';
import { formatMetaData } from '@/lib/sanity/client/seo';
import { allCategoriesQuery, blogPageQuery, postsArchiveQuery } from '@/lib/sanity/queries/queries';
import type { AllCategoriesQueryResult, BlogPageQueryResult, PostsArchiveQueryResult } from '@/sanity.types';
import { getCurrentSite } from '@/lib/get-current-site';

type Props = {
  searchParams: Promise<{
    search?: string;
    category?: string;
    date?: string;
    page?: string;
  }>;
};

const loadPostsPageData = async (
  searchParams: Awaited<Props['searchParams']>
): Promise<{
  blogPage: BlogPageQueryResult;
  posts: PaginatedResult<PostsArchiveQueryResult>;
  categories: AllCategoriesQueryResult;
}> => {
  const page = Number(searchParams.page) || 1;
  const from = (page - 1) * POSTS_PER_PAGE;
  const to = from + POSTS_PER_PAGE - 1;

  // Parse multi-select date filters (format: YYYY-MM,YYYY-MM,...)
  const dateFilters = searchParams.date?.split(',').filter(Boolean) || [];

  // Parse multi-select category filters
  const categorySlugs = searchParams.category?.split(',').filter(Boolean) || [];

  const filters = {
    categorySlugs: categorySlugs.length > 0 ? categorySlugs : undefined,
    search: searchParams.search || undefined,
    dateFilters: dateFilters.length > 0 ? dateFilters : undefined,
  };

  const [blogPageData, posts, categories] = await Promise.all([
    siteSanityFetch<BlogPageQueryResult>({
      query: blogPageQuery,
      tags: ['blogPage'],
    }),
    siteSanityFetch<PostsArchiveQueryResult>({
      query: postsArchiveQuery,
      params: { from, to, filters },
      tags: ['post'],
    }),
    siteSanityFetch<AllCategoriesQueryResult>({
      query: allCategoriesQuery,
      tags: ['category'],
    }),
  ]);

  return {
    blogPage: blogPageData,
    posts: paginatedData(posts, page, POSTS_PER_PAGE),
    categories: categories || [],
  };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const routeData = await loadPostsPageData(searchParams);

  if (!routeData.posts || !routeData.blogPage) {
    return notFound();
  }

  if (!routeData.blogPage.seo) {
    return {};
  }

  return formatMetaData(routeData.blogPage.seo, routeData.blogPage?.name || '');
}

export default async function BlogPage(props: Props) {
  const searchParams = await props.searchParams;
  const site = await getCurrentSite();
  const routeData = await loadPostsPageData(searchParams);

  if (!routeData.posts || !routeData.blogPage) {
    notFound();
  }

  const { _id, _type, pageSections } = routeData.blogPage;

  return (
    <>
      {/* Render page sections (heroMinimal, etc.) */}
      {pageSections && pageSections.length > 0 && (
        <PageSections
          documentId={_id}
          documentType={_type}
          sections={pageSections}
          siteId={site.id}
        />
      )}

      {/* Filters and post listing */}
      <div className="container mx-auto py-9">
        <PostFilters categories={routeData.categories} />
        <PostRiver
          listingData={routeData.posts.data}
          currentPage={routeData.posts.currentPage}
          totalPages={routeData.posts.totalPages}
        />
      </div>
    </>
  );
}
