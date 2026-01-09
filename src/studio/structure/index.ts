import { CogIcon, DocumentIcon, HomeIcon } from '@sanity/icons';
import type { StructureResolver } from 'sanity/structure';
import { createSiteStructure } from './createSiteStructure';

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */
export const structure = createSiteStructure('western-lng');