import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui';

const meta: Meta<typeof Alert> = {
  title: 'FEEDBACK/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['info', 'destructive', 'success', 'warning'],
    },
    showIcon: {
      control: { type: 'boolean' },
    },
    closable: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 基础示例
export const Default: Story = {
  args: {
    children: (
      <>
        <AlertTitle>信息提示</AlertTitle>
        <AlertDescription>这是一个信息提示，现在是默认样式。</AlertDescription>
      </>
    ),
  },
};

// 不同类型的提示
export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert showIcon>
        <AlertTitle>信息提示（默认）</AlertTitle>
        <AlertDescription>这是默认的信息提示样式，使用蓝色主题。</AlertDescription>
      </Alert>
      
      <Alert variant="success" showIcon>
        <AlertTitle>成功提示</AlertTitle>
        <AlertDescription>操作已成功完成！数据已保存到服务器。</AlertDescription>
      </Alert>
      
      <Alert variant="warning" showIcon>
        <AlertTitle>警告提示</AlertTitle>
        <AlertDescription>请注意：此操作可能会影响系统性能，建议在非工作时间执行。</AlertDescription>
      </Alert>
      
      <Alert variant="destructive" showIcon>
        <AlertTitle>错误提示</AlertTitle>
        <AlertDescription>操作失败：网络连接异常，请检查网络设置后重试。</AlertDescription>
      </Alert>
    </div>
  ),
};

// 带图标的提示
export const WithIcon: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="success" showIcon>
        <AlertTitle>带图标的成功提示</AlertTitle>
        <AlertDescription>图标与标题文字保持水平居中对齐。</AlertDescription>
      </Alert>
      
      <Alert variant="warning" showIcon>
        <AlertTitle>带图标的警告提示</AlertTitle>
        <AlertDescription>图标能够帮助用户快速识别提示的重要程度。</AlertDescription>
      </Alert>
    </div>
  ),
};

// 可关闭的提示
export const Closable: Story = {
  render: () => {
    const [alerts, setAlerts] = useState([
      { id: 1, type: 'info' as const, title: '可关闭的信息提示', content: '点击右上角的 X 按钮可以关闭此提示。' },
      { id: 2, type: 'success' as const, title: '可关闭的成功提示', content: '此提示支持关闭功能。' },
      { id: 3, type: 'warning' as const, title: '可关闭的警告提示', content: '关闭后此提示将不再显示。' },
    ]);

    const removeAlert = (id: number) => {
      setAlerts(alerts.filter(alert => alert.id !== id));
    };

    return (
      <div className="space-y-4">
        {alerts.map((alert) => (
          <Alert 
            key={alert.id} 
            variant={alert.type} 
            showIcon 
            onClose={() => removeAlert(alert.id)}
          >
            <AlertTitle>{alert.title}</AlertTitle>
            <AlertDescription>{alert.content}</AlertDescription>
          </Alert>
        ))}
        {alerts.length === 0 && (
          <p className="text-muted-foreground text-center py-8">
            所有提示已被关闭。刷新页面可重新显示。
          </p>
        )}
      </div>
    );
  },
};

// 仅有描述内容（无标题）
export const OnlyDescription: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="info" showIcon>
        <AlertDescription>这是一个只有描述内容的信息提示。</AlertDescription>
      </Alert>
      
      <Alert variant="success" showIcon>
        <AlertDescription>操作成功完成！</AlertDescription>
      </Alert>
      
      <Alert variant="warning" showIcon onClose={() => console.log('关闭警告')}>
        <AlertDescription>这是一个可关闭的警告提示，只有描述内容。</AlertDescription>
      </Alert>
    </div>
  ),
};