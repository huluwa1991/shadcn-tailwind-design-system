import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
  SelectContainer
} from '../../../components/ui';

interface YearMonthSelectorProps {
  value: string; // 格式: "2025-05"
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const YearMonthSelector: React.FC<YearMonthSelectorProps> = ({ 
  value, 
  onChange,
  disabled = false,
  className
}) => {
  // 解析年月值
  const [year, month] = value ? value.split('-') : ['', ''];
  
  // 生成年份选项 (当前年份前后各10年)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);
  
  // 月份选项
  const months = [
    { value: '01', label: '1月' },
    { value: '02', label: '2月' },
    { value: '03', label: '3月' },
    { value: '04', label: '4月' },
    { value: '05', label: '5月' },
    { value: '06', label: '6月' },
    { value: '07', label: '7月' },
    { value: '08', label: '8月' },
    { value: '09', label: '9月' },
    { value: '10', label: '10月' },
    { value: '11', label: '11月' },
    { value: '12', label: '12月' },
  ];
  
  const handleYearChange = (newYear: string) => {
    const newMonth = month || '01';
    onChange(`${newYear}-${newMonth}`);
  };
  
  const handleMonthChange = (newMonth: string) => {
    const newYear = year || currentYear.toString();
    onChange(`${newYear}-${newMonth}`);
  };
  
  return (
    <div className={`flex gap-2 w-full ${className || ''}`}>
      <div className="flex-1">
        <SelectContainer width="full">
          <Select 
            value={year} 
            onValueChange={handleYearChange}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder="选择年份" />
            </SelectTrigger>
            <SelectContent>
              {years.map((yearOption) => (
                <SelectItem key={yearOption} value={yearOption.toString()}>
                  {yearOption}年
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </SelectContainer>
      </div>
      
      <div className="flex-1">
        <SelectContainer width="full">
          <Select 
            value={month} 
            onValueChange={handleMonthChange}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder="选择月份" />
            </SelectTrigger>
            <SelectContent>
              {months.map((monthOption) => (
                <SelectItem key={monthOption.value} value={monthOption.value}>
                  {monthOption.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </SelectContainer>
      </div>
    </div>
  );
}; 