import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Tag } from '../../components/ui';

const meta = {
  title: 'Data Display/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'success', 'warning', 'destructive'],
    },
    removable: {
      control: { type: 'boolean' },
    },
    onRemove: { action: 'remove' },
  },
  args: {
    onRemove: fn(),
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '默认标签',
    variant: 'default',
  },
};

export const Removable: Story = {
  args: {
    children: '可删除标签',
    variant: 'primary',
    removable: true,
    onRemove: fn(),
  },
};

export const AllVariants: Story = {
  args: {
    children: 'Tag',
  },
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">所有颜色变体</h3>
        <div className="flex gap-2">
          <Tag variant="default">默认</Tag>
          <Tag variant="primary">主题</Tag>
          <Tag variant="success">成功</Tag>
          <Tag variant="warning">警告</Tag>
          <Tag variant="destructive">错误</Tag>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">可删除标签</h3>
        <div className="flex gap-2">
          <Tag variant="primary" onRemove={fn()}>JavaScript</Tag>
          <Tag variant="success" onRemove={fn()}>已完成</Tag>
          <Tag variant="warning" onRemove={fn()}>待审核</Tag>
          <Tag variant="destructive" onRemove={fn()}>已过期</Tag>
        </div>
      </div>
    </div>
  ),
};

export const WithLongText: Story = {
  args: {
    children: '这是一个很长的标签文本内容',
    variant: 'primary',
  },
}; 