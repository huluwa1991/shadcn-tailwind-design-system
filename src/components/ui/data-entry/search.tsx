import * as React from "react"
import { Search, X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "../base/button"

const searchVariants = cva(
  "relative flex items-center",
  {
    variants: {
      variant: {
        default: "w-64",
        full: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// 基础搜索输入框
export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof searchVariants> {
  onClear?: () => void
  showClearButton?: boolean
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, variant, onClear, showClearButton = true, ...props }, ref) => {
    const [value, setValue] = React.useState(props.value || "")

    const handleClear = () => {
      setValue("")
      onClear?.()
    }

    React.useEffect(() => {
      setValue(props.value || "")
    }, [props.value])

    return (
      <div className={cn(searchVariants({ variant }), className)}>
        <div className="relative flex w-full items-center">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <input
            ref={ref}
            type="text"
            className={cn(
              "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "pl-10",
              showClearButton && value && "pr-10"
            )}
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              props.onChange?.(e)
            }}
            {...props}
          />
          {showClearButton && value && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 h-6 w-6 p-0 hover:bg-transparent"
              onClick={handleClear}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">清除搜索</span>
            </Button>
          )}
        </div>
      </div>
    )
  }
)
SearchInput.displayName = "SearchInput"

export { SearchInput, searchVariants } 