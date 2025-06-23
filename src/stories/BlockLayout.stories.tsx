import type { Meta, StoryObj } from '@storybook/react';
import { BlockLayout } from '@/components/ui';
import { Typography } from '@/components/ui';

const meta: Meta<typeof BlockLayout> = {
  title: 'UI/BlockLayout',
  component: BlockLayout,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    padding: {
      control: { type: 'select' },
      options: ['sm', 'default'],
      description: '内边距大小',
    },
    shadow: {
      control: { type: 'select' },
      options: ['none', 'sm'],
      description: '阴影强度',
    },
    rounded: {
      control: { type: 'select' },
      options: ['md', 'lg'],
      description: '圆角大小',
    },
    asChild: {
      control: { type: 'boolean' },
      description: '是否作为子元素渲染',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 内容区域标记组件
const ContentAreaMarker = ({ 
  padding = 'default',
  height = 'h-24' 
}: { 
  padding?: 'sm' | 'default';
  height?: string;
}) => {
  const paddingText = padding === 'sm' ? '16px' : '24px';
  return (
    <div className={`${height} w-full bg-purple-100 border-2 border-dashed border-purple-300 rounded-lg flex items-center justify-center`}>
              <Typography variant="body" className="text-purple-600 text-center">
        内容区域<br/>
        内边距: {paddingText}<br/>
        圆角、边框、阴影可配置
      </Typography>
    </div>
  );
};

export const Default: Story = {
  args: {
    children: <ContentAreaMarker />,
  },
};

export const SmallPadding: Story = {
  args: {
    padding: 'sm',
    children: <ContentAreaMarker padding="sm" height="h-20" />,
  },
};

export const LargePadding: Story = {
  args: {
    padding: 'default',
    children: <ContentAreaMarker padding="default" height="h-24" />,
  },
};

export const NoShadow: Story = {
  args: {
    shadow: 'none',
    children: <ContentAreaMarker height="h-20" />,
  },
};

export const RoundedVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <Typography variant="body" className="mb-2 font-medium">rounded-md</Typography>
        <BlockLayout rounded="md">
          <ContentAreaMarker height="h-16" />
        </BlockLayout>
      </div>
      <div>
        <Typography variant="body" className="mb-2 font-medium">rounded-lg (默认)</Typography>
        <BlockLayout rounded="lg">
          <ContentAreaMarker height="h-16" />
        </BlockLayout>
      </div>
    </div>
  ),
};

export const ReferenceStyle: Story = {
  args: {
    padding: 'default',
    shadow: 'sm',
    rounded: 'lg',
    children: (
      <div>
        <div className="flex flex-col space-y-1.5">
          <div className="text-sm text-muted-foreground">Total Revenue</div>
          <div className="font-semibold tracking-tight text-3xl">$15,231.89</div>
          <div className="text-sm text-muted-foreground">+20.1% from last month</div>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: '参考样式的容器，使用 rounded-lg border border-block-layout-border bg-block-layout text-block-layout-foreground shadow-sm 样式组合',
      },
    },
  },
};

export const NestedContainers: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <Typography variant="h3">主容器 (24px 内边距)</Typography>
        <BlockLayout padding="sm" shadow="none" rounded="lg">
          <div className="space-y-2">
            <Typography variant="body">嵌套容器 (16px 内边距)</Typography>
            <ContentAreaMarker padding="sm" height="h-16" />
          </div>
        </BlockLayout>
      </div>
    ),
  },
}; 