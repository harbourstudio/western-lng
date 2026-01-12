export function createSiteInitialValue(siteId: string) {
  return async (props: any, context: any) => {
    try {
      const client = context.getClient({ apiVersion: '2024-01-01' });
      const site = await client.fetch(
        `*[_type == "site" && slug.current == $siteId][0]._id`,
        { siteId }
      );

      return {
        site: site ? { _type: 'reference', _ref: site } : undefined,
      };
    } catch (error) {
      console.error('Error fetching site for initial value:', error);
      // Return empty object if fetching fails
      return {};
    }
  };
}