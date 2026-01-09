export function createSiteInitialValue(siteId: string) {
  return async ({ getClient }: any) => {
    const client = getClient({ apiVersion: '2024-01-01' });
    const site = await client.fetch(
      `*[_type == "site" && slug.current == $siteId][0]._id`,
      { siteId }
    );

    return {
      site: site ? { _type: 'reference', _ref: site } : undefined,
    };
  };
}