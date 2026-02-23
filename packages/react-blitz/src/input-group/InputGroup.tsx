'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/utils';
import { Button } from '../button';
import { Input } from '../input';
import { Textarea } from '../textarea';

function InputGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        'group/input-group cn-input-group relative flex w-full min-w-0 items-center outline-none has-[>textarea]:h-auto',
        className,
      )}
      {...props}
    />
  );
}

const inputGroupAddonVariants = cva(
  'cn-input-group-addon flex cursor-text items-center justify-center select-none',
  {
    variants: {
      align: {
        'inline-start': 'cn-input-group-addon-align-inline-start order-first',
        'inline-end': 'cn-input-group-addon-align-inline-end order-last',
        'block-start': 'cn-input-group-addon-align-block-start order-first w-full justify-start',
        'block-end': 'cn-input-group-addon-align-block-end order-last w-full justify-start',
      },
    },
    defaultVariants: {
      align: 'inline-start',
    },
  },
);

function InputGroupAddon({
  className,
  align = 'inline-start',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof inputGroupAddonVariants>) {
  // Make the addon accessible: use a button if interactive, or remove click handler if not.
  // Also, avoid restricted identifier 'e' by using 'event'.
  // If you want the addon to be focusable and interactive, use a <button> instead of <div>.
  // Here, we keep <div> but add keyboard support and fix identifier names.

  const handleAddonClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('button')) {
      return;
    }
    event.currentTarget.parentElement?.querySelector('input')?.focus();
  };

  const handleAddonKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.currentTarget.parentElement?.querySelector('input')?.focus();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Focus input"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={handleAddonClick}
      onKeyDown={handleAddonKeyDown}
      {...props}
    />
  );
}

const inputGroupButtonVariants = cva('cn-input-group-button shadow-none flex items-center', {
  variants: {
    size: {
      xs: 'cn-input-group-button-size-xs',
      sm: 'cn-input-group-button-size-sm',
      'icon-xs': 'cn-input-group-button-size-icon-xs',
      'icon-sm': 'cn-input-group-button-size-icon-sm',
    },
  },
  defaultVariants: {
    size: 'xs',
  },
});

function InputGroupButton({
  className,
  type = 'button',
  variant = 'ghost',
  size = 'xs',
  ...props
}: Omit<React.ComponentProps<typeof Button>, 'size' | 'type'> &
  VariantProps<typeof inputGroupButtonVariants> & {
    type?: 'button' | 'submit' | 'reset';
  }) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  );
}

function InputGroupText({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn('cn-input-group-text flex items-center [&_svg]:pointer-events-none', className)}
      {...props}
    />
  );
}

function InputGroupInput({ className, ...props }: React.ComponentProps<'input'>) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn('cn-input-group-input flex-1', className)}
      {...props}
    />
  );
}

function InputGroupTextarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn('cn-input-group-textarea flex-1 resize-none', className)}
      {...props}
    />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
};
