import type { Meta, StoryObj } from '@storybook/react';
import { Demo5 } from '../../demos/Demo5-MovieRanking/Demo5-MovieRanking';

const meta = {
  title: 'Demos/Demo5-MovieRanking',
  component: Demo5,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '豆瓣电影排行榜页面，展示电影列表、分类筛选和一周口碑榜功能。参考豆瓣电影排行榜的设计和交互。',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Demo5>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '豆瓣电影排行榜',
  parameters: {
    docs: {
      description: {
        story: '完整的豆瓣电影排行榜页面，包含：\n- 顶部导航栏\n- 页面标题和说明\n- 电影分类筛选\n- 电影卡片列表（带排名、评分、海报等）\n- 右侧一周口碑榜\n- 响应式布局设计',
      },
    },
  },
}; 