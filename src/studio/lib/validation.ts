import { ValidationContext } from 'sanity';

export async function isUniquePerSite(
  slug: string,
  context: ValidationContext
): Promise<boolean | string> {
  const { document, getClient } = context;
  const client = getClient({ apiVersion: '2024-01-01' });

  if (!document?.site?._ref) {
    return 'Site must be selected before validating slug';
  }

  const id = document._id.replace(/^drafts\./, '');
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
    siteId: document.site._ref,
    type: document._type,
  };

  const query = `!defined(*[
    _type == $type &&
    !(_id in [$draft, $published]) &&
    slug.current == $slug &&
    site._ref == $siteId
  ][0]._id)`;

  const result = await client.fetch(query, params);
  return result ? true : 'Slug already exists for this site';
}