'use client';

import { useEffect, useState } from 'react';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { SearchBox, Hits, useSearchBox, useStats, Configure } from 'react-instantsearch';
import { InstantSearchNext } from 'react-instantsearch-nextjs';
import Link from 'next/link';
import { X } from 'lucide-react';

const algoliaAppId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!;
const algoliaApiKey = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!;
const searchClient = algoliasearch(algoliaAppId, algoliaApiKey);

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  siteId: string;
}

function SearchResults({ onResultClick }: { onResultClick: () => void }) {
  const { query } = useSearchBox();
  const { nbHits } = useStats();

  if (!query) {
    return (
      <div className='flex justify-center items-center h-full w-full'>
        <p className="opacity-80">Start typing to search...</p>
      </div>
    );
  }

  return (
    <div className="search-modal__hits-wrapper overflow-y-auto">
      <div className="flex py-2 px-5 justify-between items-center">
        <p className='text-sm font-medium max-w-3xl'>Results for: {query}</p>
        <span className='inline-block bg-gray-100 rounded-xs text-xs py-1 px-2'> {nbHits} {nbHits === 1 ? 'result' : 'results'} </span>
      </div>
      <Hits
        hitComponent={({ hit }) => (
          <article className="px-5 py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
            <Link
              href={`/news/${hit.slug}`}
              className="block group"
              onClick={onResultClick}
            >
              <h3 className='text-md mb-1'>{hit.title}</h3>
              {hit.content && (
                <p className="text-sm">
                  {hit.content.slice(0, 200)}...
                </p>
              )}
              {hit.date && (
                <time className="inline-block bg-gray-100 rounded-xs text-xs mt-2 py-1 px-2">
                  {new Date(hit.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                  })}
                </time>
              )}
            </Link>
          </article>
        )}
      />
    </div>
  );
}

export default function SearchModal({ open, onOpenChange, siteId }: SearchModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onOpenChange(false);
      setIsClosing(false);
    }, 300); // Set as animation duration
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div id="modal-search" className="fixed inset-0 z-50 flex items-center justify-center h-screen">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        aria-hidden="true"
        className={`fixed inset-0 bg-black/50 transition-opacity h-screen duration-400 animate-in ${
          isClosing ? 'opacity-0' : 'opacity-100 animate-in fade-in'
        }`}
      />

      {/* Modal Content */}
      <div className={`relative bg-white rounded-base shadow-xl max-w-4xl w-full h-[75vh] max-h-[75vh] overflow-hidden flex flex-col transition-all duration-400 ${
        isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100 animate-in fade-in zoom-in-95'
      }`}>

        {/* Close Button */}
        <button
          onClick={handleClose}
          type="button"
          className="absolute right-5 top-5 p-4 z-10 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <InstantSearchNext
          indexName="posts"
          searchClient={searchClient}
          ignoreMultipleHooksWarning={true}
          routing={false}
        >
          <Configure filters={`siteSlug:${siteId}`} />
          <SearchBox
            placeholder="Search posts..."
            searchAsYouType={true}
            autoFocus={true}
            classNames={{
              form: 'relative mt-5 mx-5',
              input: 'w-full bg-gray-100 border-0 p-4 pl-7 text-dark focus:outline-none focus:shadow-none focus:ring-offset-0 focus:ring-0',
              submit: 'absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none',
              submitIcon: 'text-gray-500 w-4 h-4 opacity-50',
              reset: 'hidden',
              loadingIndicator: 'absolute right-3 top-1/2 -translate-y-1/2',
            }}
          />
          <SearchResults onResultClick={handleClose} />
        </InstantSearchNext>
      </div>
    </div>
  );
}
