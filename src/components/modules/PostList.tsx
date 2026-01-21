import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { PostListSectionFragmentType, PostCardFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
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
  const layout = cleanString(section?.layout) || '';


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
    <div className={`post-list layout-${layout} ${spacingTop} ${spacingBottom}`}>
      <div className="border-solid border-t-1 border-gray-600 flex flex-wrap items-center justify-between gap-5 pt-4 mb-6">
        <h2>News & Stories</h2>
        <Button asChild className='hidden lg:block'>
          <Link href="/news">
            View All Posts <ArrowRight />
          </Link>
        </Button>
      </div>
      {layout === 'featured' ? (
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-5'>
          <div className='lg:col-span-6'>
            {posts.slice(0, 1).map((post: PostCardFragmentType) => (
              <PostCard
                key={post._id}
                post={post}
                className='post-card-featured'
              />
            ))}
          </div>
          <div className='lg:col-span-6 grid grid-cols-1 gap-5 h-fit'>
            {posts.slice(1, numberOfPosts).map((post: PostCardFragmentType) => (
              <PostCard
                key={post._id}
                post={post}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 border-t border-gray-200 pt-4'>
          {posts.slice(0, numberOfPosts).map((post: PostCardFragmentType) => (
            <PostCard
              key={post._id}
              post={post}
            />
          ))}
        </div>
      )}
      <div className='flex items-center justify-center mt-6 lg:hidden'>
        <Button asChild>
          <Link href="/news">
            View All Posts <ArrowRight />
          </Link>
        </Button>
      </div>
    </div>
  );
}