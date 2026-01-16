import Image from 'next/image';
import Link from 'next/link';
import { siteSanityFetch } from '@/lib/sanity/client/fetch';
import { settingsQuery } from '@/lib/sanity/queries/queries';
import { urlForImage } from '@/lib/sanity/client/utils';
import { getLinkByLinkObject } from '@/lib/links';

export default async function Footer() {
  const settings = await siteSanityFetch({
    query: settingsQuery,
    tags: ['settings'],
  });

  if (!settings || !settings.site) {
    return null;
  }

  const { site } = settings;
  const secondaryColor = site.theme?.secondary || '#000000';
  const logoUrl = site.logo ? urlForImage(site.logo)?.url() : null;
  const menuItems = settings.menu || [];

  // Group menu items into columns (max 4 columns for menu, 5th is contact)
  const menuColumns = menuItems.slice(0, 4);

  return (
    <footer className="text-white [&_h1,h2,h3,h4,h5,h6]:!text-white pt-9 pb-5" style={{ backgroundColor: secondaryColor }}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
          <Link href="/" className="inline-flex">
            {logoUrl ? (
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
              <svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <title>Facebook</title>
                <path d="M2.5 9.375H0.4375V6.3125H2.5V5C2.5 1.59375 4.03125 0 7.375 0C8 0 9.09375 0.125 9.53125 0.25V3.03125C9.3125 3 8.90625 3 8.375 3C6.75 3 6.125 3.625 6.125 5.21875V6.3125H9.375L8.8125 9.375H6.125V16H2.5V9.375Z" fill="white"/>
                </svg>
              <svg width="15" height="16" viewBox="0 0 15 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <title>Instagram</title>
                <path d="M7.03125 4.40625C9 4.40625 10.625 6.03125 10.625 8C10.625 10 9 11.5938 7.03125 11.5938C5.03125 11.5938 3.4375 10 3.4375 8C3.4375 6.03125 5.03125 4.40625 7.03125 4.40625ZM7.03125 10.3438C8.3125 10.3438 9.34375 9.3125 9.34375 8C9.34375 6.71875 8.3125 5.6875 7.03125 5.6875C5.71875 5.6875 4.6875 6.71875 4.6875 8C4.6875 9.3125 5.75 10.3438 7.03125 10.3438ZM11.5938 4.28125C11.5938 3.8125 11.2188 3.4375 10.75 3.4375C10.2812 3.4375 9.90625 3.8125 9.90625 4.28125C9.90625 4.75 10.2812 5.125 10.75 5.125C11.2188 5.125 11.5938 4.75 11.5938 4.28125ZM13.9688 5.125C14.0312 6.28125 14.0312 9.75 13.9688 10.9062C13.9062 12.0312 13.6562 13 12.8438 13.8438C12.0312 14.6562 11.0312 14.9062 9.90625 14.9688C8.75 15.0312 5.28125 15.0312 4.125 14.9688C3 14.9062 2.03125 14.6562 1.1875 13.8438C0.375 13 0.125 12.0312 0.0625 10.9062C0 9.75 0 6.28125 0.0625 5.125C0.125 4 0.375 3 1.1875 2.1875C2.03125 1.375 3 1.125 4.125 1.0625C5.28125 1 8.75 1 9.90625 1.0625C11.0312 1.125 12.0312 1.375 12.8438 2.1875C13.6562 3 13.9062 4 13.9688 5.125ZM12.4688 12.125C12.8438 11.2188 12.75 9.03125 12.75 8C12.75 7 12.8438 4.8125 12.4688 3.875C12.2188 3.28125 11.75 2.78125 11.1562 2.5625C10.2188 2.1875 8.03125 2.28125 7.03125 2.28125C6 2.28125 3.8125 2.1875 2.90625 2.5625C2.28125 2.8125 1.8125 3.28125 1.5625 3.875C1.1875 4.8125 1.28125 7 1.28125 8C1.28125 9.03125 1.1875 11.2188 1.5625 12.125C1.8125 12.75 2.28125 13.2188 2.90625 13.4688C3.8125 13.8438 6 13.75 7.03125 13.75C8.03125 13.75 10.2188 13.8438 11.1562 13.4688C11.75 13.2188 12.25 12.75 12.4688 12.125Z" fill="white"/>
                </svg>

              <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <title>LinkedIn</title>
                <path d="M3.125 14H0.21875V4.65625H3.125V14ZM1.65625 3.40625C0.75 3.40625 0 2.625 0 1.6875C0 1.09375 0.3125 0.53125 0.8125 0.25C1.34375 -0.0625 2 -0.0625 2.5 0.25C3.03125 0.53125 3.34375 1.09375 3.34375 1.6875C3.34375 2.625 2.59375 3.40625 1.65625 3.40625ZM13.9688 14H11.0938V9.46875C11.0938 8.375 11.0625 7 9.5625 7C8.0625 7 7.84375 8.15625 7.84375 9.375V14H4.9375V4.65625H7.71875V5.9375H7.75C8.15625 5.21875 9.09375 4.4375 10.5 4.4375C13.4375 4.4375 14 6.375 14 8.875V14H13.9688Z" fill="white"/>
              </svg>

              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <title>Twitter</title>
                <path d="M12.1562 1.5H14.3438L9.53125 7.03125L15.2188 14.5H10.7812L7.28125 9.96875L3.3125 14.5H1.09375L6.25 8.625L0.8125 1.5H5.375L8.5 5.65625L12.1562 1.5ZM11.375 13.1875H12.5938L4.71875 2.75H3.40625L11.375 13.1875Z" fill="white"/>
              </svg>

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
