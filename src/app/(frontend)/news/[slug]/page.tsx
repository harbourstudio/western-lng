import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Post from '@/components/templates/Post';
import { getDocumentLink } from '@/lib/links';
import { siteSanityFetch } from '@/lib/sanity/client/fetch';
import { postQuery } from '@/lib/sanity/queries/queries';
import type { PostQueryResult } from '@/sanity.types';

type Props = {
  params: Promise<{ slug: string }>;
};

const loadData = async (props: Props): Promise<PostQueryResult> => {
  const { slug } = await props.params;

  const post = await siteSanityFetch<PostQueryResult>({
    query: postQuery,
    params: { slug },
    tags: ['post'],
  });

  return post;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const routeData = await loadData(props);

  if (!routeData) {
    return {};
  }

  return {
    alternates: {
      canonical: getDocumentLink(routeData, true),
    },
  };
}

// Static params generation disabled for multi-site setup
// Posts are rendered dynamically based on the current site context
export const dynamicParams = true;

export default async function PostPage(props: Props) {
  const post = await loadData(props);

  if (!post) {
    notFound();
  }

  return <Post post={post} />;
}
