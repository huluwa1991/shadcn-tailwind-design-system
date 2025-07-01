import type { Meta, StoryObj } from '@storybook/react';
import { Demo4 as TicketBookingDemo } from '../../demos/Demo4-TicketBooking/Demo4-TicketBooking';

const meta = {
  title: 'Demos/Demo4-TicketBooking',
  component: TicketBookingDemo,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TicketBookingDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '默认状态',
}; 