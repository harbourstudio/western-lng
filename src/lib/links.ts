import { clientEnv } from '@/env/clientEnv';

type LinkType = {
  type?: string | null;
  external?: string | null;
  href?: string | null;
  internal?: 
    | { _type: string; slug: string | null; _id?: string }
    | { _ref: string; _type: 'reference' }
    | null;
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

type LinkType = {
  type?: string | null;
  external?: string | null;
  href?: string | null;
  internal?: 
    | { _type: string; slug: string | null; _id?: string }
    | { _ref: string; _type: 'reference' }
    | null;
};

export const getLinkByLinkObject = (link: LinkType) => {
  const { type, external, href, internal } = link;
  
  if (type === 'external') {
    const externalUrl = external || href || '/';
    // Don't return # as a valid external link
    return externalUrl === '#' ? '/' : externalUrl;
  }
  
  if (type === 'internal' && internal) {
    // Check if it's a reference that wasn't dereferenced
    if ('_ref' in internal) {
      console.error('Internal link was not dereferenced. Check your GROQ query for proper -> usage:', internal);
      return '/';
    }
    
    // At this point, internal should have slug
    if (!internal.slug) {
      console.warn('Internal link missing slug:', internal);
      return '/';
    }
    
    return getDocumentLink(internal, false);
  }
  
  return '/';
};
