import type { Meta, StoryObj } from '@storybook/react';
import { Demo2 } from '../../demos/Demo2-SettingsPage/Demo2-SettingsPage';

const meta = {
  title: 'Demos/02-SettingsPage',
  component: Demo2,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Demo2>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '设置页面',
  render: () => <Demo2 />,
}; 