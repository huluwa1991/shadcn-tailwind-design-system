# 组件库参考手册

## 基础组件 (Base Components)

### Button
**变体**: `default` | `destructive` | `outline` | `secondary` | `ghost` | `link`
**尺寸**: `default` | `sm` | `lg` | `withicon` | `sm-icon`
**使用场景**: default(主要操作) | outline(次要操作) | ghost(工具栏) | destructive(删除)
**特殊**: 图标按钮需要 `tooltip` 属性

### ButtonWithLoading
**变体**: 同 Button，但不支持图标尺寸
**属性**: `loading`, `loadingText`

### Badge
**变体**: `destructive` | `muted`
**使用场景**: 数量提示

### Avatar
**组件**: `Avatar`, `AvatarUserInfo`, `AvatarWithInfo`

### Typography
**变体**: `h1` | `h2` | `h3` | `body` | `muted` | `code`
**使用场景**: h1(页面标题) | h2(模块标题) | h3(区块标题) | body(正文) | muted(辅助信息)

### Dropdown
**组件**: `DropdownTrigger`, `DropdownContent`, `DropdownItem`, `DropdownSeparator`

## 数据录入组件 (Data Entry)

### Form
**布局**: `default` | `grid` | `sectioned`
**组件**: `FormRow`, `FormSection`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`

### Input / Textarea
**使用场景**: Input(单行文本) | Textarea(多行文本、描述信息)

### Select
**组件**: `SelectTrigger`, `SelectContent`, `SelectItem`, `MultiSelectTrigger`
**使用场景**: 单选下拉、多选下拉、选项较多时替代 RadioGroup

### Checkbox / RadioGroup
**组件**: `Checkbox`, `CheckboxLabel`, `RadioGroupItem`, `RadioGroupLabel`
**使用场景**: Checkbox(多选) | RadioGroup(单选、选项较少)

### Switch
基础开关组件

### DatePicker / Calendar
**组件**: `DatePicker`, `DateRangePicker`, `Calendar`

### FileUpload
文件上传组件

### SearchInput
**变体**: 支持不同样式的搜索输入

### CitySelect / Cascader
**使用场景**: 地区选择、分级数据选择、树形结构选择

### TagsInput
**使用场景**: 标签输入、关键词输入

## 导航组件 (Navigation)

### Sidebar
**组件**: `SidebarHeader`, `SidebarContent`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`
**变体**: 支持不同的菜单按钮样式

### Tabs
**组件**: `TabsList`, `TabsTrigger`, `TabsContent`

### Steps
**状态**: `pending` | `current` | `completed` | `error`
**方向**: `horizontal` | `vertical`
**尺寸**: `default` | `sm`

### Pagination
**组件**: `PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationNext`, `PaginationPrevious`

### TopNav
顶部导航组件

## 反馈组件 (Feedback)

### Alert
**组件**: `Alert`, `AlertTitle`, `AlertDescription`

### Modal / Dialog
**组件**: `DialogContent`, `DialogTrigger`, `DialogTitle`, `DialogHeader`, `DialogFooter`

### Toast
全局提示组件，使用 `toast()` 函数调用

### Tooltip
**组件**: `TooltipTrigger`, `TooltipContent`, `TooltipProvider`

### Popover / Popconfirm
弹出框组件

### Loading
**变体**: 支持不同的加载样式

### Skeleton
骨架屏组件

## 数据展示组件 (Data Display)

### Table
**组件**: `TableWrapper`, `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableCell`
**特殊**: `CheckboxCell`, `ActionCell`, `StatusCell`, `IdCell`, `NameCell`

### Tag
**变体**: 支持不同颜色和样式

### Filter
**组件**: `FilterItem`, `FilterGroup`

## 布局组件 (Layout)

### PageContainer
**变体**: `full` | `centered`
**内边距**: `default` | `nav-layout`
**使用场景**: 页面最外层容器，full(宽布局) | centered(窄布局)

### PageHeader
**组件**: `PageHeaderWrapper`, `PageHeaderTitle`, `PageHeaderActions`
**变体**: `title-only` | `title-with-actions` | `title-with-toolbar`
**使用场景**: 页面标题区域，推荐使用 PageHeaderWrapper

### BlockLayout
**内边距**: `sm` | `default`
**阴影**: `none` | `sm`
**使用场景**: 内容区块容器，替代裸 div，信息面板

## 使用说明

1. **导入方式**: 从 `@/components/ui` 导入所需组件
2. **样式系统**: 基于 Tailwind CSS 和 class-variance-authority
3. **类型安全**: 所有组件都有完整的 TypeScript 类型定义
4. **主题支持**: 支持明暗主题切换
5. **响应式**: 所有组件都支持响应式设计

## 常用模式

- **表单布局**: 使用 `Form` + `FormRow` + `FormItem` 组合
- **页面结构**: 使用 `PageContainer` + `PageHeader` + `BlockLayout`
- **数据表格**: 使用 `TableWrapper` + `Table` + 特殊单元格组件
- **侧边栏导航**: 使用 `Sidebar` + `SidebarMenu` 组合 