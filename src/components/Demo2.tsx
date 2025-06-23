import React, { useState } from 'react';
import { 
  Sidebar,
  PageContainer,
  PageHeaderWrapper,
  Typography,
  Switch,
  Input,
  Label,
  BlockLayout,
  Button,
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
  SelectContainer
} from './ui';

// 设置项类型定义
interface BaseSetting {
  id: string;
  title: string;
  description: string;
}

interface SectionSetting extends BaseSetting {
  type: 'section';
}

interface SwitchSetting extends BaseSetting {
  type: 'switch';
  defaultValue: boolean;
}

interface SelectSetting extends BaseSetting {
  type: 'select';
  defaultValue: string;
  options: { value: string; label: string; }[];
}

type Setting = SectionSetting | SwitchSetting | SelectSetting;

interface SettingsGroup {
  title: string;
  settings: Setting[];
}

// 设置项分组配置
const settingsGroups: SettingsGroup[] = [
  {
    title: '账户设置',
    settings: [
      {
        id: 'profile',
        type: 'section',
        title: '个人资料',
        description: '管理您的个人信息',
      },
    ]
  },
  {
    title: '通知设置',
    settings: [
      {
        id: 'email-notifications',
        type: 'switch',
        title: '邮件通知',
        description: '接收重要更新和活动通知',
        defaultValue: true,
      },
      {
        id: 'push-notifications',
        type: 'switch',
        title: '推送通知',
        description: '在浏览器中接收实时通知',
        defaultValue: false,
      },
      {
        id: 'sms-notifications',
        type: 'switch',
        title: '短信通知',
        description: '接收重要安全提醒',
        defaultValue: true,
      },
    ]
  },
  {
    title: '隐私设置',
    settings: [
      {
        id: 'profile-visibility',
        type: 'select',
        title: '个人资料可见性',
        description: '控制谁可以查看您的个人资料',
        options: [
          { value: 'public', label: '所有人' },
          { value: 'friends', label: '仅好友' },
          { value: 'private', label: '仅自己' },
        ],
        defaultValue: 'friends',
      },
      {
        id: 'activity-status',
        type: 'switch',
        title: '显示在线状态',
        description: '允许其他用户看到您的在线状态',
        defaultValue: false,
      },
      {
        id: 'search-indexing',
        type: 'switch',
        title: '搜索引擎索引',
        description: '允许搜索引擎索引您的公开信息',
        defaultValue: true,
      },
    ]
  },
  {
    title: '安全设置',
    settings: [
      {
        id: 'two-factor',
        type: 'switch',
        title: '双重认证',
        description: '为您的账户添加额外的安全保护',
        defaultValue: false,
      },
      {
        id: 'login-alerts',
        type: 'switch',
        title: '登录提醒',
        description: '当有新设备登录时发送通知',
        defaultValue: true,
      },
    ]
  },
  {
    title: '偏好设置',
    settings: [
      {
        id: 'language',
        type: 'select',
        title: '界面语言',
        description: '选择您偏好的界面语言',
        options: [
          { value: 'zh-CN', label: '简体中文' },
          { value: 'zh-TW', label: '繁体中文' },
          { value: 'en', label: 'English' },
          { value: 'ja', label: '日本語' },
        ],
        defaultValue: 'zh-CN',
      },
      {
        id: 'timezone',
        type: 'select',
        title: '时区',
        description: '选择您所在的时区',
        options: [
          { value: 'Asia/Shanghai', label: '北京时间 (UTC+8)' },
          { value: 'Asia/Tokyo', label: '东京时间 (UTC+9)' },
          { value: 'America/New_York', label: '纽约时间 (UTC-5)' },
          { value: 'Europe/London', label: '伦敦时间 (UTC+0)' },
        ],
        defaultValue: 'Asia/Shanghai',
      },
      {
        id: 'auto-save',
        type: 'switch',
        title: '自动保存',
        description: '自动保存您的工作进度',
        defaultValue: true,
      },
    ]
  }
];

export const Demo2: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [settings, setSettings] = useState<Record<string, any>>(() => {
    // 初始化设置状态
    const initialSettings: Record<string, any> = {};
    settingsGroups.forEach(group => {
      group.settings.forEach(setting => {
        if (setting.type === 'switch' || setting.type === 'select') {
          initialSettings[setting.id] = setting.defaultValue;
        }
      });
    });
    return initialSettings;
  });

  // 个人资料表单状态
  const [profileData, setProfileData] = useState({
    name: 'shadcn',
    email: 'm@example.com',
    phone: '+86 138 0000 0000',
  });

  const handleSwitchChange = (settingId: string, checked: boolean) => {
    setSettings(prev => ({
      ...prev,
      [settingId]: checked
    }));
  };

  const handleSelectChange = (settingId: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [settingId]: value
    }));
  };

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    console.log('保存个人资料:', profileData);
    // 这里可以添加保存逻辑
  };

  const handleResetSettings = () => {
    console.log('重置设置');
    // 重置为默认值
    const defaultSettings: Record<string, any> = {};
    settingsGroups.forEach(group => {
      group.settings.forEach(setting => {
        if (setting.type === 'switch' || setting.type === 'select') {
          defaultSettings[setting.id] = setting.defaultValue;
        }
      });
    });
    setSettings(defaultSettings);
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
            title="设置"
            actions={
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleResetSettings}>
                  重置
                </Button>
                <Button onClick={handleSaveProfile}>
                  保存
                </Button>
              </div>
            }
          />

          {/* 设置内容区域 */}
          <div className="space-y-8">
            {settingsGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                {/* 分组标题 */}
                <div className="mb-6">
                  <Typography variant="h2">
                    {group.title}
                  </Typography>
                </div>

                {/* 设置项列表 - 整个分组包装在一个BlockLayout中 */}
                <BlockLayout>
                  <div className="space-y-6">
                    {group.settings.map((setting, settingIndex) => {
                      if (setting.type === 'section') {
                        // 个人资料表单部分
                        return (
                          <div key={setting.id}>
                            <div className="space-y-1 mb-4">
                              <Typography variant="h3">
                                {setting.title}
                              </Typography>
                              <Typography variant="muted">
                                {setting.description}
                              </Typography>
                            </div>
                            
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>用户名</Label>
                                <Input
                                  value={profileData.name}
                                  onChange={(e) => handleProfileChange('name', e.target.value)}
                                  placeholder="请输入用户名"
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label>邮箱地址</Label>
                                <Input
                                  type="email"
                                  value={profileData.email}
                                  onChange={(e) => handleProfileChange('email', e.target.value)}
                                  placeholder="请输入邮箱地址"
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label>手机号码</Label>
                                <Input
                                  value={profileData.phone}
                                  onChange={(e) => handleProfileChange('phone', e.target.value)}
                                  placeholder="请输入手机号码"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      }

                      if (setting.type === 'switch') {
                        return (
                          <div key={setting.id}>
                            <div className="flex items-center gap-4">
                              <div className="flex-1 space-y-1">
                                <Typography variant="h3">
                                  {setting.title}
                                </Typography>
                                <Typography variant="muted">
                                  {setting.description}
                                </Typography>
                              </div>
                              <Switch
                                checked={settings[setting.id] || false}
                                onCheckedChange={(checked) => handleSwitchChange(setting.id, checked)}
                              />
                            </div>
                            {/* 添加分隔线，除了最后一项 */}
                            {settingIndex < group.settings.length - 1 && (
                              <div className="h-px bg-border mt-6"></div>
                            )}
                          </div>
                        );
                      }

                      if (setting.type === 'select') {
                        const selectSetting = setting as SelectSetting;
                        return (
                          <div key={setting.id}>
                            <div className="flex items-center justify-between">
                              <div className="flex-1 space-y-1 pr-4">
                                <Typography variant="h3">
                                  {setting.title}
                                </Typography>
                                <Typography variant="muted">
                                  {setting.description}
                                </Typography>
                              </div>
                              <div>
                                <SelectContainer>
                                  <Select
                                    value={settings[setting.id] || selectSetting.defaultValue}
                                    onValueChange={(value) => handleSelectChange(setting.id, value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {selectSetting.options.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                          {option.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </SelectContainer>
                              </div>
                            </div>
                            {/* 添加分隔线，除了最后一项 */}
                            {settingIndex < group.settings.length - 1 && (
                              <div className="h-px bg-border mt-6"></div>
                            )}
                          </div>
                        );
                      }

                      return null;
                    })}
                  </div>
                </BlockLayout>
              </div>
            ))}
          </div>
        </PageContainer>
      </div>
    </div>
  );
}; 