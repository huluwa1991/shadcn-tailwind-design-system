import React from 'react';
import {
  FormRow,
  FormItem,
  FormLabel,
  Input,
  TagsInput
} from '../../../components/ui';
import type { ProjectExperience, ResumeListKey } from '../types';
import { DynamicListSection, YearMonthSelector } from '../components';

interface ProjectExperienceSectionProps {
  items: ProjectExperience[];
  onAdd: (listKey: ResumeListKey, itemType: 'projectExperience') => void;
  onUpdate: (listKey: ResumeListKey, id: string, field: string, value: any) => void;
  onRemove: (listKey: ResumeListKey, id: string) => void;
  hasItemContent: (item: ProjectExperience) => boolean;
  newlyAddedIds?: Set<string>;
  deletingIds?: Set<string>;
}

export const ProjectExperienceSection: React.FC<ProjectExperienceSectionProps> = ({
  items,
  onAdd,
  onUpdate,
  onRemove,
  hasItemContent,
  newlyAddedIds,
  deletingIds
}) => {
  const renderProjectExperienceItem = (item: ProjectExperience, _index: number) => (
    <div className="space-y-4">
      {/* 第一行：组织 + 角色 */}
      <FormRow columns={2}>
        <FormItem>
          <FormLabel>组织</FormLabel>
          <Input
            value={item.organization}
            onChange={(e) => onUpdate('projectExperiences', item.id, 'organization', e.target.value)}
            placeholder="请输入项目组织"
          />
        </FormItem>
        
        <FormItem>
          <FormLabel>角色</FormLabel>
          <Input
            value={item.role}
            onChange={(e) => onUpdate('projectExperiences', item.id, 'role', e.target.value)}
            placeholder="请输入项目角色"
          />
        </FormItem>
      </FormRow>
      
      {/* 第二行：开始时间 + 结束时间 */}
      <FormRow columns={2}>
        <FormItem>
          <FormLabel>开始时间</FormLabel>
          <YearMonthSelector
            value={item.startDate}
            onChange={(value) => onUpdate('projectExperiences', item.id, 'startDate', value)}
          />
        </FormItem>
        
        <FormItem>
          <FormLabel>结束时间</FormLabel>
          <YearMonthSelector
            value={item.endDate}
            onChange={(value) => onUpdate('projectExperiences', item.id, 'endDate', value)}
          />
        </FormItem>
      </FormRow>
      
      {/* 第三行：成果 (全宽) */}
      <FormRow columns={1}>
        <FormItem>
          <FormLabel>成果</FormLabel>
          <TagsInput
            value={item.achievements}
            onChange={(achievements) => onUpdate('projectExperiences', item.id, 'achievements', achievements)}
            placeholder="例如：项目交付、技术创新、团队协作等..."
          />
        </FormItem>
      </FormRow>
    </div>
  );

  return (
    <DynamicListSection
      title="项目经历"
      items={items}
      onAdd={() => onAdd('projectExperiences', 'projectExperience')}
      onRemove={(id) => onRemove('projectExperiences', id)}
      hasItemContent={hasItemContent}
      renderItem={renderProjectExperienceItem}
      emptyMessage="暂无项目经历，点击上方按钮添加"
      newlyAddedIds={newlyAddedIds}
      deletingIds={deletingIds}
    />
  );
}; 