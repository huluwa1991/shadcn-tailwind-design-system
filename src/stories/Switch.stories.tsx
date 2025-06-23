import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Switch } from '@/components/ui/switch';

const meta: Meta<typeof Switch> = {
  title: 'UI/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'default'],
    },
    checked: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
  args: { onCheckedChange: fn() },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 基础用法
export const Default: Story = {
  args: {
    checked: false,
  },
};

// 各种状态
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Switch checked={false} />
        <span>未选中</span>
      </div>
      <div className="flex items-center gap-4">
        <Switch checked={true} />
        <span>已选中</span>
      </div>
      <div className="flex items-center gap-4">
        <Switch checked={false} disabled />
        <span>禁用未选中</span>
      </div>
      <div className="flex items-center gap-4">
        <Switch checked={true} disabled />
        <span>禁用已选中</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示开关的所有可能状态：未选中、已选中、禁用状态。',
      },
    },
  },
};

// 尺寸变体
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Switch size="sm" checked={true} />
        <span>小尺寸 (sm)</span>
      </div>
      <div className="flex items-center gap-4">
        <Switch size="default" checked={true} />
        <span>默认尺寸 (default)</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示不同尺寸的开关组件：小、默认。',
      },
    },
  },
};