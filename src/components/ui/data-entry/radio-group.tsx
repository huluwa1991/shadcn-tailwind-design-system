import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const radioGroupVariants = cva(
  'grid gap-3',
  {
    variants: {
      variant: {
        default: '',
        cards: 'lg:grid-cols-2 items-start',
      },
      layout: {
        vertical: '',
        horizontal: 'grid-flow-col auto-cols-fr',
      },
    },
    compoundVariants: [
      {
        variant: 'cards',
        layout: 'horizontal',
        class: 'grid-flow-col auto-cols-fr',
      },
    ],
    defaultVariants: {
      variant: 'default',
      layout: 'vertical',
    },
  }
);

const radioGroupItemVariants = cva(
  'aspect-square h-4 w-4 rounded-full border border-input text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-input cursor-pointer hover:border-primary/70 transition-colors'
);

const radioGroupLabelVariants = cva(
  'text-sm leading-none',
  {
    variants: {
      variant: {
        default: 'flex items-center space-x-2 cursor-pointer has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-70',
        cards: 'flex items-start gap-3 rounded-lg border p-3 cursor-pointer hover:bg-accent/50 transition-colors font-medium has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-70 has-[:disabled]:hover:bg-transparent w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
    VariantProps<typeof radioGroupVariants> {}

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {}

export interface RadioGroupLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof radioGroupLabelVariants> {}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, variant, layout, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn(radioGroupVariants({ variant, layout }), className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(radioGroupItemVariants(), className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-2.5 w-2.5 fill-current text-current"
        >
          <circle cx="12" cy="12" r="10" />
        </svg>
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

const RadioGroupLabel = React.forwardRef<
  HTMLLabelElement,
  RadioGroupLabelProps
>(({ className, variant, children, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(radioGroupLabelVariants({ variant }), className)}
      {...props}
    >
      {children}
    </label>
  );
});
RadioGroupLabel.displayName = 'RadioGroupLabel';

// eslint-disable-next-line react-refresh/only-export-components
export { RadioGroup, RadioGroupItem, RadioGroupLabel, radioGroupVariants }; 