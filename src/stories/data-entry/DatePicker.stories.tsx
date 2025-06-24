import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DatePicker, DateRangePicker } from '../../components/ui';
import type { DateRange } from 'react-day-picker';

const meta = {
  title: 'Data Entry/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: '占位符文本',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
    formatStr: {
      control: 'text',
      description: '日期格式字符串',
    },
    width: {
      control: 'select',
      options: ['auto', 'full'],
      description: '宽度模式',
    },
    showDropdowns: {
      control: 'boolean',
      description: '是否显示月份和年份下拉选择器',
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// 单日期选择器 - 默认样式
export const Default: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    
    return (
      <DatePicker
        {...args}
        value={date}
        onChange={setDate}
      />
    );
  },
  args: {
    placeholder: '请选择日期',
    width: 'auto',
    showDropdowns: true,
  },
};

// 日期范围选择器
export const RangePicker: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
    
    return (
      <DateRangePicker
        value={dateRange}
        onChange={setDateRange}
        placeholder="请选择日期范围"
        width="auto"
        showDropdowns={true}
      />
    );
  },
};

// 功能演示
export const Examples: Story = {
  render: () => {
    const [date1, setDate1] = useState<Date | undefined>(undefined);
    const [date2, setDate2] = useState<Date | undefined>(new Date());
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
    
    return (
      <div className="space-y-6 w-full max-w-lg">
        <div>
          <h3 className="text-sm font-medium mb-2">基础单日期选择</h3>
          <DatePicker
            value={date1}
            onChange={setDate1}
            placeholder="选择日期"
            width="auto"
          />
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">已选择状态</h3>
          <DatePicker
            value={date2}
            onChange={setDate2}
            placeholder="选择日期"
            width="auto"
          />
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">禁用状态</h3>
          <DatePicker
            disabled
            placeholder="禁用的日期选择器"
            width="auto"
          />
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">全宽模式</h3>
          <DatePicker
            value={date1}
            onChange={setDate1}
            placeholder="全宽显示"
            width="full"
          />
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">日期范围选择</h3>
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
            placeholder="选择日期范围"
            width="auto"
          />
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">隐藏下拉选择器</h3>
          <DatePicker
            value={date1}
            onChange={setDate1}
            placeholder="传统导航模式"
            showDropdowns={false}
            width="auto"
          />
        </div>
      </div>
    );
  },
};