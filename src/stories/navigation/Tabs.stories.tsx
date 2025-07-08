import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui';

const meta = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    defaultValue: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

// 默认的 Tabs 组件
export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">账户</TabsTrigger>
        <TabsTrigger value="password">密码</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="space-y-2">
        <h3 className="text-lg font-medium">账户信息</h3>
        <p className="text-sm text-muted-foreground">
          在这里管理您的账户设置。
        </p>
        <div className="space-y-2">
          <div>
            <label className="text-sm font-medium">用户名</label>
            <input className="w-full mt-1 px-3 py-2 border rounded-md" defaultValue="user@example.com" />
          </div>
          <div>
            <label className="text-sm font-medium">显示名称</label>
            <input className="w-full mt-1 px-3 py-2 border rounded-md" defaultValue="用户名" />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="password" className="space-y-2">
        <h3 className="text-lg font-medium">密码设置</h3>
        <p className="text-sm text-muted-foreground">
          更改您的密码以保护账户安全。
        </p>
        <div className="space-y-2">
          <div>
            <label className="text-sm font-medium">当前密码</label>
            <input type="password" className="w-full mt-1 px-3 py-2 border rounded-md" />
          </div>
          <div>
            <label className="text-sm font-medium">新密码</label>
            <input type="password" className="w-full mt-1 px-3 py-2 border rounded-md" />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

// 三个标签页的示例
export const ThreeTabs: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[500px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">概览</TabsTrigger>
        <TabsTrigger value="analytics">分析</TabsTrigger>
        <TabsTrigger value="settings">设置</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-medium">数据概览</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-blue-600">总用户数</h4>
              <p className="text-2xl font-medium">12,345</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-green-600">活跃用户</h4>
              <p className="text-2xl font-medium">8,921</p>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="analytics" className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-medium">数据分析</h3>
          <div className="h-32 bg-slate-100 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">图表区域</p>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="settings" className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-medium">系统设置</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>邮件通知</span>
              <input type="checkbox" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span>推送通知</span>
              <input type="checkbox" />
            </div>
            <div className="flex items-center justify-between">
              <span>自动更新</span>
              <input type="checkbox" defaultChecked />
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

// 垂直布局的标签页
export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="general" orientation="vertical" className="flex space-x-6">
      <TabsList className="flex flex-col h-fit">
        <TabsTrigger value="general" className="w-full justify-start">常规</TabsTrigger>
        <TabsTrigger value="security" className="w-full justify-start">安全</TabsTrigger>
        <TabsTrigger value="appearance" className="w-full justify-start">外观</TabsTrigger>
        <TabsTrigger value="advanced" className="w-full justify-start">高级</TabsTrigger>
      </TabsList>
      <div className="flex-1">
        <TabsContent value="general" className="space-y-4 mt-0">
          <div>
            <h3 className="text-lg font-medium">常规设置</h3>
            <p className="text-sm text-muted-foreground">管理应用程序的基本设置。</p>
            <div className="space-y-3 mt-4">
              <div>
                <label className="text-sm font-medium">语言</label>
                <select className="w-full mt-1 px-3 py-2 border rounded-md">
                  <option>中文</option>
                  <option>English</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">时区</label>
                <select className="w-full mt-1 px-3 py-2 border rounded-md">
                  <option>北京时间 (GMT+8)</option>
                  <option>纽约时间 (GMT-5)</option>
                </select>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="security" className="space-y-4 mt-0">
          <div>
            <h3 className="text-lg font-medium">安全设置</h3>
            <p className="text-sm text-muted-foreground">保护您的账户安全。</p>
            <div className="space-y-3 mt-4">
              <div className="flex items-center justify-between">
                <span>两步验证</span>
                <input type="checkbox" />
              </div>
              <div className="flex items-center justify-between">
                <span>登录通知</span>
                <input type="checkbox" defaultChecked />
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="appearance" className="space-y-4 mt-0">
          <div>
            <h3 className="text-lg font-medium">外观设置</h3>
            <p className="text-sm text-muted-foreground">自定义应用程序的外观。</p>
            <div className="space-y-3 mt-4">
              <div>
                <label className="text-sm font-medium">主题</label>
                <select className="w-full mt-1 px-3 py-2 border rounded-md">
                  <option>浅色</option>
                  <option>深色</option>
                  <option>跟随系统</option>
                </select>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="advanced" className="space-y-4 mt-0">
          <div>
            <h3 className="text-lg font-medium">高级设置</h3>
            <p className="text-sm text-muted-foreground">面向开发者的高级选项。</p>
            <div className="space-y-3 mt-4">
              <div className="flex items-center justify-between">
                <span>开发者模式</span>
                <input type="checkbox" />
              </div>
              <div className="flex items-center justify-between">
                <span>调试日志</span>
                <input type="checkbox" />
              </div>
            </div>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  ),
};

// 禁用状态的标签页
export const DisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="tab1">可用标签</TabsTrigger>
        <TabsTrigger value="tab2" disabled>禁用标签</TabsTrigger>
        <TabsTrigger value="tab3">另一个标签</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">可用标签内容</h3>
          <p className="text-sm text-muted-foreground">
            这是一个正常可用的标签页内容。
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">另一个标签内容</h3>
          <p className="text-sm text-muted-foreground">
            这是另一个标签页的内容。
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

// 全宽度的标签页
export const FullWidth: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="products">产品</TabsTrigger>
          <TabsTrigger value="orders">订单</TabsTrigger>
          <TabsTrigger value="customers">客户</TabsTrigger>
          <TabsTrigger value="reports">报表</TabsTrigger>
        </TabsList>
        <TabsContent value="products" className="space-y-4">
          <div>
            <h3 className="text-xl font-medium">产品管理</h3>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium">产品 A</h4>
                <p className="text-sm text-muted-foreground">描述信息</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium">产品 B</h4>
                <p className="text-sm text-muted-foreground">描述信息</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium">产品 C</h4>
                <p className="text-sm text-muted-foreground">描述信息</p>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="orders" className="space-y-4">
          <div>
            <h3 className="text-xl font-medium">订单管理</h3>
            <p className="text-muted-foreground">订单列表和管理功能将在这里显示。</p>
          </div>
        </TabsContent>
        <TabsContent value="customers" className="space-y-4">
          <div>
            <h3 className="text-xl font-medium">客户管理</h3>
            <p className="text-muted-foreground">客户信息和管理功能将在这里显示。</p>
          </div>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <div>
            <h3 className="text-xl font-medium">数据报表</h3>
            <p className="text-muted-foreground">各种统计报表将在这里显示。</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  ),
}; 