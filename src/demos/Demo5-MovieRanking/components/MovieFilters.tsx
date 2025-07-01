import React from 'react';
import { FilterGroup } from '../../../components/ui';
import { MovieCategory, FilterState } from '../types';

interface MovieFiltersProps {
  categories: MovieCategory[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export const MovieFilters: React.FC<MovieFiltersProps> = ({
  categories,
  filters,
  onFiltersChange,
}) => {
  const handleCategoryChange = (selectedValues: string[]) => {
    // 单选模式，只取第一个值
    const newCategory = selectedValues.length > 0 ? selectedValues[0] : 'all';
    onFiltersChange({
      ...filters,
      category: newCategory,
    });
  };

  // 将 categories 转换为 FilterGroup 需要的 options 格式
  const filterOptions = categories.map(category => ({
    value: category.value,
    label: category.name,
    disabled: false,
  }));

  return (
    <div className="mb-6">
      <FilterGroup 
        options={filterOptions}
        selectedValues={[filters.category]}
        onSelectedValuesChange={handleCategoryChange}
        allowMultiple={false}
        orientation="horizontal"
        size="default"
      />
    </div>
  );
}; 