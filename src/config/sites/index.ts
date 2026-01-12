export interface SiteTheme {
  primary: string;
  secondary: string;
}

export interface SiteConfig {
  id: string; // Also serves as the site slug (matches slug.current in Sanity)
  name: string;
  dataset: string;
  domains: string[];
  theme: SiteTheme;
}

export const sites: Record<string, SiteConfig> = {
  'western-lng': {
    id: 'western-lng',
    name: 'Western LNG',
    dataset: 'western-lng',
    domains: ['localhost', 'western-lng.localhost', 'western-lng', 'www.western-lng.com'],
    theme: {
      primary: '#FFC000',
      secondary: '#004578'
    },
  },
  'ksi-lisims-lng': {
    id: 'ksi-lisims-lng',
    name: 'KSI-LISIMS-LNG',
    dataset: 'western-lng',
    domains: ['ksi-lisims-lng.localhost', 'ksi-lisims.com', 'www.ksi-lisims.com'],
    theme: {
      primary: '#009ADA',
      secondary: '#00438C'
    },
  },
  'pgrt': {
    id: 'pgrt',
    name: 'PGRT',
    dataset: 'western-lng',
    domains: ['pgrt.localhost', 'pgrt.com', 'www.pgrt.com'],
    theme: {
      primary: '#1E40AF',
      secondary: '#0F172A'
    },
  },
};

export const allSites = Object.values(sites);

export const DEFAULT_SITE_ID = 'western-lng';

export function getSiteById(siteId: string): SiteConfig | undefined {
  return sites[siteId];
}

export function resolveSiteFromHostname(hostname: string): SiteConfig {
  const domain = hostname.split(':')[0];

  for (const site of allSites) {
    if (site.domains.includes(domain)) {
      return site;
    }
  }

  return sites[DEFAULT_SITE_ID];
}