import type { Meta, StoryObj } from '@storybook/react';

import { RadioGroup, RadioGroupItem, RadioGroupLabel } from '../../components/ui';

const meta = {
  title: 'Data Entry/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'cards'],
      description: '变体：简单样式或卡片样式',
    },
    layout: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
      description: '布局方向：纵向或横向',
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// 简单样式（默认）
export const Default: Story = {
  render: (args) => (
    <RadioGroup defaultValue="option1" {...args}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="option1" />
        <label htmlFor="option1" className="text-sm">
          选项一
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="option2" />
        <label htmlFor="option2" className="text-sm">
          选项二
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option3" id="option3" />
        <label htmlFor="option3" className="text-sm">
          选项三
        </label>
      </div>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: '简单样式的单选组，适用于基础选择场景。',
      },
    },
  },
};

// 横向布局
export const Horizontal: Story = {
  render: (args) => (
    <RadioGroup defaultValue="option1" layout="horizontal" {...args}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="horizontal-option1" />
        <label htmlFor="horizontal-option1" className="text-sm">
          选项一
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="horizontal-option2" />
        <label htmlFor="horizontal-option2" className="text-sm">
          选项二
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option3" id="horizontal-option3" />
        <label htmlFor="horizontal-option3" className="text-sm">
          选项三
        </label>
      </div>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: '横向布局的单选组，选项水平排列。',
      },
    },
  },
};

// 卡片样式
export const Cards: Story = {
  render: (args) => (
    <div className="w-full max-w-2xl">
      <RadioGroup defaultValue="pro" variant="cards" {...args}>
        <RadioGroupLabel variant="cards">
          <RadioGroupItem value="starter" />
          <div className="grid gap-1 font-normal">
            <div className="font-medium">Starter Plan</div>
            <div className="text-muted-foreground text-xs leading-snug">
              适合个人用户，包含基础功能
            </div>
          </div>
        </RadioGroupLabel>
        <RadioGroupLabel variant="cards">
          <RadioGroupItem value="pro" />
          <div className="grid gap-1 font-normal">
            <div className="font-medium">Pro Plan</div>
            <div className="text-muted-foreground text-xs leading-snug">
              适合小团队，包含高级功能
            </div>
          </div>
        </RadioGroupLabel>
        <RadioGroupLabel variant="cards">
          <RadioGroupItem value="enterprise" />
          <div className="grid gap-1 font-normal">
            <div className="font-medium">Enterprise Plan</div>
            <div className="text-muted-foreground text-xs leading-snug">
              适合大型企业，定制化支持
            </div>
          </div>
        </RadioGroupLabel>
      </RadioGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '卡片样式的单选组，适用于需要展示更多信息的选择场景。',
      },
    },
  },
};

// 卡片样式 - 横向布局
export const CardsHorizontal: Story = {
  render: (args) => (
    <div className="w-full max-w-4xl">
      <RadioGroup defaultValue="pro" variant="cards" layout="horizontal" {...args}>
        <RadioGroupLabel variant="cards">
          <RadioGroupItem value="starter" />
          <div className="grid gap-1 font-normal">
            <div className="font-medium">Starter Plan</div>
            <div className="text-muted-foreground text-xs leading-snug">
              基础功能，适合个人用户
            </div>
          </div>
        </RadioGroupLabel>
        <RadioGroupLabel variant="cards">
          <RadioGroupItem value="pro" />
          <div className="grid gap-1 font-normal">
            <div className="font-medium">Pro Plan</div>
            <div className="text-muted-foreground text-xs leading-snug">
              高级功能，适合小团队使用
            </div>
          </div>
        </RadioGroupLabel>
        <RadioGroupLabel variant="cards">
          <RadioGroupItem value="enterprise" />
          <div className="grid gap-1 font-normal">
            <div className="font-medium">Enterprise Plan</div>
            <div className="text-muted-foreground text-xs leading-snug">
              企业定制，包含所有功能和专业支持
            </div>
          </div>
        </RadioGroupLabel>
      </RadioGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '卡片样式的横向布局，所有卡片宽度保持一致，以最宽的卡片为准。',
      },
    },
  },
};

// 单个选项禁用
export const WithDisabledOptions: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">简单样式 - 单个选项禁用</h3>
        <RadioGroup defaultValue="option1">
          <RadioGroupLabel variant="default">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option1" id="simple-option1" />
              <span>可用选项一</span>
            </div>
          </RadioGroupLabel>
          <RadioGroupLabel variant="default">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option2" id="simple-option2" disabled />
              <span className="text-muted-foreground">禁用选项二</span>
            </div>
          </RadioGroupLabel>
          <RadioGroupLabel variant="default">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option3" id="simple-option3" />
              <span>可用选项三</span>
            </div>
          </RadioGroupLabel>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">横向布局 - 单个选项禁用</h3>
        <RadioGroup defaultValue="option1" layout="horizontal">
          <RadioGroupLabel variant="default">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option1" id="horizontal-simple-option1" />
              <span>可用选项一</span>
            </div>
          </RadioGroupLabel>
          <RadioGroupLabel variant="default">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option2" id="horizontal-simple-option2" disabled />
              <span className="text-muted-foreground">禁用选项二</span>
            </div>
          </RadioGroupLabel>
          <RadioGroupLabel variant="default">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option3" id="horizontal-simple-option3" />
              <span>可用选项三</span>
            </div>
          </RadioGroupLabel>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">卡片样式 - 单个选项禁用</h3>
        <div className="w-full max-w-md">
          <RadioGroup defaultValue="plan1" variant="cards">
            <RadioGroupLabel variant="cards">
              <RadioGroupItem value="plan1" />
              <div className="grid gap-1 font-normal">
                <div className="font-medium">基础计划</div>
                <div className="text-muted-foreground text-xs">可用选项</div>
              </div>
            </RadioGroupLabel>
            <RadioGroupLabel variant="cards">
              <RadioGroupItem value="plan2" disabled />
              <div className="grid gap-1 font-normal">
                <div className="font-medium text-muted-foreground">高级计划</div>
                <div className="text-muted-foreground text-xs">禁用选项</div>
              </div>
            </RadioGroupLabel>
            <RadioGroupLabel variant="cards">
              <RadioGroupItem value="plan3" />
              <div className="grid gap-1 font-normal">
                <div className="font-medium">企业计划</div>
                <div className="text-muted-foreground text-xs">可用选项</div>
              </div>
            </RadioGroupLabel>
          </RadioGroup>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示单个选项禁用的情况，包括不同布局方向的效果。',
      },
    },
  },
}; 