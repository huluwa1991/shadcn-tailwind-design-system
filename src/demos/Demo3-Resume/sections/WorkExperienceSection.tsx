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
import type { WorkExperience, ResumeListKey } from '../types';
import { DynamicListSection, YearMonthSelector } from '../components';

interface WorkExperienceSectionProps {
  items: WorkExperience[];
  onAdd: (listKey: ResumeListKey, itemType: 'workExperience') => void;
  onUpdate: (listKey: ResumeListKey, id: string, field: string, value: any) => void;
  onRemove: (listKey: ResumeListKey, id: string) => void;
  hasItemContent: (item: WorkExperience) => boolean;
  newlyAddedIds?: Set<string>;
  deletingIds?: Set<string>;
}

export const WorkExperienceSection: React.FC<WorkExperienceSectionProps> = ({
  items,
  onAdd,
  onUpdate,
  onRemove,
  hasItemContent,
  newlyAddedIds,
  deletingIds
}) => {
  const renderWorkExperienceItem = (item: WorkExperience, _index: number) => (
    <div className="space-y-4">
      {/* 第一行：工作单位 + 职称 */}
      <FormRow columns={2}>
        <FormItem>
          <FormLabel>工作单位</FormLabel>
          <Input
            value={item.organization}
            onChange={(e) => onUpdate('workExperiences', item.id, 'organization', e.target.value)}
            placeholder="请输入工作单位"
          />
        </FormItem>
        
        <FormItem>
          <FormLabel>职称</FormLabel>
          <Input
            value={item.title}
            onChange={(e) => onUpdate('workExperiences', item.id, 'title', e.target.value)}
            placeholder="高级后端工程师"
          />
        </FormItem>
      </FormRow>
      
      {/* 第二行：开始时间 + 结束时间 */}
      <FormRow columns={2}>
        <FormItem>
          <FormLabel>开始时间</FormLabel>
          <YearMonthSelector
            value={item.startDate}
            onChange={(value) => onUpdate('workExperiences', item.id, 'startDate', value)}
          />
        </FormItem>
        
        <FormItem>
          <FormLabel>结束时间</FormLabel>
          <YearMonthSelector
            value={item.endDate}
            onChange={(value) => onUpdate('workExperiences', item.id, 'endDate', value)}
          />
        </FormItem>
      </FormRow>
      
      {/* 第三行：城市 + 部门 */}
      <FormRow columns={2}>
        <FormItem>
          <FormLabel>城市</FormLabel>
          <CitySelect
            value={item.city}
            onValueChange={(value) => onUpdate('workExperiences', item.id, 'city', value)}
            placeholder="请选择城市"
            width="full"
            level="city"
            changeOnSelect={true}
          />
        </FormItem>
        
        <FormItem>
          <FormLabel>部门</FormLabel>
          <Input
            value={item.department}
            onChange={(e) => onUpdate('workExperiences', item.id, 'department', e.target.value)}
            placeholder="例如：Data"
          />
        </FormItem>
      </FormRow>
      
      {/* 第四行：类型 + 成果 (1:3 比例) */}
      <FormRow columns={4}>
        <FormItem span={1}>
          <FormLabel>类型</FormLabel>
          <SelectContainer width="full">
            <Select
              value={item.type}
              onValueChange={(value) => onUpdate('workExperiences', item.id, 'type', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="请选择工作类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="全职">全职</SelectItem>
                <SelectItem value="实习">实习</SelectItem>
                <SelectItem value="兼职">兼职</SelectItem>
              </SelectContent>
            </Select>
          </SelectContainer>
        </FormItem>
        
        <FormItem span={3}>
          <FormLabel>成果</FormLabel>
          <TagsInput
            value={item.achievements}
            onChange={(achievements) => onUpdate('workExperiences', item.id, 'achievements', achievements)}
            placeholder="例如：写代码、优化系统性能、项目管理等..."
          />
        </FormItem>
      </FormRow>
    </div>
  );

  return (
    <DynamicListSection
      title="工作经历"
      items={items}
      onAdd={() => onAdd('workExperiences', 'workExperience')}
      onRemove={(id) => onRemove('workExperiences', id)}
      hasItemContent={hasItemContent}
      renderItem={renderWorkExperienceItem}
      emptyMessage="暂无工作经历，点击上方按钮添加"
      newlyAddedIds={newlyAddedIds}
      deletingIds={deletingIds}
    />
  );
}; 