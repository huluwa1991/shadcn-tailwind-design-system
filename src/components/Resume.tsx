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
  Badge
} from './ui';
import { Plus, Trash2, Upload } from 'lucide-react';

// 数据类型定义
interface BasicInfo {
  name: string;
  phone: string;
  city: string;
  gender: string;
  hometown: string;
  email: string;
  expectedSalary: string;
}

interface WorkExperience {
  id: string;
  organization: string;
  startDate: string;
  endDate: string;
  title: string;
  achievements: string[];
  city: string;
  department: string;
  supervisor: string;
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
  city: string;
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
    name: '',
    phone: '',
    city: '',
    gender: '',
    hometown: '',
    email: '',
    expectedSalary: ''
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
  const [isEditable] = useState(true);
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  // 基本信息更新
  const updateBasicInfo = (field: keyof BasicInfo, value: string) => {
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
      city: '',
      department: '',
      supervisor: ''
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
      city: '',
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

  // 成果标签操作
  const addAchievement = (type: 'work' | 'project' | 'education', id: string, achievement: string) => {
    if (!achievement.trim()) return;
    
    if (type === 'work') {
      updateWorkExperience(id, 'achievements', [
        ...resumeData.workExperiences.find(exp => exp.id === id)?.achievements || [],
        achievement
      ]);
    } else if (type === 'project') {
      updateProjectExperience(id, 'achievements', [
        ...resumeData.projectExperiences.find(proj => proj.id === id)?.achievements || [],
        achievement
      ]);
    } else if (type === 'education') {
      updateEducation(id, 'achievements', [
        ...resumeData.educations.find(edu => edu.id === id)?.achievements || [],
        achievement
      ]);
    }
  };

  const removeAchievement = (type: 'work' | 'project' | 'education', id: string, index: number) => {
    if (type === 'work') {
      const achievements = resumeData.workExperiences.find(exp => exp.id === id)?.achievements || [];
      updateWorkExperience(id, 'achievements', achievements.filter((_, i) => i !== index));
    } else if (type === 'project') {
      const achievements = resumeData.projectExperiences.find(proj => proj.id === id)?.achievements || [];
      updateProjectExperience(id, 'achievements', achievements.filter((_, i) => i !== index));
    } else if (type === 'education') {
      const achievements = resumeData.educations.find(edu => edu.id === id)?.achievements || [];
      updateEducation(id, 'achievements', achievements.filter((_, i) => i !== index));
    }
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

  // 成果输入组件
  const AchievementInput: React.FC<{
    achievements: string[];
    onAdd: (achievement: string) => void;
    onRemove: (index: number) => void;
    placeholder?: string;
  }> = ({ achievements, onAdd, onRemove, placeholder = "添加成果..." }) => {
    const [inputValue, setInputValue] = useState('');

    const handleAdd = () => {
      if (inputValue.trim()) {
        onAdd(inputValue.trim());
        setInputValue('');
      }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAdd();
      }
    };

    return (
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="flex-1"
          />
          <Button 
            type="button" 
            size="sm" 
            onClick={handleAdd}
            disabled={!inputValue.trim()}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {achievements.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {achievements.map((achievement, index) => (
              <Badge 
                key={index} 
                variant="muted" 
                className="cursor-pointer group"
                onClick={() => onRemove(index)}
              >
                {achievement}
                <Trash2 className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Badge>
            ))}
          </div>
        )}
      </div>
    );
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
      <div className="flex-1 p-2">
        <PageContainer variant="centered">
          {/* 页面头部 */}
          <PageHeaderWrapper
            variant="title-with-actions"
            title="我的简历：个人简历"
            actions={
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowUploadDialog(true)}
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  上传新的简历
                </Button>
                <Button onClick={handleSave}>
                  保存
                </Button>
              </div>
            }
          />

          {/* 描述信息 */}
          <div className="mb-6">
            <Typography variant="muted">
              你的工作经历和学历将被用于匹配合适的项目，你的基本信息将不会被泄漏。
            </Typography>
          </div>

          {/* 简历内容区域 */}
          <div className="space-y-8">
            {/* 基本信息 */}
            <div>
              <div className="mb-6">
                <Typography variant="h2">基本信息</Typography>
              </div>
              
              <BlockLayout>
                <div className="space-y-4">
                  {/* 姓名 + 性别 + 期望薪资 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>姓名</Label>
                      <Input
                        value={resumeData.basicInfo.name}
                        onChange={(e) => updateBasicInfo('name', e.target.value)}
                        placeholder="请输入姓名"
                        disabled={!isEditable} // 已实名认证的不可编辑
                      />
                      {!isEditable && (
                        <Typography variant="muted" className="text-xs">
                          已实名认证，不可修改
                        </Typography>
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
                    
                    <div className="space-y-2">
                      <Label>期望薪资/月</Label>
                      <Input
                        value={resumeData.basicInfo.expectedSalary}
                        onChange={(e) => updateBasicInfo('expectedSalary', e.target.value)}
                        placeholder="例如：30000; 3万; 20k-40k"
                      />
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
                        disabled={!isEditable} // 已验证的不可编辑
                      />
                      {!isEditable && (
                        <Typography variant="muted" className="text-xs">
                          已验证，不可修改
                        </Typography>
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
                      <Input
                        value={resumeData.basicInfo.city}
                        onChange={(e) => updateBasicInfo('city', e.target.value)}
                        placeholder="请输入所在城市"
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
                </div>
              </BlockLayout>
            </div>

            {/* 工作经历 */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <Typography variant="h2">工作经历</Typography>
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
                  <BlockLayout key={experience.id}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Typography variant="h3">工作经历 {index + 1}</Typography>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeWorkExperience(experience.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>工作单位 *</Label>
                          <Input
                            value={experience.organization}
                            onChange={(e) => updateWorkExperience(experience.id, 'organization', e.target.value)}
                            placeholder="请输入工作单位"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>职称 *</Label>
                          <Input
                            value={experience.title}
                            onChange={(e) => updateWorkExperience(experience.id, 'title', e.target.value)}
                            placeholder="请输入职称"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>开始时间</Label>
                          <Input
                            type="month"
                            value={experience.startDate}
                            onChange={(e) => updateWorkExperience(experience.id, 'startDate', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>结束时间</Label>
                          <Input
                            type="month"
                            value={experience.endDate}
                            onChange={(e) => updateWorkExperience(experience.id, 'endDate', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>城市</Label>
                          <Input
                            value={experience.city}
                            onChange={(e) => updateWorkExperience(experience.id, 'city', e.target.value)}
                            placeholder="请输入工作城市"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>部门</Label>
                          <Input
                            value={experience.department}
                            onChange={(e) => updateWorkExperience(experience.id, 'department', e.target.value)}
                            placeholder="请输入部门"
                          />
                        </div>
                        
                        <div className="space-y-2 md:col-span-2">
                          <Label>主管</Label>
                          <Input
                            value={experience.supervisor}
                            onChange={(e) => updateWorkExperience(experience.id, 'supervisor', e.target.value)}
                            placeholder="请输入主管姓名"
                          />
                        </div>
                        
                        <div className="space-y-2 md:col-span-2">
                          <Label>成果</Label>
                          <AchievementInput
                            achievements={experience.achievements}
                            onAdd={(achievement) => addAchievement('work', experience.id, achievement)}
                            onRemove={(index) => removeAchievement('work', experience.id, index)}
                            placeholder="添加工作成果..."
                          />
                        </div>
                      </div>
                    </div>
                  </BlockLayout>
                ))}
                
                {resumeData.workExperiences.length === 0 && (
                  <BlockLayout>
                    <div className="text-center py-8 text-gray-500">
                      <Typography variant="muted">
                        暂无工作经历，点击上方按钮添加
                      </Typography>
                    </div>
                  </BlockLayout>
                )}
              </div>
            </div>

            {/* 项目经历 */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <Typography variant="h2">项目经历</Typography>
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
                  <BlockLayout key={project.id}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Typography variant="h3">项目经历 {index + 1}</Typography>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeProjectExperience(project.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>组织 *</Label>
                          <Input
                            value={project.organization}
                            onChange={(e) => updateProjectExperience(project.id, 'organization', e.target.value)}
                            placeholder="请输入项目组织"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>角色 *</Label>
                          <Input
                            value={project.role}
                            onChange={(e) => updateProjectExperience(project.id, 'role', e.target.value)}
                            placeholder="请输入项目角色"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>开始时间</Label>
                          <Input
                            type="month"
                            value={project.startDate}
                            onChange={(e) => updateProjectExperience(project.id, 'startDate', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>结束时间</Label>
                          <Input
                            type="month"
                            value={project.endDate}
                            onChange={(e) => updateProjectExperience(project.id, 'endDate', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2 md:col-span-2">
                          <Label>成果</Label>
                          <AchievementInput
                            achievements={project.achievements}
                            onAdd={(achievement) => addAchievement('project', project.id, achievement)}
                            onRemove={(index) => removeAchievement('project', project.id, index)}
                            placeholder="添加项目成果..."
                          />
                        </div>
                      </div>
                    </div>
                  </BlockLayout>
                ))}
                
                {resumeData.projectExperiences.length === 0 && (
                  <BlockLayout>
                    <div className="text-center py-8 text-gray-500">
                      <Typography variant="muted">
                        暂无项目经历，点击上方按钮添加
                      </Typography>
                    </div>
                  </BlockLayout>
                )}
              </div>
            </div>

            {/* 教育经历 */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <Typography variant="h2">教育经历</Typography>
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
                  <BlockLayout key={education.id}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Typography variant="h3">教育经历 {index + 1}</Typography>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeEducation(education.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>学校 *</Label>
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
                          <Input
                            value={education.status}
                            onChange={(e) => updateEducation(education.id, 'status', e.target.value)}
                            placeholder="如：毕业/在读/肄业"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>城市</Label>
                          <Input
                            value={education.city}
                            onChange={(e) => updateEducation(education.id, 'city', e.target.value)}
                            placeholder="请输入学校所在城市"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>开始时间</Label>
                          <Input
                            type="month"
                            value={education.startDate}
                            onChange={(e) => updateEducation(education.id, 'startDate', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>结束时间</Label>
                          <Input
                            type="month"
                            value={education.endDate}
                            onChange={(e) => updateEducation(education.id, 'endDate', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2 md:col-span-2">
                          <Label>成果</Label>
                          <AchievementInput
                            achievements={education.achievements}
                            onAdd={(achievement) => addAchievement('education', education.id, achievement)}
                            onRemove={(index) => removeAchievement('education', education.id, index)}
                            placeholder="添加学习成果..."
                          />
                        </div>
                      </div>
                    </div>
                  </BlockLayout>
                ))}
                
                {resumeData.educations.length === 0 && (
                  <BlockLayout>
                    <div className="text-center py-8 text-gray-500">
                      <Typography variant="muted">
                        暂无教育经历，点击上方按钮添加
                      </Typography>
                    </div>
                  </BlockLayout>
                )}
              </div>
            </div>

            {/* 附加资质 - 奖励 */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <Typography variant="h2">奖励</Typography>
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
                  <BlockLayout key={award.id}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Typography variant="h3">奖励 {index + 1}</Typography>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeAward(award.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>奖项名称 *</Label>
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
                          <Input
                            type="month"
                            value={award.date}
                            onChange={(e) => updateAward(award.id, 'date', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </BlockLayout>
                ))}
                
                {resumeData.awards.length === 0 && (
                  <BlockLayout>
                    <div className="text-center py-8 text-gray-500">
                      <Typography variant="muted">
                        暂无奖励记录，点击上方按钮添加
                      </Typography>
                    </div>
                  </BlockLayout>
                )}
              </div>
            </div>

            {/* 自我评价 */}
            <div>
              <div className="mb-6">
                <Typography variant="h2">自我评价</Typography>
              </div>
              
              <BlockLayout>
                <div className="space-y-2">
                  <Label>自我评价</Label>
                  <Textarea
                    value={resumeData.selfEvaluation}
                    onChange={(e) => setResumeData(prev => ({
                      ...prev,
                      selfEvaluation: e.target.value
                    }))}
                    placeholder="请输入自我评价..."
                    rows={6}
                  />
                </div>
              </BlockLayout>
            </div>
          </div>
        </PageContainer>
      </div>

      {/* 上传简历对话框 */}
      {showUploadDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="space-y-4">
              <div className="text-center">
                <Typography variant="h3">上传新的简历</Typography>
                <Typography variant="muted" className="mt-2">
                  上传PDF格式的简历文件，系统将自动解析并填充表单
                </Typography>
              </div>
              
              <FileUpload
                onFileSelect={handleUploadResume}
                accept=".pdf"
                maxSize={10 * 1024 * 1024} // 10MB
              />
              
              <div className="flex gap-2 justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => setShowUploadDialog(false)}
                >
                  取消
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 