import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '../../components/ui';

const meta = {
  title: 'Data Entry/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
    inputSize: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
    },
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '请输入内容...',
  },
};

// 不同尺寸展示
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div className="space-y-2">
        <div className="text-sm font-medium">Small</div>
        <Input inputSize="sm" placeholder="小尺寸输入框" />
      </div>
      <div className="space-y-2">
        <div className="text-sm font-medium">Default</div>
        <Input inputSize="default" placeholder="默认尺寸输入框" />
      </div>
      <div className="space-y-2">
        <div className="text-sm font-medium">Large</div>
        <Input inputSize="lg" placeholder="大尺寸输入框" />
      </div>
    </div>
  ),
};

// 不同类型展示
export const Types: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Input type="text" placeholder="文本输入" />
      <Input type="email" placeholder="邮箱地址" />
      <Input type="password" placeholder="密码" />
      <Input type="number" placeholder="数字" />
      <Input type="tel" placeholder="电话号码" />
      <Input type="url" placeholder="网址" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: '禁用状态',
    disabled: true,
  },
};