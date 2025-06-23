import type { Meta, StoryObj } from '@storybook/react';

import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    rows: {
      control: { type: 'number', min: 1, max: 20 },
    },
    cols: {
      control: { type: 'number', min: 10, max: 100 },
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '请输入内容...',
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="description">描述</Label>
      <Textarea id="description" placeholder="请输入详细描述..." {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: '禁用状态',
    disabled: true,
  },
};

export const WithRows: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="comment">评论</Label>
      <Textarea 
        id="comment" 
        placeholder="请输入您的评论..." 
        rows={6}
        {...args} 
      />
    </div>
  ),
};

export const Required: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="feedback" required>反馈</Label>
      <Textarea 
        id="feedback" 
        placeholder="请输入您的反馈（必填）..." 
        required
        {...args} 
      />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="message-error" required>消息</Label>
      <Textarea 
        id="message-error" 
        placeholder="请输入消息内容"
        className="border-destructive"
        required
      />
      <p className="text-sm text-destructive">消息内容不能为空</p>
    </div>
  ),
};