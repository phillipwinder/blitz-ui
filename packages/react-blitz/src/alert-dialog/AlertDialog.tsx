'use client';

import * as React from 'react';
import { AlertDialog as AlertDialogPrimitive } from '@base-ui/react/alert-dialog';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/registry/components/ui/button';

function resolveClassName<State>(
  className: string | ((state: State) => string | undefined) | undefined,
  state: State,
) {
  return typeof className === 'function' ? className(state) : className;
}

interface UnstyledProps {
  unstyled?: boolean;
}

const UnstyledContext = React.createContext<{ unstyled: boolean } | undefined>(undefined);

function useAlertDialogContext() {
  const context = React.useContext(UnstyledContext);
  if (context === undefined) {
    throw new Error(
      `Blitz UI: AlertDialogContext is missing. Component must be placed within <AlertDialogRoot>.`,
    );
  }
  return context;
}

function AlertDialog({
  unstyled,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root> & UnstyledProps) {
  const unstyledContextValue = React.useMemo(() => ({ unstyled: unstyled ?? false }), [unstyled]);

  return (
    <UnstyledContext.Provider value={unstyledContextValue}>
      <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
    </UnstyledContext.Provider>
  );
}

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />;
}

function AlertDialogPortal({ ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />;
}

function AlertDialogOverlay({
  unstyled: unstyledProp,
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Backdrop> & UnstyledProps) {
  const { unstyled: unstyledContext } = useAlertDialogContext();
  const unstyled = unstyledProp ?? unstyledContext;

  return (
    <AlertDialogPrimitive.Backdrop
      data-slot="alert-dialog-overlay"
      className={(state) =>
        cn(
          !unstyled &&
            'data-[open]:animate-in data-[open]:fade-in-0 data-[closed]:animate-out data-[closed]:fade-out-0 data-[closed]:animation-duration-[200ms] fixed inset-0 z-50 bg-black/50',
          resolveClassName(className, state),
        )
      }
      {...props}
    />
  );
}

function AlertDialogContent({
  unstyled: unstyledProp,
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Popup> & UnstyledProps) {
  const { unstyled: unstyledContext } = useAlertDialogContext();
  const unstyled = unstyledProp ?? unstyledContext;

  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Popup
        data-slot="alert-dialog-content"
        className={(state) =>
          cn(
            unstyled
              ? 'fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%]'
              : 'bg-background data-[open]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[open]:fade-in-0 data-[closed]:zoom-out-95 data-[open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
            resolveClassName(className, state),
          )
        }
        {...props}
      />
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({
  unstyled: unstyledProp,
  className,
  ...props
}: React.ComponentProps<'div'> & UnstyledProps) {
  const { unstyled: unstyledContext } = useAlertDialogContext();
  const unstyled = unstyledProp ?? unstyledContext;

  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(!unstyled && 'flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  );
}

function AlertDialogFooter({
  unstyled: unstyledProp,
  className,
  ...props
}: React.ComponentProps<'div'> & UnstyledProps) {
  const { unstyled: unstyledContext } = useAlertDialogContext();
  const unstyled = unstyledProp ?? unstyledContext;

  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        !unstyled && 'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    />
  );
}

function AlertDialogTitle({
  unstyled: unstyledProp,
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title> & UnstyledProps) {
  const { unstyled: unstyledContext } = useAlertDialogContext();
  const unstyled = unstyledProp ?? unstyledContext;

  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={(state) =>
        cn(!unstyled && 'text-lg font-semibold', resolveClassName(className, state))
      }
      {...props}
    />
  );
}

function AlertDialogDescription({
  unstyled: unstyledProp,
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description> & UnstyledProps) {
  const { unstyled: unstyledContext } = useAlertDialogContext();
  const unstyled = unstyledProp ?? unstyledContext;

  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={(state) =>
        cn(!unstyled && 'text-muted-foreground text-sm', resolveClassName(className, state))
      }
      {...props}
    />
  );
}

function AlertDialogAction({
  unstyled: unstyledProp,
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Close> & UnstyledProps) {
  const { unstyled: unstyledContext } = useAlertDialogContext();
  const unstyled = unstyledProp ?? unstyledContext;

  return (
    <AlertDialogPrimitive.Close
      className={(state) => cn(!unstyled && buttonVariants(), resolveClassName(className, state))}
      {...props}
    />
  );
}

function AlertDialogCancel({
  unstyled: unstyledProp,
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Close> & UnstyledProps) {
  const { unstyled: unstyledContext } = useAlertDialogContext();
  const unstyled = unstyledProp ?? unstyledContext;

  return (
    <AlertDialogPrimitive.Close
      className={(state) =>
        cn(!unstyled && buttonVariants({ variant: 'outline' }), resolveClassName(className, state))
      }
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
