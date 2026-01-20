import React from 'react';
import { ArchivePagination } from '@/components/modules/ArchivePagination';
import type { PostsArchiveQueryResult } from '@/sanity.types';
import PostCard from '../modules/PostCard';

type Props = {
  listingData: NonNullable<PostsArchiveQueryResult>;
  currentPage?: number;
  totalPages?: number;
  title?: string;
  paginationBase?: string;
};

const PostRiver = ({
  listingData,
  currentPage = 1,
  paginationBase = '/news',
  totalPages = 1,
}: Props) => {
  const { results } = listingData;

  return (
    <>
      {(results.length > 0) ?
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {results.map((post) => {
              return <PostCard key={post._id} post={post} />;
            })}
        </div>
        : 
        <div className='text-center'>
          <p className='text-lg'>No articles found.</p>
        </div>
      }
      <ArchivePagination
        currentPage={currentPage}
        linkBase={paginationBase}
        totalPages={totalPages}
      />
      {results && results.length > 0 && 
        <div className='text-center tetx-sm mt-6'>
          <p>Showing {results.length} {results.length > 1 ? 'Articles' : 'Article' }</p>
        </div>
      } 
    </>
  );
};

export default PostRiver;
