import Image from 'next/image';
import Link from 'next/link';
import InlineSvg from '@/components/ui/InlineSvg';
import { siteSanityFetch } from '@/lib/sanity/client/fetch';
import { settingsQuery } from '@/lib/sanity/queries/queries';
import { urlForImage } from '@/lib/sanity/client/utils';
import { getLinkByLinkObject } from '@/lib/links';
import type { SettingsQueryResult } from '@/sanity.types';
import type { PortableTextBlock } from 'next-sanity';
import PortableText from '@/components/modules/PortableText';

function isSvgAsset(asset?: { _ref?: string } | null): boolean {
  return asset?._ref?.includes('-svg') ?? false;
}

function normalizeUrl(url?: string | null): string | null {
  if (!url) return null;
  return url.startsWith('http://') || url.startsWith('https://')
    ? url
    : `https://${url}`;
}

export default async function Footer() {
  const settings = await siteSanityFetch<SettingsQueryResult>({
    query: settingsQuery,
    tags: ['settings'],
  });

  if (!settings?.site) return null;

  const { site } = settings;

  const logoUrl = site.logo ? urlForImage(site.logo)?.url() : null;
  const isSvg = isSvgAsset(site.logo?.asset);
  const menuColumns = (settings.menuFooter ?? []).slice(0, 4);

  const socialLinks = [
    {
      key: 'facebook',
      label: 'Facebook',
      url: normalizeUrl(settings?.socials?.facebook),
      icon: (
        <svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor">
          <path d="M2.5 9.375H0.4375V6.3125H2.5V5C2.5 1.59375 4.03125 0 7.375 0C8 0 9.09375 0.125 9.53125 0.25V3.03125C9.3125 3 8.90625 3 8.375 3C6.75 3 6.125 3.625 6.125 5.21875V6.3125H9.375L8.8125 9.375H6.125V16H2.5V9.375Z" />
        </svg>
      ),
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      url: normalizeUrl(settings?.socials?.linkedin),
      icon: (
        <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor">
          <path d="M3.125 14H0.21875V4.65625H3.125V14ZM1.65625 3.40625C0.75 3.40625 0 2.625 0 1.6875C0 1.09375 0.3125 0.53125 0.8125 0.25C1.34375 -0.0625 2 -0.0625 2.5 0.25C3.03125 0.53125 3.34375 1.09375 3.34375 1.6875C3.34375 2.625 2.59375 3.40625 1.65625 3.40625ZM13.9688 14H11.0938V9.46875C11.0938 8.375 11.0625 7 9.5625 7C8.0625 7 7.84375 8.15625 7.84375 9.375V14H4.9375V4.65625H7.71875V5.9375H7.75C8.15625 5.21875 9.09375 4.4375 10.5 4.4375C13.4375 4.4375 14 6.375 14 8.875V14Z" />
        </svg>
      ),
    },
    {
      key: 'twitter',
      label: 'Twitter',
      url: normalizeUrl(settings?.socials?.twitter),
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M12.1562 1.5H14.3438L9.53125 7.03125L15.2188 14.5H10.7812L7.28125 9.96875L3.3125 14.5H1.09375L6.25 8.625L0.8125 1.5H5.375L8.5 5.65625L12.1562 1.5Z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-secondary text-white pt-9 pb-5">
      <div className="container mx-auto">
        {/* Top */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
          <Link href="/" className="inline-flex">
            {logoUrl && isSvg ? (
              <InlineSvg
                url={logoUrl}
                className="max-h-[2rem] [&_.lighten]:fill-white"
                title={site.logo?.alt || site.name}
              />
            ) : logoUrl ? (
              <Image
                src={logoUrl}
                alt={site.logo?.alt || site.name}
                width={224}
                height={32}
                className="h-6 w-auto"
              />
            ) : (
              <span className="font-bold">{site.name}</span>
            )}
          </Link>

          {/* Socials */}
          <div className="flex gap-3">
            {socialLinks.map(
              (social) =>
                social.url && (
                  <a
                    key={social.key}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="hover:opacity-75"
                  >
                    {social.icon}
                  </a>
                )
            )}
          </div>
        </div>

        {/* Menu */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-8">
          {menuColumns.map((menuItem) => (
            <div key={menuItem._key}>
              <h6 className="!text-inherit mb-3">{menuItem.text}</h6>
              {menuItem.childMenu?.length ? (
                <ul className="space-y-2">
                  {menuItem.childMenu.map((child) => (
                    <li key={child._key}>
                      <Link
                        href={getLinkByLinkObject(child.link) || '#'}
                        className="text-sm hover:underline"
                        {...(child.link?.openInNewTab && {
                          target: '_blank',
                          rel: 'noopener noreferrer',
                        })}
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
                >
                  {menuItem.text}
                </Link>
              ) : null}
            </div>
          ))}

          <div className='max-w-sm'>
            <h6 className='text-inherit'>Contact</h6>
            {settings?.footer?.content && (
              <PortableText value={settings.footer.content as PortableTextBlock[]} />
            )}
          </div>
        </div>

        {/* Footer bottom */}
        <div className="pt-5 border-t border-white text-xs">Copyright {new Date().getFullYear()} {settings.title}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
