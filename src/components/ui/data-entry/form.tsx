import * as React from "react"
import {
  FieldPath,
  FieldValues,
  useFormContext,
  type FieldError,
} from "react-hook-form"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Label } from "../base/label"
import { Typography } from "../base/typography"

// Form 变体样式
const formVariants = cva("w-full", {
  variants: {
    layout: {
      default: "space-y-6", // XXL等级 - 区块分组
      grid: "space-y-6", // XXL等级 - 网格布局也保持垂直间距
      sectioned: "space-y-10", // XXXL等级 - 页面级分组（多组表单）
    },
  },
  defaultVariants: {
    layout: "default",
  },
})

const formItemVariants = cva("space-y-2", {
  variants: {
    width: {
      auto: "w-auto",
      full: "w-full",
      sm: "w-64",
      md: "w-80",
      lg: "w-96",
      xl: "w-[28rem]",
      "2xl": "w-[32rem]",
    },
  },
  defaultVariants: {
    width: "full",
  },
})

const formMessageVariants = cva("text-xs", {
  variants: {
    variant: {
      default: "text-muted-foreground",
      destructive: "text-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

// FormRow 变体样式 - 用于水平布局
const formRowVariants = cva("grid gap-4", {
  variants: {
    columns: {
      2: "grid-cols-1 lg:grid-cols-2",
    },
    gap: {
      sm: "gap-2",
      md: "gap-4",
    },
  },
  defaultVariants: {
    columns: 2,
    gap: "md",
  },
})

// FormHeader 变体样式 - 用于表单标题区域（紧凑样式）
const formHeaderVariants = cva("space-y-1")

// FormTitle 变体样式
const formTitleVariants = cva("text-xl font-medium leading-none tracking-tight")

// FormSubtitle 变体样式
const formSubtitleVariants = cva("text-sm text-muted-foreground")

// Form 根组件
interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  layout?: "default" | "grid" | "sectioned"
}

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, layout = "default", ...props }, ref) => {
    return (
      <form
        ref={ref}
        className={cn(formVariants({ layout }), className)}
        {...props}
      />
    )
  }
)
Form.displayName = "Form"

// FormRow 组件 - 用于水平布局
interface FormRowProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: "sm" | "md" | "lg"
  /**
   * 列数配置，支持响应式
   * 数字：固定列数
   * 对象：响应式列数 { base: 1, md: 2, lg: 4 }
   */
  columns?: number | {
    base?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
}

const FormRow = React.forwardRef<HTMLDivElement, FormRowProps>(
  ({ className, spacing = "md", columns = 2, children, ...props }, ref) => {
    const spacingClasses = {
      sm: "gap-2",
      md: "gap-4", 
      lg: "gap-6",
    }

    // 生成响应式网格类
    const getGridClasses = () => {
      if (typeof columns === 'number') {
        // 简单数字，生成默认响应式行为
        const colMap: Record<number, string> = {
          1: "grid-cols-1",
          2: "grid-cols-1 md:grid-cols-2",
          3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
          4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
          5: "grid-cols-1 md:grid-cols-3 lg:grid-cols-5",
          6: "grid-cols-1 md:grid-cols-3 lg:grid-cols-6",
          8: "grid-cols-1 md:grid-cols-4 lg:grid-cols-8",
          12: "grid-cols-1 md:grid-cols-6 lg:grid-cols-12",
        }
        return colMap[columns] || `grid-cols-${columns}`
      }

      // 对象形式的响应式配置
      const breakpoints = ['base', 'sm', 'md', 'lg', 'xl'] as const
      const prefixes = ['', 'sm:', 'md:', 'lg:', 'xl:']
      
      return breakpoints
        .map((bp, index) => {
          const cols = columns[bp]
          return cols ? `${prefixes[index]}grid-cols-${cols}` : null
        })
        .filter(Boolean)
        .join(' ')
    }

    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          getGridClasses(),
          spacingClasses[spacing],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
FormRow.displayName = "FormRow"



// FormSection 组件 - 用于表单区块分组，提供合适的间距
interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
}

const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(
  ({ className, title, subtitle, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-4", className)}
        {...props}
      >
        {(title || subtitle) && (
          <div>
            {title && <Typography variant="h3">{title}</Typography>}
            {subtitle && <Typography variant="muted">{subtitle}</Typography>}
          </div>
        )}
        {children}
      </div>
    )
  }
)
FormSection.displayName = "FormSection"

// FormHeader 组件 - 表单标题区域容器
const FormHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(formHeaderVariants(), className)}
      {...props}
    />
  )
})
FormHeader.displayName = "FormHeader"

// FormTitle 组件 - 表单主标题
const FormTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h2
      ref={ref}
      className={cn(formTitleVariants(), className)}
      {...props}
    />
  )
})
FormTitle.displayName = "FormTitle"

// FormSubtitle 组件 - 表单副标题/描述信息
const FormSubtitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(formSubtitleVariants(), className)}
      {...props}
    />
  )
})
FormSubtitle.displayName = "FormSubtitle"

// FormField 组件
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("space-y-2", className)}
      {...props}
    />
  )
})
FormField.displayName = "FormField"

// FormItem 组件
interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 宽度配置，支持多种方式：
   * - 预设值：full, half, third, quarter, auto
   * - 数字：在12列网格中占用的列数 (1-12)
   * - 分数字符串：如 "1/2", "1/3", "2/3", "1/4", "3/4" 等
   * - CSS类：直接传入Tailwind类名
   */
  width?: "full" | "half" | "third" | "quarter" | "auto" | number | string
  /**
   * 列跨度，在网格布局中占用的列数
   */
  span?: number
}

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, width = "full", span, ...props }, ref) => {
    // 生成宽度类名
    const getWidthClass = () => {
      if (span) {
        return `col-span-${span}`
      }

      if (typeof width === 'number') {
        // 数字：在12列网格中的列数
        return `col-span-${width}`
      }

      if (typeof width === 'string') {
        // 预设值
        const presetClasses = {
          full: "w-full",
          half: "w-full md:w-1/2",
          third: "w-full md:w-1/3", 
          quarter: "w-full md:w-1/4",
          auto: "w-auto",
        }

        if (presetClasses[width as keyof typeof presetClasses]) {
          return presetClasses[width as keyof typeof presetClasses]
        }

        // 分数字符串处理
        if (width.includes('/')) {
          return `w-${width}`
        }

        // 直接作为CSS类返回
        return width
      }

      return "w-full"
    }

    return (
      <div
        ref={ref}
        className={cn(getWidthClass(), "space-y-2", className)}
        {...props}
      />
    )
  }
)
FormItem.displayName = "FormItem"

// useFormField hook
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  return {
    ...fieldState,
    name: fieldContext.name,
  }
}

// FormLabel 组件
interface FormLabelProps extends React.ComponentPropsWithoutRef<typeof Label> {
  required?: boolean
}

const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  FormLabelProps
>(({ className, required, children, ...props }, ref) => {
  return (
    <Label
      ref={ref}
      className={cn(className)}
      required={required}
      {...props}
    >
      {children}
    </Label>
  )
})
FormLabel.displayName = "FormLabel"

// FormControl 组件
interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string
}

const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  ({ className, name, ...props }, ref) => {
    const formContext = useFormContext<FieldValues>()
    const error = name && formContext?.formState?.errors?.[name] as FieldError | undefined

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full",
          error && "has-error",
          className
        )}
        {...props}
      />
    )
  }
)
FormControl.displayName = "FormControl"

// FormDescription 组件（辅助文字）
const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(formMessageVariants({ variant: "default" }), className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

// FormMessage 组件（错误信息和辅助信息的统一显示）
interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  error?: boolean
}

const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, children, error, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          "text-xs",
          error ? "text-destructive" : "text-muted-foreground",
          className
        )}
        {...props}
      >
        {children}
      </p>
    )
  }
)
FormMessage.displayName = "FormMessage"

// FormButtons 组件（表单按钮布局）
const formButtonsVariants = cva("flex gap-3", {
  variants: {
    layout: {
      full: "w-full",
      right: "justify-end",
    },
    direction: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
  },
  defaultVariants: {
    layout: "right",
    direction: "horizontal",
  },
})

interface FormButtonsProps extends React.HTMLAttributes<HTMLDivElement> {
  layout?: "full" | "right"
  direction?: "horizontal" | "vertical"
}

const FormButtons = React.forwardRef<HTMLDivElement, FormButtonsProps>(
  ({ className, layout, direction, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          formButtonsVariants({ layout, direction }),
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
FormButtons.displayName = "FormButtons"

export {
  useFormField,
  Form,
  FormRow,
  FormSection,
  FormHeader,
  FormTitle,
  FormSubtitle,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormButtons,
  FormField,
  formVariants,
  formRowVariants,
  formHeaderVariants,
  formTitleVariants,
  formSubtitleVariants,
  formItemVariants,
  formMessageVariants,
  formButtonsVariants,
}

export type {
  FormProps,
  FormRowProps,
  FormSectionProps,
  FormItemProps,
  FormLabelProps,
  FormMessageProps,
  FormButtonsProps,
} 