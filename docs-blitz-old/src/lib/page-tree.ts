import type { source } from '@/lib/source';
import { DEFAULT_CONFIG } from '@/hooks/use-config';
import { ImportParadigm } from './utils';

export type PageTreeNode = (typeof source.pageTree)['children'][number];
export type PageTreeFolder = Extract<PageTreeNode, { type: 'folder' }>;
export type PageTreePage = Extract<PageTreeNode, { type: 'page' }>;

// Recursively find all pages in a folder tree.
function getAllPagesFromFolder(folder: PageTreeFolder): PageTreePage[] {
  const pages: PageTreePage[] = [];

  for (const child of folder.children) {
    if (child.type === 'page') {
      pages.push(child);
    } else if (child.type === 'folder') {
      pages.push(...getAllPagesFromFolder(child));
    }
  }

  return pages;
}

// Get the pages from a folder, handling nested base folders (dependency/registry).
export function getPagesFromFolder(folder: PageTreeFolder, currentBase: string): PageTreePage[] {
  // For the components folder, find the base subfolder.
  if (folder.$id === 'components' || folder.name === 'Components') {
    for (const child of folder.children) {
      if (child.type === 'folder') {
        // Match by $id or by name.
        const isRadix = child.$id === ImportParadigm.Dependency || child.name === 'Dependency';
        const isBase = child.$id === ImportParadigm.Registry || child.name === 'Registry';

        if (
          (currentBase === ImportParadigm.Dependency && isRadix) ||
          (currentBase === ImportParadigm.Registry && isBase)
        ) {
          return child.children.filter((c): c is PageTreePage => c.type === 'page');
        }
      }
    }

    // Fallback: return all pages from nested folders.
    return getAllPagesFromFolder(folder).filter((page) => !page.url.endsWith('/components'));
  }

  // For other folders, return direct page children.
  return folder.children.filter((child): child is PageTreePage => child.type === 'page');
}

// Get current base (dependency or registry) from pathname.
export function getCurrentBase(pathname: string): string {
  const baseMatch = pathname.match(/\/docs\/(dependency|registry)\//);
  return baseMatch ? baseMatch[1] : DEFAULT_CONFIG.base; // Default to base.
}
