import { clientEnv } from '@/env/clientEnv';

type LinkType = {
  type?: string | null;
  external?: string | null;
  internal?: { _type: string; slug: string | null } | null;
};

export const getBaseURL = () => {
  return clientEnv.NEXT_PUBLIC_SITE_URL || '';
};

/**
 * Generic function to generate a link to a document based on its type and slug
 */
export const getDocumentLink = (
  { _type, slug }: { _type: string; slug: string | null },
  absolute: boolean = false,
) => {
  const linkBase = absolute ? getBaseURL() : '';

  switch (_type) {
    case 'page':
      return `${linkBase}/${slug}`;
    case 'post':
      return `${linkBase}/news/${slug}`;
    case 'category':
      return `${linkBase}/category/${slug}`;
    case 'blogPage':
      return `${linkBase}/news`;
    case 'homePage':
      return `${linkBase}/`;
    default:
      return `${linkBase}/`;
  }
};

export const getLinkByLinkObject = (link: LinkType) => {
  const { type, external, internal } = link;

  if (type === 'external') {
    return external || '';
  }

  if (type === 'internal' && internal) {
    return getDocumentLink(internal, false);
  }
};
