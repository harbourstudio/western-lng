import { defineLive } from 'next-sanity';
import { serverEnv } from '@/env/serverEnv';
import { getClient } from './client';

let cachedLive: ReturnType<typeof defineLive> | null = null;

export function getLive(siteId?: string) {
  if (cachedLive) return cachedLive;

  const client = getClient();

  cachedLive = defineLive({
    client,
    serverToken: serverEnv.SANITY_API_READ_TOKEN,
    browserToken: serverEnv.SANITY_API_READ_TOKEN,
  });

  return cachedLive;
}

const { sanityFetch, SanityLive } = getLive();
export { sanityFetch, SanityLive };