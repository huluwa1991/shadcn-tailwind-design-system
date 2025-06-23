import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const tagVariants = cva(
  "inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground",
        primary: "bg-primary/10 text-primary border border-primary/20",
        success: "bg-success/10 text-success border border-success/20", 
        warning: "bg-warning/10 text-warning border border-warning/20",
        destructive: "bg-destructive/10 text-destructive border border-destructive/20",
      },
      removable: {
        true: "pr-1",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      removable: false,
    },
  }
)

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  onRemove?: () => void
  children: React.ReactNode
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, removable, onRemove, children, ...props }, ref) => {
    const isRemovable = removable || !!onRemove

    return (
      <span
        ref={ref}
        className={cn(tagVariants({ variant, removable: isRemovable }), className)}
        {...props}
      >
        {children}
        {isRemovable && onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onRemove()
            }}
            className="ml-1 hover:bg-current/20 rounded-sm p-0.5 transition-colors"
            aria-label="Remove tag"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </span>
    )
  }
)
Tag.displayName = "Tag"

export { Tag, tagVariants } 