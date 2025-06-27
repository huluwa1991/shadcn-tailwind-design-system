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
  TagsInput
} from '../../../components/ui';
import type { InterestSkill, WorkSkill } from '../types';
import { ResumeFormSection } from '../components';

interface SkillsSectionProps {
  interestSkillData: InterestSkill;
  workSkillData: WorkSkill;
  onUpdateInterestSkill: (field: keyof InterestSkill, value: string[]) => void;
  onUpdateWorkSkill: (field: keyof WorkSkill, value: string | string[]) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  interestSkillData,
  workSkillData,
  onUpdateInterestSkill,
  onUpdateWorkSkill
}) => {
  return (
    <div className="space-y-10">
      {/* 兴趣与技能 */}
      <ResumeFormSection title="兴趣与技能">
        <FormRow columns={1} spacing="lg">
          <FormItem>
            <FormLabel>兴趣爱好</FormLabel>
            <TagsInput
              value={interestSkillData.interests}
              onChange={(interests) => onUpdateInterestSkill('interests', interests)}
              placeholder="例如：阅读、旅行、摄影、编程..."
            />
          </FormItem>
          
          <FormItem>
            <FormLabel>技能</FormLabel>
            <TagsInput
              value={interestSkillData.skills}
              onChange={(skills) => onUpdateInterestSkill('skills', skills)}
              placeholder="例如：JavaScript、Python、UI设计..."
            />
          </FormItem>
        </FormRow>
      </ResumeFormSection>

      {/* 工作技能 */}
      <ResumeFormSection title="工作技能">
        <FormRow columns={2}>
          <FormItem>
            <FormLabel>技能名称</FormLabel>
            <Input
              value={workSkillData.name}
              onChange={(e) => onUpdateWorkSkill('name', e.target.value)}
              placeholder="例如：前端开发"
            />
          </FormItem>
          
          <FormItem>
            <FormLabel>熟练程度</FormLabel>
            <SelectContainer width="full">
              <Select
                value={workSkillData.proficiency}
                onValueChange={(value) => onUpdateWorkSkill('proficiency', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="请选择熟练程度" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="初级">初级</SelectItem>
                  <SelectItem value="中级">中级</SelectItem>
                  <SelectItem value="高级">高级</SelectItem>
                  <SelectItem value="专家">专家</SelectItem>
                </SelectContent>
              </Select>
            </SelectContainer>
          </FormItem>
        </FormRow>
        
        <FormRow columns={1}>
          <FormItem>
            <FormLabel>软技能</FormLabel>
            <TagsInput
              value={workSkillData.softSkills}
              onChange={(softSkills) => onUpdateWorkSkill('softSkills', softSkills)}
              placeholder="例如：团队协作、沟通能力、项目管理..."
            />
          </FormItem>
        </FormRow>
      </ResumeFormSection>
    </div>
  );
}; 