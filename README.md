# Shadcn Tailwind Design System

基于 [shadcn/ui](https://ui.shadcn.com/) 构建的现代化组件库，使用 React + TypeScript + Tailwind CSS + Storybook 开发。

## ✨ 特性

- 🎨 **40+ 精美组件** - 涵盖基础、数据录入、导航、反馈、数据展示、布局等完整场景
- 📖 **Storybook 文档** - 完整的组件文档和交互式示例
- 🎯 **TypeScript 支持** - 完整的类型定义和类型安全
- 🌙 **深色模式** - 内置明暗主题切换支持
- 📱 **响应式设计** - 支持各种屏幕尺寸的自适应布局

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 启动 Storybook 文档
npm run storybook

# 构建项目
npm run build
```

## 📦 组件分类

### 基础组件
Button, Avatar, Badge, Label, Typography, ButtonGroup, ColorPalette, Dropdown

### 数据录入组件
Input, Textarea, Select, Checkbox, RadioGroup, Switch, DatePicker, Calendar, FileUpload, SearchInput, CitySelect, Cascader, TagsInput, Form

### 导航组件
Sidebar, TopNav, Tabs, Steps, Pagination, Command

### 反馈组件
Alert, Modal, Dialog, Tooltip, Popover, Popconfirm, Loading, Skeleton, Toast

### 数据展示组件
Table, Tag, Filter

### 布局组件
PageContainer, PageHeader, BlockLayout, Logo

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **样式方案**: Tailwind CSS 4.x
- **构建工具**: Vite 5.x
- **UI 基础**: shadcn/ui + Radix UI
- **文档工具**: Storybook 8.x

## 🎯 使用示例

```tsx
import { Button, Input, Alert } from '@/components/ui'

function App() {
  return (
    <div className="p-6 space-y-4">
      <Alert variant="default">
        欢迎使用 Shadcn Tailwind Design System！
      </Alert>
      <Input placeholder="请输入内容..." />
      <Button variant="default">点击按钮</Button>
    </div>
  )
}
```

## 📚 组件文档

访问 Storybook 查看完整的组件文档：

```bash
npm run storybook
```

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/NewFeature`)
3. 提交更改 (`git commit -m 'Add NewFeature'`)
4. 推送分支 (`git push origin feature/NewFeature`)
5. 创建 Pull Request

查看 [COMPONENT_DEVELOPMENT_SOP.md](./COMPONENT_DEVELOPMENT_SOP.md) 了解开发规范。

## 📄 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件了解详情。 