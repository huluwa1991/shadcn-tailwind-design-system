import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const blockLayoutVariants = cva(
  'rounded-lg border border-block-layout-border bg-block-layout text-block-layout-foreground shadow-sm',
  {
    variants: {
      padding: {
        sm: 'p-4',
        default: 'p-6',
      },
      shadow: {
        none: 'shadow-none',
        sm: 'shadow-sm',
      },
      rounded: {
        md: 'rounded-md',
        lg: 'rounded-lg',
      },
    },
    defaultVariants: {
      padding: 'default',
      shadow: 'sm',
      rounded: 'lg',
    },
  }
);

export interface BlockLayoutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof blockLayoutVariants> {
  asChild?: boolean;
}

const BlockLayout = React.forwardRef<HTMLDivElement, BlockLayoutProps>(
  ({ className, padding, shadow, rounded, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        className={cn(blockLayoutVariants({ padding, shadow, rounded, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
BlockLayout.displayName = 'BlockLayout';

export { BlockLayout, blockLayoutVariants }; 