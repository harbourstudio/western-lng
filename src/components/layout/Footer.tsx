import Image from 'next/image';
import Link from 'next/link';
import { siteSanityFetch } from '@/lib/sanity/client/fetch';
import { settingsQuery } from '@/lib/sanity/queries/queries';
import { urlForImage } from '@/lib/sanity/client/utils';
import { getLinkByLinkObject } from '@/lib/links';
import InlineSvg from '@/components/ui/InlineSvg';
import type { SettingsQueryResult } from '@/sanity.types';

function isSvgAsset(asset?: { _ref?: string } | null): boolean {
  return asset?._ref?.includes('-svg') ?? false;
}

export default async function Footer() {
  const settings = await siteSanityFetch<SettingsQueryResult>({
    query: settingsQuery,
    tags: ['settings'],
  });

  if (!settings || !settings.site) {
    return null;
  }

  const { site } = settings;
  const logoUrl = site.logo ? urlForImage(site.logo)?.url() : null;

  const socials = site.socials;

  const menuItems = settings.menu || [];
  const isSvg = isSvgAsset(site.logo?.asset);

  // Group menu items into columns (max 4 columns for menu, 5th is contact)
  const menuColumns = menuItems.slice(0, 4);

  const getSocialUrl = (url?: string) => {
    if (!url) return null;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `https://${url}`;
  };


  return (
    <footer className="site-footer bg-secondary text-white [&_h1,h2,h3,h4,h5,h6]:!text-white pt-9 pb-5">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
          <Link href="/" className="inline-flex">
            {logoUrl && isSvg ? (
              <InlineSvg
                url={logoUrl}
                className="w-auto max-h-[2rem] [&_.lighten]:fill-white"
                title={site.logo?.alt || site.name || 'Logo'}
              />
            ) : logoUrl ? (
              <Image
                src={logoUrl}
                alt={site.logo?.alt || site.name || 'Logo'}
                width={224}
                height={32}
                className="h-6 lg:h-7 w-auto"
              />
            ) : (
              <span className="text-white font-bold">{site.name}</span>
            )}
          </Link>
          <div className="flex gap-3">
            {socials?.facebook && (
              <a
                href={getSocialUrl(socials?.facebook) || '#'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-gray-300"
              >
                <svg
                  width="10"
                  height="16"
                  viewBox="0 0 10 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Facebook</title>
                  <path
                    d="M2.5 9.375H0.4375V6.3125H2.5V5C2.5 1.59375 4.03125 0 7.375 0C8 0 9.09375 0.125 9.53125 0.25V3.03125C9.3125 3 8.90625 3 8.375 3C6.75 3 6.125 3.625 6.125 5.21875V6.3125H9.375L8.8125 9.375H6.125V16H2.5V9.375Z"
                    fill="white"
                  />
                </svg>
              </a>
            )}

            {socials?.linkedin && (
              <a
                href={getSocialUrl(socials?.linkedin) || '#'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-gray-300"
              >
                <svg
                  width="14"
                  height="16"
                  viewBox="0 0 14 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>LinkedIn</title>
                  <path
                    d="M3.125 14H0.21875V4.65625H3.125V14ZM1.65625 3.40625C0.75 3.40625 0 2.625 0 1.6875C0 1.09375 0.3125 0.53125 0.8125 0.25C1.34375 -0.0625 2 -0.0625 2.5 0.25C3.03125 0.53125 3.34375 1.09375 3.34375 1.6875C3.34375 2.625 2.59375 3.40625 1.65625 3.40625ZM13.9688 14H11.0938V9.46875C11.0938 8.375 11.0625 7 9.5625 7C8.0625 7 7.84375 8.15625 7.84375 9.375V14H4.9375V4.65625H7.71875V5.9375H7.75C8.15625 5.21875 9.09375 4.4375 10.5 4.4375C13.4375 4.4375 14 6.375 14 8.875V14H13.9688Z"
                    fill="white"
                  />
                </svg>
              </a>
            )}

            {socials?.twitter && (
              <a
                href={getSocialUrl(socials?.twitter) || '#'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="hover:text-gray-300"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Twitter</title>
                  <path
                    d="M12.1562 1.5H14.3438L9.53125 7.03125L15.2188 14.5H10.7812L7.28125 9.96875L3.3125 14.5H1.09375L6.25 8.625L0.8125 1.5H5.375L8.5 5.65625L12.1562 1.5ZM11.375 13.1875H12.5938L4.71875 2.75H3.40625L11.375 13.1875Z"
                    fill="white"
                  />
                </svg>
              </a>
            )}
          </div>

        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-8">
          {menuColumns.map((menuItem) => (
            <div key={menuItem._key}>
              <h6 className="mb-3">{menuItem.text}</h6>
              {menuItem.childMenu && menuItem.childMenu.length > 0 ? (
                <ul className="space-y-2">
                  {menuItem.childMenu.map((child) => (
                    <li key={child._key}>
                      <Link
                        href={child.link ? getLinkByLinkObject(child.link) || '#' : '#'}
                        className="text-sm hover:underline"
                        {...(child.link?.openInNewTab
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                      >
                        {child.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : menuItem.link ? (
                <Link
                  href={getLinkByLinkObject(menuItem.link) || '#'}
                  className="text-sm hover:underline"
                  {...(menuItem.link?.openInNewTab
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {menuItem.text}
                </Link>
              ) : null}
            </div>
          ))}

          <div>
            <h6>Contact</h6>
            <code>wip dynamic settings text</code>
          </div>
        </div>
        <div className="pt-5 border-t border-white text-xs ">
          <p>
            Copyright {new Date().getFullYear()} {settings.title} All Rights Reserved.
            Website Last Updated <code>fetch last Document-level update date</code>.
          </p>
        </div>
      </div>
    </footer>
  );
}
