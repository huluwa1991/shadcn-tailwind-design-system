import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SearchInput } from '../../components/ui';

const meta: Meta<typeof SearchInput> = {
  title: 'Data Entry/Search',
  component: SearchInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'full'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 基础搜索输入框
export const Default: Story = {
  args: {
    placeholder: '搜索...',
  },
};

export const FullWidth: Story = {
  args: {
    placeholder: '搜索...',
    variant: 'full',
  },
  parameters: {
    layout: 'padded',
  },
};

// 不同宽度对比
export const WidthComparison: Story = {
  render: () => (
    <div className="space-y-4 max-w-4xl">
      <div>
        <label className="text-sm font-medium">默认宽度（256px）</label>
        <SearchInput variant="default" placeholder="默认宽度搜索框" />
      </div>
      <div>
        <label className="text-sm font-medium">撑满宽度</label>
        <SearchInput variant="full" placeholder="撑满宽度搜索框" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// 交互式示例
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [searchHistory, setSearchHistory] = useState<string[]>([]);

    const handleSearch = (searchValue: string) => {
      if (searchValue.trim() && !searchHistory.includes(searchValue)) {
        setSearchHistory(prev => [searchValue, ...prev.slice(0, 4)]);
      }
    };

    const handleClear = () => {
      setValue('');
    };

    return (
      <div className="w-96 space-y-4">
        <SearchInput
          placeholder="输入并按回车搜索..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(value);
            }
          }}
          onClear={handleClear}
        />
        
        {searchHistory.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">搜索历史</h4>
            <div className="space-y-1">
              {searchHistory.map((item, index) => (
                <button
                  key={index}
                  className="block w-full text-left text-sm p-2 rounded hover:bg-muted"
                  onClick={() => setValue(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
}; 