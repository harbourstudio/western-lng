'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

type NavItem = {
  _key?: string;
  label: string;
  type: 'anchor' | 'internal' | 'external';
  anchor?: string;
  external?: string;
  openInNewTab?: boolean;
  internal?: {
    _type?: string;
    slug?: {
      current?: string;
    };
  };
};

type SubnavigationProps = {
  section: {
    items?: NavItem[];
  };
};

// Helper to resolve link href
function resolveLinkHref(link: {
  type?: string;
  external?: string;
  anchor?: string;
  internal?: { _type?: string; slug?: { current?: string } };
}): string {
  if (link.type === 'anchor' && link.anchor) {
    return link.anchor;
  }
  if (link.type === 'external' && link.external) {
    return link.external;
  }
  if (link.type === 'internal' && link.internal?.slug?.current) {
    const prefix = link.internal._type === 'post' ? '/blog' : '';
    return `${prefix}/${link.internal.slug.current}`;
  }
  return '#';
}

export default function Subnavigation({ section }: SubnavigationProps) {
  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the sentinel is NOT intersecting (i.e., scrolled past), make nav sticky
        setIsSticky(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '0px',
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, []);

  const items = section?.items || [];
  if (items.length === 0) return null;

  return (
    <>
      {/* Sentinel element - when this scrolls out of view, nav becomes sticky */}
      <div ref={sentinelRef} className="h-px" />

      <div
        ref={navRef}
        className={`
          w-full bg-gray-100 transition-all duration-300 z-10
          ${isSticky ? 'fixed top-0 left-0 right-0 shadow-xs' : 'relative'}
        `}
      >
        <nav className="container mx-auto py-5 flex justify-between gap-x-6">
          <h6 className='text-sm mb-0 leading-[1.7]'>Navigate</h6>
          <ul className="flex items-center gap-x-6 overflow-x-auto scrollbar-hide">
            {items.map((item, index) => {
              const href = resolveLinkHref(item);
              const isAnchor = href.startsWith('#');
              const openInNewTab = item.openInNewTab && !isAnchor;

              return (
                <li key={item._key || index} className="shrink-0">
                  <Link
                    href={href}
                    target={openInNewTab ? '_blank' : undefined}
                    rel={openInNewTab ? 'noopener noreferrer' : undefined}
                    className='text-sm text-dark'
                    onClick={isAnchor ? (e) => {
                      e.preventDefault();
                      const targetId = href.substring(1);
                      const targetElement = document.getElementById(targetId);
                      if (targetElement) {
                        const navHeight = navRef.current?.offsetHeight || 0;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                        window.scrollTo({
                          top: targetPosition,
                          behavior: 'smooth'
                        });
                      }
                    } : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
