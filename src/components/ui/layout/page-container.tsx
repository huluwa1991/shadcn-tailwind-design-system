import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const pageContainerVariants = cva(
  'rounded-xl border border-container-border bg-container text-container-foreground shadow h-full overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border hover:scrollbar-thumb-muted-foreground dark:scrollbar-thumb-border dark:hover:scrollbar-thumb-muted-foreground',
  {
    variants: {
      shadow: {
        default: 'shadow',
      },
      rounded: {
        xl: 'rounded-xl',
      },
    },
    defaultVariants: {
      shadow: 'default',
      rounded: 'xl',
    },
  }
);

const contentVariants = cva(
  'py-10',
  {
    variants: {
      variant: {
        full: 'max-w-[1440px] mx-auto px-8',
        centered: 'w-[768px] max-w-[90vw] mx-auto px-6',
      },
    },
    defaultVariants: {
      variant: 'full',
    },
  }
);

export interface PageContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageContainerVariants> {
  variant?: 'full' | 'centered';
  asChild?: boolean;
}

const PageContainer = React.forwardRef<HTMLDivElement, PageContainerProps>(
  ({ className, variant = 'full', shadow, rounded, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        className={cn(pageContainerVariants({ shadow, rounded }), 'w-full', className)}
        ref={ref}
        {...props}
      >
        <div className={cn(contentVariants({ variant }))}>
          {children}
        </div>
      </Comp>
    );
  }
);
PageContainer.displayName = 'PageContainer';

export { PageContainer, pageContainerVariants, contentVariants }; 