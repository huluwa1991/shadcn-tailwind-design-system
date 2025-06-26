import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "../base/button"
import { Calendar } from "./calendar"
import {
  Dropdown,
  DropdownContainer,
  DropdownTrigger,
  DropdownContent,
} from "../base/dropdown"



// 单日期选择器接口
export interface DatePickerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Button>, "value" | "onChange" | "variant" | "size" | "tooltip" | "allowNoTooltip"> {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  formatStr?: string
  width?: 'auto' | 'full'
  minWidth?: string
  showDropdowns?: boolean
}

// 日期范围选择器接口
export interface DateRangePickerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Button>, "value" | "onChange" | "variant" | "size" | "tooltip" | "allowNoTooltip"> {
  value?: DateRange
  onChange?: (range: DateRange | undefined) => void
  placeholder?: string
  disabled?: boolean
  formatStr?: string
  numberOfMonths?: number
  width?: 'auto' | 'full'
  minWidth?: string
  showDropdowns?: boolean
}

// 单日期选择器
const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  ({ 
    className, 
    value, 
    onChange, 
    placeholder = "选择日期", 
    disabled = false,
    formatStr = "yyyy年MM月dd日",
    width = 'auto',
    minWidth = '200px',
    showDropdowns = true,
    ...props 
  }, ref) => {
    const [open, setOpen] = React.useState(false)

    const getWidthClasses = () => {
      const baseClasses = "flex h-9 items-center justify-start gap-2 rounded-md border border-input bg-transparent px-3 text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted cursor-pointer"
      const widthClasses = width === 'auto' ? "w-auto" : "w-full"
      const minWidthStyle = width === 'auto' ? { minWidth } : {}
      
      return {
        className: cn(baseClasses, widthClasses, !value && "text-muted-foreground", className),
        style: minWidthStyle
      }
    }

    const { className: buttonClassName, style } = getWidthClasses()

    return (
      <DropdownContainer width={width}>
        <Dropdown open={open} onOpenChange={setOpen}>
          <DropdownTrigger
            asChild
            width={width}
          >
            <button
              ref={ref}
              type="button"
              className={buttonClassName}
              style={style}
              disabled={disabled}
              {...props}
            >
              <CalendarIcon className="h-4 w-4 flex-shrink-0" />
              <span className="flex-1 truncate text-left">
                {value ? format(value, formatStr) : placeholder}
              </span>
            </button>
          </DropdownTrigger>
          <DropdownContent className="w-auto p-0 overflow-hidden" size="auto" align="start">
            <Calendar
              mode="single"
              selected={value}
              onSelect={(date) => {
                onChange?.(date)
                setOpen(false)
              }}
              initialFocus
              captionLayout={showDropdowns ? "dropdown" : "label"}
            />
          </DropdownContent>
        </Dropdown>
      </DropdownContainer>
    )
  }
)
DatePicker.displayName = "DatePicker"

// 日期范围选择器
const DateRangePicker = React.forwardRef<HTMLButtonElement, DateRangePickerProps>(
  ({ 
    className, 
    value, 
    onChange, 
    placeholder = "选择日期范围", 
    disabled = false,
    formatStr = "yyyy年MM月dd日",
    numberOfMonths = 2,
    width = 'auto',
    minWidth = '300px',
    showDropdowns = true,
    ...props 
  }, ref) => {
    const [open, setOpen] = React.useState(false)

    const formatRange = (range: DateRange | undefined) => {
      if (!range?.from) return placeholder
      if (!range.to) return `${format(range.from, formatStr)} - 选择结束日期`
      return `${format(range.from, formatStr)} - ${format(range.to, formatStr)}`
    }

    const getWidthClasses = () => {
      const baseClasses = "flex h-9 items-center justify-start gap-2 rounded-md border border-input bg-transparent px-3 text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted cursor-pointer"
      const widthClasses = width === 'auto' ? "w-auto" : "w-full"
      const minWidthStyle = width === 'auto' ? { minWidth } : {}
      
      return {
        className: cn(baseClasses, widthClasses, !value?.from && "text-muted-foreground", className),
        style: minWidthStyle
      }
    }

    const { className: buttonClassName, style } = getWidthClasses()

    return (
      <DropdownContainer width={width}>
        <Dropdown open={open} onOpenChange={setOpen}>
          <DropdownTrigger
            asChild
            width={width}
          >
            <button
              ref={ref}
              type="button"
              className={buttonClassName}
              style={style}
              disabled={disabled}
              {...props}
            >
              <CalendarIcon className="h-4 w-4 flex-shrink-0" />
              <span className="flex-1 truncate text-left">
                {formatRange(value)}
              </span>
            </button>
          </DropdownTrigger>
          <DropdownContent className="w-auto p-0 overflow-hidden" size="auto" align="start">
            <Calendar
              mode="range"
              selected={value}
              onSelect={onChange}
              numberOfMonths={numberOfMonths}
              initialFocus
              captionLayout={showDropdowns ? "dropdown" : "label"}
            />
          </DropdownContent>
        </Dropdown>
      </DropdownContainer>
    )
  }
)
DateRangePicker.displayName = "DateRangePicker"

export { DatePicker, DateRangePicker } 