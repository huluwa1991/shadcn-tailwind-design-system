import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Logo } from '../layout/logo';
import { Avatar, AvatarWithInfo } from '../base/avatar';

// Sidebar 主容器变体
const sidebarVariants = cva(
  'bg-sidebar flex h-full w-full flex-col transition-all duration-300 ease-in-out',
  {
    variants: {
      state: {
        expanded: 'w-64',
        collapsed: 'w-12',
      },
    },
    defaultVariants: {
      state: 'expanded',
    },
  }
);

// Sidebar 菜单按钮变体
const sidebarMenuButtonVariants = cva(
  'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-hidden ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
  {
    variants: {
      size: {
        sm: 'h-7 text-xs',
        default: 'h-8 text-sm',
        lg: 'h-12 text-sm',
      },
      variant: {
        default: '',
        primary: 'bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground',
        ghost: '',
        selected: 'bg-sidebar-selected text-sidebar-selected-foreground hover:bg-sidebar-selected hover:text-sidebar-selected-foreground',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  }
);

// Sidebar 分组标签变体
const sidebarGroupLabelVariants = cva(
  'text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opa] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0',
  {
    variants: {},
    defaultVariants: {},
  }
);

// 菜单操作按钮变体
const sidebarMenuActionVariants = cva(
  'text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0 after:absolute after:-inset-2 md:after:hidden peer-data-[size=sm]/menu-button:top-1 peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 group-data-[collapsible=icon]:hidden peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0 rounded-sm data-[state=open]:bg-accent',
  {
    variants: {},
    defaultVariants: {},
  }
);

// 收起按钮变体
const sidebarCollapseButtonVariants = cva(
  'absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-md bg-sidebar-accent/50 text-sidebar-foreground/70 opacity-0 transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring [&>svg]:size-4',
  {
    variants: {},
    defaultVariants: {},
  }
);

// 展开按钮变体（在 header 位置）
const sidebarExpandButtonVariants = cva(
  'flex h-8 w-8 items-center justify-center rounded-md text-sidebar-foreground transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring [&>svg]:size-4',
  {
    variants: {},
    defaultVariants: {},
  }
);

// 类型定义
export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof sidebarVariants> {
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}
export interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface SidebarGroupLabelProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof sidebarGroupLabelVariants> {}
export interface SidebarGroupContentProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface SidebarMenuProps extends React.HTMLAttributes<HTMLUListElement> {}
export interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLLIElement> {}
export interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof sidebarMenuButtonVariants> {
  asChild?: boolean;
  isActive?: boolean;
}
export interface SidebarMenuActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof sidebarMenuActionVariants> {}

// SVG 图标组件

const LayoutDashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-dashboard">
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </svg>
);

const ListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list">
    <path d="M3 12h.01" />
    <path d="M3 18h.01" />
    <path d="M3 6h.01" />
    <path d="M8 12h13" />
    <path d="M8 18h13" />
    <path d="M8 6h13" />
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const CircleHelpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-help">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </svg>
);

const EllipsisVerticalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ellipsis-vertical ml-auto size-4">
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
);

// 新的图标：收起和展开
const PanelLeftCloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-panel-left-close">
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M9 3v18" />
    <path d="m16 15-3-3 3-3" />
  </svg>
);

const PanelLeftOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-panel-left-open">
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M9 3v18" />
    <path d="m14 9 3 3-3 3" />
  </svg>
);

// Sidebar 收起按钮
const SidebarCollapseButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof sidebarCollapseButtonVariants>
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(sidebarCollapseButtonVariants({ className }))}
      {...props}
    >
      <PanelLeftCloseIcon />
    </button>
  );
});
SidebarCollapseButton.displayName = 'SidebarCollapseButton';

// Sidebar 展开按钮
const SidebarExpandButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof sidebarExpandButtonVariants>
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(sidebarExpandButtonVariants({ className }))}
      {...props}
    >
      <PanelLeftOpenIcon />
    </button>
  );
});
SidebarExpandButton.displayName = 'SidebarExpandButton';

// Sidebar 主容器
const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, collapsed = false, onCollapsedChange, ...props }, ref) => {
    const [isCollapsed, setIsCollapsed] = React.useState(collapsed);
    const [selectedItem, setSelectedItem] = React.useState('dashboard');

    React.useEffect(() => {
      setIsCollapsed(collapsed);
    }, [collapsed]);

    const handleToggleCollapse = () => {
      const newCollapsed = !isCollapsed;
      setIsCollapsed(newCollapsed);
      onCollapsedChange?.(newCollapsed);
    };

    const handleMenuItemClick = (itemId: string) => {
      setSelectedItem(itemId);
    };

    return (
      <div
        ref={ref}
        data-sidebar="sidebar"
        data-collapsed={isCollapsed}
        className={cn(
          sidebarVariants({ 
            state: isCollapsed ? 'collapsed' : 'expanded',
            className 
          }),
          'group relative',
          isCollapsed && 'overflow-hidden'
        )}
        {...props}
      >
        {/* 收起按钮 - 只在展开状态显示 */}
        {!isCollapsed && (
          <SidebarCollapseButton
            onClick={handleToggleCollapse}
            aria-label="收起侧边栏"
          />
        )}

        {/* Header */}
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              {isCollapsed ? (
                <SidebarExpandButton
                  onClick={handleToggleCollapse}
                  aria-label="展开侧边栏"
                />
              ) : (
                <SidebarMenuButton 
                  size="default" 
                  className="h-8 text-sm data-[slot=sidebar-menu-button]:!p-1.5 hover:bg-transparent hover:text-inherit"
                >
                  <Logo alt="Company Logo" size="md" />
                  <span className="sr-only">Company Logo</span>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        {/* Content */}
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    variant={selectedItem === 'dashboard' ? 'selected' : 'default'}
                    className={cn("h-8 text-sm", isCollapsed && "justify-center px-2")}
                    onClick={() => handleMenuItemClick('dashboard')}
                  >
                    <LayoutDashboardIcon />
                    {!isCollapsed && <span>Dashboard</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    variant={selectedItem === 'projects' ? 'selected' : 'default'}
                    className={cn("h-8 text-sm", isCollapsed && "justify-center px-2")}
                    onClick={() => handleMenuItemClick('projects')}
                  >
                    <ListIcon />
                    {!isCollapsed && <span>Projects</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    variant={selectedItem === 'team' ? 'selected' : 'default'}
                    className={cn("h-8 text-sm", isCollapsed && "justify-center px-2")}
                    onClick={() => handleMenuItemClick('team')}
                  >
                    <UsersIcon />
                    {!isCollapsed && <span>Team</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            {!isCollapsed && (
              <SidebarGroupLabel>Tools</SidebarGroupLabel>
            )}
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  variant={selectedItem === 'settings' ? 'selected' : 'default'}
                  className={cn("h-8 text-sm", isCollapsed && "justify-center px-2")}
                  onClick={() => handleMenuItemClick('settings')}
                >
                  <SettingsIcon />
                  {!isCollapsed && <span>Settings</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  variant={selectedItem === 'help' ? 'selected' : 'default'}
                  className={cn("h-8 text-sm", isCollapsed && "justify-center px-2")}
                  onClick={() => handleMenuItemClick('help')}
                >
                  <CircleHelpIcon />
                  {!isCollapsed && <span>Help</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                size="lg" 
                className={cn(
                  "h-12 text-sm group-data-[collapsible=icon]:p-0! data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
                  isCollapsed && "justify-center px-2"
                )}
              >
                {isCollapsed ? (
                  <Avatar fallback="CN" size="sm" />
                ) : (
                  <AvatarWithInfo
                    fallback="CN"
                    size="sm"
                    name="shadcn"
                    email="m@example.com"
                    className="flex-1"
                  />
                )}
                {!isCollapsed && <EllipsisVerticalIcon />}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </div>
    );
  }
);
Sidebar.displayName = 'Sidebar';

// Sidebar 头部
const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="header"
        className={cn('flex flex-col gap-2 p-2', className)}
        {...props}
      />
    );
  }
);
SidebarHeader.displayName = 'SidebarHeader';

// Sidebar 内容区域
const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="content"
        className={cn('flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden', className)}
        {...props}
      />
    );
  }
);
SidebarContent.displayName = 'SidebarContent';

// Sidebar 底部
const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="footer"
        className={cn('flex flex-col gap-2 p-2', className)}
        {...props}
      />
    );
  }
);
SidebarFooter.displayName = 'SidebarFooter';

// Sidebar 分组
const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="group"
        className={cn('relative flex w-full min-w-0 flex-col p-2', className)}
        {...props}
      />
    );
  }
);
SidebarGroup.displayName = 'SidebarGroup';

// Sidebar 分组标签
const SidebarGroupLabel = React.forwardRef<HTMLDivElement, SidebarGroupLabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="group-label"
        className={cn(sidebarGroupLabelVariants({ className }))}
        {...props}
      />
    );
  }
);
SidebarGroupLabel.displayName = 'SidebarGroupLabel';

// Sidebar 分组内容
const SidebarGroupContent = React.forwardRef<HTMLDivElement, SidebarGroupContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="group-content"
        className={cn('w-full text-sm flex flex-col gap-2', className)}
        {...props}
      />
    );
  }
);
SidebarGroupContent.displayName = 'SidebarGroupContent';

// Sidebar 菜单
const SidebarMenu = React.forwardRef<HTMLUListElement, SidebarMenuProps>(
  ({ className, ...props }, ref) => {
    return (
      <ul
        ref={ref}
        data-sidebar="menu"
        className={cn('flex w-full min-w-0 flex-col gap-1', className)}
        {...props}
      />
    );
  }
);
SidebarMenu.displayName = 'SidebarMenu';

// Sidebar 菜单项
const SidebarMenuItem = React.forwardRef<HTMLLIElement, SidebarMenuItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <li
        ref={ref}
        data-sidebar="menu-item"
        className={cn('group/menu-item relative', className)}
        {...props}
      />
    );
  }
);
SidebarMenuItem.displayName = 'SidebarMenuItem';

// Sidebar 菜单按钮
const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(({ className, size, variant, isActive, asChild, ...props }, ref) => {
  if (asChild) {
    return (
      <div
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ size, variant, className }))}
        {...props as any}
      />
    );
  }

  return (
    <button
      ref={ref}
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ size, variant, className }))}
      {...props}
    />
  );
});
SidebarMenuButton.displayName = 'SidebarMenuButton';

// Sidebar 菜单操作按钮
const SidebarMenuAction = React.forwardRef<HTMLButtonElement, SidebarMenuActionProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        data-sidebar="menu-action"
        className={cn(sidebarMenuActionVariants({ className }))}
        {...props}
      />
    );
  }
);
SidebarMenuAction.displayName = 'SidebarMenuAction';

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarCollapseButton,
  SidebarExpandButton,
  sidebarVariants,
  sidebarMenuButtonVariants,
  sidebarGroupLabelVariants,
  sidebarMenuActionVariants,
  sidebarCollapseButtonVariants,
  sidebarExpandButtonVariants,
}; 