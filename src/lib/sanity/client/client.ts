import { createClient, type SanityClient } from 'next-sanity';
import { clientEnv } from '@/env/clientEnv';

const DATASET = 'western-lng'; // Shared dataset

let cachedClient: SanityClient | null = null;

export function getClient(siteId?: string): SanityClient {
  if (cachedClient) return cachedClient;

  cachedClient = createClient({
    projectId: clientEnv.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: DATASET,
    apiVersion: clientEnv.NEXT_PUBLIC_SANITY_API_VERSION,
    useCdn: true,
    perspective: 'published',
    stega: {
      studioUrl: clientEnv.NEXT_PUBLIC_SANITY_STUDIO_URL,
      filter: (props) => {
        if (props.sourcePath.at(-1) === 'title') return true;
        return props.filterDefault(props);
      },
    },
  });

  return cachedClient;
}

export const client = getClient();