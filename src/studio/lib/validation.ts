import { ValidationContext } from 'sanity';

interface SiteReference {
  _ref: string;
  _type: 'reference';
}

export async function isUniquePerSite(
  slug: string,
  context: ValidationContext
): Promise<true | string> {
  const { document, getClient } = context;

  if (!document) {
    return 'Document context is required';
  }

  const client = getClient({ apiVersion: '2024-01-01' });

  const site = document.site as SiteReference | undefined;

  if (!site?._ref) {
    return 'Site must be selected before validating slug';
  }

  const id = document._id.replace(/^drafts\./, '');
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
    siteId: site._ref,
    type: document._type,
  };

  // Query to find if slug exists for this site
  const query = `*[
    _type == $type &&
    !(_id in [$draft, $published]) &&
    slug.current == $slug &&
    site._ref == $siteId
  ][0]._id`;

  const duplicateId = await client.fetch(query, params);

  // If no duplicate found, slug is unique
  return !duplicateId ? true : 'Slug is already in use';
}