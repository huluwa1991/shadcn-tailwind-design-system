import * as React from 'react';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { createPortal } from 'react-dom';

import { cn } from '@/lib/utils';

// 级联选择器变体
const cascaderVariants = cva('', {
  variants: {
    width: {
      auto: 'w-auto',
      fill: 'w-full',
    },
  },
  defaultVariants: {
    width: 'auto',
  },
});

// 级联选择器容器变体
const cascaderContainerVariants = cva(
  'relative inline-block',
  {
    variants: {
      width: {
        auto: 'w-auto',
        fill: 'w-full',
      },
    },
    defaultVariants: {
      width: 'auto',
    },
  }
);

// 级联选择器触发器变体
const cascaderTriggerVariants = cva(
  'flex items-center justify-between gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border border-input bg-transparent hover:bg-accent hover:text-accent-foreground disabled:hover:bg-transparent h-9 rounded-md text-base data-[placeholder]:text-muted-foreground [&>span]:line-clamp-1 md:text-sm px-3 cursor-pointer',
  {
    variants: {
      width: {
        auto: 'w-auto min-w-[180px]',
        fill: 'w-full',
      },
    },
    defaultVariants: {
      width: 'auto',
    },
  }
);

// 级联选择器面板变体
const cascaderPanelVariants = cva(
  'fixed z-50 rounded-md border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  {
    variants: {},
    defaultVariants: {},
  }
);

// 级联选择器列变体
const cascaderColumnVariants = cva(
  'inline-block align-top border-r border-border last:border-r-0 max-h-[200px] overflow-y-auto py-1 min-w-0 w-[160px] flex-shrink-0'
);

// 级联选择器选项变体
const cascaderOptionVariants = cva(
  'relative flex cursor-pointer select-none items-center px-3 py-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
  {
    variants: {
      selected: {
        true: 'bg-accent text-accent-foreground',
        false: '',
      },
      hasChildren: {
        true: 'pr-8',
        false: '',
      },
    },
    defaultVariants: {
      selected: false,
      hasChildren: false,
    },
  }
);

// 数据类型定义
interface CascaderOption {
  value: string;
  label: string;
  children?: CascaderOption[];
  disabled?: boolean;
}

type CascaderValue = string[];

interface CascaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: CascaderOption[];
  value?: CascaderValue;
  onChange?: (value: CascaderValue, selectedOptions: CascaderOption[]) => void;
  placeholder?: string;
  disabled?: boolean;
  width?: 'auto' | 'fill';
  maxLevel?: 2 | 3;
  allowClear?: boolean;
  /** 是否在选择任何级别时都触发变化，适用于直辖市等场景 */
  changeOnSelect?: boolean;
}

// 级联选择器组件
const Cascader: React.FC<CascaderProps> = ({
    className,
    options = [],
    value = [],
    onChange,
    placeholder = '请选择',
    disabled = false,
    width = 'auto',
    maxLevel = 3,
    allowClear = true,
    changeOnSelect = false,
    ...props
  }) => {
    const [open, setOpen] = useState(false);
    const [activeValue, setActiveValue] = useState<CascaderValue>([]);
    const containerRef = React.useRef<HTMLDivElement>(null);

    // 同步外部 value 到内部 activeValue
    React.useEffect(() => {
      setActiveValue(value);
    }, [value]);

    // 获取当前级别的选项
    const getOptionsAtLevel = useCallback((level: number): CascaderOption[] => {
      if (level === 0) return options;
      
      let currentOptions = options;
      for (let i = 0; i < level; i++) {
        const selectedValue = activeValue[i];
        if (!selectedValue) return [];
        
        const selectedOption = currentOptions.find(opt => opt.value === selectedValue);
        if (!selectedOption || !selectedOption.children) return [];
        
        currentOptions = selectedOption.children;
      }
      
      return currentOptions;
    }, [options, activeValue]);

    // 获取选中路径上的选项
    const getSelectedOptions = useCallback((values: CascaderValue): CascaderOption[] => {
      const result: CascaderOption[] = [];
      let currentOptions = options;
      
      for (const value of values) {
        const option = currentOptions.find(opt => opt.value === value);
        if (!option) break;
        
        result.push(option);
        if (!option.children) break;
        currentOptions = option.children;
      }
      
      return result;
    }, [options]);

    // 处理选项点击
    const handleOptionClick = useCallback((level: number, option: CascaderOption) => {
      if (option.disabled) return;

      const newValue = [...activeValue.slice(0, level), option.value];
      setActiveValue(newValue);

      // 如果启用了 changeOnSelect，在任何级别选择时都触发 onChange
      if (changeOnSelect) {
        const selectedOptions = getSelectedOptions(newValue);
        onChange?.(newValue, selectedOptions);
        
        // 如果是最后一级或没有子选项，关闭面板
        if (level >= maxLevel - 1 || !option.children || option.children.length === 0) {
          setOpen(false);
        }
      } else {
        // 原有逻辑：如果是最后一级或者没有子选项，触发onChange并关闭面板
        if (level >= maxLevel - 1 || !option.children || option.children.length === 0) {
          const selectedOptions = getSelectedOptions(newValue);
          onChange?.(newValue, selectedOptions);
          setOpen(false);
        }
      }
    }, [activeValue, maxLevel, onChange, getSelectedOptions, changeOnSelect]);

    // 计算显示文本
    const displayText = useMemo(() => {
      if (value.length === 0) return placeholder;
      
      const selectedOptions = getSelectedOptions(value);
      return selectedOptions.map(opt => opt.label).join(' / ');
    }, [value, placeholder, getSelectedOptions]);

    // 计算需要显示的级别数
    const visibleLevels = useMemo(() => {
      const levels = [];
      for (let i = 0; i < maxLevel; i++) {
        const levelOptions = getOptionsAtLevel(i);
        if (levelOptions.length > 0) {
          levels.push(i);
        } else if (i > 0) {
          // 如果当前级别没有选项且不是第一级，停止添加级别
          break;
        }
      }
      return levels;
    }, [maxLevel, getOptionsAtLevel]);

    // 处理清除
    const handleClear = useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
      setActiveValue([]);
      onChange?.([], []);
    }, [onChange]);

    // 计算面板位置
    const [panelStyle, setPanelStyle] = useState<React.CSSProperties>({});
    
    const calculatePanelPosition = useCallback(() => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // 估算面板宽度
      const estimatedPanelWidth = visibleLevels.length * 160;
      const maxPanelHeight = 200;
      const spacing = 4; // 面板与触发器之间的间距
      
      let left = rect.left;
      
      // 检查右侧空间，如果不够则向左调整
      if (left + estimatedPanelWidth > viewportWidth - 16) {
        left = Math.max(16, viewportWidth - estimatedPanelWidth - 16);
      }
      
      // 检查下方和上方空间
      const spaceBelow = viewportHeight - rect.bottom - spacing - 16;
      const spaceAbove = rect.top - spacing - 16;
      
      let top: number;
      let maxHeight: number;
      let transform = '';
      
      // 决定展开方向
      if (spaceBelow >= maxPanelHeight || spaceBelow >= spaceAbove) {
        // 向下展开
        top = rect.bottom + spacing;
        maxHeight = Math.min(maxPanelHeight, spaceBelow);
      } else {
        // 向上展开，使用 transform 让面板从底部对齐到触发器顶部
        top = rect.top - spacing;
        maxHeight = Math.min(maxPanelHeight, spaceAbove);
        transform = 'translateY(-100%)';
      }
      
      setPanelStyle({
        left: `${left}px`,
        top: `${top}px`,
        width: `${estimatedPanelWidth}px`,
        maxHeight: `${maxHeight}px`,
        transform,
      });
    }, [visibleLevels.length]);

    // 当打开面板时计算位置
    useEffect(() => {
      if (open) {
        // 延迟一帧执行，确保DOM已更新
        const timeoutId = setTimeout(() => {
          calculatePanelPosition();
        }, 0);
        
        // 监听窗口大小变化和滚动
        const handleResize = () => calculatePanelPosition();
        const handleScroll = () => calculatePanelPosition();
        
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll, true);
        
        return () => {
          clearTimeout(timeoutId);
          window.removeEventListener('resize', handleResize);
          window.removeEventListener('scroll', handleScroll, true);
        };
      }
    }, [open, calculatePanelPosition]);

    // 当可见级别变化时重新计算位置
    useEffect(() => {
      if (open) {
        calculatePanelPosition();
      }
    }, [open, visibleLevels.length, calculatePanelPosition]);

    return (
      <div
        ref={containerRef}
        className={cn(cascaderContainerVariants({ width }), className)}
        {...props}
      >
        {/* 触发器 */}
        <div
          className={cn(
            cascaderTriggerVariants({ width }),
            disabled && 'cursor-not-allowed opacity-50'
          )}
          onClick={() => !disabled && setOpen(!open)}
        >
          <span className={cn(
            "flex-1 truncate text-left",
            value.length === 0 && "text-muted-foreground"
          )}>
            {displayText}
          </span>
          <div className="flex items-center gap-1">
            {allowClear && value.length > 0 && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="flex h-4 w-4 items-center justify-center rounded-sm hover:bg-accent"
              >
                <svg
                  className="h-3 w-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
            <ChevronDown className={cn(
              "h-4 w-4 transition-transform duration-200", 
              open && "rotate-180",
              value.length === 0 && "text-muted-foreground"
            )} />
          </div>
        </div>

        {/* 下拉面板 - 使用 Portal */}
        {open && createPortal(
          <div 
            className={cn(cascaderPanelVariants())}
            style={panelStyle}
            data-state="open"
          >
            <div className="flex overflow-hidden">
              {visibleLevels.map((level) => {
                const levelOptions = getOptionsAtLevel(level);
                
                return (
                  <div
                    key={level}
                    className={cn(cascaderColumnVariants())}
                  >
                    {levelOptions.map((option) => {
                      const isSelected = activeValue[level] === option.value;
                      const hasChildren = option.children && option.children.length > 0;
                      
                      return (
                        <div
                          key={option.value}
                          className={cn(
                            cascaderOptionVariants({
                              selected: isSelected,
                              hasChildren,
                            }),
                            option.disabled && 'cursor-not-allowed opacity-50'
                          )}
                          onClick={() => handleOptionClick(level, option)}
                        >
                          <span className="flex-1 truncate">{option.label}</span>
                          {hasChildren && (
                            <ChevronRight className="absolute right-2 h-4 w-4" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>,
          document.body
        )}

        {/* 遮罩层，点击关闭面板 */}
        {open && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
        )}
      </div>
    );
  };

Cascader.displayName = 'Cascader';

export { Cascader, cascaderVariants };
export type { CascaderProps, CascaderOption, CascaderValue }; 