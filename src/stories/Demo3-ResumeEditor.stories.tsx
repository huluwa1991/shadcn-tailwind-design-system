import type { Meta, StoryObj } from '@storybook/react';
import { Resume } from '../components/Demo3-ResumeEditor';

const meta: Meta<typeof Resume> = {
  title: 'Pages/Demo3-ResumeEditor',
  component: Resume,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '简历编辑器',
};

export const EmptyState: Story = {
  name: '空状态简历编辑器',
}; 