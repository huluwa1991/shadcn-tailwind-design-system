import toast, { Toaster as HotToaster, ToasterProps, Toast } from 'react-hot-toast';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

// Toast 配置选项
interface ToastOptions {
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
  id?: string;
}

// Toaster 组件属性
interface ToasterComponentProps extends ToasterProps {
  className?: string;
}

// 自定义 Toast 渲染组件
const CustomToast = ({ toast: t }: { toast: Toast }) => {
  const getIcon = () => {
    switch (t.type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Info className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-lg border border-border bg-background p-4 shadow-lg',
        'min-w-[300px] max-w-md mx-auto',
        t.visible 
          ? 'animate-in slide-in-from-top-2 fade-in duration-200' 
          : 'animate-out slide-out-to-top-2 fade-out duration-200'
      )}
    >
      {getIcon()}
      <div className="flex-1">
        <div className="text-sm font-medium text-foreground">
          {String(t.message)}
        </div>
        {(t as any).description && (
          <div className="text-sm text-muted-foreground mt-1">
            {String((t as any).description)}
          </div>
        )}
      </div>
      {(t as any).action && (
        <button
          onClick={(t as any).action.onClick}
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          {(t as any).action.label}
        </button>
      )}
      <button
        onClick={() => toast.dismiss(t.id)}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        ×
      </button>
    </div>
  );
};

// Toaster 组件
const Toaster = ({ className, ...props }: ToasterComponentProps) => {
  return (
    <HotToaster
      position="top-center"
      containerClassName={cn('toaster', className)}
      toastOptions={{
        duration: 4000,
        removeDelay: 200, // 匹配退出动画时间
        style: {
          background: 'transparent',
          border: 'none',
          padding: 0,
          boxShadow: 'none',
        },
      }}
      {...props}
    >
      {(t) => <CustomToast toast={t} />}
    </HotToaster>
  );
};

// 扩展的 toast 函数
const customToast = (message: string, options?: ToastOptions) => {
  return toast.custom(
    (t) => (
      <CustomToast 
        toast={{
          ...t,
          message,
          ...(options?.description && { description: options.description }),
          ...(options?.action && { action: options.action }),
        } as Toast}
      />
    ),
    {
      id: options?.id,
      duration: options?.duration || 4000,
      removeDelay: 200,
    }
  );
};

// Toast 成功
customToast.success = (message: string, options?: ToastOptions) => {
  return toast.custom(
    (t) => (
      <CustomToast 
        toast={{
          ...t,
          type: 'success',
          message,
          ...(options?.description && { description: options.description }),
          ...(options?.action && { action: options.action }),
        } as Toast}
      />
    ),
    {
      id: options?.id,
      duration: options?.duration || 4000,
      removeDelay: 200,
    }
  );
};

// Toast 错误
customToast.error = (message: string, options?: ToastOptions) => {
  return toast.custom(
    (t) => (
      <CustomToast 
        toast={{
          ...t,
          type: 'error',
          message,
          ...(options?.description && { description: options.description }),
          ...(options?.action && { action: options.action }),
        } as Toast}
      />
    ),
    {
      id: options?.id,
      duration: options?.duration || 4000,
      removeDelay: 200,
    }
  );
};

// Toast 警告
customToast.warning = (message: string, options?: ToastOptions) => {
  return toast.custom(
    (t) => (
      <div
        className={cn(
          'flex items-center gap-3 rounded-lg border border-border bg-background p-4 shadow-lg',
          'min-w-[300px] max-w-md mx-auto',
          t.visible 
            ? 'animate-in slide-in-from-top-2 fade-in duration-200' 
            : 'animate-out slide-out-to-top-2 fade-out duration-200'
        )}
      >
        <AlertCircle className="h-4 w-4 text-yellow-600" />
        <div className="flex-1">
          <div className="text-sm font-medium text-foreground">
            {message}
          </div>
          {options?.description && (
            <div className="text-sm text-muted-foreground mt-1">
              {options.description}
            </div>
          )}
        </div>
        {options?.action && (
          <button
            onClick={options.action.onClick}
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            {options.action.label}
          </button>
        )}
        <button
          onClick={() => toast.dismiss(t.id)}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          ×
        </button>
      </div>
    ),
    {
      id: options?.id,
      duration: options?.duration || 4000,
      removeDelay: 200,
    }
  );
};

// Toast 信息
customToast.info = (message: string, options?: ToastOptions) => {
  return customToast(message, options);
};

// Toast 加载
customToast.loading = (message: string, options?: Omit<ToastOptions, 'action'>) => {
  return toast.loading(message, {
    id: options?.id,
    duration: options?.duration,
  });
};

// Toast Promise
customToast.promise = <T,>(
  promise: Promise<T>,
  options: {
    loading: string;
    success: string | ((data: T) => string);
    error: string | ((error: any) => string);
    description?: string;
    duration?: number;
    id?: string;
  }
) => {
  return toast.promise(promise, {
    loading: options.loading,
    success: options.success,
    error: options.error,
  });
};

// Toast 关闭
customToast.dismiss = (id?: string) => {
  return toast.dismiss(id);
};

export { Toaster, customToast as toast, type ToastOptions }; 