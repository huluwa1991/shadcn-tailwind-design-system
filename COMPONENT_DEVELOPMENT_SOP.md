# 组件开发 SOP

### 1. 组件开发
- 不要重头开始开发，优先使用 `npx shadcn@latest add` 来添加，项目已经配置了shadcn/ui
- 文件位置：`src/components/ui/[name].tsx`
- 使用 TypeScript、React.forwardRef、cva（如需变体）
- 样式优先级：设计系统变量 > 标准Tailwind > 自定义
- 更新 `src/components/ui/index.ts` 导出

### 2. Storybook 开发
- 文件位置：`src/stories/[Name].stories.tsx`
- 要能体现组件的各个变体，无需遍历所有，把关键变体列出来即可