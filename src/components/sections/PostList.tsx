import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { PostListSectionFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import PostCard from '../modules/PostCard';
import { Button } from '../ui/Button';

export default function PostListSection({ section }: { section: PostListSectionFragmentType }) {
  const { posts } = section;
  if (!posts.length) {
    return null;
  }

  const numberOfPosts = section.numberOfPosts ?? 3;

  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto">
        <div className="border-t border-dark py-4 flex justify-between items-center gap-5">
          <h3>{section?.heading}</h3>
          <Button asChild>
            <Link href={'/blog'}>
              View All Posts <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 pt-4 border-t border-gray-200 divide-x-1 divide-gray-200">
          {posts.slice(0, numberOfPosts).map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
