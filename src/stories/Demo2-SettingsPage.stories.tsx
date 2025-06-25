import type { Meta, StoryObj } from '@storybook/react';
import { Demo2 } from '../components/Demo2-SettingsPage';

const meta: Meta<typeof Demo2> = {
  title: 'Pages/Demo2-SettingsPage',
  component: Demo2,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '设置页面',
}; 