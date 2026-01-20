'use client';

/**
 * This config is used to configure your Sanity Studio.
 * Learn more: https://www.sanity.io/docs/configuration
 */

import { assist } from '@sanity/assist';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import {
  type DocumentLocation,
  defineDocuments,
  defineLocations,
  presentationTool,
} from 'sanity/presentation';
import { structureTool } from 'sanity/structure';
import { clientEnv } from '@/env/clientEnv';
import { schemaTypes } from './src/studio/schema';
import { createSiteStructure } from './src/studio/structure/createSiteStructure';
import { createSiteInitialValue } from './src/studio/lib/initialValues';

// Define the home location for the presentation tool
const homeLocation = {
  title: 'Home',
  href: '/',
} satisfies DocumentLocation;

// resolveHref() is a convenience function that resolves the URL
// path for different document types and used in the presentation tool.
function resolveHref(documentType?: string, slug?: string): string | undefined {
  switch (documentType) {
    case 'post':
      return slug ? `/blog/${slug}` : undefined;
    case 'page':
      return slug ? `/${slug}` : undefined;
    default:
      console.warn('Invalid document type:', documentType);
      return undefined;
  }
}
const SHARED_DATASET = 'western-lng'; // Using existing dataset as shared

// Helper function to create presentation tool configuration for each workspace
function createPresentationTool(siteSlug: string, previewOrigin: string) {
  return presentationTool({
    previewUrl: {
      origin: previewOrigin,
      previewMode: {
        enable: '/api/draft-mode/enable',
      },
    },
    resolve: {
      // The Main Document Resolver API provides a method of resolving a main document from a given route or route pattern.
      mainDocuments: defineDocuments([
        {
          route: '/',
          filter: `_type == "homePage" && site->slug.current == "${siteSlug}"`,
        },
        {
          route: '/news',
          filter: `_type == "blogPage" && site->slug.current == "${siteSlug}"`,
        },
        {
          route: '/:slug',
          filter: `_type == "page" && slug.current == $slug && site->slug.current == "${siteSlug}"`,
        },
        {
          route: '/news/:slug',
          filter: `_type == "post" && slug.current == $slug && site->slug.current == "${siteSlug}"`,
        },
      ]),
      // Locations Resolver API allows you to define where data is being used in your application.
      locations: {
        settings: defineLocations({
          locations: [homeLocation],
          message: 'This document is used on all pages',
          tone: 'positive',
        }),
        homePage: defineLocations({
          locations: [homeLocation],
          message: 'This is the home page',
          tone: 'positive',
        }),
        blogPage: defineLocations({
          locations: [
            {
              title: 'News',
              href: '/news',
            },
          ],
          message: 'This is the blog/news page',
          tone: 'positive',
        }),
        page: defineLocations({
          select: {
            name: 'name',
            slug: 'slug.current',
          },
          resolve: (doc) => ({
            locations: [
              {
                title: doc?.name || 'Untitled',
                href: resolveHref('page', doc?.slug)!,
              },
            ],
          }),
        }),
        post: defineLocations({
          select: {
            title: 'title',
            slug: 'slug.current',
          },
          resolve: (doc) => ({
            locations: [
              {
                title: doc?.title || 'Untitled',
                href: resolveHref('post', doc?.slug)!,
              },
              {
                title: 'News',
                href: '/news',
              } satisfies DocumentLocation,
            ].filter(Boolean) as DocumentLocation[],
          }),
        }),
      },
    },
  });
}

// Main Sanity configuration with 3 workspaces
export default defineConfig([
  {
    name: 'western-lng',
    title: 'Western LNG',
    basePath: '/studio/western-lng',
    projectId: clientEnv.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: SHARED_DATASET,
    plugins: [
      createPresentationTool('western-lng', 'http://localhost:3000'),
      structureTool({
        structure: createSiteStructure('western-lng'),
      }),
      assist(),
      visionTool(),
    ],
    schema: {
      types: schemaTypes,
      templates: (prev) => [
        ...prev.filter((template) =>
          !['page', 'post', 'category', 'person'].includes(template.schemaType || '')
        ),
        {
          id: 'page-western-lng',
          title: 'Page',
          schemaType: 'page',
          value: createSiteInitialValue('western-lng'),
        },
        {
          id: 'post-western-lng',
          title: 'Post',
          schemaType: 'post',
          value: createSiteInitialValue('western-lng'),
        },
        {
          id: 'category-western-lng',
          title: 'Category',
          schemaType: 'category',
          value: createSiteInitialValue('western-lng'),
        },
        {
          id: 'person-western-lng',
          title: 'Person',
          schemaType: 'person',
          value: createSiteInitialValue('western-lng'),
        },
      ],
    },
  },
  {
    name: 'ksi-lisims-lng',
    title: 'KSI-LISIMS-LNG',
    basePath: '/studio/ksi-lisims-lng',
    projectId: clientEnv.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: SHARED_DATASET,
    plugins: [
      createPresentationTool('ksi-lisims-lng', 'http://ksi-lisims-lng.localhost:3000'),
      structureTool({
        structure: createSiteStructure('ksi-lisims-lng'),
      }),
      assist(),
      visionTool(),
    ],
    schema: {
      types: schemaTypes,
      templates: (prev) => [
        ...prev.filter((template) =>
          !['page', 'post', 'category', 'person'].includes(template.schemaType || '')
        ),
        {
          id: 'page-ksi-lisims-lng',
          title: 'Page',
          schemaType: 'page',
          value: createSiteInitialValue('ksi-lisims-lng'),
        },
        {
          id: 'post-ksi-lisims-lng',
          title: 'Post',
          schemaType: 'post',
          value: createSiteInitialValue('ksi-lisims-lng'),
        },
        {
          id: 'category-ksi-lisims-lng',
          title: 'Category',
          schemaType: 'category',
          value: createSiteInitialValue('ksi-lisims-lng'),
        },
        {
          id: 'person-ksi-lisims-lng',
          title: 'Person',
          schemaType: 'person',
          value: createSiteInitialValue('ksi-lisims-lng'),
        },
      ],
    },
  },
  {
    name: 'prgt',
    title: 'PRGT',
    basePath: '/studio/prgt',
    projectId: clientEnv.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: SHARED_DATASET,
    plugins: [
      createPresentationTool('prgt', 'http://prgt.localhost:3000'),
      structureTool({
        structure: createSiteStructure('prgt'),
      }),
      assist(),
      visionTool(),
    ],
    schema: {
      types: schemaTypes,
      templates: (prev) => [
        ...prev.filter((template) =>
          !['page', 'post', 'category', 'person'].includes(template.schemaType || '')
        ),
        {
          id: 'page-prgt',
          title: 'Page',
          schemaType: 'page',
          value: createSiteInitialValue('prgt'),
        },
        {
          id: 'post-prgt',
          title: 'Post',
          schemaType: 'post',
          value: createSiteInitialValue('prgt'),
        },
        {
          id: 'category-prgt',
          title: 'Category',
          schemaType: 'category',
          value: createSiteInitialValue('prgt'),
        },
        {
          id: 'person-prgt',
          title: 'Person',
          schemaType: 'person',
          value: createSiteInitialValue('prgt'),
        },
      ],
    },
  },
]);
