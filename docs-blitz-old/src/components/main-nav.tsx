'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn, isActive } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@blitz-ui/react/tooltip';

export function MainNav({
  items,
  className,
  ...props
}: React.ComponentProps<'nav'> & {
  items: { href: string; label: string; soon?: boolean }[];
}) {
  const pathname = usePathname();

  return (
    <nav className={cn('flex items-center gap-0.5', className)} {...props}>
      {items.map((item, i) => {
        const active = !item.soon && isActive(pathname, item.href);

        const button = (
          <Button
            variant="ghost"
            size="sm"
            className={cn('relative', active && 'bg-muted text-primary', item.soon && 'opacity-60')}
          >
            {item.soon ? <span>{item.label}</span> : <Link href={item.href}>{item.label}</Link>}
          </Button>
        );

        if (item.soon) {
          return (
            <Tooltip key={i}>
              <TooltipTrigger render={button} />
              <TooltipContent>Coming Soon!</TooltipContent>
            </Tooltip>
          );
        }

        return <React.Fragment key={item.href}>{button}</React.Fragment>;
      })}
    </nav>
  );
}
