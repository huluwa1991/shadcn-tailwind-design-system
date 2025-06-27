import type { Meta, StoryObj } from '@storybook/react';
import { ArchiveX, Trash2, Plus } from 'lucide-react';
import { useState } from 'react';

import { Button, ButtonWithLoading } from '../../components/ui';

const meta = {
  title: 'Base/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'withicon', 'sm-icon'],
    },
    disabled: {
      control: 'boolean',
    },
    asChild: {
      control: 'boolean',
    },
    tooltip: {
      control: 'text',
      description: '图标按钮必需的 tooltip 文本',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基础按钮变体
export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button>
        <Plus className="h-4 w-4" />
        创建任务
      </Button>
      <Button variant="outline">
        <Plus className="h-4 w-4" />
        添加项目
      </Button>
    </div>
  ),
};

export const IconButtons: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button size="sm-icon" variant="ghost" tooltip="归档">
        <ArchiveX className="h-4 w-4" />
      </Button>
      <Button size="sm-icon" variant="ghost" tooltip="删除">
        <Trash2 className="h-4 w-4" />
      </Button>
      <Button size="withicon" variant="ghost" tooltip="大尺寸归档">
        <ArchiveX className="h-4 w-4" />
      </Button>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
      <ButtonWithLoading loading>Loading</ButtonWithLoading>
    </div>
  ),
};

// ButtonWithLoading 专门展示
export const LoadingButton: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSubmit = () => {
      setIsLoading(true);
      // 模拟异步操作
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };
    
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          <ButtonWithLoading loading loadingText="保存中...">保存</ButtonWithLoading>
          <ButtonWithLoading loading={false}>正常状态</ButtonWithLoading>
          <ButtonWithLoading loading variant="secondary">次要按钮</ButtonWithLoading>
          <ButtonWithLoading loading variant="outline" loadingText="处理中...">轮廓按钮</ButtonWithLoading>
        </div>
        
        <div className="border-t pt-4">
          <div className="flex gap-2 items-center">
            <ButtonWithLoading
              loading={isLoading}
              onClick={handleSubmit}
              loadingText="提交中..."
            >
              提交表单
            </ButtonWithLoading>
            <Button 
              variant="outline" 
              onClick={() => setIsLoading(false)}
              disabled={!isLoading}
              size="sm"
            >
              取消
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            点击提交按钮测试加载状态 (2秒)
          </p>
        </div>
      </div>
    );
  },
};

export const LoadingSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <ButtonWithLoading loading size="sm" loadingText="小">Small</ButtonWithLoading>
      <ButtonWithLoading loading size="default" loadingText="默认">Default</ButtonWithLoading>
      <ButtonWithLoading loading size="lg" loadingText="大">Large</ButtonWithLoading>
    </div>
  ),
}; 