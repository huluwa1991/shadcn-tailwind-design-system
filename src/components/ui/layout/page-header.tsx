import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ArrowLeft } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '../base/button';
import { Typography } from '../base/typography';

// PageHeader 主容器 - 移除默认间距
const pageHeaderVariants = cva(
  'w-full h-full bg-background flex flex-col',
  {
    variants: {},
    defaultVariants: {},
  }
);

// PageHeaderHeader 头部组件
const pageHeaderHeaderVariants = cva(
  'w-full',
  {
    variants: {
      variant: {
        'title-only': 'space-y-0',
        'title-with-actions': 'space-y-0',
        'title-with-toolbar': 'space-y-4',
      },
    },
    defaultVariants: {
      variant: 'title-only',
    },
  }
);

// PageHeaderContent 内容区域 - 移除栅格系统
const pageHeaderContentVariants = cva(
  'w-full flex-1',
  {
    variants: {},
    defaultVariants: {},
  }
);

// 类型定义
export interface PageHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageHeaderVariants> {}

export interface PageHeaderHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageHeaderHeaderVariants> {}

export interface PageHeaderContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageHeaderContentVariants> {}

export interface PageHeaderBackProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export interface PageHeaderTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export interface PageHeaderActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface PageHeaderToolbarProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface PageHeaderFiltersProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface PageHeaderToolbarActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {}

// 高级 PageHeader 组件的类型定义
export interface PageHeaderWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  // 基础配置
  variant: 'title-only' | 'title-with-actions' | 'title-with-toolbar';
  title: string;
  
  // 可选元素
  showBack?: boolean;
  onBackClick?: () => void;
  
  // 标题行操作按钮（右侧主要操作）
  actions?: React.ReactNode;
  
  // 工具栏配置（仅在 title-with-toolbar 模式下生效）
  filters?: React.ReactNode;
  toolbarActions?: React.ReactNode;
  
  // 样式配置
  containerClassName?: string;
  headerClassName?: string;
}

// 主布局组件
const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(pageHeaderVariants({ className }))}
        {...props}
      />
    );
  }
);
PageHeader.displayName = 'PageHeader';

// 头部组件
const PageHeaderHeader = React.forwardRef<HTMLDivElement, PageHeaderHeaderProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(pageHeaderHeaderVariants({ variant, className }))}
        {...props}
      >
        {children}
      </div>
    );
  }
);
PageHeaderHeader.displayName = 'PageHeaderHeader';

// 返回按钮
const PageHeaderBack = React.forwardRef<HTMLButtonElement, PageHeaderBackProps>(
  ({ className, asChild = false, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="ghost"
        size="sm-icon"
        allowNoTooltip={true}
        className={cn('mr-2', className)}
        asChild={asChild}
        {...props}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
    );
  }
);
PageHeaderBack.displayName = 'PageHeaderBack';

// 标题组件 - 使用 Typography 组件的样式
const PageHeaderTitle = React.forwardRef<HTMLHeadingElement, PageHeaderTitleProps>(
  ({ className, ...props }, ref) => {
    // 从 props 中排除可能冲突的 color 属性
    const { color, ...restProps } = props as any;
    
    return (
      <Typography
        ref={ref as React.Ref<HTMLElement>}
        variant="h1"
        className={cn('text-foreground', className)}
        as="h1"
        {...restProps}
      />
    );
  }
);
PageHeaderTitle.displayName = 'PageHeaderTitle';

// 操作按钮容器
const PageHeaderActions = React.forwardRef<HTMLDivElement, PageHeaderActionsProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-2', className)}
        {...props}
      />
    );
  }
);
PageHeaderActions.displayName = 'PageHeaderActions';

// 工具栏组件
const PageHeaderToolbar = React.forwardRef<HTMLDivElement, PageHeaderToolbarProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-between gap-4', className)}
        {...props}
      />
    );
  }
);
PageHeaderToolbar.displayName = 'PageHeaderToolbar';

// 筛选容器
const PageHeaderFilters = React.forwardRef<HTMLDivElement, PageHeaderFiltersProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-2', className)}
        {...props}
      />
    );
  }
);
PageHeaderFilters.displayName = 'PageHeaderFilters';

// 工具栏操作按钮容器
const PageHeaderToolbarActions = React.forwardRef<HTMLDivElement, PageHeaderToolbarActionsProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-2', className)}
        {...props}
      />
    );
  }
);
PageHeaderToolbarActions.displayName = 'PageHeaderToolbarActions';

// 内容区域组件 - 简化版本，不再包含栅格系统
const PageHeaderContent = React.forwardRef<HTMLDivElement, PageHeaderContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(pageHeaderContentVariants({ className }))}
        {...props}
      />
    );
  }
);
PageHeaderContent.displayName = 'PageHeaderContent';

// 组合头部布局的辅助组件
const PageHeaderTitleRow = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-between', className)}
        {...props}
      />
    );
  }
);
PageHeaderTitleRow.displayName = 'PageHeaderTitleRow';

const PageHeaderTitleSection = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center', className)}
        {...props}
      />
    );
  }
);
PageHeaderTitleSection.displayName = 'PageHeaderTitleSection';

// 高级 PageHeader 包装组件 - 自动应用 Stories 中的标准布局
const PageHeaderWrapper = React.forwardRef<HTMLDivElement, PageHeaderWrapperProps>(
  ({ 
    variant, 
    title, 
    showBack = false, 
    onBackClick,
    actions,
    filters,
    toolbarActions,
    containerClassName,
    headerClassName,
    className,
    ...props 
  }, ref) => {
    // 在 title-with-toolbar 变体中，如果存在筛选功能，第一行不显示操作按钮
    const shouldShowFirstRowActions = variant !== 'title-with-toolbar' || !filters;
    
    return (
      <div 
        ref={ref}
        className={cn('mb-6', containerClassName, className)}
        {...props}
      >
        <PageHeaderHeader 
          variant={variant} 
          className={headerClassName}
        >
          <PageHeaderTitleRow>
            <PageHeaderTitleSection>
              {showBack && (
                <PageHeaderBack onClick={onBackClick} />
              )}
              <PageHeaderTitle>{title}</PageHeaderTitle>
            </PageHeaderTitleSection>
            {shouldShowFirstRowActions && actions && (
              <PageHeaderActions>
                {actions}
              </PageHeaderActions>
            )}
          </PageHeaderTitleRow>
          
          {variant === 'title-with-toolbar' && (
            <PageHeaderToolbar>
              {filters && (
                <PageHeaderFilters>
                  {filters}
                </PageHeaderFilters>
              )}
              {toolbarActions && (
                <PageHeaderToolbarActions>
                  {toolbarActions}
                </PageHeaderToolbarActions>
              )}
            </PageHeaderToolbar>
          )}
        </PageHeaderHeader>
      </div>
    );
  }
);
PageHeaderWrapper.displayName = 'PageHeaderWrapper';

export {
  PageHeader,
  PageHeaderHeader,
  PageHeaderBack,
  PageHeaderTitle,
  PageHeaderActions,
  PageHeaderToolbar,
  PageHeaderFilters,
  PageHeaderToolbarActions,
  PageHeaderContent,
  PageHeaderTitleRow,
  PageHeaderTitleSection,
  PageHeaderWrapper,
  pageHeaderVariants,
  pageHeaderHeaderVariants,
  pageHeaderContentVariants,
}; 