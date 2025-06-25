import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full border',
  {
    variants: {
      size: {
        sm: 'h-8 w-8',
        default: 'h-10 w-10',
        lg: 'h-12 w-12',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

const avatarImageVariants = cva(
  'aspect-square h-full w-full object-cover'
);

const avatarFallbackVariants = cva(
  'flex h-full w-full items-center justify-center rounded-full bg-sidebar-accent text-sidebar-accent-foreground text-sm font-medium',
  {
    variants: {
      size: {
        sm: 'text-xs',
        default: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, src, alt, fallback, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);
    
    const handleImageError = () => {
      setImageError(true);
    };

    return (
      <span
        className={cn(avatarVariants({ size, className }))}
        ref={ref}
        {...props}
      >
        {src && !imageError ? (
          <img
            className={cn(avatarImageVariants())}
            src={src}
            alt={alt}
            onError={handleImageError}
          />
        ) : (
          <span className={cn(avatarFallbackVariants({ size }))}>
            {fallback || '?'}
          </span>
        )}
      </span>
    );
  }
);
Avatar.displayName = 'Avatar';

// 用户信息组件
export interface AvatarUserInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  email?: string;
  description?: string;
}

const AvatarUserInfo = React.forwardRef<HTMLDivElement, AvatarUserInfoProps>(
  ({ className, name, email, description, ...props }, ref) => {
    return (
      <div className={cn('flex flex-col gap-0.5', className)} ref={ref} {...props}>
        <p className="text-sm leading-none font-medium">{name}</p>
        {email && (
          <p className="text-muted-foreground text-xs">{email}</p>
        )}
        {description && (
          <p className="text-muted-foreground text-xs">{description}</p>
        )}
      </div>
    );
  }
);
AvatarUserInfo.displayName = 'AvatarUserInfo';

// 组合组件
export interface AvatarWithInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: VariantProps<typeof avatarVariants>['size'];
  name: string;
  email?: string;
  description?: string;
}

const AvatarWithInfo = React.forwardRef<HTMLDivElement, AvatarWithInfoProps>(
  ({ className, src, alt, fallback, size, name, email, description, ...props }, ref) => {
    return (
      <div className={cn('flex items-center gap-4', className)} ref={ref} {...props}>
        <Avatar src={src} alt={alt} fallback={fallback} size={size} />
        <AvatarUserInfo name={name} email={email} description={description} />
      </div>
    );
  }
);
AvatarWithInfo.displayName = 'AvatarWithInfo';

export { Avatar, AvatarUserInfo, AvatarWithInfo, avatarVariants }; 