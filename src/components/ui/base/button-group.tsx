import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonGroupVariants = cva(
  'inline-flex items-center [&>button]:rounded-none [&>button:first-child]:rounded-l-md [&>button:last-child]:rounded-r-md [&>button:not(:last-child)]:border-r [&>button:not(:first-child)]:-ml-[1px]',
  {
    variants: {
      size: {
        sm: '[&>button]:h-9 [&>button]:px-3',
        md: '[&>button]:h-10 [&>button]:px-4',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  }
);

export interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGroupVariants> {
  children: React.ReactNode;
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <div
        className={cn(buttonGroupVariants({ size, className }))}
        ref={ref}
        role="group"
        {...props}
      >
        {children}
      </div>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';

export { ButtonGroup, buttonGroupVariants }; 