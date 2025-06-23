import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DatePicker, DateRangePicker } from '@/components/ui/date-picker';
import type { DateRange } from 'react-day-picker';

const meta = {
  title: 'UI/DatePicker',
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
  },
};

// 单日期选择器 - 已选择状态
export const WithSelectedDate: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    
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
  },
};

// 单日期选择器 - 禁用状态
export const Disabled: Story = {
  render: () => {
    return (
      <DatePicker
        disabled
        placeholder="禁用的日期选择器"
      />
    );
  },
};

// 日期范围选择器 - 默认样式
export const RangePicker: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
    
    return (
      <DateRangePicker
        value={dateRange}
        onChange={setDateRange}
        placeholder="请选择日期范围"
      />
    );
  },
};

// 日期范围选择器 - 已选择状态
export const RangePickerWithSelection: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
      from: new Date(2024, 0, 1),
      to: new Date(2024, 0, 15),
    });
    
    return (
      <DateRangePicker
        value={dateRange}
        onChange={setDateRange}
        placeholder="请选择日期范围"
      />
    );
  },
};

// 日期范围选择器 - 单月显示
export const RangePickerSingleMonth: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
    
    return (
      <DateRangePicker
        value={dateRange}
        onChange={setDateRange}
        placeholder="单月日期范围选择"
        numberOfMonths={1}
      />
    );
  },
};