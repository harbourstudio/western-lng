import Link from 'next/link';
import { siteSanityFetch } from '@/lib/sanity/client/fetch';
import { settingsQuery } from '@/lib/sanity/queries/queries';
import Logo from '../icons/Logo';
import NavBar from './NavBar';

export default async function Header() {
  const settings = await siteSanityFetch({
    query: settingsQuery,
    tags: ['settings'],
  });

  if (!settings) {
    return null;
  }

  return (
    <header className="w-screen z-999">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link className="h-6 lg:h-7 inline-flex items-center justify-center text-secondary" href="/">
            <Logo />
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
