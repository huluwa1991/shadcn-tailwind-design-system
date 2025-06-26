import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// 级联选择器面板变体
const cascaderDropdownVariants = cva(
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

interface CascaderDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement>;
  children: React.ReactNode;
  visibleLevels: number[];
}

// 级联选择器专用下拉组件
const CascaderDropdown: React.FC<CascaderDropdownProps> = ({
  className,
  open,
  onOpenChange,
  triggerRef,
  children,
  visibleLevels,
  ...props
}) => {
  const [panelStyle, setPanelStyle] = useState<React.CSSProperties>({});

  // 计算面板位置
  const calculatePanelPosition = useCallback(() => {
    if (!triggerRef.current) return;
    
    const rect = triggerRef.current.getBoundingClientRect();
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
  }, [visibleLevels.length, triggerRef]);

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

  if (!open) return null;

  return (
    <>
      {/* 下拉面板 - 使用 Portal */}
      {createPortal(
        <div 
          className={cn(cascaderDropdownVariants(), className)}
          style={panelStyle}
          data-state="open"
          {...props}
        >
          <div className="flex overflow-hidden">
            {children}
          </div>
        </div>,
        document.body
      )}

      {/* 遮罩层，点击关闭面板 */}
      <div
        className="fixed inset-0 z-40"
        onClick={() => onOpenChange(false)}
      />
    </>
  );
};

CascaderDropdown.displayName = 'CascaderDropdown';

// 级联选择器列组件
const CascaderColumn = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cascaderColumnVariants(), className)}
    {...props}
  >
    {children}
  </div>
));
CascaderColumn.displayName = 'CascaderColumn';

export {
  CascaderDropdown,
  CascaderColumn,
  cascaderDropdownVariants,
  cascaderColumnVariants,
};

export type { CascaderDropdownProps }; 