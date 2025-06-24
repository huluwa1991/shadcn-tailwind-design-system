import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CitySelect, type CitySelectValue } from '../../components/ui/data-entry/city-select';

const meta: Meta<typeof CitySelect> = {
  title: 'Data Entry/CitySelect',
  component: CitySelect,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '基于现有 Select 和 Cascader 组件的城市选择器，支持不同精细度的地区选择（省份、省市、省市区）。使用中华人民共和国民政部最新数据。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: { type: 'radio' },
      options: ['province', 'city', 'area'],
      description: '选择精细度：province（省份）、city（省市）、area（省市区）',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '是否禁用',
    },
    width: {
      control: { type: 'radio' },
      options: ['auto', 'full'],
      description: '宽度模式',
    },
    changeOnSelect: {
      control: { type: 'boolean' },
      description: '是否在选择任何级别时都触发变化。启用后，选择直辖市时可以直接确认而无需选择到区县',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 可控制的组件模板
const ControlledTemplate = (args: any) => {
  const [value, setValue] = useState<CitySelectValue>({});

  return (
    <div className="w-96">
      <CitySelect 
        {...args} 
        value={value} 
        onValueChange={setValue}
      />
      <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
        <div className="font-medium mb-2">选择结果：</div>
        <pre className="text-xs">{JSON.stringify(value, null, 2)}</pre>
      </div>
    </div>
  );
};

// 基础用法
export const Default: Story = {
  render: ControlledTemplate,
  args: {
    level: 'area',
    placeholder: '请选择地区',
    width: 'auto',
  },
};

// 只选省份
export const ProvinceOnly: Story = {
  render: ControlledTemplate,
  args: {
    level: 'province',
    placeholder: '请选择省份',
    width: 'auto',
  },
  parameters: {
    docs: {
      description: {
        story: '只选择到省份级别，适用于粗粒度的地区选择场景。使用 Select 组件实现单选。',
      },
    },
  },
};

// 选到市级
export const CityLevel: Story = {
  render: ControlledTemplate,
  args: {
    level: 'city',
    placeholder: '请选择省市',
    width: 'auto',
  },
  parameters: {
    docs: {
      description: {
        story: '选择到市级，适用于中等粒度的地区选择场景。使用 Cascader 组件实现级联选择。',
      },
    },
  },
};

// 选到区县级（最细）
export const AreaLevel: Story = {
  render: ControlledTemplate,
  args: {
    level: 'area',
    placeholder: '请选择省市区',
    width: 'auto',
  },
  parameters: {
    docs: {
      description: {
        story: '选择到区县级，提供最细粒度的地区选择。使用 Cascader 组件实现三级级联选择。',
      },
    },
  },
};

// 全宽度
export const FullWidth: Story = {
  render: ControlledTemplate,
  args: {
    level: 'area',
    width: 'full',
  },
  parameters: {
    docs: {
      description: {
        story: '占满容器宽度的版本。',
      },
    },
  },
};

// 禁用状态
export const Disabled: Story = {
  render: ControlledTemplate,
  args: {
    level: 'area',
    disabled: true,
    width: 'auto',
  },
  parameters: {
    docs: {
      description: {
        story: '禁用状态的城市选择器。',
      },
    },
  },
};

// 预设值
export const WithDefaultValue: Story = {
  render: (args: any) => {
    const [value, setValue] = useState<CitySelectValue>({
      province: { code: '110000', name: '北京市' },
      city: { code: '110100', name: '北京市' },
      area: { code: '110101', name: '东城区' },
    });

    return (
      <div className="w-96">
        <CitySelect 
          {...args} 
          value={value} 
          onValueChange={setValue}
        />
        <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
          <div className="font-medium mb-2">选择结果：</div>
          <pre className="text-xs">{JSON.stringify(value, null, 2)}</pre>
        </div>
      </div>
    );
  },
  args: {
    level: 'area',
    width: 'auto',
  },
  parameters: {
    docs: {
      description: {
        story: '带有预设值的城市选择器，显示北京市东城区。',
      },
    },
  },
};

// 城市选择（支持直辖市）
export const CitySelectionWithChangeOnSelect: Story = {
  render: ControlledTemplate,
  args: {
    level: 'city',
    placeholder: '请选择所在城市',
    width: 'auto',
    changeOnSelect: true,
  },
  parameters: {
    docs: {
      description: {
        story: '适用于"所在城市"选择的场景。启用 changeOnSelect 后，可以在任何级别完成选择。对于直辖市（如北京、上海），用户可以直接选择"北京市"而无需继续选择到区县级别。对于普通城市，用户可以选择"广东省 → 深圳市"即可完成选择。',
      },
    },
  },
};