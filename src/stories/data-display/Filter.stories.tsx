import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FilterGroup, type FilterOption } from '../../components/ui';

const meta: Meta<typeof FilterGroup> = {
  title: 'Data Display/Filter',
  component: FilterGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'default', 'lg'],
    },
    allowMultiple: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 基础筛选器组
export const Default: Story = {
  render: (args) => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    
    const options: FilterOption[] = [
      { value: 'all', label: '全部' },
      { value: 'pending', label: '待处理' },
      { value: 'processing', label: '处理中' },
      { value: 'completed', label: '已完成' },
      { value: 'cancelled', label: '已取消' },
    ];

    return (
      <div className="w-96">
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">状态筛选</h3>
          <FilterGroup
            {...args}
            options={options}
            selectedValues={selectedValues}
            onSelectedValuesChange={setSelectedValues}
          />
        </div>
        <div className="text-xs text-muted-foreground">
          已选择: {selectedValues.length > 0 ? selectedValues.join(', ') : '无'}
        </div>
      </div>
    );
  },
  args: {
    orientation: 'horizontal',
    size: 'default',
    allowMultiple: true,
  },
};

// 单选模式
export const SingleSelect: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>(['medium']);
    
    const options: FilterOption[] = [
      { value: 'low', label: '低优先级' },
      { value: 'medium', label: '中优先级' },
      { value: 'high', label: '高优先级' },
      { value: 'urgent', label: '紧急' },
    ];

    return (
      <div className="w-96">
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">优先级（单选）</h3>
          <FilterGroup
            options={options}
            selectedValues={selectedValues}
            onSelectedValuesChange={setSelectedValues}
            allowMultiple={false}
          />
        </div>
        <div className="text-xs text-muted-foreground">
          已选择: {selectedValues.length > 0 ? selectedValues.join(', ') : '无'}
        </div>
      </div>
    );
  },
};

// 不同尺寸
export const Sizes: Story = {
  render: () => {
    const [selectedValues1, setSelectedValues1] = useState<string[]>(['frontend']);
    const [selectedValues2, setSelectedValues2] = useState<string[]>(['backend']);
    const [selectedValues3, setSelectedValues3] = useState<string[]>(['mobile']);
    
    const options: FilterOption[] = [
      { value: 'frontend', label: '前端' },
      { value: 'backend', label: '后端' },
      { value: 'mobile', label: '移动端' },
      { value: 'devops', label: 'DevOps' },
    ];

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">小尺寸</h3>
          <FilterGroup
            options={options}
            selectedValues={selectedValues1}
            onSelectedValuesChange={setSelectedValues1}
            size="sm"
          />
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">默认尺寸</h3>
          <FilterGroup
            options={options}
            selectedValues={selectedValues2}
            onSelectedValuesChange={setSelectedValues2}
            size="default"
          />
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">大尺寸</h3>
          <FilterGroup
            options={options}
            selectedValues={selectedValues3}
            onSelectedValuesChange={setSelectedValues3}
            size="lg"
          />
        </div>
      </div>
    );
  },
};

// 垂直布局
export const VerticalLayout: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>(['design', 'development']);
    
    const options: FilterOption[] = [
      { value: 'design', label: '设计' },
      { value: 'development', label: '开发' },
      { value: 'testing', label: '测试' },
      { value: 'deployment', label: '部署' },
      { value: 'maintenance', label: '维护' },
    ];

    return (
      <div className="w-48">
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">项目阶段</h3>
          <FilterGroup
            options={options}
            selectedValues={selectedValues}
            onSelectedValuesChange={setSelectedValues}
            orientation="vertical"
          />
        </div>
        <div className="text-xs text-muted-foreground">
          已选择: {selectedValues.length > 0 ? selectedValues.join(', ') : '无'}
        </div>
      </div>
    );
  },
};

// 带禁用选项
export const WithDisabledOptions: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>(['active']);
    
    const options: FilterOption[] = [
      { value: 'active', label: '活跃' },
      { value: 'inactive', label: '非活跃' },
      { value: 'pending', label: '待审核', disabled: true },
      { value: 'suspended', label: '暂停', disabled: true },
      { value: 'archived', label: '已归档' },
    ];

    return (
      <div className="w-96">
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">用户状态</h3>
          <FilterGroup
            options={options}
            selectedValues={selectedValues}
            onSelectedValuesChange={setSelectedValues}
          />
        </div>
        <div className="text-xs text-muted-foreground">
          已选择: {selectedValues.length > 0 ? selectedValues.join(', ') : '无'}
        </div>
      </div>
    );
  },
};