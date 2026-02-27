'use client';

import { cn } from '@/lib/utils';
import { ComponentProps, JSX } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@blitz-ui/react/tooltip';

export function TooltipWrapper({
  label,
  command,
  className,
  children,
  ...props
}: ComponentProps<typeof TooltipTrigger> & {
  children: JSX.Element;
  label: string;
  command?: React.ReactNode;
}) {
  return (
    <Tooltip key={label}>
      <TooltipTrigger render={children} className={cn(className)} {...props} />

      <TooltipContent>
        <span className="flex items-center gap-[1ch]">
          {label}
          {command && (
            <kbd className="bg-muted text-muted-foreground flex items-center gap-[0.5ch] rounded px-1.5 py-0.5 font-mono text-xs [&>svg]:size-3">
              {command}
            </kbd>
          )}
        </span>
      </TooltipContent>
    </Tooltip>
  );
}
