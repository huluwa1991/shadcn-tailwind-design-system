import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContainer,
  DatePicker
} from '@/components/ui';
import { FilterState } from '../types';

interface EventFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export const EventFilters: React.FC<EventFiltersProps> = ({
  filters,
  onFiltersChange
}) => {
  const handleLocationChange = (value: string) => {
    onFiltersChange({ ...filters, location: value });
  };

  const handleDateChange = (date: Date | undefined) => {
    onFiltersChange({ 
      ...filters, 
      date: date ? date.toISOString().split('T')[0] : '' 
    });
  };

  const handleParkingChange = (value: string) => {
    onFiltersChange({ 
      ...filters, 
      hasParking: value === 'with-parking' 
    });
  };

  const handlePriceChange = (value: string) => {
    onFiltersChange({ ...filters, priceRange: value });
  };

  return (
    <div className="flex items-center gap-4">
      {/* 地点选择 */}
      <SelectContainer>
        <Select value={filters.location} onValueChange={handleLocationChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Bangkok" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bangkok">Bangkok</SelectItem>
            <SelectItem value="seoul">Seoul</SelectItem>
            <SelectItem value="tokyo">Tokyo</SelectItem>
            <SelectItem value="singapore">Singapore</SelectItem>
          </SelectContent>
        </Select>
      </SelectContainer>

      {/* 日期选择 */}
      <DatePicker
        value={filters.date ? new Date(filters.date) : undefined}
        onChange={handleDateChange}
        placeholder="All dates"
      />

      {/* 停车位筛选 */}
      <SelectContainer>
        <Select 
          value={filters.hasParking ? 'with-parking' : 'all'} 
          onValueChange={handleParkingChange}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Parking" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="with-parking">With Parking</SelectItem>
          </SelectContent>
        </Select>
      </SelectContainer>

      {/* 价格筛选 */}
      <SelectContainer>
        <Select value={filters.priceRange} onValueChange={handlePriceChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="under-100">Under $100</SelectItem>
            <SelectItem value="100-300">$100 - $300</SelectItem>
            <SelectItem value="300-500">$300 - $500</SelectItem>
            <SelectItem value="over-500">Over $500</SelectItem>
          </SelectContent>
        </Select>
      </SelectContainer>
    </div>
  );
}; 