import * as React from "react"
import { cn } from "@/lib/utils"
import { Tag } from "../data-display/tags"

export interface TagsInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
  disabled?: boolean
  maxTags?: number
  duplicateCheck?: boolean
  onTagAdd?: (tag: string) => void
  onTagRemove?: (tag: string, index: number) => void
}

const TagsInput = React.forwardRef<HTMLDivElement, TagsInputProps>(
  ({ 
    className, 
    value, 
    onChange, 
    placeholder = "输入标签，支持空格、逗号、顿号分隔...",
    disabled = false,
    maxTags,
    duplicateCheck = true,
    onTagAdd,
    onTagRemove,
    ...props 
  }, ref) => {
    const [inputValue, setInputValue] = React.useState("")
    const [isComposing, setIsComposing] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const addTag = (tagText: string) => {
      const trimmedTag = tagText.trim()
      
      if (!trimmedTag) return
      
      // 检查是否超过最大标签数
      if (maxTags && value.length >= maxTags) return
      
      // 检查重复
      if (duplicateCheck && value.includes(trimmedTag)) return
      
      const newTags = [...value, trimmedTag]
      onChange(newTags)
      onTagAdd?.(trimmedTag)
      setInputValue("")
    }

    // 支持多种分隔符的标签添加
    const addMultipleTags = (text: string) => {
      // 支持的分隔符：空格、中文顿号、中文逗号、英文逗号
      const separators = /[\s、，,]+/
      const tags = text.split(separators).filter(tag => tag.trim())
      
      // 收集所有新的有效标签
      const newValidTags: string[] = []
      let currentLength = value.length
      
      tags.forEach(tag => {
        const trimmedTag = tag.trim()
        if (trimmedTag && 
            (!maxTags || currentLength < maxTags) && 
            (!duplicateCheck || (!value.includes(trimmedTag) && !newValidTags.includes(trimmedTag)))) {
          newValidTags.push(trimmedTag)
          currentLength++
        }
      })
      
      // 一次性更新所有标签
      if (newValidTags.length > 0) {
        const newTags = [...value, ...newValidTags]
        onChange(newTags)
        newValidTags.forEach(tag => onTagAdd?.(tag))
      }
      
      setInputValue("")
    }

    const removeTag = (index: number) => {
      const tagToRemove = value[index]
      const newTags = value.filter((_, i) => i !== index)
      onChange(newTags)
      onTagRemove?.(tagToRemove, index)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // 如果正在输入中文，不处理空格和回车键
      if (isComposing) return
      
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault()
        addTag(inputValue)
      } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
        // 当输入框为空且有标签时，按退格键删除最后一个标签
        removeTag(value.length - 1)
      }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      
      // 检查是否包含分隔符（除了空格，因为空格可能是正常输入）
      const hasSeparator = /[、，,]/.test(newValue)
      
      if (hasSeparator) {
        // 如果包含分隔符，立即处理并添加标签
        addMultipleTags(newValue)
      } else {
        setInputValue(newValue)
      }
    }

    const handleCompositionStart = () => {
      setIsComposing(true)
    }

    const handleCompositionEnd = () => {
      setIsComposing(false)
    }

    const handleContainerClick = () => {
      inputRef.current?.focus()
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex min-h-9 w-full flex-wrap gap-1 rounded-md border border-input bg-transparent px-3 py-1 text-sm transition-colors placeholder:text-muted-foreground focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted",
          className
        )}
        onClick={handleContainerClick}
        {...props}
      >
        {/* 渲染已有标签 */}
        {value.map((tag, index) => (
          <Tag
            key={index}
            variant="default"
            removable
            onRemove={() => removeTag(index)}
            className="shrink-0"
          >
            {tag}
          </Tag>
        ))}
        
        {/* 输入框 */}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          placeholder={value.length === 0 ? placeholder : ""}
          disabled={disabled || (maxTags ? value.length >= maxTags : false)}
          className="flex-1 min-w-0 border-0 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
        />
      </div>
    )
  }
)

TagsInput.displayName = "TagsInput"

export { TagsInput } 