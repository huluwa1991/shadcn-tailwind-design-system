import type { Meta, StoryObj } from '@storybook/react';
import { Demo2 } from '../components/Demo2';

const meta: Meta<typeof Demo2> = {
  title: 'Pages/Demo2',
  component: Demo2,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Demo2 设置页面 - 展示了完整的设置界面，包含侧边栏、centered布局的页面容器，以及各种设置选项',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '默认设置页面',
  parameters: {
    docs: {
      description: {
        story: '完整的设置页面，包含：\n- 使用sidebar.tsx的导航栏\n- 使用page-container.tsx的centered布局\n- 个人资料编辑表单\n- 通知、隐私、安全、偏好等各类设置开关和选择器\n- 符合间距系统规范的布局',
      },
    },
  },
}; 