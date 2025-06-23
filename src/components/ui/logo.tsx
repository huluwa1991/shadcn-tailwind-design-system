import * as React from 'react';
import { cn } from '../../lib/utils';

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  lightSrc?: string;
  darkSrc?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = React.forwardRef<HTMLImageElement, LogoProps>(
  ({ lightSrc = '/logo.png', darkSrc = '/logo_dark.png', size = 'md', className, ...props }, ref) => {
    const [isDark, setIsDark] = React.useState(false);

    React.useEffect(() => {
      // 检查初始主题
      const checkTheme = () => {
        const htmlElement = document.documentElement;
        // 优先检查明确的 dark/light 类，然后回退到系统偏好设置
        const hasDarkClass = htmlElement.classList.contains('dark');
        const hasLightClass = htmlElement.classList.contains('light');
        
        let isDarkMode;
        if (hasDarkClass && !hasLightClass) {
          isDarkMode = true;
        } else if (hasLightClass && !hasDarkClass) {
          isDarkMode = false;
        } else {
          // 如果都没有或者都有，使用系统偏好设置
          isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        

        setIsDark(isDarkMode);
      };

      // 初始检查
      checkTheme();

      // 监听主题变化
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            checkTheme();
          }
        });
      });

      // 监听 html 元素的 class 变化
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      });

      // 监听系统主题变化
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleMediaChange = () => checkTheme();
      mediaQuery.addEventListener('change', handleMediaChange);

      return () => {
        observer.disconnect();
        mediaQuery.removeEventListener('change', handleMediaChange);
      };
    }, []);

    const sizeClasses = {
      sm: 'h-4',
      md: 'h-6', 
      lg: 'h-8'
    };

    return (
      <img
        ref={ref}
        src={isDark ? darkSrc : lightSrc}
        className={cn('w-auto', sizeClasses[size], className)}
        {...props}
      />
    );
  }
);

Logo.displayName = 'Logo';

export { Logo };
export type { LogoProps }; 