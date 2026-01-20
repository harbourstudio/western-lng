import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Page from '@/components/templates/Page';
import PersonArchiveByline from '@/components/templates/PersonArchiveByline';
import PostRiver from '@/components/templates/PostRiver';
import { POSTS_PER_PAGE } from '@/lib/constants';
import { getDocumentLink } from '@/lib/links';
import { paginatedData } from '@/lib/pagination';
import { siteSanityFetch } from '@/lib/sanity/client/fetch';
import type { PersonQueryResult, PostsArchiveQueryResult } from '@/sanity.types';
import { personQuery, postsArchiveQuery } from '@/lib/sanity/queries/queries';

type Props = {
  params: Promise<{ personSlug: string }>;
};

const loadData = async (props: Props) => {
  const { personSlug } = await props.params;

  const from = 0;
  const to = POSTS_PER_PAGE - 1;

  const [archiveData, personData] = await Promise.all([
    siteSanityFetch<PostsArchiveQueryResult>({
      query: postsArchiveQuery,
      params: { from, to, filters: { personSlug } },
      tags: ['post'],
    }),
    siteSanityFetch<PersonQueryResult>({
      query: personQuery,
      params: { slug: personSlug },
      tags: ['person'],
    }),
  ]);

  return {
    person: personData,
    posts: paginatedData(archiveData, 0, POSTS_PER_PAGE),
  };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { person } = (await loadData(props)) || {};

  if (!person) {
    return notFound();
  }

  return {
    title: `Author ${person.firstName} ${person.lastName}`,
    alternates: {
      canonical: getDocumentLink(person, true),
    },
  };
}

// Static params generation disabled for multi-site setup
export const dynamicParams = true;

export default async function PostPage(props: Props) {
  const { posts, person } = (await loadData(props)) || {};

  if (!person) {
    notFound();
  }

  return (
    <Page>
      <PersonArchiveByline person={person} />
      <PostRiver
        listingData={posts.data}
        currentPage={posts.currentPage}
        totalPages={posts.totalPages}
        paginationBase={`/author/${person.slug}`}
      />
    </Page>
  );
}
