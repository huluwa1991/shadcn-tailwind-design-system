import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const filterVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer border leading-none',
  {
    variants: {
      size: {
        default: 'h-8 px-3 py-1.5',
        sm: 'h-7 px-2.5 py-1 text-xs',
        lg: 'h-9 px-4 py-2',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

const filterGroupVariants = cva(
  'flex flex-wrap gap-2',
  {
    variants: {
      orientation: {
        horizontal: 'flex-row',
        vertical: 'flex-col',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
);

export interface FilterOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface FilterItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>,
    VariantProps<typeof filterVariants> {
  selected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
}

const FilterItem = React.forwardRef<HTMLButtonElement, FilterItemProps>(
  ({ className, size, selected = false, onSelectedChange, disabled, children, ...props }, ref) => {
    const handleClick = () => {
      if (disabled) return;
      onSelectedChange?.(!selected);
    };

    const iconSize = size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-4 w-4' : 'h-3.5 w-3.5';

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          filterVariants({ size }),
          selected
            ? 'bg-primary/10 text-primary border border-primary/20'
            : 'bg-secondary text-secondary-foreground border-secondary hover:bg-secondary/80',
          className
        )}
        disabled={disabled}
        onClick={handleClick}
        aria-pressed={selected}
        {...props}
      >
        <span className="leading-none">{children}</span>
        {selected && (
          <Check className={cn('flex-shrink-0 leading-none', iconSize)} />
        )}
      </button>
    );
  }
);
FilterItem.displayName = 'FilterItem';

export interface FilterGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof filterGroupVariants> {
  options: FilterOption[];
  selectedValues?: string[];
  onSelectedValuesChange?: (values: string[]) => void;
  size?: VariantProps<typeof filterVariants>['size'];
  allowMultiple?: boolean;
}

const FilterGroup = React.forwardRef<HTMLDivElement, FilterGroupProps>(
  ({ 
    className, 
    orientation, 
    options, 
    selectedValues = [], 
    onSelectedValuesChange, 
    size,
    allowMultiple = true,
    ...props 
  }, ref) => {
    const handleItemChange = (value: string, selected: boolean) => {
      if (!onSelectedValuesChange) return;

      if (allowMultiple) {
        if (selected) {
          // 添加到选中列表
          onSelectedValuesChange([...selectedValues, value]);
        } else {
          // 从选中列表中移除
          onSelectedValuesChange(selectedValues.filter(v => v !== value));
        }
      } else {
        // 单选模式
        if (selected) {
          onSelectedValuesChange([value]);
        } else {
          onSelectedValuesChange([]);
        }
      }
    };

    return (
      <div
        ref={ref}
        className={cn(filterGroupVariants({ orientation }), className)}
        role="group"
        {...props}
      >
        {options.map((option) => (
          <FilterItem
            key={option.value}
            size={size}
            selected={selectedValues.includes(option.value)}
            onSelectedChange={(selected) => handleItemChange(option.value, selected)}
            disabled={option.disabled}
          >
            {option.label}
          </FilterItem>
        ))}
      </div>
    );
  }
);
FilterGroup.displayName = 'FilterGroup';

export { FilterItem, FilterGroup, filterVariants, filterGroupVariants }; 