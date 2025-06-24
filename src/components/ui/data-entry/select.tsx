import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Tag } from '../data-display/tags';

// Select 触发器变体
const selectTriggerVariants = cva(
  'group flex items-center justify-between gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>[data-radix-select-icon]_svg]:pointer-events-none [&>[data-radix-select-icon]_svg]:size-4 [&>[data-radix-select-icon]_svg]:shrink-0 border border-input bg-transparent hover:bg-accent hover:text-accent-foreground disabled:hover:bg-transparent h-9 rounded-md text-base data-[placeholder]:text-muted-foreground [&>span]:line-clamp-1 md:text-sm cursor-pointer',
  {
    variants: {
      display: {
        'text-only': 'px-3',
        'with-icon': 'px-3',
      },
      mode: {
        single: '',
        multiple: 'min-h-9 h-auto py-1 px-3',
      },
      width: {
        auto: 'w-auto min-w-[180px]',
        full: 'w-full',
      },
    },
    defaultVariants: {
      display: 'text-only',
      mode: 'single',
      width: 'full',
    },
  }
);



const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

// Select 容器组件 - 支持不同宽度模式
interface SelectContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  width?: 'auto' | 'full';
}

const SelectContainer = React.forwardRef<HTMLDivElement, SelectContainerProps>(
  ({ className, children, width = 'auto', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        width === 'auto' ? "w-auto" : "w-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
SelectContainer.displayName = 'SelectContainer';

// 基础触发器接口
interface SelectTriggerBaseProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTriggerVariants> {
  icon?: React.ReactNode;
  width?: 'auto' | 'full';
}

// 单选触发器
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerBaseProps
>(({ className, children, display = 'text-only', mode = 'single', width = 'full', icon, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(selectTriggerVariants({ display, mode, width, className }))}
    {...props}
  >
    <div className="flex items-center gap-2 flex-1 min-w-0">
      {display === 'with-icon' && icon && (
        <span className="flex-shrink-0">
          {icon}
        </span>
      )}
      <div className="flex-1 truncate text-left">
        {children}
      </div>
    </div>
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 flex-shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

// 多选触发器接口
interface MultiSelectTriggerProps
  extends Omit<SelectTriggerBaseProps, 'mode'> {
  selectedValues?: string[];
  selectedLabels?: Record<string, string>;
  onRemoveValue?: (value: string) => void;
  placeholder?: string;
  maxDisplay?: number;
}

// 多选触发器组件
const MultiSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  MultiSelectTriggerProps
>(({ 
  className, 
  display = 'text-only', 
  icon, 
  selectedValues = [], 
  selectedLabels = {},
  onRemoveValue,
  placeholder = "请选择...",
  maxDisplay = 3,
  ...props 
}, ref) => {
  const hasSelection = selectedValues.length > 0;
  const displayValues = selectedValues.slice(0, maxDisplay);
  const remainingCount = selectedValues.length - maxDisplay;

  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(selectTriggerVariants({ display, mode: 'multiple', className }))}
      onPointerDown={(e) => {
        // 检查是否点击的是关闭按钮或标签区域
        const target = e.target as HTMLElement;
        const isCloseButton = target.closest('button[aria-label="Remove tag"]');
        
        // 如果点击的是关闭按钮，阻止事件冒泡
        if (isCloseButton) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        
        // 如果点击的是标签本身（不包括关闭按钮），阻止触发下拉框
        if (target.closest('.select-tag')) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      {...props}
    >
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {display === 'with-icon' && icon && (
          <span className="flex-shrink-0">
            {icon}
          </span>
        )}
        
        <div className="flex-1 flex flex-wrap items-center gap-1 min-h-[1.5rem] min-w-0">
          {hasSelection ? (
            <>
              {displayValues.map((value) => (
                <Tag
                  key={value}
                  variant="default"
                  className="select-tag"
                  onRemove={onRemoveValue ? () => onRemoveValue(value) : undefined}
                >
                  {selectedLabels[value] || value}
                </Tag>
              ))}
              {remainingCount > 0 && (
                <Tag variant="default">
                  +{remainingCount}
                </Tag>
              )}
            </>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </div>
      </div>
      
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 flex-shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
});
MultiSelectTrigger.displayName = 'MultiSelectTrigger';

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      'flex cursor-pointer items-center justify-center py-1',
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      'flex cursor-pointer items-center justify-center py-1',
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top data-[side=left]:slide-in-from-right data-[side=right]:slide-in-from-left data-[side=top]:slide-in-from-bottom',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-max min-w-[8rem]'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('px-2 py-1.5 text-sm font-semibold', className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

// 多选选项接口
interface MultiSelectItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>, 'onSelect'> {
  value: string;
  selected?: boolean;
  onToggle?: (value: string, selected: boolean) => void;
}

// 多选选项组件（用于多选模式下的选项）
const MultiSelectItem = React.forwardRef<
  HTMLDivElement,
  MultiSelectItemProps
>(({ className, children, value, selected = false, onToggle, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      selected && 'bg-accent text-accent-foreground',
      className
    )}
    onClick={() => onToggle?.(value, !selected)}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      {selected && <Check className="h-4 w-4" />}
    </span>
    <span className="flex-1">{children}</span>
  </div>
));
MultiSelectItem.displayName = 'MultiSelectItem';

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectContainer,
  SelectTrigger,
  MultiSelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  MultiSelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  selectTriggerVariants,
};

export type { SelectContainerProps, SelectTriggerBaseProps, MultiSelectTriggerProps, MultiSelectItemProps }; 