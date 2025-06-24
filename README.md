# Shadcn Tailwind Design System

基于 [shadcn/ui](https://ui.shadcn.com/) 构建的现代化组件库，使用 React + TypeScript + Tailwind CSS + Storybook 开发。

## ✨ 特性

- 🎨 **30+ 精美组件** - 基础、表单、导航、反馈、展示、布局等组件
- 📖 **Storybook 文档** - 完整的组件文档和交互式示例
- 🎯 **TypeScript 支持** - 完整的类型定义
- 🌙 **深色模式** - 内置明暗主题切换
- 📱 **响应式设计** - 支持各种屏幕尺寸

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 启动 Storybook
npm run storybook

# 构建项目
npm run build
```

## 📦 组件分类

- **基础组件**: Button, Input, Label, Textarea, Avatar, Badge
- **数据录入**: Checkbox, Radio, Select, Switch, Date Picker, File Upload
- **导航组件**: Sidebar, Tabs, Steps, Pagination, Command
- **反馈组件**: Alert, Modal, Dialog, Tooltip, Popover
- **数据展示**: Table, Typography, Tags, Filter
- **布局组件**: Page Container, Page Header, Block Layout

## 🛠️ 技术栈

- **React 18** + **TypeScript** + **Tailwind CSS** + **Vite**
- **shadcn/ui** + **Radix UI** - 组件基础
- **Storybook** - 组件文档
- **ESLint + Prettier** - 代码规范

## 🎯 使用示例

```tsx
import { Button, Input, Alert } from '@/components/ui'

function App() {
  return (
    <div>
      <Alert variant="default">欢迎使用设计系统！</Alert>
      <Input placeholder="输入内容..." />
      <Button variant="default">点击按钮</Button>
    </div>
  )
}
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