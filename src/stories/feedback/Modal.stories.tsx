import type { Meta, StoryObj } from '@storybook/react';
import { Modal, Button, Typography } from '../../components/ui';
import { useState } from 'react';

const meta = {
  title: 'Feedback/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '弹窗标题',
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['sm', 'md', 'lg'],
      description: '弹窗尺寸',
    },
    children: {
      control: 'text',
      description: '弹窗内容',
    },
    footer: {
      control: false,
      description: '弹窗页脚内容 (通常是操作按钮)',
    },
    open: {
      control: 'boolean',
      description: '控制弹窗的打开/关闭状态',
    },
    onOpenChange: {
      action: 'opened/closed',
      description: '弹窗打开/关闭时的回调函数',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// 内容区域标记组件
const ContentAreaMarker = ({ height = 'h-24' }: { height?: string }) => (
  <div className={`${height} w-full bg-purple-100 border-2 border-dashed border-purple-300 rounded-lg flex items-center justify-center`}>
              <Typography variant="body" className="text-purple-600">
      内容区域
    </Typography>
  </div>
);

export const Default: Story = {
  args: {
    title: '默认弹窗标题',
    children: <ContentAreaMarker />,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>打开默认弹窗</Button>
        <Modal {...args} open={open} onOpenChange={setOpen}>
          {args.children}
        </Modal>
      </>
    );
  },
};

export const Small: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>打开小尺寸弹窗</Button>
        <Modal
          open={open}
          onOpenChange={setOpen}
          title="小尺寸弹窗"
          size="sm"
          footer={
            <>
              <Button variant="outline">取消</Button>
              <Button>确认</Button>
            </>
          }
        >
          <ContentAreaMarker height="h-16" />
        </Modal>
      </>
    );
  },
};

export const Medium: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>打开中尺寸弹窗</Button>
        <Modal
          open={open}
          onOpenChange={setOpen}
          title="中尺寸弹窗"
          size="md"
          footer={
            <>
              <Button variant="outline">取消</Button>
              <Button>确认</Button>
            </>
          }
        >
          <ContentAreaMarker height="h-20" />
        </Modal>
      </>
    );
  },
};

export const Large: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>打开大尺寸弹窗</Button>
        <Modal
          open={open}
          onOpenChange={setOpen}
          title="大尺寸弹窗"
          size="lg"
          footer={
            <>
              <Button variant="outline">取消</Button>
              <Button>确认</Button>
            </>
          }
        >
          <ContentAreaMarker height="h-32" />
        </Modal>
      </>
    );
  },
};

export const WithoutFooter: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>打开无页脚弹窗</Button>
        <Modal
          open={open}
          onOpenChange={setOpen}
          title="无页脚弹窗"
          size="md"
        >
          <ContentAreaMarker height="h-24" />
        </Modal>
      </>
    );
  },
};
