import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/base/button';
import { Toaster, toast } from '@/components/ui/feedback/toast';

const meta: Meta = {
  title: 'Feedback/Toast',
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <Toaster />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="space-y-4">
      <Button
        onClick={() => toast('这是一个默认的 Toast 消息')}
      >
        显示默认 Toast
      </Button>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="space-y-4">
      <Button
        onClick={() => 
          toast('任务完成', {
            description: '您的文件已成功上传到服务器',
          })
        }
      >
        带描述的 Toast
      </Button>
    </div>
  ),
};

export const Success: Story = {
  render: () => (
    <div className="space-y-4">
      <Button
        onClick={() => 
          toast.success('操作成功', {
            description: '您的设置已保存',
          })
        }
      >
        成功 Toast
      </Button>
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div className="space-y-4">
      <Button
        variant="destructive"
        onClick={() => 
          toast.error('操作失败', {
            description: '无法连接到服务器，请稍后重试',
          })
        }
      >
        错误 Toast
      </Button>
    </div>
  ),
};

export const Warning: Story = {
  render: () => (
    <div className="space-y-4">
      <Button
        onClick={() => 
          toast.warning('注意', {
            description: '您的会话即将过期，请保存您的工作',
          })
        }
      >
        警告 Toast
      </Button>
    </div>
  ),
};

export const Info: Story = {
  render: () => (
    <div className="space-y-4">
      <Button
        onClick={() => 
          toast.info('信息', {
            description: '新功能已上线，快来体验吧！',
          })
        }
      >
        信息 Toast
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="space-y-4">
      <Button
        onClick={() => 
          toast.loading('正在上传文件...', {
            duration: 2000,
          })
        }
      >
        加载 Toast
      </Button>
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <div className="space-y-4">
      <Button
        onClick={() => 
          toast('您有新消息', {
            description: '点击查看详情',
            action: {
              label: '查看',
              onClick: () => {
                console.log('查看消息');
                toast.success('已查看消息');
              },
            },
          })
        }
      >
        带操作按钮的 Toast
      </Button>
    </div>
  ),
};

export const PromiseToast: Story = {
  render: () => (
    <div className="space-y-4">
      <Button
        onClick={() => {
          const promise = new Promise<string>((resolve: (value: string) => void, reject: (reason?: string) => void) => {
            setTimeout(() => {
              if (Math.random() > 0.5) {
                resolve('上传成功');
              } else {
                reject('上传失败');
              }
            }, 2000);
          });

          toast.promise(promise, {
            loading: '正在上传文件...',
            success: '文件上传成功！',
            error: '文件上传失败',
          });
        }}
      >
        Promise Toast
      </Button>
    </div>
  ),
};

export const CustomDuration: Story = {
  render: () => (
    <div className="space-y-4">
      <Button
        onClick={() => 
          toast('这个消息会在 10 秒后自动消失', {
            duration: 10000,
          })
        }
      >
        自定义持续时间
      </Button>
    </div>
  ),
};

export const MultipleToasts: Story = {
  render: () => (
    <div className="space-y-4">
      <Button
        onClick={() => {
          toast.success('第一个成功消息');
          setTimeout(() => toast.error('第二个错误消息'), 500);
          setTimeout(() => toast.warning('第三个警告消息'), 1000);
        }}
      >
        显示多个 Toast
      </Button>
    </div>
  ),
};

export const DismissAll: Story = {
  render: () => (
    <div className="space-y-4 flex gap-4">
      <Button
        onClick={() => {
          toast('消息 1');
          toast('消息 2');
          toast('消息 3');
        }}
      >
        显示多个消息
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.dismiss()}
      >
        关闭所有 Toast
      </Button>
    </div>
  ),
}; 