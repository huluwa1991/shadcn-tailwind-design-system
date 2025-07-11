# Shadcn Tailwind Design System

[🇺🇸 English](#english) | [🇨🇳 中文](#chinese)

<a id="chinese"></a>

## 🇨🇳 中文版

基于 [shadcn/ui](https://ui.shadcn.com/) 构建的现代化组件库，使用 React + TypeScript + Tailwind CSS + Storybook 开发。

### ✨ 特性

- 🎨 **50+ 精美组件** - 涵盖基础、数据录入、导航、反馈、数据展示、布局等完整场景
- 📖 **Storybook 文档** - 完整的组件文档和交互式示例
- 🎯 **TypeScript 支持** - 完整的类型定义和类型安全
- 🌙 **深色模式** - 内置明暗主题切换支持
- 📱 **响应式设计** - 支持各种屏幕尺寸的自适应布局
- 🏗️ **完整布局系统** - 标准化的间距规范和布局组件
- 📋 **表单解决方案** - 基于 React Hook Form 的完整表单系统
- 🎪 **5个实用示例** - 数据看板、设置页面、简历编辑器、票务预订、电影排行榜

### 🚀 快速开始

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

### 📦 组件分类

#### 基础组件 (8个)
Button, Avatar, Badge, Label, Typography, ButtonGroup, ColorPalette, Dropdown

#### 数据录入组件 (15个)
Input, Textarea, Select, Checkbox, RadioGroup, Switch, DatePicker, Calendar, FileUpload, Search, CitySelect, Cascader, TagsInput, Form

#### 导航组件 (6个)
Sidebar, TopNav, Tabs, Steps, Pagination, Command

#### 反馈组件 (10个)
Alert, Modal, Dialog, Tooltip, Popover, Popconfirm, Loading, Skeleton, Toast, CascaderDropdown

#### 数据展示组件 (3个)
Table, Tags, Filter

#### 布局组件 (4个)
PageContainer, PageHeader, BlockLayout, Logo

#### 完整示例 (5个)
- **数据分析看板** - 企业级数据大屏示例
- **设置页面** - 用户配置界面示例
- **简历编辑器** - 动态表单和文件上传示例
- **票务预订** - 活动列表和筛选示例
- **电影排行榜** - 数据展示和排序示例

### 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript 5.2+
- **样式方案**: Tailwind CSS 4.1+
- **构建工具**: Vite 5.2+
- **UI 基础**: shadcn/ui + Radix UI
- **文档工具**: Storybook 8.3+
- **表单处理**: React Hook Form 7.58+ + Zod 3.25+
- **图表库**: Recharts 3.0+
- **图标库**: Lucide React 0.378+

### 🎯 使用示例

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

### 📚 组件文档

访问 Storybook 查看完整的组件文档：

```bash
npm run storybook
```

### 🏗️ 开发规范

- 查看 [组件开发 SOP](./COMPONENT_DEVELOPMENT_SOP.md) 了解开发规范
- 查看 [组件库参考手册](./COMPONENT_LIBRARY_REFERENCE.md) 了解组件用法
- 查看 [布局系统规范](./LAYOUT_SYSTEM.md) 了解间距和布局标准

### 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/NewFeature`)
3. 提交更改 (`git commit -m 'Add NewFeature'`)
4. 推送分支 (`git push origin feature/NewFeature`)
5. 创建 Pull Request

### 📄 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件了解详情。

---

<a id="english"></a>

## 🇺🇸 English Version

A modern component library built on [shadcn/ui](https://ui.shadcn.com/), developed with React + TypeScript + Tailwind CSS + Storybook.

### ✨ Features

- 🎨 **50+ Beautiful Components** - Complete coverage for base, data-entry, navigation, feedback, data-display, and layout scenarios
- 📖 **Storybook Documentation** - Complete component documentation and interactive examples
- 🎯 **TypeScript Support** - Full type definitions and type safety
- 🌙 **Dark Mode** - Built-in light/dark theme switching support
- 📱 **Responsive Design** - Adaptive layouts for all screen sizes
- 🏗️ **Complete Layout System** - Standardized spacing guidelines and layout components
- 📋 **Form Solutions** - Complete form system based on React Hook Form
- 🎪 **5 Practical Examples** - Dashboard, Settings, Resume Editor, Ticket Booking, Movie Ranking

### 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start Storybook documentation
npm run storybook

# Build project
npm run build
```

### 📦 Component Categories

#### Base Components (8)
Button, Avatar, Badge, Label, Typography, ButtonGroup, ColorPalette, Dropdown

#### Data Entry Components (15)
Input, Textarea, Select, Checkbox, RadioGroup, Switch, DatePicker, Calendar, FileUpload, Search, CitySelect, Cascader, TagsInput, Form

#### Navigation Components (6)
Sidebar, TopNav, Tabs, Steps, Pagination, Command

#### Feedback Components (10)
Alert, Modal, Dialog, Tooltip, Popover, Popconfirm, Loading, Skeleton, Toast, CascaderDropdown

#### Data Display Components (3)
Table, Tags, Filter

#### Layout Components (4)
PageContainer, PageHeader, BlockLayout, Logo

#### Complete Examples (5)
- **Data Analytics Dashboard** - Enterprise-level data dashboard example
- **Settings Page** - User configuration interface example
- **Resume Editor** - Dynamic forms and file upload example
- **Ticket Booking** - Event listing and filtering example
- **Movie Ranking** - Data display and sorting example

### 🛠️ Tech Stack

- **Frontend Framework**: React 18 + TypeScript 5.2+
- **Styling**: Tailwind CSS 4.1+
- **Build Tool**: Vite 5.2+
- **UI Foundation**: shadcn/ui + Radix UI
- **Documentation**: Storybook 8.3+
- **Form Handling**: React Hook Form 7.58+ + Zod 3.25+
- **Charts**: Recharts 3.0+
- **Icons**: Lucide React 0.378+

### 🎯 Usage Example

```tsx
import { Button, Input, Alert } from '@/components/ui'

function App() {
  return (
    <div className="p-6 space-y-4">
      <Alert variant="default">
        Welcome to Shadcn Tailwind Design System!
      </Alert>
      <Input placeholder="Enter content..." />
      <Button variant="default">Click Button</Button>
    </div>
  )
}
```

### 📚 Component Documentation

Visit Storybook for complete component documentation:

```bash
npm run storybook
```

### 🏗️ Development Guidelines

- See [Component Development SOP](./COMPONENT_DEVELOPMENT_SOP.md) for development standards
- See [Component Library Reference](./COMPONENT_LIBRARY_REFERENCE.md) for component usage
- See [Layout System Guidelines](./LAYOUT_SYSTEM.md) for spacing and layout standards

### 🤝 Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/NewFeature`)
3. Commit your changes (`git commit -m 'Add NewFeature'`)
4. Push to the branch (`git push origin feature/NewFeature`)
5. Create a Pull Request

### 📄 License

MIT License - see the [LICENSE](LICENSE) file for details. 