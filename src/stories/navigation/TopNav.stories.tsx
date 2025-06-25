import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { TopNav } from '@/components/ui/navigation/top-nav';

const meta = {
  title: 'Navigation/TopNav',
  component: TopNav,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '顶部导航栏组件，支持已登录和未登录两种状态。已登录状态显示帮助按钮和用户头像，未登录状态显示帮助按钮和登录按钮。',
      },
    },
  },
  argTypes: {
    isLoggedIn: {
      description: '是否为登录状态',
      control: 'boolean',
    },
    avatarSrc: {
      description: '用户头像URL',
      control: 'text',
    },
    avatarFallback: {
      description: '用户头像回退文字',
      control: 'text',
    },
    userName: {
      description: '用户名',
      control: 'text',
    },
    onHelpClick: {
      description: '帮助按钮点击回调',
    },
    onAvatarClick: {
      description: '头像点击回调（个人中心）',
    },
    onLoginClick: {
      description: '登录按钮点击回调',
    },
    onLogoClick: {
      description: 'Logo点击回调',
    },
  },
  args: {
    onHelpClick: fn(),
    onAvatarClick: fn(),
    onLoginClick: fn(),
    onLogoClick: fn(),
  },
} satisfies Meta<typeof TopNav>;

export default meta;
type Story = StoryObj<typeof meta>;

// 已登录状态
export const LoggedIn: Story = {
  args: {
    isLoggedIn: true,
    userName: '张三',
    avatarSrc: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    avatarFallback: '张',
  },
  parameters: {
    docs: {
      description: {
        story: '已登录状态：显示帮助按钮和用户头像。点击头像可进入个人中心。',
      },
    },
  },
};

// 未登录状态
export const NotLoggedIn: Story = {
  args: {
    isLoggedIn: false,
  },
  parameters: {
    docs: {
      description: {
        story: '未登录状态：显示帮助按钮和登录按钮。',
      },
    },
  },
}; 