import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Image } from 'next-sanity/image';
import { Badge } from '@/components/ui/Badge';
import { ReadTime } from '@/components/ui/ReadTime';
import { getDocumentLink } from '@/lib/links';
import { urlForImage } from '@/lib/sanity/client/utils';
import type { PostCardFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import { Button } from '../ui/Button';

export default function PostCard({ post, className }: { post: PostCardFragmentType; className?: string }) {
  const { title, excerpt, date, author, image, categories } = post;

  const featuredCategory = categories?.[0];

  return (
    <article className={`post-card border border-gray-200 rounded-base relative overflow-hidden ${className ?? ''}`} style={{ containerType: 'inline-size' }}>
      <div className='post-card-inner flex flex-col h-full' style={{minHeight: 'calc(100cqw * 5 / 4)' }}>
        {image && (
          <Link href={`/news/${post.slug}`} className='block shrink-0 aspect-[3/2] w-full h-auto overflow-hidden'>
            <Image
              src={urlForImage(image)?.width(1000).height(667).url() as string}
              alt={image?.alt || 'Blog Post Image'}
              width={768}
              height={400}
              className='w-full h-full object-cover'
            />
          </Link>
        )}

        <div className='post-card-content flex flex-col grow p-5 pt-6'>

          {(featuredCategory || date ) && 
            <div className='flex flex-wrap items-center gap-3 mb-5'>
              {featuredCategory && (
                <Link href={getDocumentLink(featuredCategory)} className='badge'>{featuredCategory.title}</Link>
              )}
              {date &&
                <time className='text-xs'>
                  {new Date(date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              }
            </div>
          }

          <h4>
            <Link href={`/news/${post.slug}`}>
              {title}
            </Link>
          </h4>
          {excerpt ? <p className="text-sm max-w-lg">{excerpt}</p> : null}
          
          <div className='flex flex-col grow justify-end items-start mt-6'>
            <Button asChild variant={'link'}>
              <Link href={`/news/${post.slug}`}>
                Read the Article
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
