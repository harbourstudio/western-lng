// src/app/(frontend)/layout.tsx
import '../globals.css';

import { draftMode } from 'next/headers';
import dynamic from 'next/dynamic';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Main from '@/components/layout/Main';
import PreFooter from '@/components/layout/PreFooter';
import { getLive } from '@/lib/sanity/client/live';
import { handleError } from './client-utils';
import { getCurrentSite } from '@/lib/get-current-site.app';

const DraftModeToast = dynamic(() => import('@/components/modules/DraftModeToast'));
const Toaster = dynamic(() => import('sonner').then((mod) => mod.Toaster));
const VisualEditing = dynamic(() => import('next-sanity').then((mod) => mod.VisualEditing));

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled: isDraftMode } = await draftMode();
  const site = await getCurrentSite();
  
  // Get site-specific SanityLive component
  const { SanityLive } = getLive(site.id);

  return (
    <>
      {/* Inject site-specific CSS variables */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            :root {
              --color-primary: ${site.theme.primary};
              --color-secondary: ${site.theme.secondary};
            }
          `,
        }}
      />

      {/* Site Indicator Banner */}
      {/* <div className='text-white'
        style={{ backgroundColor: site.theme.primary}}
      >
        Current Site: <strong>{site.name}</strong> | Dataset: <strong>{site.dataset}</strong>
      </div> */}

      <section className="min-h-screen max-w-full overflow-hidden">
        <Toaster />
        {isDraftMode && (
          <>
            <DraftModeToast />
            <VisualEditing />
          </>
        )}
        {isDraftMode && <SanityLive onError={handleError} />}
        <Header />
        <Main>{children}</Main>
        <PreFooter />
        <Footer />
      </section>
    </>
  );
}