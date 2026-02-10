import * as React from 'react';
import { Checkbox as BaseUiCheckbox } from '@base-ui/react/checkbox';
import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type CheckboxRootProps = React.ComponentPropsWithRef<typeof BaseUiCheckbox.Root>;

function CheckboxRoot(props: CheckboxRootProps) {
  const { className, children, ...rest } = props;
  return (
    <BaseUiCheckbox.Root
      className={cn(
        'peer border-input dark:bg-input/30 data-[checked]:bg-primary data-[checked]:text-primary-foreground dark:data-[checked]:bg-primary data-[checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      data-slot="checkbox"
      {...rest}
    >
      {children}
    </BaseUiCheckbox.Root>
  );
}

type CheckboxIndicatorProps = React.ComponentPropsWithRef<typeof BaseUiCheckbox.Indicator>;

function CheckboxIndicator(props: CheckboxIndicatorProps) {
  const { className, children, ...rest } = props;
  return (
    <BaseUiCheckbox.Indicator
      className={cn('flex items-center justify-center text-current transition-none', className)}
      data-slot="checkbox-indicator"
      {...rest}
    >
      <CheckIcon className="size-3.5" />
    </BaseUiCheckbox.Indicator>
  );
}

type CheckboxProps = React.ComponentProps<typeof CheckboxRoot>;

function Checkbox(props: CheckboxProps) {
  return (
    <CheckboxRoot data-slot="checkbox" {...props}>
      <CheckboxIndicator data-slot="checkbox-indicator" />
    </CheckboxRoot>
  );
}

Checkbox.Root = CheckboxRoot;
Checkbox.Indicator = CheckboxIndicator;

export { Checkbox };
