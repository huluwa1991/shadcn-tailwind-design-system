import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Typography } from '../base/typography';
import { Button } from '../base/button';

const modalVariants = cva(
  'fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom sm:rounded-lg',
  {
    variants: {
      size: {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

// 内部使用的 ModalContentProps 接口，对应 DialogPrimitive.Content 的属性
interface ModalContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof modalVariants> {
  title?: string;
  footer?: React.ReactNode;
}

// 内部使用的 ModalContent 组件，对应 DialogPrimitive.Content
const ModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  ModalContentProps
>(({ className, children, title, footer, size, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(modalVariants({ size, className }))}
      {...props}
    >
      <div className="flex items-center justify-between">
        {title && (
          <DialogPrimitive.Title asChild>
                          <Typography variant="h3">
                {title}
              </Typography>
          </DialogPrimitive.Title>
        )}
        <DialogPrimitive.Close asChild>
          <Button
            variant="ghost"
            size="sm-icon"
            allowNoTooltip={true}
            className="rounded-full data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogPrimitive.Close>
      </div>

      <div className="py-2">{children}</div>

      {footer && <div className="flex justify-end gap-2">{footer}</div>}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
ModalContent.displayName = DialogPrimitive.Content.displayName;

// 对外暴露的 ModalProps 接口，包含 DialogPrimitive.Root 的属性以及 ModalContent 的属性
interface ModalProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>,
    Omit<ModalContentProps, 'className' | 'children'> {
  contentClassName?: string; // 用于传递给 ModalContent 的 className
  children?: React.ReactNode; // 弹窗的主体内容
}

// 对外暴露的 Modal 组件，封装了 DialogPrimitive.Root 和 ModalContent
const Modal = ({
  open,
  onOpenChange,
  title,
  footer,
  size,
  children,
  contentClassName,
  ...props
}: ModalProps) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange} {...props}>
      <ModalContent
        title={title}
        footer={footer}
        size={size}
        className={contentClassName}
      >
        {children}
      </ModalContent>
    </DialogPrimitive.Root>
  );
};

export { Modal }; 