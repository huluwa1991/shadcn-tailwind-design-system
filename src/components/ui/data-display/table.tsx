import * as React from "react"
import { cva, type VariantProps } from 'class-variance-authority'
import { MoreVertical } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Checkbox } from '../data-entry/checkbox'
import { Button } from '../base/button'
import { Tag } from './tags'
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../navigation/pagination'

// Context for Table configuration
const TableContext = React.createContext<{
  pageStickyHeader?: boolean
}>({})

const useTableContext = () => React.useContext(TableContext)

// 基础 Table 组件变体
const tableVariants = cva(
  "w-full caption-bottom text-sm"
)

const tableWrapperVariants = cva(
  "relative w-full",
  {
    variants: {
      bordered: {
        true: "border border-border rounded-lg",
        false: "",
      },
      scrollable: {
        true: "overflow-auto",
        false: "overflow-visible",
      },
    },
    defaultVariants: {
      bordered: false,
      scrollable: true,
    },
  }
)

const tableHeaderVariants = cva(
  "[&_tr]:border-b"
)

const tableRowVariants = cva(
  "border-b transition-colors hover:bg-muted data-[state=selected]:bg-muted",
  {
    variants: {
      selectable: {
        true: "cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      selectable: false,
    },
  }
)

/**
 * 列宽设计决策树 - Table Column Width Design Decision Tree
 * 
 * 1. 当表格宽度没有超过容器宽度时（不会出现横向滚动条）：
 *    - 优先基于各个字段的宽度情况来选择一个合适的固定宽度（xs/sm/md/lg/xl）
 *    - 最后一个列使用 auto，把容器宽度占满，提供最好的空间利用
 * 
 * 2. 当表格宽度超过容器宽度时（会出现横向滚动条）：
 *    - 宽度比较确定的字段（ID、电话号码、邮箱、日期等）优先使用 fit (whitespace-nowrap)
 *    - 宽度不确定的字段，基于该字段数据的最大多数长度情况，指定一个合适的固定宽度
 * 
 * cellWidth 选项说明：
 * - auto: 占用剩余所有空间，适合作为弹性列（通常是最后一列）
 * - xs/sm/md/lg/xl: 固定宽度，根据内容长度预期选择
 * - fit: 内容决定宽度 + 不换行，适合格式固定的字段
 */
const tableCellVariants = cva(
  "align-middle [&:has([role=checkbox])]:pr-0",
  {
    variants: {
      variant: {
        default: "h-12 p-4",
        header: "h-12 px-4 text-left font-medium text-muted-foreground bg-muted/50",
        numeric: "h-12 p-4 text-right tabular-nums",
        currency: "h-12 p-4 text-right tabular-nums",
        date: "h-12 p-4 text-left",
        status: "h-12 p-4 text-left",
        action: "h-12 p-4 text-left",
      },
      stickyTop: {
        true: "sticky top-0 z-10 backdrop-blur-md bg-muted/70 border-b-2 border-gray-300 dark:border-gray-600 shadow-lg",
        false: "",
      },
      stickyLeft: {
        true: "sticky left-0 z-20 bg-background transition-colors group-hover:!bg-muted",
        false: "",
      },
      stickyRight: {
        true: "sticky z-20 bg-background transition-colors group-hover:!bg-muted",
        false: "",
      },
      cellWidth: {
        auto: "",           // 占用剩余空间
        xs: "w-16",         // 64px - 很短内容（ID、序号等）
        sm: "w-24",         // 96px - 短文本（姓名、状态等）
        md: "w-32",         // 128px - 中等长度（电话、日期等）
        lg: "w-48",         // 192px - 较长内容（职位、地址等）
        xl: "w-64",         // 256px - 长文本（邮箱、描述等）
        fit: "whitespace-nowrap", // 内容决定宽度且不换行
      },
    },
    defaultVariants: {
      variant: "default",
      stickyTop: false,
      stickyLeft: false,
      stickyRight: false,
      cellWidth: "auto",
    },
  }
)

// 类型定义 - 使用 Omit 来避免冲突
export interface TableWrapperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tableWrapperVariants> {
  /** 是否启用页面级粘性表头模式 */
  pageStickyHeader?: boolean
}

export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement>,
    VariantProps<typeof tableRowVariants> {
  selected?: boolean
}

export interface EnhancedTableCellProps
  extends Omit<React.TdHTMLAttributes<HTMLTableCellElement>, 'width'>,
    VariantProps<typeof tableCellVariants> {}

export interface EnhancedTableHeadProps
  extends Omit<React.ThHTMLAttributes<HTMLTableHeaderCellElement>, 'width'>,
    VariantProps<typeof tableCellVariants> {}

export interface CheckboxCellProps {
  checked?: boolean
  indeterminate?: boolean
  onCheckedChange?: (checked: boolean) => void
  'aria-label'?: string
  stickyLeft?: boolean
  stickyRight?: boolean
  className?: string
}

export interface ActionCellProps {
  actions?: Array<{
    label: string
    onClick: () => void
    variant?: 'default' | 'destructive'
  }>
  onMenuOpen?: () => void
  stickyLeft?: boolean
  stickyRight?: boolean
  style?: React.CSSProperties
  className?: string
}

export interface TableEmptyStateProps {
  title?: string
  description?: string
  action?: React.ReactNode
  icon?: React.ReactNode
}

export interface CheckboxHeaderCellProps {
  checked?: boolean
  indeterminate?: boolean
  onCheckedChange?: (checked: boolean) => void
  'aria-label'?: string
  stickyLeft?: boolean
  stickyRight?: boolean
}

// 新增：状态单元格的类型定义
export interface StatusCellProps {
  status: string
  variant?: 'default' | 'success' | 'warning' | 'destructive' | 'primary'
  cellWidth?: 'auto' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fit'
  stickyLeft?: boolean
  stickyRight?: boolean
  className?: string
  children?: React.ReactNode
}

export interface ActionButtonsCellProps {
  actions: Array<{
    label: string
    onClick: () => void
    variant?: 'default' | 'destructive'
  }>
  cellWidth?: 'auto' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fit'
  stickyLeft?: boolean
  stickyRight?: boolean
  style?: React.CSSProperties
  className?: string
}

export interface IdCellProps {
  id: string | number
  cellWidth?: 'auto' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fit'
  stickyLeft?: boolean
  stickyRight?: boolean
  className?: string
}

export interface NameCellProps {
  name: string
  cellWidth?: 'auto' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fit'
  stickyLeft?: boolean
  stickyRight?: boolean
  className?: string
}

// TableWrapper 组件
const TableWrapper = React.forwardRef<HTMLDivElement, TableWrapperProps>(
  ({ className, bordered, scrollable, pageStickyHeader, children, ...props }, ref) => {
    const contextValue = React.useMemo(() => ({
      pageStickyHeader: !!pageStickyHeader
    }), [pageStickyHeader])

    // 如果是页面级粘性表头模式，需要特殊处理
    if (pageStickyHeader) {
      return (
        <TableContext.Provider value={contextValue}>
          <div
            ref={ref}
            className={cn(
              tableWrapperVariants({ 
                bordered, 
                scrollable: false // 页面级粘性表头不在容器级别设置 overflow
              }),
              className
            )}
            {...props}
          >
            {children}
          </div>
        </TableContext.Provider>
      )
    }

    return (
      <TableContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(tableWrapperVariants({ bordered, scrollable }), className)}
          {...props}
        >
          {children}
        </div>
      </TableContext.Provider>
    )
  }
)
TableWrapper.displayName = "TableWrapper"

// 基础 Table 组件 (保持 shadcn 原有结构)
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <table
    ref={ref}
    className={cn(tableVariants(), className)}
    {...props}
  />
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn(tableHeaderVariants(), className)}
      {...props}
    />
  )
)
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, selectable, selected, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        tableRowVariants({ selectable }),
        "group", // 添加 group 类名以支持 group-hover
        className
      )}
      data-state={selected ? "selected" : undefined}
      {...props}
    />
  )
)
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<HTMLTableHeaderCellElement, EnhancedTableHeadProps>(
  ({ className, variant = "header", stickyTop, stickyLeft, stickyRight, cellWidth, style, ...props }, ref) => {
    const { pageStickyHeader } = useTableContext()
    
    // 如果TableWrapper设置了pageStickyHeader，则自动启用stickyTop
    const shouldStickyTop = stickyTop || pageStickyHeader
    
    // 基础表头样式
    const headerStyles = "align-middle h-12 p-4 font-medium text-muted-foreground"
    
    // 背景样式 - 为粘性表头添加毛玻璃效果
    const backgroundStyles = shouldStickyTop ? "bg-muted/50 backdrop-blur-md" : 
                            (stickyLeft || stickyRight) ? "bg-muted/50 backdrop-blur-md" :
                            "bg-muted/50"
    
    // 对齐方式
    const variantStyles = variant === "numeric" ? "text-right" : 
                         variant === "currency" ? "text-right" :
                         variant === "date" ? "text-left" :
                         variant === "status" ? "text-left" :
                         variant === "action" ? "text-left" :
                         "text-left"
    
    // 宽度控制
    const widthStyles = cellWidth === "xs" ? "w-16" :
                       cellWidth === "sm" ? "w-24" :
                       cellWidth === "md" ? "w-32" :
                       cellWidth === "lg" ? "w-48" :
                       cellWidth === "xl" ? "w-64" :
                       cellWidth === "fit" ? "w-fit" :
                       ""
    
    // 层级控制
    const zIndexClass = (shouldStickyTop && (stickyLeft || stickyRight)) ? "z-30" :
                       shouldStickyTop ? "z-10" :
                       (stickyLeft || stickyRight) ? "z-20" :
                       ""
    
    // 粘性定位样式
    const stickyStyles = []
    if (shouldStickyTop) {
      stickyStyles.push("sticky", "top-0", "border-b-2", "border-border", "shadow-lg", "first:rounded-tl-lg", "last:rounded-tr-lg")
    }
    if (stickyLeft) {
      stickyStyles.push("sticky", "left-0", "border-b-2", "border-border")
    }
    if (stickyRight) {
      stickyStyles.push("sticky", "border-b-2", "border-border")
    }
    
    return (
      <th
        ref={ref}
        className={cn(
          headerStyles,
          backgroundStyles,
          variantStyles,
          widthStyles,
          zIndexClass,
          ...stickyStyles,
          className
        )}
        style={style}
        {...props}
      />
    )
  }
)
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<HTMLTableCellElement, EnhancedTableCellProps>(
  ({ className, variant = "default", stickyTop, stickyLeft, stickyRight, cellWidth, style, ...props }, ref) => {
    // 计算 z-index：列冻结 + 表头冻结时需要更高的层级
    const zIndexClass = (stickyTop && (stickyLeft || stickyRight)) ? "z-30" :
                       stickyTop ? "z-10" :
                       (stickyLeft || stickyRight) ? "z-20" :
                       ""
    
    return (
      <td
        ref={ref}
        className={cn(
          tableCellVariants({ variant, stickyTop, stickyLeft, stickyRight, cellWidth }), 
          zIndexClass,
          className
        )}
        style={style}
        {...props}
      />
    )
  }
)
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

// 增强组件
const CheckboxCell = React.forwardRef<HTMLTableCellElement, CheckboxCellProps>(
  ({ checked, indeterminate, onCheckedChange, 'aria-label': ariaLabel, stickyLeft, stickyRight, className, ...props }, ref) => (
    <TableCell 
      ref={ref} 
      cellWidth="xs" 
      stickyLeft={stickyLeft} 
      stickyRight={stickyRight} 
      className={className}
      {...props}
    >
      <div className="flex items-center justify-center">
        <Checkbox
          checked={checked}
          onCheckedChange={onCheckedChange}
          aria-label={ariaLabel}
          className={cn(
            indeterminate && "data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground"
          )}
        />
      </div>
    </TableCell>
  )
)
CheckboxCell.displayName = "CheckboxCell"

const CheckboxHeaderCell = React.forwardRef<HTMLTableHeaderCellElement, CheckboxHeaderCellProps>(
  ({ checked, indeterminate, onCheckedChange, 'aria-label': ariaLabel, stickyLeft, stickyRight, ...props }, ref) => (
    <TableHead ref={ref} cellWidth="xs" stickyLeft={stickyLeft} stickyRight={stickyRight} {...props}>
      <div className="flex items-center justify-center">
        <Checkbox
          checked={checked}
          onCheckedChange={onCheckedChange}
          aria-label={ariaLabel}
          className={cn(
            indeterminate && "data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground"
          )}
        />
      </div>
    </TableHead>
  )
)
CheckboxHeaderCell.displayName = "CheckboxHeaderCell"

const ActionCell = React.forwardRef<HTMLTableCellElement, ActionCellProps>(
  ({ actions = [], onMenuOpen, stickyLeft, stickyRight, style, className, ...props }, ref) => (
    <TableCell 
      ref={ref} 
      variant="action" 
      stickyLeft={stickyLeft} 
      stickyRight={stickyRight} 
      style={style} 
      className={className}
      {...props}
    >
      <div className="flex items-center justify-start gap-2">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="link"
            size="sm"
            className={cn(
              "h-auto p-0 text-sm font-normal",
              action.variant === 'destructive' && "text-destructive hover:text-destructive"
            )}
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        ))}
        {actions.length > 3 && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={onMenuOpen}
          >
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        )}
      </div>
    </TableCell>
  )
)
ActionCell.displayName = "ActionCell"

const TableEmptyState: React.FC<TableEmptyStateProps> = ({
  title = "No data available",
  description = "There are no records to display.",
  action,
  icon,
}) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    {icon && <div className="mb-4 text-muted-foreground">{icon}</div>}
    <h3 className="text-lg font-medium text-foreground mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground mb-4 max-w-sm">{description}</p>
    {action && action}
  </div>
)
TableEmptyState.displayName = "TableEmptyState"

// 新增：状态单元格组件 - 使用Tag组件的规范样式
const StatusCell = React.forwardRef<HTMLTableCellElement, StatusCellProps>(
  ({ status, variant, cellWidth = "sm", stickyLeft, stickyRight, className, children, ...props }, ref) => {
    // 如果提供了children，使用children；否则使用默认的Tag
    const content = children || (
      <Tag variant={variant || 'default'}>
        {status}
      </Tag>
    )

    return (
      <TableCell 
        ref={ref} 
        variant="status" 
        stickyLeft={stickyLeft} 
        stickyRight={stickyRight} 
        cellWidth={cellWidth}
        className={className}
        {...props}
      >
        {content}
      </TableCell>
    )
  }
)
StatusCell.displayName = "StatusCell"

// 新增：操作按钮单元格组件 - 使用规范的link样式
const ActionButtonsCell = React.forwardRef<HTMLTableCellElement, ActionButtonsCellProps>(
  ({ actions, cellWidth = "md", stickyLeft, stickyRight, style, className, ...props }, ref) => (
    <TableCell 
      ref={ref} 
      variant="action" 
      stickyLeft={stickyLeft} 
      stickyRight={stickyRight} 
      cellWidth={cellWidth}
      style={style} 
      className={className}
      {...props}
    >
      <div className="flex items-center gap-2">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="link"
            size="sm"
            className={cn(
              "h-auto p-0 text-sm font-normal",
              action.variant === 'destructive' && "text-destructive hover:text-destructive"
            )}
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </TableCell>
  )
)
ActionButtonsCell.displayName = "ActionButtonsCell"

// 新增：ID单元格组件 - 统一ID显示样式
const IdCell = React.forwardRef<HTMLTableCellElement, IdCellProps>(
  ({ id, cellWidth = "xs", stickyLeft, stickyRight, className, ...props }, ref) => (
    <TableCell 
      ref={ref} 
      stickyLeft={stickyLeft} 
      stickyRight={stickyRight} 
      cellWidth={cellWidth}
      className={cn("font-mono text-muted-foreground", className)}
      {...props}
    >
      {id}
    </TableCell>
  )
)
IdCell.displayName = "IdCell"

// 新增：姓名单元格组件 - 统一姓名显示样式
const NameCell = React.forwardRef<HTMLTableCellElement, NameCellProps>(
  ({ name, cellWidth = "md", stickyLeft, stickyRight, className, ...props }, ref) => (
    <TableCell 
      ref={ref} 
      stickyLeft={stickyLeft} 
      stickyRight={stickyRight} 
      cellWidth={cellWidth}
      className={className}
      {...props}
    >
      {name}
    </TableCell>
  )
)
NameCell.displayName = "NameCell"

// 新增：分页相关的类型定义
export interface PaginationState {
  /** 当前页码（从1开始） */
  current: number
  /** 每页显示的记录数 */
  pageSize: number
  /** 总记录数 */
  total: number
  /** 是否显示快速跳转 */
  showQuickJumper?: boolean
  /** 是否显示每页条数选择器 */
  showSizeChanger?: boolean
  /** 每页条数选项 */
  pageSizeOptions?: number[]
}

export interface TablePaginationProps {
  /** 分页状态 */
  pagination: PaginationState
  /** 页码变化回调 */
  onPageChange: (page: number) => void
  /** 每页条数变化回调 */
  onPageSizeChange?: (pageSize: number) => void
  /** 自定义样式类名 */
  className?: string
  /** 是否显示总数信息 */
  showTotal?: boolean | ((total: number, range: [number, number]) => string)
}

export interface TableWithPaginationProps {
  /** 表格数据 */
  data: any[]
  /** 列配置 */
  columns: any[]
  /** 分页配置 */
  pagination?: PaginationState | false
  /** 页码变化回调 */
  onPageChange?: (page: number) => void
  /** 每页条数变化回调 */
  onPageSizeChange?: (pageSize: number) => void
  /** 表格包装器属性 */
  wrapperProps?: TableWrapperProps
  /** 表格属性 */
  tableProps?: React.HTMLAttributes<HTMLTableElement>
  /** 自定义渲染内容 */
  children?: React.ReactNode
}

// 新增：表格分页组件
const TablePagination = React.forwardRef<HTMLDivElement, TablePaginationProps>(
  ({ 
    pagination, 
    onPageChange, 
    onPageSizeChange, 
    className, 
    showTotal = true,
    ...props 
  }, ref) => {
    const { current, pageSize, total } = pagination
    const totalPages = Math.ceil(total / pageSize)
    
    // 计算当前页显示的数据范围
    const startIndex = (current - 1) * pageSize + 1
    const endIndex = Math.min(current * pageSize, total)
    
    // 生成页码数组
    const generatePageNumbers = () => {
      const pages: (number | 'ellipsis')[] = []
      const delta = 2 // 当前页左右显示的页码数量
      
      if (totalPages <= 7) {
        // 总页数较少时，显示所有页码
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // 总页数较多时，显示省略号
        pages.push(1)
        
        if (current <= delta + 3) {
          // 当前页靠近开头
          for (let i = 2; i <= Math.min(delta + 3, totalPages - 1); i++) {
            pages.push(i)
          }
          if (totalPages > delta + 3) {
            pages.push('ellipsis')
          }
        } else if (current >= totalPages - delta - 2) {
          // 当前页靠近结尾
          if (totalPages > delta + 3) {
            pages.push('ellipsis')
          }
          for (let i = Math.max(totalPages - delta - 2, 2); i <= totalPages - 1; i++) {
            pages.push(i)
          }
        } else {
          // 当前页在中间
          pages.push('ellipsis')
          for (let i = current - delta; i <= current + delta; i++) {
            pages.push(i)
          }
          pages.push('ellipsis')
        }
        
        if (totalPages > 1) {
          pages.push(totalPages)
        }
      }
      
      return pages
    }
    
    const pageNumbers = generatePageNumbers()
    
    // 总数信息渲染
    const renderTotal = () => {
      if (!showTotal) return null
      
      if (typeof showTotal === 'function') {
        return (
          <div className="text-sm text-muted-foreground">
            {showTotal(total, [startIndex, endIndex])}
          </div>
        )
      }
      
      return (
        <div className="text-sm text-muted-foreground">
          共 {total} 条，第 {startIndex}-{endIndex} 条
        </div>
      )
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between",
          className
        )}
        {...props}
      >
        {/* 左侧：总数信息 */}
        <div className="flex-shrink-0">
          {renderTotal()}
        </div>
        
        {/* 右侧：分页器 */}
        <div className="flex-shrink-0">
          <Pagination>
            <PaginationContent>
              {/* 上一页 */}
              <PaginationItem>
                <PaginationPrevious 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (current > 1) {
                      onPageChange(current - 1)
                    }
                  }}
                  className={current <= 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {/* 页码 */}
              {pageNumbers.map((page, index) => (
                <PaginationItem key={index}>
                  {page === 'ellipsis' ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      href="#"
                      isActive={page === current}
                      onClick={(e) => {
                        e.preventDefault()
                        onPageChange(page as number)
                      }}
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}
              
              {/* 下一页 */}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (current < totalPages) {
                      onPageChange(current + 1)
                    }
                  }}
                  className={current >= totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    )
  }
)
TablePagination.displayName = "TablePagination"

// 新增：带分页的完整表格组件
const TableWithPagination = React.forwardRef<HTMLDivElement, TableWithPaginationProps>(
  ({ 
    data,
    columns,
    pagination,
    onPageChange,
    onPageSizeChange,
    wrapperProps,
    tableProps,
    children,
    ...props 
  }, ref) => {
    // 如果禁用分页，直接返回普通表格
    if (pagination === false) {
      return (
        <div ref={ref} {...props}>
          <TableWrapper {...wrapperProps}>
            <Table {...tableProps}>
              {children}
            </Table>
          </TableWrapper>
        </div>
      )
    }
    
    // 分页逻辑
    const currentPagination = pagination || {
      current: 1,
      pageSize: 10,
      total: data.length,
    }
    
    const handlePageChange = (page: number) => {
      onPageChange?.(page)
    }
    
    const handlePageSizeChange = (pageSize: number) => {
      onPageSizeChange?.(pageSize)
    }
    
    return (
      <div ref={ref} className="space-y-4" {...props}>
        {/* 表格主体 */}
        <TableWrapper {...wrapperProps}>
          <Table {...tableProps}>
            {children}
          </Table>
        </TableWrapper>
        
        {/* 分页器 */}
        {pagination && (
          <TablePagination
            pagination={currentPagination}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </div>
    )
  }
)
TableWithPagination.displayName = "TableWithPagination"

export {
  TableWrapper,
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  CheckboxCell,
  CheckboxHeaderCell,
  ActionCell,
  TableEmptyState,
  // 新增的组件
  StatusCell,
  ActionButtonsCell,
  IdCell,
  NameCell,
  TablePagination,
  TableWithPagination,
  tableWrapperVariants,
  tableVariants,
  tableHeaderVariants,
  tableRowVariants,
  tableCellVariants,
}
