import { getCurrentSite } from '@/lib/get-current-site';
import { getLive } from './live';

/**
 * Site-aware sanityFetch that automatically uses the current site's dataset.
 * Use this in server components instead of the default sanityFetch.
 */
export async function siteSanityFetch<T>(options: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
}): Promise<T> {
  const site = await getCurrentSite();
  const { sanityFetch } = getLive(site.id);
  
  return sanityFetch<T>({
    query: options.query,
    params: options.params,
    tag: options.tags?.join(','),
  }) as Promise<T>;
}