# Shadcn Tailwind Design System

一个基于 [shadcn/ui](https://ui.shadcn.com/) 构建的现代化组件库，使用 React + TypeScript + Tailwind CSS + Storybook 开发。

## ✨ 特性

- 🎨 **30+ 精美组件** - 包含常用的 UI 组件，如按钮、表单、导航等
- 📖 **Storybook 文档** - 完整的组件文档和交互式示例
- 🎯 **TypeScript 支持** - 完整的类型定义，提供更好的开发体验
- 🎨 **Tailwind CSS** - 基于 Tailwind CSS 的响应式设计
- ⚡ **现代化工具链** - 使用 Vite 构建，支持热重载
- 🌙 **深色模式** - 内置明暗主题切换
- 📱 **响应式设计** - 支持各种屏幕尺寸

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
# 启动开发服务器
npm run dev

# 启动 Storybook
npm run storybook
```

### 构建

```bash
# 构建项目
npm run build

# 构建 Storybook
npm run build-storybook
```

## 📦 包含的组件

- **基础组件**: Button, Input, Label, Textarea, Avatar, Badge
- **表单组件**: Checkbox, Radio Group, Select, Switch, Date Picker, File Upload
- **导航组件**: Sidebar, Tabs, Steps, Pagination
- **反馈组件**: Alert, Modal, Dialog, Tooltip, Popconfirm
- **数据展示**: Table, Typography, Tags
- **布局组件**: Page Container, Page Header, Block Layout
- **功能组件**: Search, Filter, Command

## 🛠️ 技术栈

- **React 18** - 用户界面库
- **TypeScript** - 类型安全的 JavaScript
- **Tailwind CSS** - 实用优先的 CSS 框架
- **shadcn/ui** - 高质量的组件基础
- **Radix UI** - 无样式、可访问的组件原语
- **Storybook** - 组件开发环境
- **Vite** - 快速的构建工具

## 📱 在线预览

访问 [Storybook 文档](./storybook-static/index.html) 查看所有组件的交互式示例。

## 🎯 使用方法

### 导入组件

```tsx
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert } from '@/components/ui/alert'

function App() {
  return (
    <div>
      <Alert variant="default">
        欢迎使用我们的设计系统！
      </Alert>
      <Input placeholder="输入一些内容..." />
      <Button variant="default">
        点击按钮
      </Button>
    </div>
  )
}
```

### 自定义主题

本项目使用 Tailwind CSS 变量系统，您可以通过修改 CSS 变量来自定义主题：

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  /* ... 更多变量 */
}
```

## 🤝 贡献指南

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

请查看 [COMPONENT_DEVELOPMENT_SOP.md](./COMPONENT_DEVELOPMENT_SOP.md) 了解组件开发规范。

## 📄 许可证

本项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [shadcn/ui](https://ui.shadcn.com/) - 提供了优秀的组件基础
- [Radix UI](https://www.radix-ui.com/) - 提供了可访问的组件原语
- [Tailwind CSS](https://tailwindcss.com/) - 提供了强大的样式系统 