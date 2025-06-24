import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const typographyVariants = cva('', {
  variants: {
    variant: {
      // 标题系列
      h1: 'text-2xl font-bold leading-none', // 页面级别的主标题，一个页面只能有一个
      h2: 'text-xl font-bold leading-none',  // 次级标题，用于模块的标题
      h3: 'text-lg leading-none', // 次次级标题，用于模块内部的标题
      
      // 正文
      body: 'text-sm leading-normal',
      
      // 弱化文字
      muted: 'text-xs text-muted-foreground leading-none',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
});

// 根据变体自动确定HTML元素
const getElementForVariant = (variant: string) => {
  const elementMap: Record<string, string> = {
    h1: 'h1',
    h2: 'h2', 
    h3: 'h3',
    body: 'p',
    muted: 'span',
  };
  return elementMap[variant] || 'span';
};

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = 'body', asChild = false, as, children, ...props }, ref) => {
    const defaultElement = getElementForVariant(variant as string);
    const Comp = asChild ? Slot : (as || defaultElement);
    
    return (
      <Comp
        className={cn(typographyVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Typography.displayName = 'Typography';

export { Typography, typographyVariants }; 