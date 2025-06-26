import type { Meta, StoryObj } from '@storybook/react';
import { ColorPalette } from '../../components/ui/base/color-palette';

const meta = {
  title: 'Base/ColorPalette',
  component: ColorPalette,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ColorPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  name: '浅色主题',
  render: () => (
    <div className="light">
      <ColorPalette />
    </div>
  ),
};

export const Dark: Story = {
  name: '深色主题',
  render: () => (
    <div className="dark">
      <ColorPalette />
    </div>
  ),
}; 