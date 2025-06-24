import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { Button } from "../base/button"
import { cn } from "@/lib/utils"

export interface PopconfirmProps {
  children: React.ReactNode
  title?: string
  description: string
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void
  confirmText?: string
  cancelText?: string
  confirmButtonProps?: React.ComponentProps<typeof Button>
  cancelButtonProps?: React.ComponentProps<typeof Button>
  open?: boolean
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
  placement?: "top" | "bottom" | "left" | "right"
  className?: string
}

const Popconfirm = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopconfirmProps
>(({
  children,
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = "确认",
  cancelText = "取消",
  confirmButtonProps,
  cancelButtonProps,
  open,
  onOpenChange,
  disabled = false,
  placement = "top",
  className,
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isConfirming, setIsConfirming] = React.useState(false)

  const handleOpenChange = (openState: boolean) => {
    if (disabled && openState) return
    
    const newOpenState = open !== undefined ? open : openState
    setIsOpen(newOpenState)
    onOpenChange?.(newOpenState)
  }

  const handleConfirm = async () => {
    if (!onConfirm) return
    
    setIsConfirming(true)
    try {
      await onConfirm()
      handleOpenChange(false)
    } catch (error) {
      console.error('Popconfirm confirm error:', error)
    } finally {
      setIsConfirming(false)
    }
  }

  const handleCancel = () => {
    onCancel?.()
    handleOpenChange(false)
  }

  const isControlled = open !== undefined
  const openState = isControlled ? open : isOpen

  return (
    <PopoverPrimitive.Root open={openState} onOpenChange={handleOpenChange}>
      <PopoverPrimitive.Trigger asChild disabled={disabled}>
        {children}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          ref={ref}
          side={placement}
          sideOffset={8}
          className={cn(
            "z-[100] w-auto max-w-sm rounded-lg border bg-popover p-4 text-popover-foreground outline-none",
            "shadow-lg shadow-black/10 border-border/50",
            "data-[state=open]:animate-in data-[state=closed]:animate-out", 
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[side=bottom]:slide-in-from-top data-[side=left]:slide-in-from-right",
            "data-[side=right]:slide-in-from-left data-[side=top]:slide-in-from-bottom",
            "backdrop-blur-sm",
            className
          )}
          {...props}
        >
          <div className="space-y-3">
            {title && (
              <div className="text-sm font-medium text-foreground">
                {title}
              </div>
            )}
            
            <div className="text-sm text-muted-foreground">
              {description}
            </div>
            
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                disabled={isConfirming}
                {...cancelButtonProps}
              >
                {cancelText}
              </Button>
              
              <Button
                variant="default"
                size="sm"
                onClick={handleConfirm}
                disabled={isConfirming}
                {...confirmButtonProps}
              >
                {isConfirming ? "处理中..." : confirmText}
              </Button>
            </div>
          </div>
          
          <PopoverPrimitive.Arrow 
            className="fill-popover" 
            style={{
              filter: 'drop-shadow(0 3px 2px rgba(0, 0, 0, 0.1))'
            }}
            width={12} 
            height={6}
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
})

Popconfirm.displayName = "Popconfirm"

export { Popconfirm } 