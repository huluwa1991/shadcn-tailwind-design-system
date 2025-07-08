import type { Meta, StoryObj } from '@storybook/react';
import { Demo3Resume } from '../../demos/Demo3-Resume/Demo3-Resume';

const meta = {
  title: 'Demos/03-Resume',
  component: Demo3Resume,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Demo3Resume>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '简历生成器',
  render: () => <Demo3Resume />,
};