import type { Meta, StoryObj } from '@storybook/react';
import { Resume } from '../components/Resume';

const meta: Meta<typeof Resume> = {
  title: 'Pages/Resume',
  component: Resume,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '简历页面组件，用于管理用户的个人简历信息，包括基本信息、工作经历、教育经历等。支持上传PDF简历文件并自动解析填充表单。',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '默认简历页面',
  parameters: {
    docs: {
      description: {
        story: '默认的简历页面，包含完整的表单字段和功能。用户可以填写基本信息、添加工作经历、项目经历、教育经历等。',
      },
    },
  },
};

export const EmptyState: Story = {
  name: '空状态简历页面',
  parameters: {
    docs: {
      description: {
        story: '新用户的空状态简历页面，所有字段都为空，等待用户填写或上传简历文件。',
      },
    },
  },
}; 