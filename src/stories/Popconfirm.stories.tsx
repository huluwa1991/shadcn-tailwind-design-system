import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Popconfirm } from '../components/ui/popconfirm';
import { Button } from '../components/ui/button';
import { Trash2, Archive } from 'lucide-react';

const meta: Meta = {
  title: 'UI/Popconfirm',
  component: Popconfirm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

// 基础用法
export const Default = {
  render: () => (
    <Popconfirm 
      title="确认删除"
      description="确定要删除这个项目吗？此操作不可撤销。"
      onConfirm={() => alert('已删除')}
    >
      <Button variant="destructive">删除项目</Button>
    </Popconfirm>
  ),
};

// 不同位置和箭头效果
export const Placement = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-12 bg-gray-50 rounded-xl">
      <div className="text-center">
        <h3 className="mb-4 text-sm font-medium">顶部</h3>
        <Popconfirm
          placement="top"
          title="顶部确认"
          description="气泡在上方显示，箭头指向按钮"
          onConfirm={() => alert('确认了')}
        >
          <Button>顶部气泡</Button>
        </Popconfirm>
      </div>
      
      <div className="text-center">
        <h3 className="mb-4 text-sm font-medium">底部</h3>
        <Popconfirm
          placement="bottom"
          title="底部确认"
          description="气泡在下方显示，箭头自动调整"
          onConfirm={() => alert('确认了')}
        >
          <Button>底部气泡</Button>
        </Popconfirm>
      </div>
      
      <div className="text-center">
        <h3 className="mb-4 text-sm font-medium">左侧</h3>
        <Popconfirm
          placement="left"
          title="左侧确认"
          description="气泡在左侧显示"
          onConfirm={() => alert('确认了')}
        >
          <Button>左侧气泡</Button>
        </Popconfirm>
      </div>
      
      <div className="text-center">
        <h3 className="mb-4 text-sm font-medium">右侧</h3>
        <Popconfirm
          placement="right"
          title="右侧确认"
          description="气泡在右侧显示"
          onConfirm={() => alert('确认了')}
        >
          <Button>右侧气泡</Button>
        </Popconfirm>
      </div>
    </div>
  ),
};