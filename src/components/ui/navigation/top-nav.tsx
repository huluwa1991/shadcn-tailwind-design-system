import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Logo } from '../layout/logo';
import { Avatar } from '../base/avatar';
import { Button } from '../base/button';

// TopNav 容器变体
const topNavVariants = cva(
  'bg-sidebar flex items-center justify-between w-full h-12 px-6 transition-all duration-300 ease-in-out',
  {
    variants: {},
    defaultVariants: {},
  }
);

// 帮助图标
const HelpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-help">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </svg>
);

// 类型定义
export interface TopNavProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof topNavVariants> {
  /**
   * 是否为登录状态
   */
  isLoggedIn?: boolean;
  /**
   * 用户头像URL
   */
  avatarSrc?: string;
  /**
   * 用户头像回退文字
   */
  avatarFallback?: string;
  /**
   * 用户名
   */
  userName?: string;
  /**
   * 帮助按钮点击回调
   */
  onHelpClick?: () => void;
  /**
   * 头像点击回调（个人中心）
   */
  onAvatarClick?: () => void;
  /**
   * 登录按钮点击回调
   */
  onLoginClick?: () => void;
  /**
   * Logo点击回调
   */
  onLogoClick?: () => void;
}

const TopNav = React.forwardRef<HTMLDivElement, TopNavProps>(
  ({ 
    className, 
    isLoggedIn = false,
    avatarSrc,
    avatarFallback,
    userName,
    onHelpClick,
    onAvatarClick,
    onLoginClick,
    onLogoClick,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(topNavVariants({ className }))}
        {...props}
      >
        {/* 左侧 Logo */}
        <div className="flex items-center">
          <div 
            className="cursor-pointer"
            onClick={onLogoClick}
          >
            <Logo />
          </div>
        </div>

        {/* 右侧操作区域 */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              {/* 已登录状态：帮助 + 头像 */}
              <Button
                variant="ghost"
                size="sm-icon"
                onClick={onHelpClick}
                tooltip="帮助"
              >
                <HelpIcon />
              </Button>
              
              <div 
                className="cursor-pointer"
                onClick={onAvatarClick}
              >
                <Avatar
                  src={avatarSrc}
                  alt={userName}
                  fallback={avatarFallback || userName?.charAt(0)?.toUpperCase() || 'U'}
                  size="sm"
                />
              </div>
            </>
          ) : (
            <>
              {/* 未登录状态：帮助 + 登录按钮 */}
              <Button
                variant="ghost"
                size="sm-icon"
                onClick={onHelpClick}
                tooltip="帮助"
              >
                <HelpIcon />
              </Button>
              
              <Button
                variant="default"
                size="sm"
                onClick={onLoginClick}
              >
                登录
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }
);

TopNav.displayName = 'TopNav';

export { TopNav, topNavVariants }; 