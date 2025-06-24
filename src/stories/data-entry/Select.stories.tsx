import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectContainer,
  MultiSelectTrigger,
  MultiSelectItem,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from '../../components/ui';
import { Settings, Globe, Building2, Mail } from 'lucide-react';

const meta = {
  title: 'Data Entry/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基础单选 - 仅文字
export const Default: Story = {
  render: () => (
    <SelectContainer>
      <Select>
        <SelectTrigger display="text-only">
          <SelectValue placeholder="请选择选项" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">选项 1</SelectItem>
          <SelectItem value="option2">选项 2</SelectItem>
          <SelectItem value="option3">选项 3</SelectItem>
        </SelectContent>
      </Select>
    </SelectContainer>
  ),
};

// 单选 - 带图标
export const SingleWithIcon: Story = {
  render: () => (
    <SelectContainer>
      <Select>
        <SelectTrigger display="with-icon" icon={<Settings className="h-4 w-4" />}>
          <SelectValue placeholder="选择设置" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="basic">基础设置</SelectItem>
          <SelectItem value="advanced">高级设置</SelectItem>
          <SelectItem value="system">系统设置</SelectItem>
        </SelectContent>
      </Select>
    </SelectContainer>
  ),
};

// 多选 - 仅文字
export const MultipleTextOnly: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    
    const options = [
      { value: 'frontend', label: 'Frontend 开发' },
      { value: 'backend', label: 'Backend 开发' },
      { value: 'fullstack', label: 'Full Stack 开发' },
      { value: 'mobile', label: '移动端开发' },
      { value: 'devops', label: 'DevOps 运维' },
      { value: 'design', label: 'UI/UX 设计' },
    ];
    
    const selectedLabels = options.reduce((acc, option) => {
      acc[option.value] = option.label;
      return acc;
    }, {} as Record<string, string>);
    
    const handleToggle = (value: string, selected: boolean) => {
      if (selected) {
        setSelectedValues(prev => [...prev, value]);
      } else {
        setSelectedValues(prev => prev.filter(v => v !== value));
      }
    };
    
    const handleRemove = (value: string) => {
      setSelectedValues(prev => prev.filter(v => v !== value));
    };

    return (
      <SelectContainer>
        <Select open={isOpen} onOpenChange={setIsOpen}>
          <MultiSelectTrigger
            display="text-only"
            selectedValues={selectedValues}
            selectedLabels={selectedLabels}
            onRemoveValue={handleRemove}
            placeholder="选择技能领域"
            maxDisplay={2}
          />
          <SelectContent>
            {options.map((option) => (
              <MultiSelectItem
                key={option.value}
                value={option.value}
                selected={selectedValues.includes(option.value)}
                onToggle={handleToggle}
              >
                {option.label}
              </MultiSelectItem>
            ))}
          </SelectContent>
        </Select>
      </SelectContainer>
    );
  },
};

// 分组选项 - 单选
export const WithGroups: Story = {
  render: () => (
    <SelectContainer>
      <Select>
        <SelectTrigger display="with-icon" icon={<Building2 className="h-4 w-4" />}>
          <SelectValue placeholder="选择技术栈" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>前端框架</SelectLabel>
            <SelectItem value="react">React</SelectItem>
            <SelectItem value="vue">Vue</SelectItem>
            <SelectItem value="angular">Angular</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>后端技术</SelectLabel>
            <SelectItem value="nodejs">Node.js</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="go">Go</SelectItem>
            <SelectItem value="java">Java</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>数据库</SelectLabel>
            <SelectItem value="mysql">MySQL</SelectItem>
            <SelectItem value="postgresql">PostgreSQL</SelectItem>
            <SelectItem value="mongodb">MongoDB</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </SelectContainer>
  ),
};

// 分组选项 - 多选
export const MultipleWithGroups: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>(['email', 'push']);
    const [isOpen, setIsOpen] = useState(false);
    
    const options = {
      '通知方式': [
        { value: 'email', label: '邮件通知' },
        { value: 'sms', label: '短信通知' },
        { value: 'push', label: '推送通知' },
      ],
      '通知频率': [
        { value: 'realtime', label: '实时通知' },
        { value: 'daily', label: '每日汇总' },
        { value: 'weekly', label: '每周汇总' },
      ],
      '通知类型': [
        { value: 'system', label: '系统通知' },
        { value: 'security', label: '安全提醒' },
        { value: 'marketing', label: '营销信息' },
      ],
    };
    
    const allOptions = Object.values(options).flat();
    const selectedLabels = allOptions.reduce((acc, option) => {
      acc[option.value] = option.label;
      return acc;
    }, {} as Record<string, string>);
    
    const handleToggle = (value: string, selected: boolean) => {
      if (selected) {
        setSelectedValues(prev => [...prev, value]);
      } else {
        setSelectedValues(prev => prev.filter(v => v !== value));
      }
    };
    
    const handleRemove = (value: string) => {
      setSelectedValues(prev => prev.filter(v => v !== value));
    };

    return (
      <SelectContainer>
        <Select open={isOpen} onOpenChange={setIsOpen}>
          <MultiSelectTrigger
            display="with-icon"
            icon={<Mail className="h-4 w-4" />}
            selectedValues={selectedValues}
            selectedLabels={selectedLabels}
            onRemoveValue={handleRemove}
            placeholder="通知设置"
            maxDisplay={2}
          />
          <SelectContent>
            {Object.entries(options).map(([groupName, groupOptions], groupIndex) => (
              <div key={groupName}>
                {groupIndex > 0 && <SelectSeparator />}
                <SelectGroup>
                  <SelectLabel>{groupName}</SelectLabel>
                  {groupOptions.map((option) => (
                    <MultiSelectItem
                      key={option.value}
                      value={option.value}
                      selected={selectedValues.includes(option.value)}
                      onToggle={handleToggle}
                    >
                      {option.label}
                    </MultiSelectItem>
                  ))}
                </SelectGroup>
              </div>
            ))}
          </SelectContent>
        </Select>
      </SelectContainer>
    );
  },
};

// 长选项列表
export const LongList: Story = {
  render: () => (
    <SelectContainer>
      <Select>
        <SelectTrigger display="with-icon" icon={<Globe className="h-4 w-4" />}>
          <SelectValue placeholder="选择国家" />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 20 }, (_, i) => (
            <SelectItem key={i} value={`country-${i}`}>
              国家 {i + 1} - 这是一个很长的选项名称
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </SelectContainer>
  ),
};

// 禁用状态
export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <SelectContainer>
        <Select disabled>
          <SelectTrigger display="text-only">
            <SelectValue placeholder="禁用的单选" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">选项 1</SelectItem>
            <SelectItem value="option2">选项 2</SelectItem>
          </SelectContent>
        </Select>
      </SelectContainer>
      
      <SelectContainer>
        <Select disabled>
          <MultiSelectTrigger
            display="with-icon"
            icon={<Settings className="h-4 w-4" />}
            selectedValues={['option1', 'option2']}
            selectedLabels={{ option1: '选项 1', option2: '选项 2' }}
            placeholder="禁用的多选"
          />
          <SelectContent>
            <SelectItem value="option1">选项 1</SelectItem>
            <SelectItem value="option2">选项 2</SelectItem>
          </SelectContent>
        </Select>
      </SelectContainer>
    </div>
  ),
};

// 禁用部分选项
export const DisabledItems: Story = {
  render: () => (
    <SelectContainer>
      <Select>
        <SelectTrigger display="text-only">
          <SelectValue placeholder="部分选项禁用" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">可用选项</SelectItem>
          <SelectItem value="option2" disabled>
            禁用选项
          </SelectItem>
          <SelectItem value="option3">另一个可用选项</SelectItem>
          <SelectItem value="option4" disabled>
            另一个禁用选项
          </SelectItem>
        </SelectContent>
      </Select>
    </SelectContainer>
  ),
};

// 全宽度表单
export const FullWidth: Story = {
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <SelectContainer width="full">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="请选择性别" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="男">男</SelectItem>
          <SelectItem value="女">女</SelectItem>
          <SelectItem value="其他">其他</SelectItem>
          <SelectItem value="不愿透露">不愿透露</SelectItem>
        </SelectContent>
      </Select>
    </SelectContainer>
  ),
};