import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from '@/components/ui';

const meta: Meta<typeof Typography> = {
  title: 'UI/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'body', 'muted'],
    },
    asChild: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '这是默认的正文文本，使用标准的字体大小和行高。',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <Typography variant="h1">一级标题 - H1 Heading</Typography>
      <Typography variant="h2">二级标题 - H2 Heading</Typography>
      <Typography variant="h3">三级标题 - H3 Heading</Typography>
      <Typography variant="body">这是正文文本。适合大部分内容展示，具有良好的可读性和适中的字体大小。</Typography>
      <Typography variant="muted">这是弱化文本，通常用于补充说明或次要信息。</Typography>
    </div>
  ),
};

export const FontSizeSystem: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">字体大小系统 (与Tailwind默认命名一致)</h3>
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 font-mono w-20 text-center">xs</span>
          <span className="text-xs">小字体 (12px) - 适用于辅助信息、标签</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-600 font-mono w-20 text-center">sm</span>
          <span className="text-sm">中小字体 (14px) - 适用于正文内容</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-base bg-gray-100 px-2 py-1 rounded text-gray-600 font-mono w-20 text-center">base</span>
          <span className="text-base">基础字体 (16px) - 适用于重要内容</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-lg bg-gray-100 px-2 py-1 rounded text-gray-600 font-mono w-20 text-center">lg</span>
          <span className="text-lg">大字体 (18px) - 适用于强调内容</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xl bg-gray-100 px-2 py-1 rounded text-gray-600 font-mono w-20 text-center">xl</span>
          <span className="text-xl">特大字体 (20px) - 适用于标题内容</span>
        </div>
      </div>
    </div>
  ),
};

export const LineHeightDemo: Story = {
  render: () => (
    <div className="space-y-6 p-6">
      <div>
        <h4 className="text-sm font-medium text-gray-600 mb-2">无行高 (leading-none) - 适用于标题、标签、紧凑布局</h4>
        <p className="text-sm leading-none border-l-4 border-blue-200 pl-4">
          这是一段使用无行高的文本示例。
          适用于标题、标签等需要紧凑显示的场景。
          行与行之间的间距最小，适合简短的文本内容。
        </p>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-gray-600 mb-2">1.5倍行高 (leading-normal) - 适用于正文内容、阅读文本</h4>
        <p className="text-sm leading-normal border-l-4 border-green-200 pl-4">
          这是一段使用1.5倍行高的文本示例。
          适用于正文内容和需要良好阅读体验的文本。
          行与行之间有适中的间距，提供良好的可读性。
        </p>
      </div>
    </div>
  ),
}

export const TypographyDemo: Story = {
  render: () => (
    <div className="space-y-6 p-6">
      <div className="space-y-4">
        <Typography variant="h1" className="leading-none">设计系统文档</Typography>
        <Typography variant="body">这是一个完整的设计系统文档示例，展示了不同的文本变体和行高的使用。</Typography>
        <Typography variant="body" className="leading-normal">
          在设计系统中，文本是传达信息的重要媒介。通过合理的字体大小、行高和间距设计，
          我们可以创建出既美观又实用的文本层次结构。
        </Typography>
        
        <Typography variant="h2" className="leading-none">字体大小的选择</Typography>
        <Typography variant="body" className="leading-normal">
          我们的字体大小系统采用了5档设计，从最小的2xs到最大的lg，
          每一档都有其特定的使用场景和目的。这种渐进式的设计确保了
          文本在不同设备和场景下都能保持良好的可读性。
        </Typography>
        
        <Typography variant="muted" className="leading-none">
          这是一段辅助说明文本，通常用于提供额外的上下文信息。
        </Typography>
      </div>
    </div>
  ),
}

export const CombinedExample: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <Typography variant="h1" className="leading-none">设计系统文档</Typography>
      
      <Typography variant="body" className="leading-normal">
        这是一个完整的设计系统示例，展示了如何组合使用不同的字体大小和行高来创建层次分明、
        易于阅读的内容结构。通过合理的字体大小和行高搭配，可以提升用户的阅读体验。
      </Typography>
      
      <Typography variant="h2" className="leading-none">字体大小的选择</Typography>
      
      <Typography variant="body" className="leading-normal">
        在选择字体大小时，需要考虑内容的重要性和用户的阅读习惯。标题使用较大的字体来突出重点，
        正文使用适中的字体保证可读性。
      </Typography>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <Typography variant="muted" className="leading-none">
          提示：这是一个辅助信息框，使用较小的字体和紧凑的行高来节省空间。
        </Typography>
      </div>
    </div>
  ),
}; 