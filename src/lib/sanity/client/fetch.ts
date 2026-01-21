import { getCurrentSite } from '@/lib/get-current-site.app';
import { getLive } from './live';

/**
 * Site-aware sanityFetch that automatically uses the current site's dataset.
 * Use this in server components instead of the default sanityFetch.
 * Automatically injects the $site parameter based on the current site context.
 */
export async function siteSanityFetch<T>(options: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
}): Promise<T> {
  const site = await getCurrentSite();
  const { sanityFetch } = getLive(site.id);

  // Auto-inject site slug into all queries
  const paramsWithSite = {
    ...options.params,
    site: site.id, // Matches site->slug.current in GROQ queries
  };

  const result = await sanityFetch({
    query: options.query,
    params: paramsWithSite,
    tag: options.tags?.join(','),
  });

  return result.data as T;
}