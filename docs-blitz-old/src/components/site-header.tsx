import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { source } from '@/lib/source';
import { Separator } from '@blitz-ui/react/separator';
import { GitHubLink } from '@/components/github-link';
import { MainNav } from '@/components/main-nav';
// import { MobileNav } from '@/components/mobile-nav';
// import { ModeSwitcher } from '@/components/mode-switcher';
import { XLink } from '@/components/x-link';
import { Zap } from 'lucide-react';
import { LargeSearchToggle } from './search-toggle';
import { ThemeToggle } from './theme-toggle';

export function SiteHeader() {
  const pageTree = source.getPageTree();
  // const patternCategories = getCategories();

  return (
    <header className="bg-background sticky top-0 z-40 w-full overscroll-none border-b border-transparent">
      <div className="container-wrapper">
        <div className="flex h-[calc(var(--header-height)-1px)] items-center gap-3.5 **:data-[slot=separator]:h-4!">
          <Link href="/" className="flex items-center gap-2">
            <Zap className="text-foreground/70 fill-foreground/10" />
            <span className="text-lg font-bold">{siteConfig.name}</span>
            <span className="sr-only">{siteConfig.name}</span>
          </Link>
          {/* <MobileNav tree={pageTree} items={siteConfig.navItems} className="flex lg:hidden" /> */}
          <div className="ml-auto flex items-center gap-1 md:flex-1 md:justify-end">
            <div className="mr-2 hidden w-full flex-1 md:flex md:w-auto md:flex-none">
              {/* <CommandMenu
                tree={pageTree}
                navItems={siteConfig.navItems}
                // patternCategories={patternCategories}
              /> */}
              <LargeSearchToggle className="rounded-xl" />
            </div>

            <MainNav items={siteConfig.navItems} className="hidden lg:flex" />

            <Separator orientation="vertical" className="hidden lg:flex" />

            <div className="flex items-center gap-0">
              <GitHubLink />
              <XLink />
              {/* <ModeSwitcher /> */}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
