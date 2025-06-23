import type { Meta, StoryObj } from '@storybook/react';

import { Avatar, AvatarUserInfo, AvatarWithInfo } from '../components/ui/avatar';

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
    },
    src: {
      control: 'text',
    },
    alt: {
      control: 'text',
    },
    fallback: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fallback: 'CN',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://github.com/shadcn.png',
    alt: 'shadcn',
    fallback: 'CN',
  },
};

export const Fallback: Story = {
  args: {
    fallback: 'JD',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    fallback: 'SM',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    fallback: 'LG',
  },
};

// 参考样式故事 - 完全复现原始参考样式
export const ReferenceStyle: Story = {
  render: () => {
    return (
      <div className="flex items-center gap-4">
        <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border">
          <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
            S
          </span>
        </span>
        <div className="flex flex-col gap-0.5">
          <p className="text-sm leading-none font-medium">Sofia Davis</p>
          <p className="text-muted-foreground text-xs">m@example.com</p>
        </div>
      </div>
    );
  },
};

// 使用组合组件实现相同效果
export const WithUserInfo: Story = {
  render: () => {
    return (
      <AvatarWithInfo
        fallback="S"
        name="Sofia Davis"
        email="m@example.com"
      />
    );
  },
};

// 带头像图片的用户信息
export const WithImageAndInfo: Story = {
  render: () => {
    return (
      <AvatarWithInfo
        src="https://github.com/shadcn.png"
        alt="shadcn"
        fallback="CN"
        name="shadcn"
        email="shadcn@example.com"
      />
    );
  },
};

// 不同尺寸的头像
export const AllSizes: Story = {
  render: () => {
    return (
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <Avatar size="sm" fallback="S" />
          <span className="text-xs">Small</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Avatar size="default" fallback="M" />
          <span className="text-xs">Default</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Avatar size="lg" fallback="L" />
          <span className="text-xs">Large</span>
        </div>
      </div>
    );
  },
};

// 用户列表示例
export const UserList: Story = {
  render: () => {
    const users = [
      { name: 'Alice Johnson', email: 'alice@example.com', fallback: 'AJ' },
      { name: 'Bob Smith', email: 'bob@example.com', fallback: 'BS' },
      { name: 'Carol White', email: 'carol@example.com', fallback: 'CW', src: 'https://github.com/shadcn.png' },
      { name: 'David Brown', email: 'david@example.com', fallback: 'DB' },
    ];

    return (
      <div className="flex flex-col gap-3 w-64">
        {users.map((user, index) => (
          <AvatarWithInfo
            key={index}
            src={user.src}
            fallback={user.fallback}
            name={user.name}
            email={user.email}
          />
        ))}
      </div>
    );
  },
};

// 图片加载失败的情况
export const ImageError: Story = {
  render: () => {
    return (
      <AvatarWithInfo
        src="https://invalid-url.jpg"
        fallback="E"
        name="Error User"
        email="error@example.com"
      />
    );
  },
};

// 仅显示用户信息组件
export const UserInfoOnly: Story = {
  render: () => {
    return (
      <AvatarUserInfo
        name="John Doe"
        email="john.doe@example.com"
      />
    );
  },
}; 