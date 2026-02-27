import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export function XLink() {
  return (
    <Button
      size="sm"
      variant="ghost"
      className="h-8 shadow-none"
      render={
        <Link href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
          <Icons.twitter className="size-3.25" />
          <span className="sr-only">X</span>
        </Link>
      }
    />
  );
}
