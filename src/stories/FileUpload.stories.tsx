import type { Meta, StoryObj } from '@storybook/react'
import { FileUpload } from '../components/ui/file-upload'

const meta: Meta<typeof FileUpload> = {
  title: 'UI/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    accept: {
      control: 'text',
      description: '接受的文件类型',
    },
    maxSize: {
      control: 'number',
      description: '最大文件大小（字节）',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
    helperText: {
      control: 'text',
      description: '辅助说明文字',
    },
    placeholder: {
      control: 'text',
      description: '按钮占位文字',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    helperText: '请选择要上传的文件',
    placeholder: '选择文件',
  },
}

export const WithSizeLimit: Story = {
  args: {
    maxSize: 2 * 1024 * 1024, // 2MB
    helperText: '文件大小不能超过 2MB',
    placeholder: '选择文件',
  },
}

export const ImageOnly: Story = {
  args: {
    accept: 'image/*',
    maxSize: 5 * 1024 * 1024, // 5MB
    helperText: '仅支持图片格式，大小不超过 5MB',
    placeholder: '选择图片',
  },
}

export const DocumentsOnly: Story = {
  args: {
    accept: '.pdf,.doc,.docx,.txt',
    maxSize: 10 * 1024 * 1024, // 10MB
    helperText: '支持 PDF、Word 文档和文本文件，大小不超过 10MB',
    placeholder: '选择文档',
  },
}