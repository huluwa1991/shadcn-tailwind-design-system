import type { Meta, StoryObj } from '@storybook/react';

import { Input, Label } from '../../components/ui';

const meta = {
  title: 'Base/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    required: {
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

// 必填状态展示
export const Required: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="required-input" required>姓名</Label>
      <Input 
        id="required-input" 
        placeholder="请输入您的姓名" 
        required 
        {...args} 
      />
    </div>
  ),
};

// 必填状态但不显示红点
export const RequiredWithoutIndicator: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="required-no-dot" required>邮箱</Label>
      <Input 
        id="required-no-dot" 
        type="email"
        placeholder="请输入邮箱地址" 
        required 
        {...args} 
      />
    </div>
  ),
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex flex-1 flex-col gap-2">
      <Label htmlFor="email">邮箱</Label>
      <Input type="email" id="email" placeholder="请输入邮箱地址" {...args} />
    </div>
  ),
};

export const ExpectedStyle: Story = {
  render: () => (
    <div className="flex flex-1 flex-col gap-2">
      <Label htmlFor="name">Name</Label>
      <Input id="name" placeholder="Evil Rabbit" />
    </div>
  ),
};

export const Password: Story = {
  render: (args) => (
    <div className="flex flex-1 flex-col gap-2">
      <Label htmlFor="password">密码</Label>
      <Input type="password" id="password" placeholder="请输入密码" {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: '禁用状态',
    disabled: true,
  },
};

export const Number: Story = {
  render: (args) => (
    <div className="flex flex-1 flex-col gap-2">
      <Label htmlFor="number">数量</Label>
      <Input type="number" id="number" placeholder="请输入数量" {...args} />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="email-error" required>邮箱</Label>
      <Input 
        type="email" 
        id="email-error" 
        placeholder="请输入邮箱地址"
        className="border-destructive"
        required
      />
      <p className="text-sm text-destructive">请输入有效的邮箱地址</p>
    </div>
  ),
};