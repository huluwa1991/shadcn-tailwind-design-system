import React, { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import {
  Sidebar,
  PageContainer,
  PageHeaderWrapper,
  Typography,
  Button,
  Alert,
  AlertDescription,
  Popconfirm,
  Modal,
  FileUpload,
  Textarea
} from '../../components/ui';

// 导入简历相关组件
import { useResumeData } from './hooks/useResumeData';
import { initialResumeData } from './types';
import { BasicInfoSection } from './sections/BasicInfoSection';
import { WorkExperienceSection } from './sections/WorkExperienceSection';
import { ProjectExperienceSection } from './sections/ProjectExperienceSection';
import { EducationSection } from './sections/EducationSection';
import { QualificationsSection } from './sections/QualificationsSection';
import { SkillsSection } from './sections/SkillsSection';
import { ResumeFormSection } from './components';

export const Demo3Resume: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showPrivacyAlert, setShowPrivacyAlert] = useState(true);

  // 隐藏body滚动条，防止双滚动条
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // 使用简历数据管理 hook
  const {
    resumeData,
    newlyAddedIds,
    deletingIds,
    updateBasicInfo,
    addItem,
    updateItem,
    removeItem,
    hasItemContent,
    updateInterestSkill,
    updateWorkSkill,
    updateSelfEvaluation,
    saveResumeData
  } = useResumeData(initialResumeData);

  const handleSave = () => {
    saveResumeData();
    // 这里可以添加保存成功提示
  };

  const handleUploadResume = (file: File | null) => {
    if (file) {
      console.log('上传简历文件:', file);
      setShowUploadDialog(false);
      // 这里可以添加文件上传和解析逻辑
    }
  };

  const handleConfirmUpload = () => {
    setShowUploadDialog(true);
  };

  return (
    <div className="flex h-screen w-full bg-sidebar">
      {/* 侧边栏区域 */}
      <div>
        <Sidebar 
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
        />
      </div>
      
      {/* 主内容区域 */}
      <PageContainer variant="centered">
        {/* 页面头部 */}
        <PageHeaderWrapper
          variant="title-with-actions"
          title="我的简历"
          actions={
            <div className="flex gap-2">
              <Popconfirm
                description="新简历将会覆盖当前所有内容，继续吗？"
                onConfirm={handleConfirmUpload}
                confirmText="继续上传"
                cancelText="取消"
              >
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  上传新简历
                </Button>
              </Popconfirm>
              <Button onClick={handleSave}>
                保存
              </Button>
            </div>
          }
        />

        {/* 描述信息 */}
        {showPrivacyAlert && (
          <div className="mb-6">
            <Alert 
              variant="info" 
              showIcon 
              closable 
              onClose={() => setShowPrivacyAlert(false)}
            >
              <AlertDescription>
                你的工作经历和学历将被用于匹配合适的项目，你的基本信息将不会被泄漏。
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* 简历内容区域 */}
        <div className="space-y-10">
          {/* 基本信息区块 */}
          <BasicInfoSection
            data={resumeData.basicInfo}
            onUpdate={updateBasicInfo}
          />

          {/* 经历部分 */}
          <div>
            <div className="mb-6">
              <Typography variant="h2">经历</Typography>
            </div>
            
            {/* 工作经历区块 */}
            <WorkExperienceSection
              items={resumeData.workExperiences}
              onAdd={addItem}
              onUpdate={updateItem}
              onRemove={removeItem}
              hasItemContent={hasItemContent}
              newlyAddedIds={newlyAddedIds}
              deletingIds={deletingIds}
            />

            {/* 项目经历区块 */}
            <ProjectExperienceSection
              items={resumeData.projectExperiences}
              onAdd={addItem}
              onUpdate={updateItem}
              onRemove={removeItem}
              hasItemContent={hasItemContent}
              newlyAddedIds={newlyAddedIds}
              deletingIds={deletingIds}
            />

            {/* 教育经历区块 */}
            <EducationSection
              items={resumeData.educations}
              onAdd={addItem}
              onUpdate={updateItem}
              onRemove={removeItem}
              hasItemContent={hasItemContent}
              newlyAddedIds={newlyAddedIds}
              deletingIds={deletingIds}
            />
          </div>

          {/* 附加资质区块 */}
          <QualificationsSection
            awards={resumeData.awards}
            papers={resumeData.papers}
            repositories={resumeData.repositories}
            patents={resumeData.patents}
            socialMedia={resumeData.socialMedia}
            onAdd={addItem}
            onUpdate={updateItem}
            onRemove={removeItem}
            hasItemContent={hasItemContent}
            newlyAddedIds={newlyAddedIds}
            deletingIds={deletingIds}
          />

          {/* 技能相关区块 */}
          <SkillsSection
            interestSkillData={resumeData.interestSkill}
            workSkillData={resumeData.workSkill}
            onUpdateInterestSkill={updateInterestSkill}
            onUpdateWorkSkill={updateWorkSkill}
          />

          {/* 自我评价区块 */}
          <ResumeFormSection title="自我评价">
            <Textarea
              value={resumeData.selfEvaluation}
              onChange={(e) => updateSelfEvaluation(e.target.value)}
              placeholder="请输入自我评价..."
              rows={6}
            />
          </ResumeFormSection>
        </div>
      </PageContainer>

      {/* 上传简历对话框 */}
      <Modal 
        open={showUploadDialog} 
        onOpenChange={setShowUploadDialog}
        title="上传简历"
        size="sm"
      >
        <FileUpload
          variant="dropzone"
          accept=".pdf"
          maxSize={20 * 1024 * 1024} // 20MB
          placeholder="拖拽简历文件到此处或点击上传"
          onFileSelect={handleUploadResume}
        />
      </Modal>
    </div>
  );
}; 