import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../feedback/tooltip';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer enabled:active:scale-95 transition-transform duration-75',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        withicon: 'h-10 w-10',
        'sm-icon': 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// 图标按钮专用接口，必须提供 tooltip
export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'title'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  tooltip: string;
  size: 'withicon' | 'sm-icon';
  allowNoTooltip?: never;
}

// 特殊图标按钮接口，允许可选的 tooltip
export interface SpecialIconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'title'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  tooltip?: string;
  size: 'withicon' | 'sm-icon';
  allowNoTooltip: true;
}

// 普通按钮接口
export interface RegularButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  tooltip?: never;
  size?: 'default' | 'sm' | 'lg';
  allowNoTooltip?: never;
}

export type ButtonProps = IconButtonProps | SpecialIconButtonProps | RegularButtonProps;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    
    // 检查是否为图标按钮
    const isIconButton = size === 'withicon' || size === 'sm-icon';
    
    const buttonElement = (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...(props as any)}
      />
    );

    // 如果是图标按钮，根据情况包装 tooltip
    if (isIconButton) {
      const iconProps = props as IconButtonProps | SpecialIconButtonProps;
      
      // 检查是否允许无 tooltip
      const allowNoTooltip = 'allowNoTooltip' in iconProps && iconProps.allowNoTooltip;
      
      if (!allowNoTooltip && !iconProps.tooltip) {
        throw new Error(`图标按钮 (size="${size}") 必须提供 tooltip 属性`);
      }
      
      // 如果有 tooltip，包装它
      if (iconProps.tooltip) {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                {buttonElement}
              </TooltipTrigger>
              <TooltipContent>
                <p>{iconProps.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }
      
      // 没有 tooltip 但允许无 tooltip，直接返回按钮
      return buttonElement;
    }

    // 普通按钮直接返回
    return buttonElement;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants }; 