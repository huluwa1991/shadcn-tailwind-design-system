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
  Typography
} from '../../../components/ui';
import type { 
  Award, 
  Paper, 
  Repository, 
  Patent, 
  SocialMedia,
  ResumeListKey 
} from '../types';
import { DynamicListSection, YearMonthSelector } from '../components';

interface QualificationsSectionProps {
  awards: Award[];
  papers: Paper[];
  repositories: Repository[];
  patents: Patent[];
  socialMedia: SocialMedia[];
  onAdd: (listKey: ResumeListKey, itemType: any) => void;
  onUpdate: (listKey: ResumeListKey, id: string, field: string, value: any) => void;
  onRemove: (listKey: ResumeListKey, id: string) => void;
  hasItemContent: (item: any) => boolean;
  newlyAddedIds?: Set<string>;
  deletingIds?: Set<string>;
}

export const QualificationsSection: React.FC<QualificationsSectionProps> = ({
  awards,
  papers,
  repositories,
  patents,
  socialMedia,
  onAdd,
  onUpdate,
  onRemove,
  hasItemContent,
  newlyAddedIds,
  deletingIds
}) => {
  // 奖励渲染函数
  const renderAwardItem = (item: Award, _index: number) => (
    <FormRow columns={3}>
      <FormItem>
        <FormLabel>奖项名称</FormLabel>
        <Input
          value={item.name}
          onChange={(e) => onUpdate('awards', item.id, 'name', e.target.value)}
          placeholder="请输入奖项名称"
        />
      </FormItem>
      
      <FormItem>
        <FormLabel>授予单位</FormLabel>
        <Input
          value={item.issuer}
          onChange={(e) => onUpdate('awards', item.id, 'issuer', e.target.value)}
          placeholder="请输入授予单位"
        />
      </FormItem>
      
      <FormItem>
        <FormLabel>授予时间</FormLabel>
        <YearMonthSelector
          value={item.date}
          onChange={(value) => onUpdate('awards', item.id, 'date', value)}
        />
      </FormItem>
    </FormRow>
  );

  // 论文渲染函数
  const renderPaperItem = (item: Paper, _index: number) => (
    <div className="space-y-4">
      <FormRow columns={1}>
        <FormItem>
          <FormLabel>论文名称</FormLabel>
          <Input
            value={item.title}
            onChange={(e) => onUpdate('papers', item.id, 'title', e.target.value)}
            placeholder="请输入论文名称"
          />
        </FormItem>
      </FormRow>
      
      <FormRow columns={2}>
        <FormItem>
          <FormLabel>期刊名称</FormLabel>
          <Input
            value={item.journal}
            onChange={(e) => onUpdate('papers', item.id, 'journal', e.target.value)}
            placeholder="请输入期刊名称"
          />
        </FormItem>
        
        <FormItem>
          <FormLabel>作者排名</FormLabel>
          <Input
            type="number"
            value={item.authorRank}
            onChange={(e) => onUpdate('papers', item.id, 'authorRank', parseInt(e.target.value) || 1)}
            placeholder="请输入作者排名"
            min="1"
          />
        </FormItem>
      </FormRow>
      
      <FormRow columns={1}>
        <FormItem>
          <FormLabel>论文链接</FormLabel>
          <Input
            value={item.link}
            onChange={(e) => onUpdate('papers', item.id, 'link', e.target.value)}
            placeholder="请输入论文链接"
          />
        </FormItem>
      </FormRow>
    </div>
  );

  // 代码仓库渲染函数
  const renderRepositoryItem = (item: Repository, _index: number) => (
    <FormRow columns={2}>
      <FormItem>
        <FormLabel>仓库类型</FormLabel>
        <SelectContainer width="full">
          <Select
            value={item.type}
            onValueChange={(value) => onUpdate('repositories', item.id, 'type', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="请选择仓库类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="github">GitHub</SelectItem>
              <SelectItem value="gitlab">GitLab</SelectItem>
              <SelectItem value="gitee">Gitee</SelectItem>
              <SelectItem value="bitbucket">Bitbucket</SelectItem>
              <SelectItem value="other">其他</SelectItem>
            </SelectContent>
          </Select>
        </SelectContainer>
      </FormItem>
      
      <FormItem>
        <FormLabel>仓库地址</FormLabel>
        <Input
          value={item.url}
          onChange={(e) => onUpdate('repositories', item.id, 'url', e.target.value)}
          placeholder="请输入仓库地址"
        />
      </FormItem>
    </FormRow>
  );

  // 专利渲染函数
  const renderPatentItem = (item: Patent, _index: number) => (
    <FormRow columns={2}>
      <FormItem>
        <FormLabel>专利名称</FormLabel>
        <Input
          value={item.name}
          onChange={(e) => onUpdate('patents', item.id, 'name', e.target.value)}
          placeholder="请输入专利名称"
        />
      </FormItem>
      
      <FormItem>
        <FormLabel>专利号</FormLabel>
        <Input
          value={item.number}
          onChange={(e) => onUpdate('patents', item.id, 'number', e.target.value)}
          placeholder="请输入专利号"
        />
      </FormItem>
    </FormRow>
  );

  // 社交媒体渲染函数
  const renderSocialMediaItem = (item: SocialMedia, _index: number) => (
    <FormRow columns={3}>
      <FormItem>
        <FormLabel>平台</FormLabel>
        <SelectContainer width="full">
          <Select
            value={item.platform}
            onValueChange={(value) => onUpdate('socialMedia', item.id, 'platform', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="请选择平台" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="微信">微信</SelectItem>
              <SelectItem value="微博">微博</SelectItem>
              <SelectItem value="LinkedIn">LinkedIn</SelectItem>
              <SelectItem value="Twitter">Twitter</SelectItem>
              <SelectItem value="Facebook">Facebook</SelectItem>
              <SelectItem value="Instagram">Instagram</SelectItem>
              <SelectItem value="知乎">知乎</SelectItem>
              <SelectItem value="其他">其他</SelectItem>
            </SelectContent>
          </Select>
        </SelectContainer>
      </FormItem>
      
      <FormItem>
        <FormLabel>账号</FormLabel>
        <Input
          value={item.account}
          onChange={(e) => onUpdate('socialMedia', item.id, 'account', e.target.value)}
          placeholder="请输入账号"
        />
      </FormItem>
      
      <FormItem>
        <FormLabel>链接</FormLabel>
        <Input
          value={item.link}
          onChange={(e) => onUpdate('socialMedia', item.id, 'link', e.target.value)}
          placeholder="请输入链接"
        />
      </FormItem>
    </FormRow>
  );

  return (
    <div>
      <div className="mb-6">
        <Typography variant="h2">附加资质</Typography>
      </div>

      <div className="space-y-10">
        {/* 奖励 */}
        <DynamicListSection
          title="奖励"
          items={awards}
          onAdd={() => onAdd('awards', 'award')}
          onRemove={(id) => onRemove('awards', id)}
          hasItemContent={hasItemContent}
          renderItem={renderAwardItem}
          emptyMessage="暂无奖励记录，点击上方按钮添加"
          newlyAddedIds={newlyAddedIds}
          deletingIds={deletingIds}
        />

        {/* 论文发表 */}
        <DynamicListSection
          title="论文发表"
          items={papers}
          onAdd={() => onAdd('papers', 'paper')}
          onRemove={(id) => onRemove('papers', id)}
          hasItemContent={hasItemContent}
          renderItem={renderPaperItem}
          emptyMessage="暂无论文发表记录，点击上方按钮添加"
          newlyAddedIds={newlyAddedIds}
          deletingIds={deletingIds}
        />

        {/* 代码仓库 */}
        <DynamicListSection
          title="代码仓库"
          items={repositories}
          onAdd={() => onAdd('repositories', 'repository')}
          onRemove={(id) => onRemove('repositories', id)}
          hasItemContent={hasItemContent}
          renderItem={renderRepositoryItem}
          emptyMessage="暂无代码仓库记录，点击上方按钮添加"
          newlyAddedIds={newlyAddedIds}
          deletingIds={deletingIds}
        />

        {/* 专利 */}
        <DynamicListSection
          title="专利"
          items={patents}
          onAdd={() => onAdd('patents', 'patent')}
          onRemove={(id) => onRemove('patents', id)}
          hasItemContent={hasItemContent}
          renderItem={renderPatentItem}
          emptyMessage="暂无专利记录，点击上方按钮添加"
          newlyAddedIds={newlyAddedIds}
          deletingIds={deletingIds}
        />

        {/* 社交媒体 */}
        <DynamicListSection
          title="社交媒体"
          items={socialMedia}
          onAdd={() => onAdd('socialMedia', 'socialMedia')}
          onRemove={(id) => onRemove('socialMedia', id)}
          hasItemContent={hasItemContent}
          renderItem={renderSocialMediaItem}
          emptyMessage="暂无社交媒体记录，点击上方按钮添加"
          newlyAddedIds={newlyAddedIds}
          deletingIds={deletingIds}
        />
      </div>
    </div>
  );
}; 