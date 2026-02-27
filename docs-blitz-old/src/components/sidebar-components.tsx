'use client';

import { getCurrentImportParadigm } from '@/lib/import-paradigm';
import { cn, ImportParadigm } from '@/lib/utils';
import { Badge } from '@/registry/components/ui/badge';
import { SidebarPageTreeComponents } from 'fumadocs-ui/components/sidebar/page-tree';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Folder: SidebarPageTreeComponents['Folder'] = ({ children, item }) => {
  return (
    <div className="not-first:mt-8 flex flex-col gap-2">
      <div className="px-2 uppercase text-xs font-medium text-muted-foreground">{item.name}</div>
      <div className="[&_a]:text-foreground [&_a]:hover:text-foreground">{children}</div>
    </div>
  );
};

export const Item: SidebarPageTreeComponents['Item'] = ({ item }) => {
  const isComponentItem = item.url?.startsWith('/docs/components/');
  if (isComponentItem && item.url.includes(`AAA${ImportParadigm.Registry}/`)) {
    return null;
  }

  const importParadigm = getCurrentImportParadigm();
  let itemUrl = item.url;

  if (isComponentItem && importParadigm === ImportParadigm.Registry) {
    itemUrl = item.url.replace(ImportParadigm.Dependency, ImportParadigm.Registry);
  } else {
    itemUrl = item.url.replace(ImportParadigm.Registry, ImportParadigm.Dependency);
  }

  // If the item is a new component, add a new badge to the sidebar
  const isNew = newPages.some((page) => itemUrl?.endsWith(page));

  const pathname = usePathname();

  return (
    <Link
      href={itemUrl}
      className={cn('flex items-center justify-between py-2 ps-3 pe-2 -ml-1 rounded-lg', {
        'bg-muted': pathname === itemUrl,
      })}
    >
      <span>{item.name}</span>

      {isNew && (
        <Badge
          variant="secondary"
          className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 border-0"
        >
          New
        </Badge>
      )}
    </Link>
  );
};

const newPages: string[] = [];
