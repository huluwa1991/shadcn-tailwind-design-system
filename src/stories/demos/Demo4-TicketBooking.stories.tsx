import type { Meta, StoryObj } from '@storybook/react';
import { Demo4 } from '../../demos/Demo4-TicketBooking/Demo4-TicketBooking';

const meta = {
  title: 'Demos/04-TicketBooking',
  component: Demo4,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Demo4>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '票务预订',
  render: () => <Demo4 />,
}; 