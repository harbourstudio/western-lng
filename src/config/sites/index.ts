
export interface SiteTheme {
  primary: string;
  secondary: string;
}

export interface SiteSocials {
  facebook: string;
  linkedin: string;
  twitter: string;
}


export interface SiteConfig {
  id: string; // Also serves as the site slug (matches slug.current in Sanity)
  name: string;
  dataset: string;
  domains: string[];
  theme: SiteTheme;
  socials: SiteSocials;
}

export const sites: Record<string, SiteConfig> = {
  'western-lng': {
    id: 'western-lng',
    name: 'Western LNG',
    dataset: 'western-lng',
    domains: ['localhost', 'western-lng.localhost', 'western-lng', 'western-lng.com', 'western-lng.vercel.app'],
    theme: {
      primary: '#FFC000',
      secondary: '#004578'
    },
    socials: {
      facebook: '',
      linkedin: '',
      twitter: '',
    },
  },
  'ksi-lisims-lng': {
    id: 'ksi-lisims-lng',
    name: 'KSI-LISIMS-LNG',
    dataset: 'western-lng',
    domains: ['ksi-lisims-lng.localhost', 'ksi-lisims.com', 'ksi-lisims.com', 'ksi-lisims-lng.vercel.app'],
    theme: {
      primary: '#009ADA',
      secondary: '#00438C'
    },
    socials: {
      facebook: '',
      linkedin: '',
      twitter: '',
    },
  },
  'prgt': {
    id: 'prgt',
    name: 'PRGT',
    dataset: 'western-lng',
    domains: ['prgt.localhost', 'prgt.com', 'www.prgt.com', 'prgt.vercel.app'],
    theme: {
      primary: '#6290C8',
      secondary: '#002366'
    },
    socials: {
      facebook: '',
      linkedin: '',
      twitter: '',
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