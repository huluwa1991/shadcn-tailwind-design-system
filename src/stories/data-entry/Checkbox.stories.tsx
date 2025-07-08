import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Checkbox, CheckboxLabel } from '../../components/ui';

const meta = {
  title: 'Data Entry/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default（基础用法）
export const Default: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox id="default" {...args} />
      <CheckboxLabel htmlFor="default">
        复选框标签
      </CheckboxLabel>
    </div>
  ),
};

// 使用示例
export const Examples: Story = {
  render: () => {
    const [preferences, setPreferences] = React.useState({
      newsletter: true,
      marketing: false,
      analytics: true,
      essential: true,
    });

    const handlePreferenceChange = (key: string, checked: boolean) => {
      setPreferences(prev => ({
        ...prev,
        [key]: checked,
      }));
    };

    return (
      <div className="flex flex-col gap-6 w-full max-w-md">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">隐私设置</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Checkbox 
                id="newsletter" 
                checked={preferences.newsletter}
                onCheckedChange={(checked) => handlePreferenceChange('newsletter', checked as boolean)}
              />
              <CheckboxLabel htmlFor="newsletter">
                接收新闻通讯
              </CheckboxLabel>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox 
                id="marketing" 
                checked={preferences.marketing}
                onCheckedChange={(checked) => handlePreferenceChange('marketing', checked as boolean)}
              />
              <CheckboxLabel htmlFor="marketing">
                接收营销信息
              </CheckboxLabel>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox 
                id="analytics" 
                checked={preferences.analytics}
                onCheckedChange={(checked) => handlePreferenceChange('analytics', checked as boolean)}
              />
              <CheckboxLabel htmlFor="analytics">
                分析和性能
              </CheckboxLabel>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox 
                id="essential" 
                checked={preferences.essential}
                disabled
              />
              <CheckboxLabel htmlFor="essential">
                必要功能（必选）
              </CheckboxLabel>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">表单示例</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Checkbox id="terms" className="mt-0.5" />
              <CheckboxLabel htmlFor="terms">
                我已阅读并同意<a href="#" className="text-primary underline">服务条款</a>和<a href="#" className="text-primary underline">隐私政策</a>
              </CheckboxLabel>
            </div>
            <div className="flex items-start gap-2">
              <Checkbox id="updates" className="mt-0.5" />
              <CheckboxLabel htmlFor="updates">
                我希望接收产品更新和相关信息
              </CheckboxLabel>
            </div>
          </div>
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-medium mb-2">当前设置：</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>新闻通讯: {preferences.newsletter ? '已启用' : '已禁用'}</li>
            <li>营销信息: {preferences.marketing ? '已启用' : '已禁用'}</li>
            <li>分析和性能: {preferences.analytics ? '已启用' : '已禁用'}</li>
            <li>必要功能: {preferences.essential ? '已启用' : '已禁用'}</li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '实际使用场景示例，包含隐私设置和表单场景。',
      },
    },
  },
}; 