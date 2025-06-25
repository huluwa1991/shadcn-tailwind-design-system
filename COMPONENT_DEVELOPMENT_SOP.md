# 组件开发 SOP

### 1. 组件开发
- 不要重头开始开发，优先使用 `npx shadcn@latest add` 来添加，项目已经配置了shadcn/ui
- **参考最接近的组件**：开发前先查看现有组件，找到功能或样式最相似的组件作为参考
- 文件位置：`src/components/ui/[category]/[name].tsx`，按功能分类：
  - `base/` - 基础组件（button, avatar, badge, label, typography）
  - `data-entry/` - 数据录入组件（input, select, checkbox, textarea等）
  - `data-display/` - 数据展示组件（table, filter, tags）
  - `feedback/` - 反馈组件（alert, dialog, modal, tooltip等）
  - `layout/` - 布局组件（page-container, page-header, block-layout等）
  - `navigation/` - 导航组件（sidebar, tabs, pagination, steps等）
- 使用 TypeScript、React.forwardRef、cva（如需变体）
- 样式优先级：设计系统变量 > 标准Tailwind > 自定义
- **变体设计原则**：宁缺毋滥，开发前先明确说明计划实现哪些变体及其用途
- 更新 `src/components/ui/index.ts` 导出

### 2. Storybook 开发
- 文件位置：`src/stories/[category]/[Name].stories.tsx`，保持与组件目录结构一致
- 要能体现组件的各个变体，无需遍历所有，把关键变体列出来即可