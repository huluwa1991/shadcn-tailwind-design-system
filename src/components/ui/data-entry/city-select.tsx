import * as React from 'react';
import { useMemo } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContainer,
} from './select';
import { Cascader, type CascaderOption, type CascaderValue } from './cascader';
import { cn } from '@/lib/utils';

// 导入省市区数据
import levelData from '@province-city-china/level';

// 城市选择器变体
const citySelectVariants = cva('', {
  variants: {
    level: {
      province: '', // 只选省份
      city: '',     // 选到市级
      area: '',     // 选到区县级（最细）
    },
  },
  defaultVariants: {
    level: 'area',
  },
});

// 原始数据类型定义
interface RegionData {
  code: string;
  name: string;
  children?: RegionData[];
}

// 选择结果类型
interface CitySelectValue {
  province?: { code: string; name: string };
  city?: { code: string; name: string };
  area?: { code: string; name: string };
}

// 组件 Props
interface CitySelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof citySelectVariants> {
  value?: CitySelectValue;
  onValueChange?: (value: CitySelectValue) => void;
  placeholder?: string;
  disabled?: boolean;
  width?: 'auto' | 'full';
  allowClear?: boolean;
  /** 是否在选择任何级别时都触发变化，适用于直辖市等场景 */
  changeOnSelect?: boolean;
}

// 工具函数：将原始数据转换为 Cascader 格式
const transformRegionDataToCascaderOptions = (data: RegionData[]): CascaderOption[] => {
  return data.map(item => ({
    value: item.code,
    label: item.name,
    children: item.children ? transformRegionDataToCascaderOptions(item.children) : undefined,
  }));
};

// 工具函数：将 CascaderValue 转换为 CitySelectValue
const transformCascaderValueToCitySelectValue = (
  cascaderValue: CascaderValue, 
  options: CascaderOption[]
): CitySelectValue => {
  const result: CitySelectValue = {};
  
  if (cascaderValue.length > 0) {
    // 省份
    const province = options.find(opt => opt.value === cascaderValue[0]);
    if (province) {
      result.province = { code: province.value, name: province.label };
      
      // 城市
      if (cascaderValue.length > 1 && province.children) {
        const city = province.children.find(opt => opt.value === cascaderValue[1]);
        if (city) {
          result.city = { code: city.value, name: city.label };
          
          // 区县
          if (cascaderValue.length > 2 && city.children) {
            const area = city.children.find(opt => opt.value === cascaderValue[2]);
            if (area) {
              result.area = { code: area.value, name: area.label };
            }
          }
        }
      }
    }
  }
  
  return result;
};

// 工具函数：将 CitySelectValue 转换为 CascaderValue
const transformCitySelectValueToCascaderValue = (citySelectValue: CitySelectValue): CascaderValue => {
  const result: CascaderValue = [];
  
  if (citySelectValue.province) {
    result.push(citySelectValue.province.code);
    
    if (citySelectValue.city) {
      result.push(citySelectValue.city.code);
      
      if (citySelectValue.area) {
        result.push(citySelectValue.area.code);
      }
    }
  }
  
  return result;
};

// 省份选择组件
const ProvinceSelect: React.FC<{
  value?: CitySelectValue;
  onValueChange?: (value: CitySelectValue) => void;
  placeholder?: string;
  disabled?: boolean;
  width?: 'auto' | 'full';
  className?: string;
}> = ({
  value,
  onValueChange,
  placeholder = '请选择省份',
  disabled = false,
  width = 'auto',
  className,
}) => {
  // 获取省份列表
  const provinces = useMemo(() => {
    return (levelData as RegionData[]).map(province => ({
      code: province.code,
      name: province.name,
    }));
  }, []);

  // 处理省份选择
  const handleProvinceSelect = (provinceCode: string) => {
    const province = provinces.find(p => p.code === provinceCode);
    if (province) {
      onValueChange?.({
        province: { code: province.code, name: province.name }
      });
    }
  };

  const currentValue = value?.province?.code || '';
  const displayValue = value?.province?.name || '';

  return (
    <div className={cn('relative', className)}>
      <SelectContainer width={width}>
        <Select value={currentValue} onValueChange={handleProvinceSelect} disabled={disabled}>
          <SelectTrigger width={width}>
            <SelectValue placeholder={displayValue || placeholder} />
          </SelectTrigger>
          <SelectContent>
            {provinces.map((province) => (
              <SelectItem key={province.code} value={province.code}>
                {province.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </SelectContainer>
    </div>
  );
};

// 级联选择组件
const CascadeSelect: React.FC<{
  value?: CitySelectValue;
  onValueChange?: (value: CitySelectValue) => void;
  level: 'city' | 'area';
  placeholder?: string;
  disabled?: boolean;
  width?: 'auto' | 'full';
  allowClear?: boolean;
  changeOnSelect?: boolean;
  className?: string;
}> = ({
  value,
  onValueChange,
  level,
  placeholder = '请选择地区',
  disabled = false,
  width = 'auto',
  allowClear = true,
  changeOnSelect = false,
  className,
}) => {
  // 转换原始数据为 Cascader 格式
  const cascaderOptions = useMemo(() => {
    return transformRegionDataToCascaderOptions(levelData as RegionData[]);
  }, []);

  // 转换当前值为 Cascader 格式
  const cascaderValue = useMemo(() => {
    return transformCitySelectValueToCascaderValue(value || {});
  }, [value]);

  // 根据 level 确定最大级别数
  const maxLevel = level === 'city' ? 2 : 3;

  // 处理值变化
  const handleCascaderChange = React.useCallback((
    newCascaderValue: CascaderValue, 
    _selectedOptions: CascaderOption[]
  ) => {
    const newCitySelectValue = transformCascaderValueToCitySelectValue(newCascaderValue, cascaderOptions);
    
    // 根据 level 限制选择结果
    const limitedValue: CitySelectValue = {};
    if (newCitySelectValue.province) {
      limitedValue.province = newCitySelectValue.province;
      
      if (newCitySelectValue.city) {
        limitedValue.city = newCitySelectValue.city;
        
        if (level === 'area' && newCitySelectValue.area) {
          limitedValue.area = newCitySelectValue.area;
        }
      }
    }
    
    onValueChange?.(limitedValue);
  }, [cascaderOptions, onValueChange, level]);

  return (
    <Cascader
      options={cascaderOptions}
      value={cascaderValue}
      onChange={handleCascaderChange}
      placeholder={placeholder}
      disabled={disabled}
      width={width === 'full' ? 'fill' : width}
      maxLevel={maxLevel}
      allowClear={allowClear}
      changeOnSelect={changeOnSelect}
      className={className}
    />
  );
};

// 城市选择器组件
const CitySelect = React.forwardRef<
  HTMLDivElement,
  CitySelectProps
>(({ 
  className, 
  value = {}, 
  onValueChange, 
  level = 'area', 
  placeholder = '请选择地区',
  disabled = false,
  width = 'auto',
  allowClear = true,
  changeOnSelect = false,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(citySelectVariants({ level }), className)}
      {...props}
    >
      {level === 'province' ? (
        <ProvinceSelect
          value={value}
          onValueChange={onValueChange}
          placeholder={placeholder}
          disabled={disabled}
          width={width}
          className={className}
        />
      ) : (
        <CascadeSelect
          value={value}
          onValueChange={onValueChange}
          level={level as 'city' | 'area'}
          placeholder={placeholder}
          disabled={disabled}
          width={width}
          allowClear={allowClear}
          changeOnSelect={changeOnSelect}
          className={className}
        />
      )}
    </div>
  );
});

CitySelect.displayName = 'CitySelect';

export { CitySelect, type CitySelectProps, type CitySelectValue }; 