import type { Meta, StoryObj } from '@storybook/react';
import { 
  Dropdown,
  DropdownContainer,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownLabel,
  Button
} from '@/components/ui';
import { 
  User, 
  Settings, 
  ChevronDown, 
  Edit,
  Copy
} from 'lucide-react';

const meta: Meta<typeof DropdownTrigger> = {
  title: 'BASE/Dropdown',
  component: DropdownTrigger,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: { type: 'select' },
      options: ['auto', 'full'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'ghost'],
    },
    placeholder: {
      control: { type: 'text' },
    },
    asChild: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 基础 Dropdown
export const Default: Story = {
  render: (args) => (
    <DropdownContainer>
      <Dropdown>
        <DropdownTrigger {...args}>
          Dropdown
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem>Item 1</DropdownItem>
          <DropdownItem>Item 2</DropdownItem>
          <DropdownItem>Item 3</DropdownItem>
        </DropdownContent>
      </Dropdown>
    </DropdownContainer>
  ),
  args: {
    width: 'auto',
    variant: 'default',
    placeholder: '请选择',
  },
};

// Trigger 宽度变体
export const TriggerWidthVariants: Story = {
  render: () => (
    <div className="space-y-6 w-full" style={{ width: '400px' }}>
      <div className="border border-dashed border-gray-300 p-4">
        <label className="text-sm font-medium mb-2 block">width="auto" (min-w-[180px])</label>
        <DropdownContainer width="auto">
          <Dropdown>
            <DropdownTrigger width="auto">Auto Width</DropdownTrigger>
            <DropdownContent>
              <DropdownItem>Item 1</DropdownItem>
              <DropdownItem>Item 2</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </DropdownContainer>
        <p className="text-xs text-muted-foreground mt-2">容器宽度自适应，最小 180px</p>
      </div>

      <div className="border border-dashed border-gray-300 p-4">
        <label className="text-sm font-medium mb-2 block">width="full"</label>
        <DropdownContainer width="full">
          <Dropdown>
            <DropdownTrigger width="full">Full Width</DropdownTrigger>
            <DropdownContent>
              <DropdownItem>Item 1</DropdownItem>
              <DropdownItem>Item 2</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </DropdownContainer>
        <p className="text-xs text-muted-foreground mt-2">触发器占满容器全宽</p>
      </div>
    </div>
  ),
};

// Trigger 变体
export const TriggerVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">variant="default"</label>
        <DropdownContainer>
          <Dropdown>
            <DropdownTrigger variant="default">Default Variant</DropdownTrigger>
            <DropdownContent>
              <DropdownItem>Item 1</DropdownItem>
              <DropdownItem>Item 2</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </DropdownContainer>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">variant="ghost"</label>
        <DropdownContainer>
          <Dropdown>
            <DropdownTrigger variant="ghost">Ghost Variant</DropdownTrigger>
            <DropdownContent>
              <DropdownItem>Item 1</DropdownItem>
              <DropdownItem>Item 2</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </DropdownContainer>
      </div>
    </div>
  ),
};

// Trigger 图标和后缀
export const TriggerIconAndSuffix: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">无图标</label>
        <DropdownContainer>
          <Dropdown>
            <DropdownTrigger>No Icon</DropdownTrigger>
            <DropdownContent>
              <DropdownItem>Item 1</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </DropdownContainer>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">带前置图标</label>
        <DropdownContainer>
          <Dropdown>
            <DropdownTrigger icon={<User className="h-4 w-4" />}>
              With Icon
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem>Item 1</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </DropdownContainer>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">带后缀</label>
        <DropdownContainer>
          <Dropdown>
            <DropdownTrigger suffix={<ChevronDown className="h-4 w-4" />}>
              With Suffix
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem>Item 1</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </DropdownContainer>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">图标 + 后缀</label>
        <DropdownContainer>
          <Dropdown>
            <DropdownTrigger 
              icon={<User className="h-4 w-4" />}
              suffix={<ChevronDown className="h-4 w-4" />}
            >
              Icon + Suffix
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem>Item 1</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </DropdownContainer>
      </div>
    </div>
  ),
};

// asChild 变体
export const AsChildVariant: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">asChild={false} (default)</label>
        <DropdownContainer>
          <Dropdown>
            <DropdownTrigger>Default Trigger</DropdownTrigger>
            <DropdownContent>
              <DropdownItem>Item 1</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </DropdownContainer>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">asChild={true}</label>
        <DropdownContainer>
          <Dropdown>
            <DropdownTrigger asChild>
              <Button variant="outline">
                Custom Button Trigger
              </Button>
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem>Item 1</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </DropdownContainer>
      </div>
    </div>
  ),
};

// Content 尺寸变体
export const ContentSizeVariants: Story = {
  render: () => (
    <div className="space-y-4 w-full" style={{ width: '600px' }}>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">size="sm" (min-w-[8rem])</label>
          <DropdownContainer>
            <Dropdown>
              <DropdownTrigger>Small</DropdownTrigger>
              <DropdownContent size="sm">
                <DropdownItem>Short</DropdownItem>
                <DropdownItem>Option</DropdownItem>
              </DropdownContent>
            </Dropdown>
          </DropdownContainer>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">size="md" (min-w-[12rem])</label>
          <DropdownContainer>
            <Dropdown>
              <DropdownTrigger>Medium</DropdownTrigger>
              <DropdownContent size="md">
                <DropdownItem>Medium Option</DropdownItem>
                <DropdownItem>Another Option</DropdownItem>
              </DropdownContent>
            </Dropdown>
          </DropdownContainer>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">size="lg" (min-w-[16rem])</label>
          <DropdownContainer>
            <Dropdown>
              <DropdownTrigger>Large</DropdownTrigger>
              <DropdownContent size="lg">
                <DropdownItem>Large Option with More Text</DropdownItem>
                <DropdownItem>Another Longer Option</DropdownItem>
              </DropdownContent>
            </Dropdown>
          </DropdownContainer>
        </div>
      </div>

      <div className="border border-dashed border-gray-300 p-4">
        <label className="text-sm font-medium mb-2 block">size="auto" (w-auto)</label>
        <DropdownContainer>
          <Dropdown>
            <DropdownTrigger>Auto Size</DropdownTrigger>
            <DropdownContent size="auto">
              <DropdownItem>短</DropdownItem>
              <DropdownItem>这是一个很长很长的选项文本内容</DropdownItem>
              <DropdownItem>中等长度</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </DropdownContainer>
        <p className="text-xs text-muted-foreground mt-2">内容宽度自适应最长选项</p>
      </div>

      <div className="border border-dashed border-gray-300 p-4">
        <label className="text-sm font-medium mb-2 block">size="full" (w-full)</label>
        <DropdownContainer>
          <Dropdown>
            <DropdownTrigger>Full Width</DropdownTrigger>
            <DropdownContent size="full">
              <DropdownItem>选项 1</DropdownItem>
              <DropdownItem>选项 2</DropdownItem>
              <DropdownItem>选项 3</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </DropdownContainer>
        <p className="text-xs text-muted-foreground mt-2">内容占满整个可用宽度</p>
      </div>
    </div>
  ),
};

// Item 变体
export const ItemVariants: Story = {
  render: () => (
    <DropdownContainer>
      <Dropdown>
        <DropdownTrigger>Item Variants</DropdownTrigger>
        <DropdownContent>
          <DropdownItem variant="default">Default Item</DropdownItem>
          <DropdownItem variant="destructive">Destructive Item</DropdownItem>
        </DropdownContent>
      </Dropdown>
    </DropdownContainer>
  ),
};

// Item 图标和后缀
export const ItemIconAndSuffix: Story = {
  render: () => (
    <DropdownContainer>
      <Dropdown>
        <DropdownTrigger>Item Icons</DropdownTrigger>
        <DropdownContent>
          <DropdownItem>无图标</DropdownItem>
          <DropdownItem icon={<Edit className="h-4 w-4" />}>
            带前置图标
          </DropdownItem>
          <DropdownItem suffix={<ChevronDown className="h-4 w-4" />}>
            带后缀
          </DropdownItem>
          <DropdownItem 
            icon={<Copy className="h-4 w-4" />}
            suffix={<Settings className="h-4 w-4" />}
          >
            图标 + 后缀
          </DropdownItem>
        </DropdownContent>
      </Dropdown>
    </DropdownContainer>
  ),
};

// Item 禁用状态
export const ItemDisabledState: Story = {
  render: () => (
    <DropdownContainer>
      <Dropdown>
        <DropdownTrigger>Disabled Items</DropdownTrigger>
        <DropdownContent>
          <DropdownItem>正常状态</DropdownItem>
          <DropdownItem disabled>禁用状态</DropdownItem>
          <DropdownItem disabled icon={<Edit className="h-4 w-4" />}>
            禁用 + 图标
          </DropdownItem>
          <DropdownItem disabled variant="destructive">
            禁用 + 危险
          </DropdownItem>
        </DropdownContent>
      </Dropdown>
    </DropdownContainer>
  ),
};

// Content 组合元素
export const ContentComposition: Story = {
  render: () => (
    <DropdownContainer>
      <Dropdown>
        <DropdownTrigger>Content Elements</DropdownTrigger>
        <DropdownContent>
          <DropdownLabel>分组标签</DropdownLabel>
          <DropdownItem>普通选项</DropdownItem>
          <DropdownItem>另一个选项</DropdownItem>
          <DropdownSeparator />
          <DropdownLabel>另一个分组</DropdownLabel>
          <DropdownItem variant="destructive">危险操作</DropdownItem>
        </DropdownContent>
      </Dropdown>
    </DropdownContainer>
  ),
}; 