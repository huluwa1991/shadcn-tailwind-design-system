import type { Meta, StoryObj } from '@storybook/react';
import { Demo } from '../components/Demo1-UserManagement';

const meta = {
  title: 'Pages/Demo1-UserManagement',
  component: Demo,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '用户管理页面',
  render: () => <Demo />,
}; 