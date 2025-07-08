import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Sidebar } from '../../components/ui';

const meta = {
  title: 'Navigation/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    collapsed: {
      control: 'boolean',
      description: '是否收起侧边栏',
    },
    className: {
      control: 'text',
      description: '自定义 CSS 类名',
    },
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    collapsed: false,
  },
  render: (args) => {
    const [collapsed, setCollapsed] = useState(args.collapsed || false);
    
    return (
      <div className="flex h-screen w-full bg-background">
        <div>
          <Sidebar 
            {...args} 
            collapsed={collapsed}
            onCollapsedChange={setCollapsed}
          />
        </div>
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-medium mb-4">主内容区域</h1>
          <p className="text-muted-foreground">
            这里是应用程序的主要内容区域。左侧的 Sidebar 提供了导航功能。
          </p>
          <p className="text-muted-foreground mt-2">
            点击{collapsed ? 'Logo 位置的展开按钮' : '右上角的收起按钮'}可以{collapsed ? '展开' : '收起'}侧边栏。
          </p>
          <p className="text-muted-foreground mt-2">
            当前状态：{collapsed ? '已收起' : '已展开'}
          </p>
        </div>
      </div>
    );
  },
};