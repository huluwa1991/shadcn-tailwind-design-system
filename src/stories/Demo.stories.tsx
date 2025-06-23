import type { Meta, StoryObj } from '@storybook/react';
import { Demo } from '../components/Demo';

const meta = {
  title: 'Pages/Demo',
  component: Demo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Demo 页面是一个完整的页面示例，展示了如何使用侧边栏组件并保持页面背景色与侧边栏背景色一致。这个页面包含了侧边栏的收起/展开功能，以及与侧边栏主题色彩系统完全协调的内容区域。',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '默认 Demo 页面',
  render: () => <Demo />,
}; 