import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Check, X } from "lucide-react"

import { cn } from "@/lib/utils"

const stepsVariants = cva(
  "flex w-full",
  {
    variants: {
      size: {
        default: "",
        sm: "",
      },
      orientation: {
        horizontal: "items-center",
        vertical: "flex-col",
      },
    },
    defaultVariants: {
      size: "default",
      orientation: "horizontal",
    },
  }
)

const stepItemVariants = cva(
  "flex",
  {
    variants: {
      size: {
        default: "gap-3",
        sm: "gap-2",
      },
      isLast: {
        true: "",
        false: "",
      },
      orientation: {
        horizontal: "items-center",
        vertical: "items-start",
      },
    },
    compoundVariants: [
      {
        orientation: "horizontal",
        isLast: false,
        className: "flex-1",
      },
      {
        orientation: "vertical",
        isLast: false,
        className: "pb-8",
      },
    ],
    defaultVariants: {
      size: "default",
      isLast: false,
      orientation: "horizontal",
    },
  }
)

const stepIndicatorVariants = cva(
  "flex items-center justify-center rounded-full font-medium transition-colors duration-200 flex-shrink-0 border-2 relative",
  {
    variants: {
      status: {
        pending: "bg-muted text-muted-foreground border-muted",
        current: "bg-primary text-primary-foreground border-primary",
        completed: "bg-primary text-primary-foreground border-primary",
        error: "bg-red-500 text-white border-red-500",
      },
      size: {
        default: "h-8 w-8 text-sm",
        sm: "h-6 w-6 text-xs",
      },
      clickable: {
        true: "cursor-pointer hover:opacity-80",
        false: "",
      },
    },
    defaultVariants: {
      status: "pending",
      size: "default",
      clickable: false,
    },
  }
)

const stepContentVariants = cva(
  "flex flex-col text-left",
  {
    variants: {
      size: {
        default: "gap-0.5 min-w-0",
        sm: "gap-0 min-w-0",
      },
      orientation: {
        horizontal: "",
        vertical: "flex-1",
      },
    },
    defaultVariants: {
      size: "default",
      orientation: "horizontal",
    },
  }
)

const stepTitleVariants = cva(
  "font-medium transition-colors duration-200",
  {
    variants: {
      status: {
        pending: "text-muted-foreground",
        current: "text-foreground",
        completed: "text-foreground",
        error: "text-red-600",
      },
      size: {
        default: "text-sm",
        sm: "text-xs",
      },
      orientation: {
        horizontal: "whitespace-nowrap",
        vertical: "",
      },
    },
    defaultVariants: {
      status: "pending",
      size: "default",
      orientation: "horizontal",
    },
  }
)

const stepDescriptionVariants = cva(
  "transition-colors duration-200",
  {
    variants: {
      status: {
        pending: "text-muted-foreground",
        current: "text-muted-foreground",
        completed: "text-muted-foreground",
        error: "text-red-500",
      },
      size: {
        default: "text-xs",
        sm: "text-xs",
      },
      orientation: {
        horizontal: "whitespace-nowrap",
        vertical: "",
      },
    },
    defaultVariants: {
      status: "pending",
      size: "default",
      orientation: "horizontal",
    },
  }
)

const stepSeparatorVariants = cva(
  "bg-border transition-colors duration-200",
  {
    variants: {
      status: {
        completed: "bg-primary",
        default: "bg-border",
      },
      size: {
        default: "",
        sm: "",
      },
      orientation: {
        horizontal: "flex-1 h-px mx-4",
        vertical: "w-px absolute left-1/2 transform -translate-x-1/2",
      },
    },
    compoundVariants: [
      {
        orientation: "vertical",
        size: "default",
        className: "top-8 h-12",
      },
      {
        orientation: "vertical",
        size: "sm",
        className: "top-6 h-12",
      },
    ],
    defaultVariants: {
      status: "default",
      size: "default",
      orientation: "horizontal",
    },
  }
)

export interface StepItem {
  id: string
  title: string
  description?: string
  status?: "pending" | "current" | "completed" | "error"
}

export interface StepsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepsVariants> {
  steps: StepItem[]
  current?: number
  clickable?: boolean
  onStepClick?: (step: number, stepItem: StepItem) => void
}

const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  ({ className, steps, current = 0, clickable = false, onStepClick, size, orientation = "horizontal", ...props }, ref) => {
    const getStepStatus = (index: number, step: StepItem): StepItem["status"] => {
      if (step.status) return step.status
      if (index < current) return "completed"
      if (index === current) return "current"
      return "pending"
    }

    const handleStepClick = (index: number, step: StepItem) => {
      if (clickable && onStepClick) {
        onStepClick(index, step)
      }
    }

    const renderStepIndicator = (_step: StepItem, index: number, status: StepItem["status"]) => {
      if (status === "completed") {
        return <Check className={size === "sm" ? "h-3 w-3" : "h-4 w-4"} />
      }
      if (status === "error") {
        return <X className={size === "sm" ? "h-3 w-3" : "h-4 w-4"} />
      }
      return index + 1
    }

    return (
      <div
        ref={ref}
        className={cn(stepsVariants({ size, orientation, className }))}
        {...props}
      >
        {steps.map((step, index) => {
          const status = getStepStatus(index, step)
          const isLast = index === steps.length - 1

          return (
            <React.Fragment key={step.id}>
              <div className={cn(stepItemVariants({ size, isLast, orientation }))}>
                <div className="relative">
                  <div
                    className={cn(
                      stepIndicatorVariants({
                        status,
                        size,
                        clickable,
                      })
                    )}
                    onClick={() => handleStepClick(index, step)}
                  >
                    {renderStepIndicator(step, index, status)}
                  </div>
                  {orientation === "vertical" && !isLast && (
                    <div
                      className={cn(
                        stepSeparatorVariants({
                          status: status === "completed" ? "completed" : "default",
                          size,
                          orientation,
                        })
                      )}
                    />
                  )}
                </div>
                <div className={cn(stepContentVariants({ size, orientation }))}>
                  <div
                    className={cn(
                      stepTitleVariants({ status, size, orientation }),
                      clickable && "cursor-pointer"
                    )}
                    onClick={() => handleStepClick(index, step)}
                  >
                    {step.title}
                  </div>
                  {step.description && (
                    <div className={cn(stepDescriptionVariants({ status, size, orientation }))}>
                      {step.description}
                    </div>
                  )}
                </div>
              </div>
              {orientation === "horizontal" && !isLast && (
                <div
                  className={cn(
                    stepSeparatorVariants({
                      status: status === "completed" ? "completed" : "default",
                      size,
                      orientation,
                    })
                  )}
                />
              )}
            </React.Fragment>
          )
        })}
      </div>
    )
  }
)
Steps.displayName = "Steps"

export { Steps, stepsVariants } 