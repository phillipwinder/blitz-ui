'use client';

import * as React from 'react';
import { Accordion } from '@base-ui/react/accordion';

import { cva, VariantProps } from 'class-variance-authority';
import { Plus, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// #region Utils
function resolveClassName<State>(
  className: string | ((state: State) => string | undefined) | undefined,
  state: State,
) {
  return typeof className === 'function' ? className(state) : className;
}
// #endregion

// #region Variants
const accordionRootVariants = cva('', {
  variants: {
    variant: {
      unstyled: '',
      default: '',
      outlined: 'space-y-2',
      solid: 'space-y-2',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const accordionItemVariants = cva('', {
  variants: {
    variant: {
      unstyled: '',
      default: 'border-b border-border',
      outlined: 'border border-border rounded-lg',
      solid: 'rounded-lg bg-accent/70',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const accordionHeaderVariants = cva('flex', {
  variants: {
    variant: {
      unstyled: '',
      default: '',
      outlined: '',
      solid: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const accordionTriggerVariants = cva(
  'flex flex-1 items-center justify-between py-4 gap-2.5 text-foreground font-medium transition-all [&[data-panel-open]>svg]:rotate-180 cursor-pointer',
  {
    variants: {
      variant: {
        unstyled: '',
        default: '',
        outlined: 'px-4',
        solid: 'px-4',
      },
      indicator: {
        arrow: '',
        plus: '[&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-panel-open]>svg>path:last-child]:rotate-90 [&[data-panel-open]>svg>path:last-child]:opacity-0 [&[data-panel-open]>svg]:rotate-180',
        none: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      indicator: 'arrow',
    },
  },
);

const accordionPanelVariants = cva(
  'h-[var(--accordion-panel-height)] overflow-hidden text-sm text-accent-foreground transition-[height] ease-out data-[ending-style]:h-0 data-[starting-style]:h-0',
  {
    variants: {
      variant: {
        unstyled: '',
        default: '',
        outlined: 'px-4',
        solid: 'px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);
// #endregion

// #region Context
type AccordionContextType = {
  variant?: ('unstyled' | 'default' | 'outlined' | 'solid') | undefined;
  indicator?: ('arrow' | 'plus' | 'none') | undefined;
};

const AccordionContext = React.createContext<AccordionContextType>({
  variant: 'default',
  indicator: 'arrow',
});
// #endregion

// #region Components
interface AccordionRootProps
  extends React.ComponentProps<typeof Accordion.Root>, VariantProps<typeof accordionRootVariants> {
  indicator?: ('arrow' | 'plus' | 'none') | undefined;
}

function AccordionRoot(props: AccordionRootProps) {
  const { className, variant = 'default', indicator = 'arrow', children, ...rest } = props;

  const contextValue = React.useMemo(
    () => ({ variant: variant || 'default', indicator }),
    [variant, indicator],
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      <Accordion.Root
        data-slot="accordion-root"
        className={(state) =>
          cn(accordionRootVariants({ variant }), resolveClassName(className, state))
        }
        {...rest}
      >
        {children}
      </Accordion.Root>
    </AccordionContext.Provider>
  );
}

type AccordionItemProps = React.ComponentProps<typeof Accordion.Item>;

function AccordionItem(props: AccordionItemProps) {
  const { className, children, ...rest } = props;
  const { variant } = React.useContext(AccordionContext);

  return (
    <Accordion.Item
      data-slot="accordion-item"
      className={(state) =>
        cn(accordionItemVariants({ variant }), resolveClassName(className, state))
      }
      {...rest}
    >
      {children}
    </Accordion.Item>
  );
}

type AccordionHeaderProps = React.ComponentProps<typeof Accordion.Header>;

function AccordionHeader(props: AccordionHeaderProps) {
  const { className, children, ...rest } = props;
  const { variant } = React.useContext(AccordionContext);

  return (
    <Accordion.Header
      data-slot="accordion-header"
      className={(state) =>
        cn(accordionHeaderVariants({ variant }), resolveClassName(className, state))
      }
      {...rest}
    >
      {children}
    </Accordion.Header>
  );
}

type AccordionTriggerProps = React.ComponentProps<typeof Accordion.Trigger>;

function AccordionTrigger(props: AccordionTriggerProps) {
  const { className, children, ...rest } = props;
  const { variant, indicator } = React.useContext(AccordionContext);

  return (
    <Accordion.Trigger
      data-slot="accordion-trigger"
      className={(state) =>
        cn(accordionTriggerVariants({ variant, indicator }), resolveClassName(className, state))
      }
      {...rest}
    >
      {children}
      {indicator === 'plus' && (
        <Plus className="size-4 shrink-0 transition-transform duration-200" strokeWidth={1} />
      )}
      {indicator === 'arrow' && (
        <ChevronDown
          className="size-4 shrink-0 transition-transform duration-200"
          strokeWidth={1}
        />
      )}
    </Accordion.Trigger>
  );
}

type AccordionPanelProps = React.ComponentProps<typeof Accordion.Panel>;

function AccordionPanel(props: AccordionPanelProps) {
  const { className, children, ...rest } = props;
  const { variant } = React.useContext(AccordionContext);

  return (
    <Accordion.Panel
      data-slot="accordion-panel"
      className={(state) =>
        cn(accordionPanelVariants({ variant }), resolveClassName(className, state))
      }
      {...rest}
    >
      <div className={cn('pb-5 pt-0')}>{children}</div>
    </Accordion.Panel>
  );
}
// #endregion

export { AccordionRoot, AccordionItem, AccordionHeader, AccordionTrigger, AccordionPanel };
