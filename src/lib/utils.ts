import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useEffect, useState, useCallback } from 'react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// PageContainer 变体类型
export type PageContainerVariant = 'full' | 'centered';

// 响应式侧边栏 Hook
export function useResponsiveSidebar(
  pageVariant: PageContainerVariant = 'full', 
  customBreakpoint?: number
) {
  const [collapsed, setCollapsed] = useState(false);
  const [isAutoCollapsed, setIsAutoCollapsed] = useState(false);

  // 防抖函数
  const debounce = useCallback((func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  }, []);

  // 根据页面变体计算智能断点
  const getBreakpoint = useCallback(() => {
    if (customBreakpoint) return customBreakpoint;
    
    const sidebarWidth = 256; // w-64
    const outerPadding = 16;  // p-2 * 2
    
    if (pageVariant === 'full') {
      // full 变体：max-w-[1440px] mx-auto px-8
      // 实际上不需要完整的 1440px，用户更关心内容区域的可用性
      const practicalContentWidth = 1000; // 实用的内容宽度
      const innerPadding = 64; // px-8 * 2
      const buffer = 32; // 减少缓冲，避免过早折叠
      return sidebarWidth + practicalContentWidth + innerPadding + outerPadding + buffer;
      // 256 + 1000 + 64 + 16 + 32 = 1368px
    } else {
      // centered 变体：w-[768px] max-w-[90vw] mx-auto
      // 768px 是固定宽度，需要确保完整显示
      const fixedContentWidth = 768;
      const buffer = 80; // 增加缓冲，避免过晚折叠
      return sidebarWidth + fixedContentWidth + outerPadding + buffer;
      // 256 + 768 + 16 + 80 = 1120px
    }
  }, [pageVariant, customBreakpoint]);

  useEffect(() => {
    const breakpoint = getBreakpoint();
    
    const checkScreenSize = () => {
      const shouldAutoCollapse = window.innerWidth < breakpoint;
      
      if (shouldAutoCollapse && !isAutoCollapsed) {
        // 屏幕变小，需要自动收起
        setIsAutoCollapsed(true);
        setCollapsed(true);
      } else if (!shouldAutoCollapse && isAutoCollapsed) {
        // 屏幕变大，恢复之前的状态
        setIsAutoCollapsed(false);
        setCollapsed(false);
      }
    };

    // 防抖处理 resize 事件
    const debouncedCheckScreenSize = debounce(checkScreenSize, 100);

    // 初始检查
    checkScreenSize();

    // 监听窗口大小变化
    window.addEventListener('resize', debouncedCheckScreenSize);

    return () => {
      window.removeEventListener('resize', debouncedCheckScreenSize);
    };
  }, [isAutoCollapsed, debounce, getBreakpoint]);

  // 手动切换侧边栏状态
  const toggleCollapsed = () => {
    if (!isAutoCollapsed) {
      setCollapsed(!collapsed);
    }
  };

  return {
    collapsed,
    isAutoCollapsed,
    onCollapsedChange: toggleCollapsed,
  };
}
