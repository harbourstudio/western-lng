import { defineLive } from 'next-sanity';
import { serverEnv } from '@/env/serverEnv';
import { getClient } from './client';
import { getSiteById, DEFAULT_SITE_ID, sites, type SiteConfig } from '@/config/sites';

/**
 * Cache for live configurations (one per site).
 */
const liveCache = new Map<string, ReturnType<typeof defineLive>>();

/**
 * Get the live configuration for a specific site.
 * This provides sanityFetch and SanityLive components configured for the site's dataset.
 */
export function getLive(siteId: string) {
  if (liveCache.has(siteId)) {
    return liveCache.get(siteId)!;
  }

  const client = getClient(siteId);

  const live = defineLive({
    client,
    serverToken: serverEnv.SANITY_API_READ_TOKEN,
    browserToken: serverEnv.SANITY_API_READ_TOKEN,
  });

  liveCache.set(siteId, live);
  return live;
}

/**
 * Default live configuration for backward compatibility.
 */
const defaultLive = getLive(DEFAULT_SITE_ID);

export const { sanityFetch, SanityLive } = defaultLive;