import type { Meta, StoryObj } from '@storybook/react';
import { PageContainer } from '@/components/ui';
import { Typography } from '@/components/ui';

const meta: Meta<typeof PageContainer> = {
  title: 'UI/PageContainer',
  component: PageContainer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['full', 'centered'],
      description: '页面容器布局变体',
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
  variant = 'full',
  height = 'h-96' 
}: { 
  variant?: 'full' | 'centered';
  height?: string;
}) => {
  const widthText = variant === 'full' ? '最大宽度: 1440px, 左右内边距: 32px' : '宽度: 650px, 左右内边距: 24px';
  const containerClass = variant === 'full' ? 'max-w-full' : 'max-w-[650px] mx-auto';
  
  return (
    <div className={`${height} w-full bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg flex items-center justify-center ${containerClass}`}>
      <Typography variant="body" className="text-blue-600 text-center">
        页面容器内容区域<br/>
        {widthText}<br/>
        上下内边距: 40px<br/>
        圆角、边框、阴影已配置
      </Typography>
    </div>
  );
};

export const Default: Story = {
  args: {
    children: <ContentAreaMarker />,
  },
};

export const Centered: Story = {
  args: {
    variant: 'centered',
    children: <ContentAreaMarker variant="centered" height="h-80" />,
  },
  parameters: {
    docs: {
      description: {
        story: '居中布局变体，固定宽度650px，适合表单或文档类内容',
      },
    },
  },
};