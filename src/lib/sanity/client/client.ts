import { createClient, type SanityClient } from 'next-sanity';
import { clientEnv } from '@/env/clientEnv';
import { getSiteById, DEFAULT_SITE_ID, sites } from '@/config/sites';

// Cache for client instances (one per dataset)
const clientCache = new Map<string, SanityClient>();

/**
 * Get a Sanity client for a specific site.
 * Clients are cached to avoid recreating them on every request.
 */
export function getClient(siteId: string): SanityClient {
  if (clientCache.has(siteId)) {
    return clientCache.get(siteId)!;
  }

  const site = getSiteById(siteId) || sites[DEFAULT_SITE_ID];

  const newClient = createClient({
    projectId: clientEnv.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: site.dataset,
    apiVersion: clientEnv.NEXT_PUBLIC_SANITY_API_VERSION,
    useCdn: true,
    perspective: 'published',
    stega: {
      studioUrl: clientEnv.NEXT_PUBLIC_SANITY_STUDIO_URL,
      filter: (props) => {
        if (props.sourcePath.at(-1) === 'title') {
          return true;
        }
        return props.filterDefault(props);
      },
    },
  });

  clientCache.set(siteId, newClient);
  return newClient;
}

/**
 * Default client for backward compatibility.
 * 
 * @deprecated Use getClient(siteId) instead for multi-site support.
 */
export const client = getClient(DEFAULT_SITE_ID);