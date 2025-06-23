# 新页面开发布局决策SOP

### 1. 首先查看的关键文件

**布局组件文件：**
- `src/components/ui/page-container.tsx` - 了解页面级容器标准
- `src/components/ui/block-layout.tsx` - 了解内容区块间距标准
- `src/components/ui/page-header.tsx` - 了解页面头部布局模式

**样式定义文件：**
- `src/index.css` - 查看全局间距变量和栅格系统
- 各组件的 `variants` 定义 - 了解组件内部间距标准

**参考示例文件：**
- `src/stories/*.stories.tsx` - 查看组件的实际应用案例
- 特别关注 `PageContainer.stories.tsx` 和 `BlockLayout.stories.tsx`

### 2. 布局决策流程

**第一步：确定页面级容器**
```typescript
// 选择合适的页面容器变体
<PageContainer variant="full">     // 1440px 最大宽度，适合数据展示
<PageContainer variant="centered"> // 650px 固定宽度，适合表单内容
```

**第二步：规划内容区块间距**
```typescript
// 使用 space-y-* 类来控制垂直间距
<div className="space-y-6">  // 区块间24px间距
<div className="space-y-4">  // 组件间16px间距
<div className="space-y-2">  // 细节元素间8px间距
```

**第三步：选择合适的内容容器**
```typescript
// 根据内容性质选择容器
<BlockLayout padding="default">  // 24px内边距，适合主要内容
<BlockLayout padding="sm">       // 16px内边距，适合紧凑布局
```

**第四步：应用组件间距**
- 使用 `gap-*` 类控制 Flex/Grid 布局中的间距
- 使用 `space-*` 类控制同级元素间距
- 参考现有组件的 `variants` 定义保持一致性

### 3. 实际开发时的查找顺序

1. **搜索类似功能页面** - 在 Stories 中找参考实现
2. **查看布局组件** - 了解标准的容器和间距选项
3. **参考间距常量** - 确保使用统一的间距值
4. **检查响应式** - 确认不同屏幕尺寸下的间距适配

### 4. 间距选择决策树

```
页面布局选择：
├── 数据展示类页面 → PageContainer variant="full" + BlockLayout
├── 表单/文档类页面 → PageContainer variant="centered" + 适当内边距
└── 组件展示页面 → 直接使用 space-y-* 和 gap-* 控制

内容间距选择：
├── 主要区块间距 → space-y-6 (24px)
├── 组件间距 → space-y-4 (16px)
├── 元素间距 → space-y-2 (8px)
└── 细节间距 → gap-1.5 (6px)
```