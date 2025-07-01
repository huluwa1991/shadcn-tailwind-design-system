import type { Meta, StoryObj } from '@storybook/react';
import { Demo4 as TicketBookingDemo } from '../../demos/Demo4-TicketBooking/Demo4-TicketBooking';

const meta = {
  title: 'Demos/Demo4-TicketBooking',
  component: TicketBookingDemo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '票务预订页面演示，展示了完整的票务搜索和购买流程界面。包含顶部导航、筛选工具栏、活动列表和艺人信息卡片。'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TicketBookingDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '默认状态',
  parameters: {
    docs: {
      description: {
        story: '展示完整的票务预订页面，包含BLACKPINK演出信息、筛选功能和艺人详情。'
      }
    }
  }
}; 