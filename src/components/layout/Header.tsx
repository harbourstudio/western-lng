import Link from 'next/link';
import Image from 'next/image';
import { siteSanityFetch } from '@/lib/sanity/client/fetch';
import { settingsQuery } from '@/lib/sanity/queries/queries';
import { urlForImage } from '@/lib/sanity/client/utils';
import NavBar from './NavBar';
import InlineSvg from '@/components/ui/InlineSvg';
import HeaderActions from './HeaderActions';
import type { SettingsQueryResult } from '@/sanity.types';

function isSvgAsset(asset?: { _ref?: string } | null): boolean {
  return asset?._ref?.includes('-svg') ?? false;
}

export default async function Header() {
  const settings = await siteSanityFetch<SettingsQueryResult>({
    query: settingsQuery,
    tags: ['settings'],
  });

  if (!settings || !settings.site) {
    return null;
  }

  const { site } = settings;
  const logoUrl = site.logo ? urlForImage(site.logo)?.url() : null;
  const isSvg = isSvgAsset(site.logo?.asset);

  return (
    <>
    <header className={`site-header site-${(site.name || 'default').toLowerCase().replace(/\s+/g, '-')} w-screen z-999 border-b-1 border-white`}>
      <div className='site-header-top bg-primary text-white'>
        <div className='container mx-auto py-2'>
          <nav>
            <ul className='flex flex-wrap gap-x-6  text-sm'>
              <li><a href='https://western-lng.vercel.app/'>Western LNG</a></li>
              <li><a href='https://ksi-lisims-lng.vercel.app/'>Ksi Lisims LNG</a></li>
              <li><a href='https://prgt.vercel.app/'>PRGT</a></li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="site-header-main container mx-auto py-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link className="h-6 lg:h-7 inline-flex items-center justify-center" href="/">
            {logoUrl && isSvg ? (
              <InlineSvg
                url={logoUrl}
                className="site-header-logo lg:h-[2rem] w-auto"
                title={site.logo?.alt || site.name || 'Logo'}
              />
            ) : logoUrl ? (
              <Image
                src={logoUrl}
                alt={site.logo?.alt || site.name || 'Logo'}
                width={224}
                height={32}
                className="lg:h-[2rem] w-auto"
              />
            ) : (
              <span className="text-white font-bold">{site.name}</span>
            )}
          </Link>
          <NavBar menuItems={settings.menu || []} />
        </div>
        <HeaderActions subscribeModalData={settings.subscribeModal} />
      </div>
    </header>
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            let lastScrollY = 0;
            let header = null;

            function setHeaderHeight() {
              if (!header) return;
              const height = header.offsetHeight;
              document.documentElement.style.setProperty('--header-height', height + 'px');
              console.log('[DEBUG] Set --header-height:', height + 'px');
            }

            function setupScrollHandler() {
              window.addEventListener('scroll', function() {
                let currentScrollY = window.scrollY;
                if (currentScrollY <= 0) {
                  header.classList.add('scroll-top');
                  header.classList.remove('scrolled', 'header-visible');
                } else if (currentScrollY > 150) {
                  header.classList.remove('scroll-top');
                  header.classList.add('scrolled');
                  if (currentScrollY < lastScrollY) {
                    header.classList.add('header-visible');
                  } else {
                    header.classList.remove('header-visible');
                  }
                }
                lastScrollY = currentScrollY;
              }, { passive: true });
            }

            function init(attempt) {
              attempt = attempt || 1;
              header = document.querySelector('.site-header');

              console.log('[DEBUG] Init attempt', attempt, '- header found:', !!header);

              if (!header) {
                if (attempt < 10) {
                  setTimeout(function() { init(attempt + 1); }, 100);
                } else {
                  console.warn('[Header] Could not find .site-header after 10 attempts');
                }
                return;
              }

              header.classList.add('scroll-top');
              setHeaderHeight();
              // Re-set after hydration (React may wipe inline styles)
              setTimeout(setHeaderHeight, 0);
              requestAnimationFrame(setHeaderHeight);
              window.addEventListener('resize', setHeaderHeight);

              // Apply header type class from data attribute
              const content = document.querySelector('[data-header-type]');
              if (content) {
                const headerType = content.getAttribute('data-header-type');
                if (headerType && headerType !== 'default') {
                  header.classList.add('type-' + headerType);
                }
              }

              setupScrollHandler();
            }

            // Wait for window.onload to ensure React hydration is complete
            if (document.readyState === 'complete') {
              init(1);
            } else {
              window.addEventListener('load', function() { init(1); });
            }
          })();
        `,
      }}
    />
    </>
  );
}
