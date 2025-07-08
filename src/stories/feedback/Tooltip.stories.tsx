import type { Meta, StoryObj } from '@storybook/react';
import { Info, HelpCircle, Settings, Star, Heart } from 'lucide-react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, Button } from '../../components/ui';

const meta = {
  title: 'Feedback/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    delayDuration: {
      control: { type: 'number' },
      description: 'The duration from when the mouse enters until the tooltip shows',
    },
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">悬停查看提示</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>这是一个基本的工具提示</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="sm-icon" allowNoTooltip={true}>
          <Info className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>获取更多信息</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const Different位置: Story = {
  render: () => (
    <div className="flex gap-8 items-center justify-center min-h-[200px]">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">上方</Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>显示在上方</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">右侧</Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>显示在右侧</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">下方</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>显示在下方</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">左侧</Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>显示在左侧</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">长内容提示</Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <p>这是一个包含较多文字内容的工具提示。它可以帮助用户理解某个功能的详细信息，或者提供额外的使用说明。</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const IconButtons: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm-icon" allowNoTooltip={true}>
            <Settings className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>设置</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm-icon" allowNoTooltip={true}>
            <HelpCircle className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>帮助</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm-icon" allowNoTooltip={true}>
            <Star className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>收藏</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm-icon" allowNoTooltip={true}>
            <Heart className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>喜欢</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const CustomDelay: Story = {
  render: () => (
    <TooltipProvider delayDuration={1000} skipDelayDuration={300}>
      <div className="flex gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">延迟1秒</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>这个提示有1秒的延迟</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">快速切换</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>在触发器之间快速切换时延迟较短</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};

export const DisabledElement: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <span tabIndex={0}>
          <Button disabled className="pointer-events-none">
            禁用按钮
          </Button>
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>此按钮当前已禁用</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-4">基本用法</h3>
        <div className="flex gap-4 justify-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="default">默认</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>默认样式提示</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">轮廓</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>轮廓按钮提示</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost">幽灵</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>幽灵按钮提示</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-lg font-medium mb-4">图标按钮</h3>
        <div className="flex gap-4 justify-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm-icon" allowNoTooltip={true}>
                <Settings className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>设置</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm-icon" allowNoTooltip={true}>
                <HelpCircle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>帮助</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm-icon" allowNoTooltip={true}>
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>信息</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-lg font-medium mb-4">不同位置</h3>
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="w-full">上方</Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>上方提示</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="w-full">右侧</Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>右侧提示</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="w-full">下方</Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>下方提示</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="w-full">左侧</Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>左侧提示</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  ),
}; 