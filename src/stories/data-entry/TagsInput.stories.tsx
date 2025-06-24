import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TagsInput } from '../../components/ui/data-entry/tags-input';

const meta: Meta<typeof TagsInput> = {
  title: 'Data Entry/TagsInput',
  component: TagsInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '标签输入组件，支持用户输入文本并按空格键转换为标签。支持删除标签、限制最大数量、重复检查等功能。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
      description: '是否禁用',
    },
    maxTags: {
      control: { type: 'number' },
      description: '最大标签数量',
    },
    duplicateCheck: {
      control: { type: 'boolean' },
      description: '是否检查重复标签',
    },
    placeholder: {
      control: { type: 'text' },
      description: '占位符文本',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 基础用法（受控组件）
export const Default: Story = {
  render: (args) => {
    const [tags, setTags] = useState<string[]>([]);
    
    return (
      <div className="w-80">
        <TagsInput
          {...args}
          value={tags}
          onChange={setTags}
        />
      </div>
    );
  },
  args: {
    placeholder: '输入标签并按空格键添加...',
  },
};

// 受控组件
export const Controlled: Story = {
  render: (args) => {
    const [tags, setTags] = useState<string[]>(['React', 'TypeScript']);
    
    return (
      <div className="w-80">
        <TagsInput
          {...args}
          value={tags}
          onChange={setTags}
        />
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">当前标签：</p>
          <pre className="text-xs bg-gray-100 p-2 rounded mt-2">
            {JSON.stringify(tags, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
  args: {
    placeholder: '添加更多标签...',
  },
};

// 基本用法示例
export const BasicUsage: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>([]);
    
    return (
      <div className="w-80">
        <TagsInput 
          value={tags}
          onChange={setTags}
          placeholder="输入标签并按空格键添加..." 
        />
      </div>
    );
  },
};

// 限制最大标签数
export const MaxTags: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>(['JavaScript', 'React']);
    
    return (
      <div className="w-80">
        <TagsInput
          value={tags}
          onChange={setTags}
          maxTags={5}
          placeholder="最多只能添加5个标签..."
        />
        <p className="text-sm text-muted-foreground mt-2">
          已添加 {tags.length}/5 个标签
        </p>
      </div>
    );
  },
};

// 禁用重复检查
export const AllowDuplicates: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>(['test']);
    
    return (
      <div className="w-80">
        <TagsInput
          value={tags}
          onChange={setTags}
          duplicateCheck={false}
          placeholder="允许重复标签..."
        />
        <p className="text-sm text-muted-foreground mt-2">
          试试输入 "test" - 允许重复
        </p>
      </div>
    );
  },
};

// 禁用状态
export const Disabled: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>(['React', 'TypeScript', 'Disabled']);
    
    return (
      <div className="w-80">
        <TagsInput
          disabled
          value={tags}
          onChange={setTags}
          placeholder="此组件已禁用..."
        />
      </div>
    );
  },
};

// 事件回调
export const WithCallbacks: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>(['初始标签']);
    const [events, setEvents] = useState<string[]>([]);
    
    const addEvent = (event: string) => {
      setEvents(prev => [...prev.slice(-4), event]); // 只保留最近5个事件
    };
    
    return (
      <div className="w-80">
        <TagsInput
          value={tags}
          onChange={setTags}
          onTagAdd={(tag) => addEvent(`添加标签: ${tag}`)}
          onTagRemove={(tag, index) => addEvent(`删除标签: ${tag} (索引 ${index})`)}
          placeholder="观察事件回调..."
        />
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">最近事件：</p>
          <div className="text-xs bg-gray-100 p-2 rounded space-y-1">
            {events.length === 0 ? (
              <p className="text-muted-foreground">暂无事件</p>
            ) : (
              events.map((event, index) => (
                <div key={index}>{event}</div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  },
};

// 预设标签
export const WithInitialTags: Story = {
  args: {
    value: ['Frontend', 'React', 'TypeScript', 'Tailwind CSS'],
    placeholder: '添加更多技术标签...',
  },
}; 