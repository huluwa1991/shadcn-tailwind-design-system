import type { Meta, StoryObj } from '@storybook/react';

import { Label } from '../../components/ui';

const meta = {
  title: 'Base/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    htmlFor: {
      control: 'text',
    },
    required: {
      control: 'boolean',
      description: '是否为必填字段',
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '标签文本',
  },
};

// 必填标签（带红点）
export const RequiredWithDot: Story = {
  args: {
    children: '姓名',
    required: true,
  },
}; 