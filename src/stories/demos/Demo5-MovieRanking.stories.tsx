import type { Meta, StoryObj } from '@storybook/react';
import { Demo5 } from '../../demos/Demo5-MovieRanking/Demo5-MovieRanking';

const meta = {
  title: 'Demos/Demo5-MovieRanking',
  component: Demo5,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Demo5>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '豆瓣电影排行榜',
}; 