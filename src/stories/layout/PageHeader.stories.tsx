import type { Meta, StoryObj } from '@storybook/react';
import { PageHeaderWrapper, Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui';

const meta = {
  title: 'Layout/PageHeader',
  component: PageHeaderWrapper,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['title-only', 'title-with-actions', 'title-with-toolbar'],
    },
    showBack: {
      control: 'boolean',
    },
    title: {
      control: 'text',
    },
  },
} satisfies Meta<typeof PageHeaderWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

// 仅标题 - 最简单的用法
export const TitleOnly: Story = {
  args: {
    variant: 'title-only',
    title: '页面标题',
    containerClassName: 'p-6',
  },
};

// 带返回按钮的标题
export const TitleWithBack: Story = {
  args: {
    variant: 'title-only',
    title: '带返回按钮的页面',
    showBack: true,
    onBackClick: () => alert('返回按钮被点击'),
    containerClassName: 'p-6',
  },
};

// 标题 + 操作按钮
export const TitleWithActions: Story = {
  args: {
    variant: 'title-with-actions',
    title: '用户管理',
    showBack: true,
    actions: (
      <>
        <Button variant="outline" size="sm">导出数据</Button>
        <Button size="sm">添加用户</Button>
      </>
    ),
    containerClassName: 'p-6',
  },
};

// 标题 + 工具栏（完整功能）
export const TitleWithToolbar: Story = {
  args: {
    variant: 'title-with-toolbar',
    title: '订单管理',
    showBack: true,
    filters: (
      <>
        <Input placeholder="搜索订单..." className="w-64" />
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="订单状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            <SelectItem value="pending">待处理</SelectItem>
            <SelectItem value="processing">处理中</SelectItem>
            <SelectItem value="completed">已完成</SelectItem>
            <SelectItem value="cancelled">已取消</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="时间范围" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">今天</SelectItem>
            <SelectItem value="week">本周</SelectItem>
            <SelectItem value="month">本月</SelectItem>
            <SelectItem value="quarter">本季度</SelectItem>
          </SelectContent>
        </Select>
      </>
    ),
    toolbarActions: (
      <>
        <Button variant="outline" size="sm">批量导出</Button>
        <Button variant="outline" size="sm">设置</Button>
        <Button size="sm">批量操作</Button>
      </>
    ),
    containerClassName: 'p-6',
    headerClassName: 'space-y-4',
  },
};