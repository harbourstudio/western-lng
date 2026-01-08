import { headers } from 'next/headers';
import {
  getSiteById,
  DEFAULT_SITE_ID,
  sites,
  type SiteConfig,
} from '@/config/sites';
import { SITE_ID_HEADER } from '@/middleware';

export async function getCurrentSite(): Promise<SiteConfig> {
  const headersList = await headers();
  const siteId = headersList.get(SITE_ID_HEADER) || DEFAULT_SITE_ID;
  return getSiteById(siteId) || sites[DEFAULT_SITE_ID];
}