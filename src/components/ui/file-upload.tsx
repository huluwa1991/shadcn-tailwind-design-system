import * as React from "react"
import { Upload, FileText } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Tag } from "./tags"

export interface FileUploadProps
  extends React.HTMLAttributes<HTMLDivElement> {
  accept?: string
  maxSize?: number // in bytes
  helperText?: string
  onFileSelect?: (file: File | null) => void
  disabled?: boolean
  placeholder?: string
}

const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  ({ 
    className, 
    accept = "*/*",
    maxSize = 10 * 1024 * 1024, // 10MB default
    helperText,
    onFileSelect,
    disabled = false,
    placeholder = "选择文件",
    ...props 
  }, ref) => {
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null)
    const [error, setError] = React.useState<string>("")
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    const formatFileSize = (bytes: number): string => {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const validateFile = (file: File): string | null => {
      // Check file size
      if (file.size > maxSize) {
        return `文件大小不能超过 ${formatFileSize(maxSize)}`
      }

      // Check file type if accept is specified and not "*/*"
      if (accept !== "*/*") {
        const acceptedTypes = accept.split(',').map(type => type.trim())
        const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
        const mimeType = file.type

        const isValidType = acceptedTypes.some(acceptedType => {
          if (acceptedType.startsWith('.')) {
            return fileExtension === acceptedType.toLowerCase()
          }
          if (acceptedType.includes('*')) {
            const baseType = acceptedType.split('/')[0]
            return mimeType.startsWith(baseType)
          }
          return mimeType === acceptedType
        })

        if (!isValidType) {
          return `不支持的文件格式，仅支持: ${accept}`
        }
      }

      return null
    }

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null
      setError("")

      if (file) {
        const validationError = validateFile(file)
        if (validationError) {
          setError(validationError)
          setSelectedFile(null)
          onFileSelect?.(null)
          // Clear the input
          if (fileInputRef.current) {
            fileInputRef.current.value = ""
          }
          return
        }
      }

      setSelectedFile(file)
      onFileSelect?.(file)
    }

    const handleRemoveFile = () => {
      setSelectedFile(null)
      setError("")
      onFileSelect?.(null)
      // Clear the input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }

    const handleButtonClick = () => {
      fileInputRef.current?.click()
    }

    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-2 w-full", className)}
        {...props}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          disabled={disabled}
          className="hidden"
          aria-describedby={helperText ? "file-upload-helper" : undefined}
        />
        
        <Button
          type="button"
          variant="outline"
          onClick={handleButtonClick}
          disabled={disabled}
          className="gap-2 w-fit"
        >
          <Upload className="h-4 w-4" />
          {selectedFile ? "更换文件" : placeholder}
        </Button>
        
        {selectedFile && (
          <Tag
            variant="default"
            onRemove={handleRemoveFile}
            className="gap-1 w-fit"
          >
            <FileText className="h-3 w-3" />
            {selectedFile.name}
          </Tag>
        )}

        {helperText && !selectedFile && (
          <p 
            id="file-upload-helper"
            className="text-sm text-muted-foreground"
          >
            {helperText}
          </p>
        )}

        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}

        {selectedFile && !error && (
          <p className="text-sm text-muted-foreground">
            文件大小: {formatFileSize(selectedFile.size)}
          </p>
        )}
      </div>
    )
  }
)

FileUpload.displayName = "FileUpload"

export { FileUpload } 