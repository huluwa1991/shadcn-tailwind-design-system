import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X, AlertCircle, CheckCircle, AlertTriangle, Info } from "lucide-react"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg px-4 py-3 text-sm transition-all",
  {
    variants: {
      variant: {
        info: "bg-primary/10 text-primary [&>svg]:text-primary",
        destructive: "bg-destructive/10 text-destructive [&>svg]:text-destructive",
        success: "bg-success/10 text-success [&>svg]:text-success",
        warning: "bg-warning/10 text-warning [&>svg]:text-warning",
      },
      closable: {
        true: "pr-10",
        false: "",
      },
    },
    defaultVariants: {
      variant: "info",
      closable: false,
    },
  }
)

// 图标映射
const iconMap = {
  info: Info,
  destructive: AlertCircle,
  success: CheckCircle,
  warning: AlertTriangle,
}

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  onClose?: () => void
  showIcon?: boolean
}

function Alert({
  className,
  variant,
  closable,
  onClose,
  showIcon = false,
  children,
  ...props
}: AlertProps) {
  const isClosable = closable || !!onClose
  const IconComponent = iconMap[variant || "info"]

  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant, closable: isClosable }), className)}
      {...props}
    >
      <div className="flex gap-3">
        {showIcon && (
          <div className="flex-shrink-0 flex items-center h-5">
            <IconComponent className="h-4 w-4" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </div>
      {isClosable && onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm p-0.5 opacity-70 transition-colors hover:bg-current/20 hover:opacity-100"
          aria-label="关闭提示"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5
      className={cn("pt-0.75 mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("text-sm [&_p]:leading-relaxed opacity-90", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription } 