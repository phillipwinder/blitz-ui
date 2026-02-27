'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn, ImportParadigm, importParadigms } from '@/lib/utils';
import { getCurrentImportParadigm, IMPORT_PARADIGM_LOCALSTORAGE_KEY } from '@/lib/import-paradigm';
import { Icons } from './icons';
import { Zap } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@blitz-ui/react/tooltip';

export function DocsImportParadigmSwitcher({
  component,
  className,
}: {
  component: string;
  className?: string;
}) {
  const currentImportParadigm = getCurrentImportParadigm();

  // Sync the current import paradigm to localStorage to persist the user's choice across sessions and page reloads.
  React.useEffect(() => {
    const storedParadigm = localStorage.getItem(IMPORT_PARADIGM_LOCALSTORAGE_KEY);
    if (storedParadigm !== currentImportParadigm) {
      localStorage.setItem(IMPORT_PARADIGM_LOCALSTORAGE_KEY, currentImportParadigm);
    }
  }, [currentImportParadigm, component]);

  const persistChoice = React.useCallback((paradigmKey: string) => {
    try {
      localStorage.setItem(IMPORT_PARADIGM_LOCALSTORAGE_KEY, paradigmKey);
    } catch {
      // ignore (storage blocked, quota, private mode, etc.)
    }
  }, []);

  return (
    <div className={cn('inline-flex w-full items-center gap-6', className)}>
      <TooltipProvider delay={250}>
        {importParadigms.map((paradigm) => {
          const isActive = paradigm.key === currentImportParadigm;
          const href = `/docs/components/${paradigm.key}/${encodeURIComponent(component)}`;

          return (
            <Tooltip key={paradigm.key}>
              <TooltipTrigger
                render={
                  <Link
                    href={href}
                    // Persist ASAP on pointer interactions (more reliable than onClick)
                    onPointerDown={() => persistChoice(paradigm.key)}
                    // Persist for keyboard users (Enter / Space)
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') persistChoice(paradigm.key);
                    }}
                    data-active={isActive}
                    className={cn(
                      'text-muted-foreground hover:text-foreground data-[active=true]:text-foreground',
                      'after:bg-foreground relative inline-flex items-center justify-center gap-1',
                      'pt-1 pb-0.5 text-base font-medium transition-colors',
                      'after:absolute after:inset-x-0 after:bottom-[-4px] after:h-0.5 after:opacity-0 after:transition-opacity',
                      'data-[active=true]:after:opacity-100',
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {paradigm.title}
                    <div className="text-muted-foreground ml-auto size-4 shrink-0 opacity-80 [&_svg]:size-4">
                      {paradigm.key === ImportParadigm.Dependency && <Zap />}
                      {paradigm.key === ImportParadigm.Registry && <Icons.shadcn />}
                    </div>
                  </Link>
                }
              />
              <TooltipContent>
                {paradigm.key === ImportParadigm.Dependency && 'Import component as dependency'}
                {paradigm.key === ImportParadigm.Registry && 'Import component from registry'}
              </TooltipContent>
            </Tooltip>
          );
        })}
        {/* <div className="text-muted-foreground ml-auto size-4 shrink-0 opacity-80 [&_svg]:size-4">
        <Icons.logo />
      </div> */}
      </TooltipProvider>
    </div>
  );
}
