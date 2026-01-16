import Link from 'next/link';
import Image from 'next/image';
import { siteSanityFetch } from '@/lib/sanity/client/fetch';
import { settingsQuery } from '@/lib/sanity/queries/queries';
import { urlForImage } from '@/lib/sanity/client/utils';
import NavBar from './NavBar';

export default async function Header() {
  const settings = await siteSanityFetch({
    query: settingsQuery,
    tags: ['settings'],
  });

  if (!settings || !settings.site) {
    return null;
  }

  const { site } = settings;
  const primaryColor = site.theme?.primary || '#000000';
  const logoUrl = site.logo ? urlForImage(site.logo)?.url() : null;

  return (
    <header className="w-screen z-999" style={{ backgroundColor: primaryColor }}>
      <div className="container mx-auto py-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link className="h-6 lg:h-7 inline-flex items-center justify-center" href="/">
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
          <NavBar menuItems={settings.menu || []} />
        </div>
        <div>
          <nav className='flex gap-4'>
            <Link className="p-4" href="/">
            mail
            </Link>
            <Link className="p-4" href="/">
            search
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
