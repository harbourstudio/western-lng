import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Image } from 'next-sanity/image';
import { Badge } from '@/components/ui/Badge';
import { ReadTime } from '@/components/ui/ReadTime';
import { getDocumentLink } from '@/lib/links';
import { urlForImage } from '@/lib/sanity/client/utils';
import type { PostCardFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import { Button } from '../ui/Button';

export default function PostCard({ post }: { post: PostCardFragmentType }) {
  const { title, excerpt, date, author, image, categories } = post;

  const featuredCategory = categories?.[0];

  return (
    <article className="relative overflow-hidden flex flex-col items-center px-4 first:pl-0 last:pr-0">
      {image && (
        <Link href={`/blog/${post.slug}`} className='block grow aspect-[3/2] rounded-base w-full h-auto overflow-hidden'>
          <Image
            src={urlForImage(image)?.width(1000).height(667).url() as string}
            alt={image?.alt || 'Blog Post Image'}
            width={768}
            height={400}
            className='w-full h-full object-cover\'
          />
        </Link>
      )}

      <div className="flex flex-col justify-center pt-6">
        {featuredCategory && (
          <Link href={getDocumentLink(featuredCategory)} className='mb-5 w-fit'>{featuredCategory.title}</Link>
        )}
        
        <h4 className='mb-0 mb-1'>
          <Link href={`/blog/${post.slug}`}>
            {title}
          </Link>
        </h4>
        {excerpt ? <p className="text-sm">{excerpt}</p> : null}
        
        <div className='mt-6 mb-5'>
          <Button asChild variant={'link'}>
            <Link href={`/blog/${post.slug}`}>
              {date ? (
              <time>
                  {new Date(date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                ) : 'Read More'
              }
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
