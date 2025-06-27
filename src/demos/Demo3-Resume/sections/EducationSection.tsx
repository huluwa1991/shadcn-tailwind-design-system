import React from 'react';
import {
  FormRow,
  FormItem,
  FormLabel,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContainer,
  CitySelect,
  TagsInput
} from '../../../components/ui';
import type { Education, ResumeListKey } from '../types';
import { DynamicListSection, YearMonthSelector } from '../components';

interface EducationSectionProps {
  items: Education[];
  onAdd: (listKey: ResumeListKey, itemType: 'education') => void;
  onUpdate: (listKey: ResumeListKey, id: string, field: string, value: any) => void;
  onRemove: (listKey: ResumeListKey, id: string) => void;
  hasItemContent: (item: Education) => boolean;
  newlyAddedIds?: Set<string>;
  deletingIds?: Set<string>;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  items,
  onAdd,
  onUpdate,
  onRemove,
  hasItemContent,
  newlyAddedIds,
  deletingIds
}) => {
  const renderEducationItem = (item: Education, _index: number) => (
    <div className="space-y-4">
      {/* 第一行：学校 + 院系 */}
      <FormRow columns={2}>
        <FormItem>
          <FormLabel>学校</FormLabel>
          <Input
            value={item.school}
            onChange={(e) => onUpdate('educations', item.id, 'school', e.target.value)}
            placeholder="请输入学校名称"
          />
        </FormItem>
        
        <FormItem>
          <FormLabel>院系</FormLabel>
          <Input
            value={item.faculty}
            onChange={(e) => onUpdate('educations', item.id, 'faculty', e.target.value)}
            placeholder="请输入院系"
          />
        </FormItem>
      </FormRow>
      
      {/* 第二行：学位层级 + 学位状态 */}
      <FormRow columns={2}>
        <FormItem>
          <FormLabel>学位层级</FormLabel>
          <SelectContainer width="full">
            <Select
              value={item.degree}
              onValueChange={(value) => onUpdate('educations', item.id, 'degree', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="请选择学位层级" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="专科">专科</SelectItem>
                <SelectItem value="本科">本科</SelectItem>
                <SelectItem value="硕士">硕士</SelectItem>
                <SelectItem value="博士">博士</SelectItem>
              </SelectContent>
            </Select>
          </SelectContainer>
        </FormItem>
        
        <FormItem>
          <FormLabel>学位状态</FormLabel>
          <SelectContainer width="full">
            <Select
              value={item.status}
              onValueChange={(value) => onUpdate('educations', item.id, 'status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="请选择学位状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="毕业">毕业</SelectItem>
                <SelectItem value="在读">在读</SelectItem>
                <SelectItem value="肄业">肄业</SelectItem>
                <SelectItem value="休学">休学</SelectItem>
                <SelectItem value="退学">退学</SelectItem>
              </SelectContent>
            </Select>
          </SelectContainer>
        </FormItem>
      </FormRow>
      
      {/* 第三行：城市 + (空白占位) */}
      <FormRow columns={2}>
        <FormItem>
          <FormLabel>城市</FormLabel>
          <CitySelect
            value={item.city}
            onValueChange={(value) => onUpdate('educations', item.id, 'city', value)}
            placeholder="请选择学校所在城市"
            width="full"
            level="city"
            changeOnSelect={true}
          />
        </FormItem>
        
        <FormItem>
          {/* 空白占位 */}
        </FormItem>
      </FormRow>
      
      {/* 第四行：开始时间 + 结束时间 */}
      <FormRow columns={2}>
        <FormItem>
          <FormLabel>开始时间</FormLabel>
          <YearMonthSelector
            value={item.startDate}
            onChange={(value) => onUpdate('educations', item.id, 'startDate', value)}
          />
        </FormItem>
        
        <FormItem>
          <FormLabel>结束时间</FormLabel>
          <YearMonthSelector
            value={item.endDate}
            onChange={(value) => onUpdate('educations', item.id, 'endDate', value)}
          />
        </FormItem>
      </FormRow>
      
      {/* 第五行：成果 (全宽) */}
      <FormRow columns={1}>
        <FormItem>
          <FormLabel>成果</FormLabel>
          <TagsInput
            value={item.achievements}
            onChange={(achievements) => onUpdate('educations', item.id, 'achievements', achievements)}
            placeholder="例如：学术研究、获得奖学金、社团活动等..."
          />
        </FormItem>
      </FormRow>
    </div>
  );

  return (
    <DynamicListSection
      title="教育经历"
      items={items}
      onAdd={() => onAdd('educations', 'education')}
      onRemove={(id) => onRemove('educations', id)}
      hasItemContent={hasItemContent}
      renderItem={renderEducationItem}
      emptyMessage="暂无教育经历，点击上方按钮添加"
      newlyAddedIds={newlyAddedIds}
      deletingIds={deletingIds}
    />
  );
}; 