import React from 'react';
import { CheckCircle } from 'lucide-react';
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
  Typography
} from '../../../components/ui';
import type { BasicInfo } from '../types';
import type { CitySelectValue } from '../../../components/ui/data-entry/city-select';
import { ResumeFormSection } from '../components';

interface BasicInfoSectionProps {
  data: BasicInfo;
  onUpdate: (field: keyof BasicInfo, value: string | CitySelectValue) => void;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  data,
  onUpdate
}) => {
  return (
    <ResumeFormSection title="基本信息">
      {/* 姓名 + 性别 */}
      <FormRow columns={2}>
        <FormItem>
          <FormLabel>姓名</FormLabel>
          <Input
            value={data.name}
            onChange={(e) => onUpdate('name', e.target.value)}
            placeholder="请输入姓名"
            disabled={data.isNameVerified}
          />
          {data.isNameVerified && (
            <div className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-muted-foreground" />
              <Typography variant="muted" className="text-xs text-muted-foreground">
                已实名认证，不可修改
              </Typography>
            </div>
          )}
        </FormItem>
        
        <FormItem>
          <FormLabel>性别</FormLabel>
          <SelectContainer width="full">
            <Select
              value={data.gender}
              onValueChange={(value) => onUpdate('gender', value)}
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
        </FormItem>
      </FormRow>
      
      {/* 电话 + 邮箱 */}
      <FormRow columns={2}>
        <FormItem>
          <FormLabel>电话</FormLabel>
          <Input
            value={data.phone}
            onChange={(e) => onUpdate('phone', e.target.value)}
            placeholder="请输入电话号码"
            disabled={data.isPhoneVerified}
          />
          {data.isPhoneVerified && (
            <div className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-muted-foreground" />
              <Typography variant="muted" className="text-xs text-muted-foreground">
                已验证，不可修改
              </Typography>
            </div>
          )}
        </FormItem>
        
        <FormItem>
          <FormLabel>邮箱</FormLabel>
          <Input
            type="email"
            value={data.email}
            onChange={(e) => onUpdate('email', e.target.value)}
            placeholder="请输入邮箱地址"
          />
        </FormItem>
      </FormRow>
      
      {/* 所在城市 + 籍贯 */}
      <FormRow columns={2}>
        <FormItem>
          <FormLabel>所在城市</FormLabel>
          <CitySelect
            value={data.city}
            onValueChange={(value) => onUpdate('city', value)}
            placeholder="请选择所在城市"
            width="full"
            level="city"
            changeOnSelect={true}
          />
        </FormItem>
        
        <FormItem>
          <FormLabel>籍贯</FormLabel>
          <Input
            value={data.hometown}
            onChange={(e) => onUpdate('hometown', e.target.value)}
            placeholder="请输入籍贯"
          />
        </FormItem>
      </FormRow>
      
      {/* 期望薪资 */}
      <FormRow columns={2}>
        <FormItem>
          <FormLabel>期望薪资/月</FormLabel>
          <Input
            value={data.expectedSalary}
            onChange={(e) => onUpdate('expectedSalary', e.target.value)}
            placeholder="例如：30000; 3万; 20k-40k"
          />
        </FormItem>
        <FormItem>
          {/* 空白占位，让期望薪资只占一半宽度 */}
        </FormItem>
      </FormRow>
    </ResumeFormSection>
  );
}; 