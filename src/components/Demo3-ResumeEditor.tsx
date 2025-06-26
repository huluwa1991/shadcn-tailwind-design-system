import React, { useState } from 'react';
import {
  Sidebar,
  PageContainer,
  PageHeaderWrapper,
  Typography,
  Input,
  Label,
  Textarea,
  BlockLayout,
  Button,
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
  SelectContainer,
  FileUpload,
  TagsInput,
  CitySelect,
  type CitySelectValue,
  Alert,
  AlertDescription,
  Popconfirm,
  Modal
} from './ui';
import { Plus, Trash2, CheckCircle, Upload } from 'lucide-react';

// 数据类型定义
interface BasicInfo {
  name: string;
  phone: string;
  city: CitySelectValue;
  gender: string;
  hometown: string;
  email: string;
  expectedSalary: string;
  isNameVerified: boolean;
  isPhoneVerified: boolean;
}

interface WorkExperience {
  id: string;
  organization: string;
  startDate: string;
  endDate: string;
  title: string;
  achievements: string[];
  city: CitySelectValue;
  department: string;
  type: string; // 全职/实习/兼职
}

interface ProjectExperience {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate: string;
  achievements: string[];
}

interface Education {
  id: string;
  school: string;
  faculty: string;
  degree: string;
  status: string;
  city: CitySelectValue;
  startDate: string;
  endDate: string;
  achievements: string[];
}

interface Award {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

interface Paper {
  id: string;
  title: string;
  journal: string;
  link: string;
  authorRank: number;
}

interface Repository {
  id: string;
  type: string;
  url: string;
}

interface Patent {
  id: string;
  name: string;
  number: string;
}

interface SocialMedia {
  id: string;
  platform: string;
  account: string;
  link: string;
}

interface InterestSkill {
  interests: string[];
  skills: string[];
}

interface WorkSkill {
  name: string;
  proficiency: string;
  softSkills: string[];
}

interface ResumeData {
  basicInfo: BasicInfo;
  workExperiences: WorkExperience[];
  projectExperiences: ProjectExperience[];
  educations: Education[];
  awards: Award[];
  papers: Paper[];
  repositories: Repository[];
  patents: Patent[];
  socialMedia: SocialMedia[];
  interestSkill: InterestSkill;
  selfEvaluation: string;
  workSkill: WorkSkill;
}

// 初始化数据
const initialResumeData: ResumeData = {
  basicInfo: {
    name: '张三',
    phone: '138****8888',
    city: {},
    gender: '',
    hometown: '',
    email: '',
    expectedSalary: '',
    isNameVerified: true,
    isPhoneVerified: true
  },
  workExperiences: [],
  projectExperiences: [],
  educations: [],
  awards: [],
  papers: [],
  repositories: [],
  patents: [],
  socialMedia: [],
  interestSkill: {
    interests: [],
    skills: []
  },
  selfEvaluation: '',
  workSkill: {
    name: '',
    proficiency: '',
    softSkills: []
  }
};

export const Resume: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showPrivacyAlert, setShowPrivacyAlert] = useState(true);

  // 基本信息更新
  const updateBasicInfo = (field: keyof BasicInfo, value: string | CitySelectValue) => {
    setResumeData(prev => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        [field]: value
      }
    }));
  };

  // 工作经历相关操作
  const addWorkExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      organization: '',
      startDate: '',
      endDate: '',
      title: '',
      achievements: [],
      city: {},
      department: '',
      type: ''
    };
    setResumeData(prev => ({
      ...prev,
      workExperiences: [...prev.workExperiences, newExperience]
    }));
  };

  const updateWorkExperience = (id: string, field: keyof WorkExperience, value: any) => {
    setResumeData(prev => ({
      ...prev,
      workExperiences: prev.workExperiences.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeWorkExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      workExperiences: prev.workExperiences.filter(exp => exp.id !== id)
    }));
  };

  // 项目经历相关操作
  const addProjectExperience = () => {
    const newProject: ProjectExperience = {
      id: Date.now().toString(),
      organization: '',
      role: '',
      startDate: '',
      endDate: '',
      achievements: []
    };
    setResumeData(prev => ({
      ...prev,
      projectExperiences: [...prev.projectExperiences, newProject]
    }));
  };

  const updateProjectExperience = (id: string, field: keyof ProjectExperience, value: any) => {
    setResumeData(prev => ({
      ...prev,
      projectExperiences: prev.projectExperiences.map(proj => 
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    }));
  };

  const removeProjectExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      projectExperiences: prev.projectExperiences.filter(proj => proj.id !== id)
    }));
  };

  // 教育经历相关操作
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      school: '',
      faculty: '',
      degree: '',
      status: '',
      city: {},
      startDate: '',
      endDate: '',
      achievements: []
    };
    setResumeData(prev => ({
      ...prev,
      educations: [...prev.educations, newEducation]
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    setResumeData(prev => ({
      ...prev,
      educations: prev.educations.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      educations: prev.educations.filter(edu => edu.id !== id)
    }));
  };

  // 奖励相关操作
  const addAward = () => {
    const newAward: Award = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: ''
    };
    setResumeData(prev => ({
      ...prev,
      awards: [...prev.awards, newAward]
    }));
  };

  const updateAward = (id: string, field: keyof Award, value: string) => {
    setResumeData(prev => ({
      ...prev,
      awards: prev.awards.map(award => 
        award.id === id ? { ...award, [field]: value } : award
      )
    }));
  };

  const removeAward = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      awards: prev.awards.filter(award => award.id !== id)
    }));
  };

  // 论文相关操作
  const addPaper = () => {
    const newPaper: Paper = {
      id: Date.now().toString(),
      title: '',
      journal: '',
      link: '',
      authorRank: 1
    };
    setResumeData(prev => ({
      ...prev,
      papers: [...prev.papers, newPaper]
    }));
  };

  const updatePaper = (id: string, field: keyof Paper, value: string | number) => {
    setResumeData(prev => ({
      ...prev,
      papers: prev.papers.map(paper => 
        paper.id === id ? { ...paper, [field]: value } : paper
      )
    }));
  };

  const removePaper = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      papers: prev.papers.filter(paper => paper.id !== id)
    }));
  };

  // 代码仓库相关操作
  const addRepository = () => {
    const newRepository: Repository = {
      id: Date.now().toString(),
      type: '',
      url: ''
    };
    setResumeData(prev => ({
      ...prev,
      repositories: [...prev.repositories, newRepository]
    }));
  };

  const updateRepository = (id: string, field: keyof Repository, value: string) => {
    setResumeData(prev => ({
      ...prev,
      repositories: prev.repositories.map(repo => 
        repo.id === id ? { ...repo, [field]: value } : repo
      )
    }));
  };

  const removeRepository = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      repositories: prev.repositories.filter(repo => repo.id !== id)
    }));
  };

  // 专利相关操作
  const addPatent = () => {
    const newPatent: Patent = {
      id: Date.now().toString(),
      name: '',
      number: ''
    };
    setResumeData(prev => ({
      ...prev,
      patents: [...prev.patents, newPatent]
    }));
  };

  const updatePatent = (id: string, field: keyof Patent, value: string) => {
    setResumeData(prev => ({
      ...prev,
      patents: prev.patents.map(patent => 
        patent.id === id ? { ...patent, [field]: value } : patent
      )
    }));
  };

  const removePatent = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      patents: prev.patents.filter(patent => patent.id !== id)
    }));
  };

  // 社交媒体相关操作
  const addSocialMedia = () => {
    const newSocialMedia: SocialMedia = {
      id: Date.now().toString(),
      platform: '',
      account: '',
      link: ''
    };
    setResumeData(prev => ({
      ...prev,
      socialMedia: [...prev.socialMedia, newSocialMedia]
    }));
  };

  const updateSocialMedia = (id: string, field: keyof SocialMedia, value: string) => {
    setResumeData(prev => ({
      ...prev,
      socialMedia: prev.socialMedia.map(social => 
        social.id === id ? { ...social, [field]: value } : social
      )
    }));
  };

  const removeSocialMedia = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      socialMedia: prev.socialMedia.filter(social => social.id !== id)
    }));
  };

  // 兴趣与技能更新
  const updateInterestSkill = (field: keyof InterestSkill, value: string[]) => {
    setResumeData(prev => ({
      ...prev,
      interestSkill: {
        ...prev.interestSkill,
        [field]: value
      }
    }));
  };

  // 工作技能更新
  const updateWorkSkill = (field: keyof WorkSkill, value: string | string[]) => {
    setResumeData(prev => ({
      ...prev,
      workSkill: {
        ...prev.workSkill,
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    console.log('保存简历:', resumeData);
    // 这里可以添加保存逻辑
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

  // 检查工作经历是否有内容
  const hasWorkExperienceContent = (experience: WorkExperience) => {
    const hasContent = !!(experience.organization || experience.title || experience.department || 
           experience.type || experience.achievements.length > 0 || 
           experience.startDate || experience.endDate ||
           (experience.city && (experience.city.province || experience.city.city)));
    console.log('hasWorkExperienceContent:', {
      experience,
      hasContent,
      organization: experience.organization,
      title: experience.title,
      department: experience.department,
      type: experience.type
    });
    return hasContent;
  };

  // 检查项目经历是否有内容
  const hasProjectExperienceContent = (project: ProjectExperience) => {
    return !!(project.organization || project.role || project.startDate || 
           project.endDate || project.achievements.length > 0);
  };

  // 检查教育经历是否有内容
  const hasEducationContent = (education: Education) => {
    return !!(education.school || education.faculty || education.degree || 
           education.status || education.startDate || education.endDate ||
           education.achievements.length > 0 ||
           (education.city && (education.city.province || education.city.city)));
  };

  // 检查奖励是否有内容
  const hasAwardContent = (award: Award) => {
    return !!(award.name || award.issuer || award.date);
  };

  // 检查论文是否有内容
  const hasPaperContent = (paper: Paper) => {
    return !!(paper.title || paper.journal || paper.link || paper.authorRank > 1);
  };

  // 检查代码仓库是否有内容
  const hasRepositoryContent = (repository: Repository) => {
    return !!(repository.type || repository.url);
  };

  // 检查专利是否有内容
  const hasPatentContent = (patent: Patent) => {
    return !!(patent.name || patent.number);
  };

  // 检查社交媒体是否有内容
  const hasSocialMediaContent = (social: SocialMedia) => {
    return !!(social.platform || social.account || social.link);
  };

  // 通用删除按钮组件
  const DeleteButton: React.FC<{
    hasContent: boolean;
    onDelete: () => void;
    itemIndex: number;
  }> = ({ hasContent, onDelete, itemIndex }) => {
    console.log(`DeleteButton - hasContent: ${hasContent}, itemIndex: ${itemIndex}`);
    
    // 用于跟踪Popconfirm的开启状态
    const [popconfirmOpen, setPopconfirmOpen] = useState(false);

    if (hasContent) {
      return (
        <Popconfirm
          description="确认删除本条吗？"
          onConfirm={onDelete}
          confirmText="删除"
          cancelText="取消"
          onOpenChange={setPopconfirmOpen}
        >
          <Button
            variant="ghost"
            size="sm-icon"
            className={`text-red-600 hover:text-red-700 hover:bg-red-50 transition-opacity ${
              popconfirmOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
            tooltip="删除本条记录"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </Popconfirm>
      );
    }

    return (
      <Button
        variant="ghost"
        size="sm-icon"
        onClick={onDelete}
        className="text-red-600 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
        tooltip="删除本条记录"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    );
  };

  // 年月选择组件
  const YearMonthSelector: React.FC<{
    value: string; // 格式: "2025-05"
    onChange: (value: string) => void;
    placeholder?: string;
  }> = ({ value, onChange }) => {
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
      <div className="flex gap-2 w-full">
        <div className="flex-1">
          <SelectContainer width="full">
            <Select value={year} onValueChange={handleYearChange}>
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
            <Select value={month} onValueChange={handleMonthChange}>
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



  return (
    <div className="flex h-screen w-full">
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
            {/* 基本信息 */}
            <div>
              <div className="mb-6">
                <Typography variant="h2">基本信息</Typography>
              </div>
              
              <BlockLayout>
                <div className="space-y-4">
                  {/* 姓名 + 性别 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>姓名</Label>
                      <Input
                        value={resumeData.basicInfo.name}
                        onChange={(e) => updateBasicInfo('name', e.target.value)}
                        placeholder="请输入姓名"
                        disabled={resumeData.basicInfo.isNameVerified} // 已实名认证的不可编辑
                      />
                      {resumeData.basicInfo.isNameVerified && (
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-muted-foreground" />
                          <Typography variant="muted" className="text-xs text-muted-foreground">
                            已实名认证，不可修改
                          </Typography>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label>性别</Label>
                      <SelectContainer width="full">
                        <Select
                          value={resumeData.basicInfo.gender}
                          onValueChange={(value) => updateBasicInfo('gender', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="请选择性别" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="男">男</SelectItem>
                            <SelectItem value="女">女</SelectItem>
                            <SelectItem value="其他">其他</SelectItem>
                            <SelectItem value="不愿透露">不愿透露</SelectItem>
                          </SelectContent>
                        </Select>
                      </SelectContainer>
                    </div>
                  </div>
                  
                  {/* 电话 + 邮箱 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>电话</Label>
                      <Input
                        value={resumeData.basicInfo.phone}
                        onChange={(e) => updateBasicInfo('phone', e.target.value)}
                        placeholder="请输入电话号码"
                        disabled={resumeData.basicInfo.isPhoneVerified} // 已验证的不可编辑
                      />
                      {resumeData.basicInfo.isPhoneVerified && (
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-muted-foreground" />
                          <Typography variant="muted" className="text-xs text-muted-foreground">
                            已验证，不可修改
                          </Typography>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label>邮箱</Label>
                      <Input
                        type="email"
                        value={resumeData.basicInfo.email}
                        onChange={(e) => updateBasicInfo('email', e.target.value)}
                        placeholder="请输入邮箱地址"
                      />
                    </div>
                  </div>
                  
                  {/* 所在城市 + 籍贯 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>所在城市</Label>
                      <CitySelect
                        value={resumeData.basicInfo.city}
                        onValueChange={(value) => updateBasicInfo('city', value)}
                        placeholder="请选择所在城市"
                        width="full"
                        level="city"
                        changeOnSelect={true}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>籍贯</Label>
                      <Input
                        value={resumeData.basicInfo.hometown}
                        onChange={(e) => updateBasicInfo('hometown', e.target.value)}
                        placeholder="请输入籍贯"
                      />
                    </div>
                  </div>
                  
                  {/* 期望薪资 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>期望薪资/月</Label>
                      <Input
                        value={resumeData.basicInfo.expectedSalary}
                        onChange={(e) => updateBasicInfo('expectedSalary', e.target.value)}
                        placeholder="例如：30000; 3万; 20k-40k"
                      />
                    </div>
                    <div></div> {/* 空白占位，让期望薪资只占一半宽度 */}
                  </div>
                </div>
              </BlockLayout>
            </div>

            {/* 经历 */}
            <div>
              <div className="mb-6">
                <Typography variant="h2">经历</Typography>
              </div>
              
              {/* 工作经历 */}
              <div className="mb-10">
                <div className="mb-6 flex items-center justify-between">
                  <Typography variant="h3">工作经历</Typography>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={addWorkExperience}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    添加工作经历
                  </Button>
                </div>
              
              <div className="space-y-6">
                {resumeData.workExperiences.map((experience, index) => (
                  <BlockLayout key={experience.id} className="group">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Typography variant="h3">工作经历 {index + 1}</Typography>
                        <DeleteButton
                          hasContent={hasWorkExperienceContent(experience)}
                          onDelete={() => removeWorkExperience(experience.id)}
                          itemIndex={index}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>工作单位</Label>
                          <Input
                            value={experience.organization}
                            onChange={(e) => updateWorkExperience(experience.id, 'organization', e.target.value)}
                            placeholder="请输入工作单位"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>职称</Label>
                          <Input
                            value={experience.title}
                            onChange={(e) => updateWorkExperience(experience.id, 'title', e.target.value)}
                            placeholder="高级后端工程师"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>开始时间</Label>
                          <YearMonthSelector
                            value={experience.startDate}
                            onChange={(value) => updateWorkExperience(experience.id, 'startDate', value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>结束时间</Label>
                          <YearMonthSelector
                            value={experience.endDate}
                            onChange={(value) => updateWorkExperience(experience.id, 'endDate', value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>城市</Label>
                          <CitySelect
                            value={experience.city}
                            onValueChange={(value) => updateWorkExperience(experience.id, 'city', value)}
                            placeholder="请选择城市"
                            width="full"
                            level="city"
                            changeOnSelect={true}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>部门</Label>
                          <Input
                            value={experience.department}
                            onChange={(e) => updateWorkExperience(experience.id, 'department', e.target.value)}
                            placeholder="例如：Data"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:col-span-2">
                          <div className="space-y-2">
                            <Label>类型</Label>
                            <SelectContainer width="full">
                              <Select
                                value={experience.type}
                                onValueChange={(value) => updateWorkExperience(experience.id, 'type', value)}
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
                          </div>
                          
                          <div className="space-y-2 md:col-span-2">
                            <Label>成果</Label>
                            <TagsInput
                              value={experience.achievements}
                              onChange={(achievements) => updateWorkExperience(experience.id, 'achievements', achievements)}
                              placeholder="例如：写代码、优化系统性能、项目管理等..."
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </BlockLayout>
                ))}
                
                {resumeData.workExperiences.length === 0 && (
                  <BlockLayout>
                    <div className="text-center py-10 text-gray-500">
                      <Typography variant="muted">
                        暂无工作经历，点击上方按钮添加
                      </Typography>
                    </div>
                  </BlockLayout>
                )}
              </div>
              </div>

              {/* 项目经历 */}
              <div className="mb-10">
                <div className="mb-6 flex items-center justify-between">
                  <Typography variant="h3">项目经历</Typography>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={addProjectExperience}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    添加项目经历
                  </Button>
                </div>
              
              <div className="space-y-6">
                {resumeData.projectExperiences.map((project, index) => (
                  <BlockLayout key={project.id} className="group">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Typography variant="h3">项目经历 {index + 1}</Typography>
                        <DeleteButton
                          hasContent={hasProjectExperienceContent(project)}
                          onDelete={() => removeProjectExperience(project.id)}
                          itemIndex={index}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>组织</Label>
                          <Input
                            value={project.organization}
                            onChange={(e) => updateProjectExperience(project.id, 'organization', e.target.value)}
                            placeholder="请输入项目组织"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>角色</Label>
                          <Input
                            value={project.role}
                            onChange={(e) => updateProjectExperience(project.id, 'role', e.target.value)}
                            placeholder="请输入项目角色"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>开始时间</Label>
                          <YearMonthSelector
                            value={project.startDate}
                            onChange={(value) => updateProjectExperience(project.id, 'startDate', value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>结束时间</Label>
                          <YearMonthSelector
                            value={project.endDate}
                            onChange={(value) => updateProjectExperience(project.id, 'endDate', value)}
                          />
                        </div>
                        
                        <div className="space-y-2 md:col-span-2">
                          <Label>成果</Label>
                          <TagsInput
                            value={project.achievements}
                            onChange={(achievements) => updateProjectExperience(project.id, 'achievements', achievements)}
                            placeholder="例如：项目交付、技术创新、团队协作等..."
                          />
                        </div>
                      </div>
                    </div>
                  </BlockLayout>
                ))}
                
                {resumeData.projectExperiences.length === 0 && (
                  <BlockLayout>
                    <div className="text-center py-10 text-gray-500">
                      <Typography variant="muted">
                        暂无项目经历，点击上方按钮添加
                      </Typography>
                    </div>
                  </BlockLayout>
                )}
              </div>
              </div>

              {/* 教育经历 */}
              <div className="mb-10">
                <div className="mb-6 flex items-center justify-between">
                  <Typography variant="h3">教育经历</Typography>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={addEducation}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    添加教育经历
                  </Button>
                </div>
              
              <div className="space-y-6">
                {resumeData.educations.map((education, index) => (
                  <BlockLayout key={education.id} className="group">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Typography variant="h3">教育经历 {index + 1}</Typography>
                        <DeleteButton
                          hasContent={hasEducationContent(education)}
                          onDelete={() => removeEducation(education.id)}
                          itemIndex={index}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>学校</Label>
                          <Input
                            value={education.school}
                            onChange={(e) => updateEducation(education.id, 'school', e.target.value)}
                            placeholder="请输入学校名称"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>院系</Label>
                          <Input
                            value={education.faculty}
                            onChange={(e) => updateEducation(education.id, 'faculty', e.target.value)}
                            placeholder="请输入院系"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>学位层级</Label>
                          <SelectContainer>
                            <Select
                              value={education.degree}
                              onValueChange={(value) => updateEducation(education.id, 'degree', value)}
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
                        </div>
                        
                        <div className="space-y-2">
                          <Label>学位状态</Label>
                          <SelectContainer width="full">
                            <Select
                              value={education.status}
                              onValueChange={(value) => updateEducation(education.id, 'status', value)}
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
                        </div>
                        
                        <div className="space-y-2">
                          <Label>城市</Label>
                          <CitySelect
                            value={education.city}
                            onValueChange={(value) => updateEducation(education.id, 'city', value)}
                            placeholder="请选择学校所在城市"
                            width="full"
                            level="city"
                            changeOnSelect={true}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2">
                          <div className="space-y-2">
                            <Label>开始时间</Label>
                            <YearMonthSelector
                              value={education.startDate}
                              onChange={(value) => updateEducation(education.id, 'startDate', value)}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label>结束时间</Label>
                            <YearMonthSelector
                              value={education.endDate}
                              onChange={(value) => updateEducation(education.id, 'endDate', value)}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2 md:col-span-2">
                          <Label>成果</Label>
                          <TagsInput
                            value={education.achievements}
                            onChange={(achievements) => updateEducation(education.id, 'achievements', achievements)}
                            placeholder="例如：学术研究、获得奖学金、社团活动等..."
                          />
                        </div>
                      </div>
                    </div>
                  </BlockLayout>
                ))}
                
                {resumeData.educations.length === 0 && (
                  <BlockLayout>
                    <div className="text-center py-10 text-gray-500">
                      <Typography variant="muted">
                        暂无教育经历，点击上方按钮添加
                      </Typography>
                    </div>
                  </BlockLayout>
                )}
              </div>
              </div>
            </div>

            {/* 附加资质 */}
            <div className="mb-6">
              <Typography variant="h2">附加资质</Typography>
            </div>

            {/* 奖励 */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <Typography variant="h3">奖励</Typography>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={addAward}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  添加奖励
                </Button>
              </div>
              
              <div className="space-y-6">
                {resumeData.awards.map((award, index) => (
                  <BlockLayout key={award.id} className="group">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Typography variant="h3">奖励 {index + 1}</Typography>
                        <DeleteButton
                          hasContent={hasAwardContent(award)}
                          onDelete={() => removeAward(award.id)}
                          itemIndex={index}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>奖项名称</Label>
                          <Input
                            value={award.name}
                            onChange={(e) => updateAward(award.id, 'name', e.target.value)}
                            placeholder="请输入奖项名称"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>授予单位</Label>
                          <Input
                            value={award.issuer}
                            onChange={(e) => updateAward(award.id, 'issuer', e.target.value)}
                            placeholder="请输入授予单位"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>授予时间</Label>
                          <YearMonthSelector
                            value={award.date}
                            onChange={(value) => updateAward(award.id, 'date', value)}
                          />
                        </div>
                      </div>
                    </div>
                  </BlockLayout>
                ))}
                
                {resumeData.awards.length === 0 && (
                  <BlockLayout>
                    <div className="text-center py-10 text-gray-500">
                      <Typography variant="muted">
                        暂无奖励记录，点击上方按钮添加
                      </Typography>
                    </div>
                  </BlockLayout>
                )}
              </div>
            </div>

            {/* 论文发表 */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <Typography variant="h3">论文发表</Typography>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={addPaper}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  添加论文
                </Button>
              </div>
              
              <div className="space-y-6">
                {resumeData.papers.map((paper, index) => (
                  <BlockLayout key={paper.id} className="group">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Typography variant="h3">论文 {index + 1}</Typography>
                        <DeleteButton
                          hasContent={hasPaperContent(paper)}
                          onDelete={() => removePaper(paper.id)}
                          itemIndex={index}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2 md:col-span-2">
                          <Label>论文名称</Label>
                          <Input
                            value={paper.title}
                            onChange={(e) => updatePaper(paper.id, 'title', e.target.value)}
                            placeholder="请输入论文名称"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>期刊名称</Label>
                          <Input
                            value={paper.journal}
                            onChange={(e) => updatePaper(paper.id, 'journal', e.target.value)}
                            placeholder="请输入期刊名称"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>作者排名</Label>
                          <Input
                            type="number"
                            value={paper.authorRank}
                            onChange={(e) => updatePaper(paper.id, 'authorRank', parseInt(e.target.value) || 1)}
                            placeholder="请输入作者排名"
                            min="1"
                          />
                        </div>
                        
                        <div className="space-y-2 md:col-span-2">
                          <Label>论文链接</Label>
                          <Input
                            value={paper.link}
                            onChange={(e) => updatePaper(paper.id, 'link', e.target.value)}
                            placeholder="请输入论文链接"
                          />
                        </div>
                      </div>
                    </div>
                  </BlockLayout>
                ))}
                
                {resumeData.papers.length === 0 && (
                  <BlockLayout>
                    <div className="text-center py-10 text-gray-500">
                      <Typography variant="muted">
                        暂无论文发表记录，点击上方按钮添加
                      </Typography>
                    </div>
                  </BlockLayout>
                )}
              </div>
            </div>

            {/* 代码仓库 */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <Typography variant="h3">代码仓库</Typography>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={addRepository}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  添加代码仓库
                </Button>
              </div>
              
              <div className="space-y-6">
                {resumeData.repositories.map((repository, index) => (
                  <BlockLayout key={repository.id} className="group">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Typography variant="h3">代码仓库 {index + 1}</Typography>
                        <DeleteButton
                          hasContent={hasRepositoryContent(repository)}
                          onDelete={() => removeRepository(repository.id)}
                          itemIndex={index}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>仓库类型</Label>
                          <SelectContainer width="full">
                            <Select
                              value={repository.type}
                              onValueChange={(value) => updateRepository(repository.id, 'type', value)}
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
                        </div>
                        
                        <div className="space-y-2">
                          <Label>仓库地址</Label>
                          <Input
                            value={repository.url}
                            onChange={(e) => updateRepository(repository.id, 'url', e.target.value)}
                            placeholder="请输入仓库地址"
                          />
                        </div>
                      </div>
                    </div>
                  </BlockLayout>
                ))}
                
                {resumeData.repositories.length === 0 && (
                  <BlockLayout>
                    <div className="text-center py-10 text-gray-500">
                      <Typography variant="muted">
                        暂无代码仓库记录，点击上方按钮添加
                      </Typography>
                    </div>
                  </BlockLayout>
                )}
              </div>
            </div>

            {/* 专利 */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <Typography variant="h3">专利</Typography>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={addPatent}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  添加专利
                </Button>
              </div>
              
              <div className="space-y-6">
                {resumeData.patents.map((patent, index) => (
                  <BlockLayout key={patent.id} className="group">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Typography variant="h3">专利 {index + 1}</Typography>
                        <DeleteButton
                          hasContent={hasPatentContent(patent)}
                          onDelete={() => removePatent(patent.id)}
                          itemIndex={index}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>专利名称</Label>
                          <Input
                            value={patent.name}
                            onChange={(e) => updatePatent(patent.id, 'name', e.target.value)}
                            placeholder="请输入专利名称"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>专利号</Label>
                          <Input
                            value={patent.number}
                            onChange={(e) => updatePatent(patent.id, 'number', e.target.value)}
                            placeholder="请输入专利号"
                          />
                        </div>
                      </div>
                    </div>
                  </BlockLayout>
                ))}
                
                {resumeData.patents.length === 0 && (
                  <BlockLayout>
                    <div className="text-center py-10 text-gray-500">
                      <Typography variant="muted">
                        暂无专利记录，点击上方按钮添加
                      </Typography>
                    </div>
                  </BlockLayout>
                )}
              </div>
            </div>

            {/* 社交媒体 */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <Typography variant="h3">社交媒体</Typography>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={addSocialMedia}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  添加社交媒体
                </Button>
              </div>
              
              <div className="space-y-6">
                {resumeData.socialMedia.map((social, index) => (
                  <BlockLayout key={social.id} className="group">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Typography variant="h3">社交媒体 {index + 1}</Typography>
                        <DeleteButton
                          hasContent={hasSocialMediaContent(social)}
                          onDelete={() => removeSocialMedia(social.id)}
                          itemIndex={index}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>平台</Label>
                          <SelectContainer width="full">
                            <Select
                              value={social.platform}
                              onValueChange={(value) => updateSocialMedia(social.id, 'platform', value)}
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
                        </div>
                        
                        <div className="space-y-2">
                          <Label>账号</Label>
                          <Input
                            value={social.account}
                            onChange={(e) => updateSocialMedia(social.id, 'account', e.target.value)}
                            placeholder="请输入账号"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>链接</Label>
                          <Input
                            value={social.link}
                            onChange={(e) => updateSocialMedia(social.id, 'link', e.target.value)}
                            placeholder="请输入链接"
                          />
                        </div>
                      </div>
                    </div>
                  </BlockLayout>
                ))}
                
                {resumeData.socialMedia.length === 0 && (
                  <BlockLayout>
                    <div className="text-center py-10 text-gray-500">
                      <Typography variant="muted">
                        暂无社交媒体记录，点击上方按钮添加
                      </Typography>
                    </div>
                  </BlockLayout>
                )}
              </div>
            </div>

            {/* 兴趣与技能 */}
            <div>
              <div className="mb-6">
                <Typography variant="h2">兴趣与技能</Typography>
              </div>
              
              <BlockLayout>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>兴趣爱好</Label>
                    <TagsInput
                      value={resumeData.interestSkill.interests}
                      onChange={(interests) => updateInterestSkill('interests', interests)}
                      placeholder="例如：阅读、旅行、摄影、编程..."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>技能</Label>
                    <TagsInput
                      value={resumeData.interestSkill.skills}
                      onChange={(skills) => updateInterestSkill('skills', skills)}
                      placeholder="例如：JavaScript、Python、UI设计..."
                    />
                  </div>
                </div>
              </BlockLayout>
            </div>

            {/* 工作技能 */}
            <div>
              <div className="mb-6">
                <Typography variant="h2">工作技能</Typography>
              </div>
              
              <BlockLayout>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>技能名称</Label>
                      <Input
                        value={resumeData.workSkill.name}
                        onChange={(e) => updateWorkSkill('name', e.target.value)}
                        placeholder="例如：前端开发"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>熟练程度</Label>
                      <SelectContainer width="full">
                        <Select
                          value={resumeData.workSkill.proficiency}
                          onValueChange={(value) => updateWorkSkill('proficiency', value)}
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
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>软技能</Label>
                    <TagsInput
                      value={resumeData.workSkill.softSkills}
                      onChange={(softSkills) => updateWorkSkill('softSkills', softSkills)}
                      placeholder="例如：团队协作、沟通能力、项目管理..."
                    />
                  </div>
                </div>
              </BlockLayout>
            </div>

            {/* 自我评价 */}
            <div>
              <div className="mb-6">
                <Typography variant="h2">自我评价</Typography>
              </div>
              
              <BlockLayout>
                <Textarea
                  value={resumeData.selfEvaluation}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    selfEvaluation: e.target.value
                  }))}
                  placeholder="请输入自我评价..."
                  rows={6}
                />
              </BlockLayout>
            </div>
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

export default Resume; 