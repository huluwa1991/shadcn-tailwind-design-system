import type { Meta, StoryObj } from '@storybook/react';
import { Loading } from '@/components/ui';

const meta: Meta<typeof Loading> = {
  title: 'Feedback/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'dark'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithText: Story = {
  args: {
    text: '加载中...',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="text-center">
        <Loading size="sm" text="Small" />
      </div>
      <div className="text-center">
        <Loading size="md" text="Medium" />
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="text-center">
        <Loading variant="default" text="Default" />
      </div>
      <div className="text-center bg-slate-900 p-4 rounded">
        <Loading variant="dark" text="Dark Mode" />
      </div>
    </div>
  ),
}; 