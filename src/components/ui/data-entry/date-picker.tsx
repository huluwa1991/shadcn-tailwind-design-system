import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "../base/button"
import { Calendar } from "./calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../feedback/popover"

// 单日期选择器接口
export interface DatePickerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Button>, "value" | "onChange" | "variant" | "size" | "tooltip" | "allowNoTooltip"> {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  formatStr?: string
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
    ...props 
  }, ref) => {
    const [open, setOpen] = React.useState(false)

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            size="sm"
            className={cn(
              "justify-start text-left font-normal w-auto min-w-[200px]",
              !value && "text-muted-foreground",
              className
            )}
            disabled={disabled}
            {...props}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, formatStr) : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 overflow-hidden" align="start" data-slot="popover-content">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange?.(date)
              setOpen(false)
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
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
    ...props 
  }, ref) => {
    const [open, setOpen] = React.useState(false)

    const formatRange = (range: DateRange | undefined) => {
      if (!range?.from) return placeholder
      if (!range.to) return `${format(range.from, formatStr)} - 选择结束日期`
      return `${format(range.from, formatStr)} - ${format(range.to, formatStr)}`
    }

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            size="sm"
            className={cn(
              "justify-start text-left font-normal w-auto min-w-[300px]",
              !value?.from && "text-muted-foreground",
              className
            )}
            disabled={disabled}
            {...props}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatRange(value)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 overflow-hidden" align="start" data-slot="popover-content">
          <Calendar
            mode="range"
            selected={value}
            onSelect={onChange}
            numberOfMonths={numberOfMonths}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    )
  }
)
DateRangePicker.displayName = "DateRangePicker"

export { DatePicker, DateRangePicker } 