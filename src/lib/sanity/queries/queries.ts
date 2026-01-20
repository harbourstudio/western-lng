import { defineQuery } from 'next-sanity';
import {
  categoryFragment,
  menuFragment,
  pageFragment,
  personFragment,
  postCardFragment,
  postFragment,
} from './fragments/fragments';

export const settingsQuery = defineQuery(`*[_type == "settings" && (!defined(site) || site->slug.current == $site)][0]{
  title,
  description,
  preFooter {
    heading,
    content,
    image {
      asset,
      alt
    }
  },
  site->{
    name,
    logo {
      asset,
      alt
    },
    theme {
      primary,
      secondary
    }
  },
  ${menuFragment}
}`);

export const homePageQuery = defineQuery(`*[_type == "homePage" && (!defined(site) || site->slug.current == $site)][0]{
  _id,
  _type,
  ...,
  ${pageFragment}
}`);

export const blogPageQuery = defineQuery(`*[_type == "blogPage" && (!defined(site) || site->slug.current == $site)][0]{
  _id,
  _type,
  ...,
  ${pageFragment}
}`);

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug && site->slug.current == $site][0]{
    _id,
    _type,
    name,
    slug,
    ${pageFragment}
  }
`);

export const getSitemapQuery = defineQuery(`
  *[((_type in ["page", "post"] && defined(slug.current)) || (_type == "homePage")) && seo.noIndex != true && site->slug.current == $site]{
    "href": select(
      _type == "page" => "/" + slug.current,
      _type == "post" => "/posts/" + slug.current,
      _type == "homePage" => "/",
      slug.current
    ),
    _updatedAt
  }
`);

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug && site->slug.current == $site] [0] {
    ${postFragment}
  }
`);

export const categoryQuery = defineQuery(`
  *[_type == "category" && slug.current == $slug && site->slug.current == $site] [0] {
    ${categoryFragment}
  }
`);

export const personQuery = defineQuery(`
  *[_type == "person" && slug.current == $slug && site->slug.current == $site] [0] {
    ${personFragment}
  }
`);

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current) && site->slug.current == $site][0..$limit].slug.current
`);

export const categorySlugs = defineQuery(`
  *[_type == "category" && defined(slug.current) && site->slug.current == $site][0..$limit].slug.current
`);

export const allCategoriesQuery = defineQuery(`
  *[_type == "category" && site->slug.current == $site] | order(title asc) {
    _id,
    title,
    "slug": slug.current
  }
`);

export const personSlugs = defineQuery(`
  *[_type == "person" && defined(slug.current) && site->slug.current == $site][0..$limit].slug.current
`);

export const postsArchiveQuery = defineQuery(`
  {
    "allResults": *[
      _type == "post"
      &&
      site->slug.current == $site
      &&
      (
        !defined($filters.categorySlugs) || count($filters.categorySlugs) == 0 || references(*[_type == "category" && slug.current in $filters.categorySlugs && site->slug.current == $site]._id)
      )
      &&
      (
        !defined($filters.personSlug) || references(*[_type == "person" && slug.current == $filters.personSlug && site->slug.current == $site]._id)
      )
      &&
      (
        !defined($filters.search) || title match $filters.search + "*" || pt::text(content) match $filters.search + "*"
      )
      &&
      (
        !defined($filters.dateFilters) || count($filters.dateFilters) == 0 || (string::split(date, "-")[0] + "-" + string::split(date, "-")[1]) in $filters.dateFilters
      )
    ] | order(date desc, _createdAt desc, _id desc)
  }
  {
    "total": count(allResults),
    "results": allResults[$from..$to] {
      ${postCardFragment}
    }
  }
`);
