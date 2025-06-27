import { type CitySelectValue } from '../../components/ui/data-entry/city-select';

// 基本信息接口
export interface BasicInfo {
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

// 工作经历接口
export interface WorkExperience {
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

// 项目经历接口
export interface ProjectExperience {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate: string;
  achievements: string[];
}

// 教育经历接口
export interface Education {
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

// 奖励接口
export interface Award {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

// 论文接口
export interface Paper {
  id: string;
  title: string;
  journal: string;
  link: string;
  authorRank: number;
}

// 代码仓库接口
export interface Repository {
  id: string;
  type: string;
  url: string;
}

// 专利接口
export interface Patent {
  id: string;
  name: string;
  number: string;
}

// 社交媒体接口
export interface SocialMedia {
  id: string;
  platform: string;
  account: string;
  link: string;
}

// 兴趣与技能接口
export interface InterestSkill {
  interests: string[];
  skills: string[];
}

// 工作技能接口
export interface WorkSkill {
  name: string;
  proficiency: string;
  softSkills: string[];
}

// 简历数据主接口
export interface ResumeData {
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

// 动态列表项的通用类型
export type ResumeListItem = 
  | WorkExperience 
  | ProjectExperience 
  | Education 
  | Award 
  | Paper 
  | Repository 
  | Patent 
  | SocialMedia;

// 动态列表的键名类型
export type ResumeListKey = 
  | 'workExperiences' 
  | 'projectExperiences' 
  | 'educations' 
  | 'awards' 
  | 'papers' 
  | 'repositories' 
  | 'patents' 
  | 'socialMedia';

// 初始化数据
export const initialResumeData: ResumeData = {
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

// 工厂函数：创建新的列表项
export const createNewItem = {
  workExperience: (): WorkExperience => ({
    id: Date.now().toString(),
    organization: '',
    startDate: '',
    endDate: '',
    title: '',
    achievements: [],
    city: {},
    department: '',
    type: ''
  }),

  projectExperience: (): ProjectExperience => ({
    id: Date.now().toString(),
    organization: '',
    role: '',
    startDate: '',
    endDate: '',
    achievements: []
  }),

  education: (): Education => ({
    id: Date.now().toString(),
    school: '',
    faculty: '',
    degree: '',
    status: '',
    city: {},
    startDate: '',
    endDate: '',
    achievements: []
  }),

  award: (): Award => ({
    id: Date.now().toString(),
    name: '',
    issuer: '',
    date: ''
  }),

  paper: (): Paper => ({
    id: Date.now().toString(),
    title: '',
    journal: '',
    link: '',
    authorRank: 1
  }),

  repository: (): Repository => ({
    id: Date.now().toString(),
    type: '',
    url: ''
  }),

  patent: (): Patent => ({
    id: Date.now().toString(),
    name: '',
    number: ''
  }),

  socialMedia: (): SocialMedia => ({
    id: Date.now().toString(),
    platform: '',
    account: '',
    link: ''
  })
}; 