import type { Meta, StoryObj } from '@storybook/react';
import { ArchiveX, Trash2, Plus } from 'lucide-react';

import { Button } from '../../components/ui';

const meta = {
  title: 'Base/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'withicon', 'sm-icon'],
    },
    disabled: {
      control: 'boolean',
    },
    asChild: {
      control: 'boolean',
    },
    tooltip: {
      control: 'text',
      description: '图标按钮必需的 tooltip 文本',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large',
  },
};

export const WithIcon: Story = {
  render: () => (
    <Button>
      <Plus className="h-4 w-4" />
      创建任务
    </Button>
  ),
};

export const SmallIcon: Story = {
  render: () => (
    <Button size="sm-icon" variant="ghost" tooltip="移动到垃圾箱">
      <ArchiveX className="h-4 w-4" />
      <span className="sr-only">Move to junk</span>
    </Button>
  ),
};

export const WithIconButton: Story = {
  render: () => (
    <Button size="withicon" variant="ghost" tooltip="大尺寸归档按钮">
      <ArchiveX className="h-4 w-4" />
      <span className="sr-only">Large Archive</span>
    </Button>
  ),
};

export const IconButtonsGroup: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button size="sm-icon" variant="ghost" tooltip="归档">
        <ArchiveX className="h-4 w-4" />
        <span className="sr-only">Archive</span>
      </Button>
      <Button size="sm-icon" variant="ghost" tooltip="删除">
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Delete</span>
      </Button>
      <Button size="withicon" variant="ghost" tooltip="大尺寸归档">
        <ArchiveX className="h-4 w-4" />
        <span className="sr-only">Large Archive</span>
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};

export const AllVariants: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="withicon" tooltip="表情符号按钮">🔥</Button>
          <Button size="sm-icon" variant="ghost" tooltip="归档"><ArchiveX className="h-4 w-4" /></Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button disabled>Disabled Default</Button>
          <Button variant="secondary" disabled>Disabled Secondary</Button>
          <Button variant="outline" disabled>Disabled Outline</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button><Plus className="h-4 w-4" />创建任务</Button>
          <Button variant="outline"><Plus className="h-4 w-4" />添加项目</Button>
        </div>
      </div>
    );
  },
}; 