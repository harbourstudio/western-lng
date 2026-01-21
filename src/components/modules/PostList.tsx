import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { PostListSectionFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import PostCard from './PostCard';
import { Button } from '../ui/Button';
import { cn } from '@/lib/utils';

// Function to remove zero-width and invisible Unicode characters
function cleanString(str: string | undefined): string {
  if (!str) return '';
  return str
    .replace(/[\u200B-\u200D\uFEFF\u202A-\u202E]/g, '')
    .replace(/[\u061C\u180E\u2066-\u2069]/g, '')
    .trim();
}

export default function PostListSection({ section }: { section: PostListSectionFragmentType }) {
  const spacingTop = cleanString(section?.spacing?.top) || '';
  const spacingBottom = cleanString(section?.spacing?.bottom) || '';

  // Add fallback to empty array to prevent "Cannot read properties of undefined"
  const posts = section?.posts ?? [];
  // const { posts } = section;

  // if (!posts.length) {
    //   return null;
    // }
  // console.log('section', section);
  // console.log('posts fetched:', posts.map(p => p.title));

  const numberOfPosts = section?.numberOfPosts ?? 3;

  return (
    <div className={cn(spacingTop, spacingBottom)}>
      <div className="border-solid border-t-1 border-gray-600 flex flex-wrap justify-between py-4 mb-6">
        <div>
          <Button asChild>
            <Link href="/news">
              View All Posts <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
      <div className="border-solid border-t-1 border-gray-300 flex divide-x-1 divide-gray-200 pt-4 [&_article]:px-4 [&_article:first-child]:pl-0 [&_article:last-child]:pr-0">
        {posts.slice(0, numberOfPosts).map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}