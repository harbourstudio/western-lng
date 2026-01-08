import { defineEnableDraftMode } from 'next-sanity/draft-mode';
import { serverEnv } from '@/env/serverEnv';
import { getClient } from '@/lib/sanity/client/client';
import { headers } from 'next/headers';
import { getSiteById, DEFAULT_SITE_ID, resolveSiteFromHostname } from '@/config/sites';

/**
 * Site-aware draft mode enablement.
 * 
 * The challenge: This API route needs to know which site/dataset
 * to authenticate against, but it's called via the Sanity Studio
 * presentation tool iframe.
 * 
 * Solution: We check the 'origin' or 'referer' header to determine
 * which site is requesting draft mode.
 */
export async function GET(request: Request) {
  // Try to determine the site from the request
  const url = new URL(request.url);
  const headersList = await headers();
  
  // Check for site hint in query params (most reliable)
  let siteId = url.searchParams.get('siteId');
  
  // Fallback: try to get from referer/origin header
  if (!siteId) {
    const referer = headersList.get('referer') || headersList.get('origin') || '';
    try {
      const refererUrl = new URL(referer);
      const site = resolveSiteFromHostname(refererUrl.host);
      siteId = site.id;
    } catch {
      siteId = DEFAULT_SITE_ID;
    }
  }
  
  // Get the site-specific client
  const site = getSiteById(siteId) || getSiteById(DEFAULT_SITE_ID)!;
  const client = getClient(site.id);
  
  // Create the draft mode handler with the correct client
  const { GET: handler } = defineEnableDraftMode({
    client: client.withConfig({ token: serverEnv.SANITY_API_READ_TOKEN }),
  });
  
  return handler(request);
}