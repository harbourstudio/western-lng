import { CogIcon, DocumentIcon, HomeIcon } from '@sanity/icons';
import type { StructureResolver } from 'sanity/structure';

export function createSiteStructure(siteId: string): StructureResolver {
  return (S) =>
    S.list()
      .title('Website Content')
      .items([
        // Singletons
        S.listItem()
          .title('Home')
          .child(
            S.documentList()
              .title('Home Page')
              .filter(`_type == "homePage" && site->slug.current == $siteId`)
              .params({ siteId })
          )
          .icon(HomeIcon),
        S.listItem()
          .title('Blog Page')
          .child(
            S.documentList()
              .title('Blog Page')
              .filter(`_type == "blogPage" && site->slug.current == $siteId`)
              .params({ siteId })
          )
          .icon(DocumentIcon),

        S.divider(),

        // Documents
        S.listItem()
          .title('Pages')
          .schemaType('page')
          .child(
            S.documentList()
              .title('Pages')
              .filter(`_type == "page" && site->slug.current == $siteId`)
              .params({ siteId })
          ),
        S.listItem()
          .title('Posts')
          .schemaType('post')
          .child(
            S.documentList()
              .title('Posts')
              .filter(`_type == "post" && site->slug.current == $siteId`)
              .params({ siteId })
          ),
        S.listItem()
          .title('Categories')
          .schemaType('category')
          .child(
            S.documentList()
              .title('Categories')
              .filter(`_type == "category" && site->slug.current == $siteId`)
              .params({ siteId })
          ),
        S.listItem()
          .title('People')
          .schemaType('person')
          .child(
            S.documentList()
              .title('People')
              .filter(`_type == "person" && site->slug.current == $siteId`)
              .params({ siteId })
          ),

        S.divider(),

        S.listItem()
          .title('Site Settings')
          .child(
            S.documentList()
              .title('Site Settings')
              .filter(`_type == "settings" && site->slug.current == $siteId`)
              .params({ siteId })
          )
          .icon(CogIcon),

        S.divider(),

        S.listItem()
          .title('All Sites')
          .child(S.documentTypeList('site').title('All Sites')),
      ]);
}