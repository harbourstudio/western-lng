'use client';

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
import { structure } from './src/studio/structure';

const homeLocation = {
  title: 'Home',
  href: '/',
} satisfies DocumentLocation;

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

// Shared resolve configuration for presentation tool
const sharedResolve = {
  mainDocuments: defineDocuments([
    {
      route: '/:slug',
      filter: `_type == "page" && slug.current == $slug || _id == $slug`,
    },
    {
      route: '/blog/:slug',
      filter: `_type == "post" && slug.current == $slug || _id == $slug`,
    },
  ]),
  locations: {
    settings: defineLocations({
      locations: [homeLocation],
      message: 'This document is used on all pages',
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
            title: 'Home',
            href: '/',
          } satisfies DocumentLocation,
        ].filter(Boolean) as DocumentLocation[],
      }),
    }),
  },
};

// Plugins that don't need site-specific config
const sharedPlugins = [
  structureTool({ structure }),
  assist(),
  visionTool(),
];

// Create presentation tool for a specific site
function createPresentationTool(siteId: string, previewOrigin: string) {
  return presentationTool({
    previewUrl: {
      origin: previewOrigin,
      previewMode: {
        enable: `/api/draft-mode/enable?siteId=${siteId}`,
      },
    },
    resolve: sharedResolve,
  });
}

export default defineConfig([
  {
    name: 'western-lng',
    title: 'Western LNG',
    basePath: '/studio/western-lng',
    projectId: clientEnv.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: 'western-lng',
    plugins: [
      createPresentationTool('western-lng', 'http://localhost:3000'),
      ...sharedPlugins,
    ],
    schema: {
      types: schemaTypes,
    },
  },
  {
    name: 'ksi-lisims-lng',
    title: 'KSI-LISIMS-LNG',
    basePath: '/studio/ksi-lisims-lng',
    projectId: clientEnv.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: 'ksi-lisims-lng',
    plugins: [
      createPresentationTool('ksi-lisims-lng', 'http://ksi-lisims-lng.localhost:3000'),
      ...sharedPlugins,
    ],
    schema: {
      types: schemaTypes,
    },
  },
]);