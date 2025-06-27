import type { Meta, StoryObj } from '@storybook/react';
import { Demo3Resume } from '../../demos/Demo3-Resume/Demo3-Resume';

const meta: Meta<typeof Demo3Resume> = {
  title: 'Demos/Demo3-Resume',
  component: Demo3Resume,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '我的简历',
};