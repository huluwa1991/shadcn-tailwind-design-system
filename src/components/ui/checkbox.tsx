import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cva } from 'class-variance-authority';
import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

const checkboxVariants = cva(
  'peer h-4 w-4 shrink-0 rounded-sm border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground'
);

const checkboxLabelVariants = cva(
  'text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {}

export interface CheckboxLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(checkboxVariants(), className)}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

const CheckboxLabel = React.forwardRef<
  HTMLLabelElement,
  CheckboxLabelProps
>(({ className, children, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(checkboxLabelVariants(), className)}
      {...props}
    >
      {children}
    </label>
  );
});
CheckboxLabel.displayName = 'CheckboxLabel';

export { Checkbox, CheckboxLabel, checkboxVariants, checkboxLabelVariants }; 