import type { Meta, StoryObj } from '@storybook/react';
import { Demo } from '../components/Demo1-UserManagement';

const meta = {
  title: 'Pages/Demo1-UserManagement',
  component: Demo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '用户管理页面 - 展示了完整的用户管理界面，包含用户列表表格、状态筛选、角色筛选、以及用户操作功能。这个页面演示了表格组件、筛选组件和页面布局的完整使用。',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '用户管理页面',
  render: () => <Demo />,
}; 