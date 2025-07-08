import React, { useState } from 'react';
import { 
  Sidebar,
  PageContainer,
  PageHeaderWrapper,
  Table, 
  TableWrapper, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell,
  StatusCell,
  ActionButtonsCell,
  IdCell,
  NameCell,
  Button,
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
  SelectContainer,
  MultiSelectTrigger,
  MultiSelectItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from '../../components/ui';
import { useResponsiveSidebar } from '@/lib/utils';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// 模拟用户数据
const mockUsers = [
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    role: '技术部',
    status: 'active',
    createTime: '2024-01-15',
    lastLogin: '2024-01-20 14:30'
  },
  {
    id: 2,
    name: '李四',
    email: 'lisi@example.com',
    role: '市场部',
    status: 'inactive',
    createTime: '2024-01-10',
    lastLogin: '2024-01-18 09:15'
  },
  {
    id: 3,
    name: '王五',
    email: 'wangwu@example.com',
    role: '产品部',
    status: 'active',
    createTime: '2024-01-05',
    lastLogin: '2024-01-19 16:45'
  },
  {
    id: 4,
    name: '赵六',
    email: 'zhaoliu@example.com',
    role: '运营部',
    status: 'pending',
    createTime: '2024-01-12',
    lastLogin: '从未登录'
  },
  {
    id: 5,
    name: '钱七',
    email: 'qianqi@example.com',
    role: '技术部',
    status: 'active',
    createTime: '2024-01-08',
    lastLogin: '2024-01-20 11:20'
  }
];

// 模拟不同时间周期的数据
const chartDatasets = {
  '7天': [
    { date: '1.14', desktop: 320, mobile: 180 },
    { date: '1.15', desktop: 385, mobile: 220 },
    { date: '1.16', desktop: 410, mobile: 250 },
    { date: '1.17', desktop: 380, mobile: 200 },
    { date: '1.18', desktop: 420, mobile: 280 },
    { date: '1.19', desktop: 450, mobile: 320 },
    { date: '1.20', desktop: 480, mobile: 350 }
  ],
  '30天': [
    { date: '12.22', desktop: 280, mobile: 150 },
    { date: '12.24', desktop: 245, mobile: 135 },
    { date: '12.26', desktop: 290, mobile: 165 },
    { date: '12.28', desktop: 310, mobile: 175 },
    { date: '12.30', desktop: 325, mobile: 185 },
    { date: '1.1', desktop: 295, mobile: 160 },
    { date: '1.3', desktop: 340, mobile: 195 },
    { date: '1.5', desktop: 385, mobile: 220 },
    { date: '1.7', desktop: 365, mobile: 210 },
    { date: '1.9', desktop: 395, mobile: 235 },
    { date: '1.11', desktop: 420, mobile: 245 },
    { date: '1.13', desktop: 415, mobile: 250 },
    { date: '1.15', desktop: 435, mobile: 265 },
    { date: '1.17', desktop: 440, mobile: 275 },
    { date: '1.19', desktop: 460, mobile: 285 },
    { date: '1.21', desktop: 450, mobile: 295 }
  ],
  '3个月': [
    { date: '10下', desktop: 780, mobile: 485 },
    { date: '11上', desktop: 820, mobile: 510 },
    { date: '11中', desktop: 865, mobile: 535 },
    { date: '11下', desktop: 920, mobile: 580 },
    { date: '12上', desktop: 955, mobile: 615 },
    { date: '12中', desktop: 1010, mobile: 650 },
    { date: '12下', desktop: 1050, mobile: 680 },
    { date: '1上', desktop: 1150, mobile: 745 },
    { date: '1中', desktop: 1220, mobile: 785 },
    { date: '1下', desktop: 1284, mobile: 820 }
  ]
};

// 状态映射 - 使用Tag组件的规范variant
const getStatusVariant = (status: string): 'success' | 'warning' | 'destructive' | 'default' => {
  switch (status) {
    case 'active':
      return 'success';
    case 'inactive':
      return 'destructive';
    case 'pending':
      return 'warning';
    default:
      return 'default';
  }
};

// 状态文本映射
const getStatusText = (status: string): string => {
  switch (status) {
    case 'active':
      return '活跃';
    case 'inactive':
      return '非活跃';
    case 'pending':
      return '待审核';
    default:
      return status;
  }
};

// 部门选项配置
const departmentOptions = [
  { value: 'tech', label: '技术部' },
  { value: 'marketing', label: '市场部' },
  { value: 'product', label: '产品部' },
  { value: 'operations', label: '运营部' },
];

// 部门标签映射
const departmentLabels = departmentOptions.reduce((acc, option) => {
  acc[option.value] = option.label;
  return acc;
}, {} as Record<string, string>);

// 统计卡片组件
const StatCard: React.FC<{
  title: string;
  value: string;
  trend: string;
  trendIcon: React.ReactNode;
  description: string;
  footer: string;
}> = ({ title, value, trend, trendIcon, description, footer }) => {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow @container/card">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex items-start justify-between">
          <div className="text-sm text-muted-foreground">{title}</div>
          <div className="items-center border px-2.5 py-0.5 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground flex gap-1 rounded-lg text-xs">
            {trendIcon}
            {trend}
          </div>
        </div>
        <div className="tracking-tight @[250px]/card:text-3xl text-2xl font-medium tabular-nums">{value}</div>
      </div>
      <div className="flex p-6 pt-0 flex-col items-start gap-1 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {description}
          {trendIcon}
        </div>
        <div className="text-muted-foreground">{footer}</div>
      </div>
    </div>
  );
};

// 时间周期切换按钮组
const TimePeriodToggle: React.FC<{
  selected: string;
  onSelect: (period: string) => void;
}> = ({ selected, onSelect }) => {
  const periods = ['最近7天', '最近30天', '最近3个月'];

  return (
    <Tabs value={`最近${selected}`} onValueChange={(value) => onSelect(value.replace('最近', ''))}>
      <TabsList>
        {periods.map((period) => (
          <TabsTrigger key={period} value={period} className="font-medium">
            {period}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

// 趋势图标组件
const TrendingUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up size-3">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
    <polyline points="16 7 22 7 22 13"></polyline>
  </svg>
);

const TrendingDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-down size-3">
    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline>
    <polyline points="16 17 22 17 22 11"></polyline>
  </svg>
);

export const Demo: React.FC = () => {
  const { collapsed, onCollapsedChange } = useResponsiveSidebar('full');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [isDepartmentSelectOpen, setIsDepartmentSelectOpen] = useState(false);
  const [chartPeriod, setChartPeriod] = useState<string>('30天');

  const handleExport = () => {
    console.log('导出数据');
  };

  const handleEditUser = (userId: number) => {
    console.log('编辑用户:', userId);
  };

  const handleDeleteUser = (userId: number) => {
    console.log('删除用户:', userId);
  };

  const handleDepartmentToggle = (value: string, selected: boolean) => {
    if (selected) {
      setSelectedDepartments(prev => [...prev, value]);
    } else {
      setSelectedDepartments(prev => prev.filter(v => v !== value));
    }
  };

  const handleDepartmentRemove = (value: string) => {
    setSelectedDepartments(prev => prev.filter(v => v !== value));
  };

  const currentChartData = chartDatasets[chartPeriod as keyof typeof chartDatasets];

  return (
    <div className="flex h-screen w-full">
      {/* 侧边栏区域 */}
      <div>
        <Sidebar 
          collapsed={collapsed}
          onCollapsedChange={onCollapsedChange}
        />
      </div>
      
      {/* 主内容区域 */}
      <PageContainer variant="full">
          {/* 页面头部 */}
          <PageHeaderWrapper
            variant="title-with-toolbar"
            title="数据分析看板"
            filters={
              <>
                <SelectContainer>
                  <Select defaultValue="all-status">
                    <SelectTrigger>
                      <SelectValue placeholder="选择状态" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-status" className="font-medium">全部状态</SelectItem>
                      <SelectItem value="active" className="font-medium">活跃</SelectItem>
                      <SelectItem value="inactive" className="font-medium">非活跃</SelectItem>
                      <SelectItem value="pending" className="font-medium">待审核</SelectItem>
                    </SelectContent>
                  </Select>
                </SelectContainer>
                
                <SelectContainer>
                  <Select open={isDepartmentSelectOpen} onOpenChange={setIsDepartmentSelectOpen}>
                    <MultiSelectTrigger
                      display="text-only"
                      selectedValues={selectedDepartments}
                      selectedLabels={departmentLabels}
                      onRemoveValue={handleDepartmentRemove}
                      placeholder="选择部门"
                      maxDisplay={2}
                    />
                    <SelectContent>
                      {departmentOptions.map((option) => (
                        <MultiSelectItem
                          key={option.value}
                          value={option.value}
                          selected={selectedDepartments.includes(option.value)}
                          onToggle={handleDepartmentToggle}
                        >
                          {option.label}
                        </MultiSelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </SelectContainer>
                
                <SelectContainer>
                  <Select defaultValue="recent-30">
                    <SelectTrigger>
                      <SelectValue placeholder="选择时间" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent-30" className="font-medium">最近30天</SelectItem>
                      <SelectItem value="recent-7" className="font-medium">最近7天</SelectItem>
                      <SelectItem value="recent-1" className="font-medium">最近1天</SelectItem>
                      <SelectItem value="custom" className="font-medium">自定义</SelectItem>
                    </SelectContent>
                  </Select>
                </SelectContainer>
              </>
            }
            toolbarActions={
              <Button variant="outline" onClick={handleExport}>
                导出
              </Button>
            }
          />
          
          {/* 统计卡片区域 */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                title="总用户数"
                value="1,284"
                trend="+12.5%"
                trendIcon={<TrendingUpIcon />}
                description="本月用户数量增长"
                footer="相比上月新增160位用户"
              />
              
              <StatCard
                title="活跃用户"
                value="952"
                trend="+8.2%"
                trendIcon={<TrendingUpIcon />}
                description="活跃用户持续增长"
                footer="过去7天内登录的用户"
              />
              
              <StatCard
                title="用户留存率"
                value="78.6%"
                trend="-2.1%"
                trendIcon={<TrendingDownIcon />}
                description="本月留存率略有下降"
                footer="30天用户留存统计"
              />
            </div>
          
          
          {/* 折线图区域 */}
            <div className="rounded-xl border bg-card text-card-foreground shadow @container/card p-6">
              {/* 头部区域 - 左右分布 */}
              <div className="flex items-start justify-between mb-6">
                {/* 左侧标题盒子 */}
                <div className="flex flex-col space-y-1.5">
                  <div className="font-medium leading-none tracking-tight">访问量统计</div>
                  <div className="text-sm text-muted-foreground">
                    <span className="@[540px]/card:block hidden">总计最近{chartPeriod}的访问数据</span>
                    <span className="@[540px]/card:hidden">最近{chartPeriod}</span>
                  </div>
                </div>
                
                {/* 右侧按钮盒子 */}
                <div>
                  <TimePeriodToggle 
                    selected={chartPeriod}
                    onSelect={setChartPeriod}
                  />
                </div>
              </div>
              
              {/* 图表区域 */}
              <div 
                data-chart="visitor-chart" 
                className="flex justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-hidden [&_.recharts-surface]:outline-hidden aspect-auto h-[250px] w-full"
              >
                  <style>{`
                    [data-chart=visitor-chart] {
                      --color-desktop: var(--chart-1);
                      --color-mobile: var(--chart-2);
                    }

                    .dark [data-chart=visitor-chart] {
                      --color-desktop: var(--chart-1);
                      --color-mobile: var(--chart-2);
                    }
                  `}</style>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart 
                      data={currentChartData} 
                      margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={1} />
                          <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid horizontal={true} vertical={false} stroke="#ccc" />
                      <XAxis 
                        dataKey="date" 
                        tickLine={false}
                        axisLine={false}
                        dy={8}
                        minTickGap={5}
                        interval="preserveStartEnd"
                      />
                      <Tooltip 
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
                                <div className="font-medium">{label}</div>
                                <div className="grid gap-1.5">
                                  {payload.map((entry, index) => (
                                    <div key={index} className="flex w-full flex-wrap gap-2 items-center">
                                      <div 
                                        className="shrink-0 rounded-[2px] h-2.5 w-2.5" 
                                        style={{ 
                                          backgroundColor: entry.dataKey === 'desktop' ? 'var(--color-desktop)' : 'var(--color-mobile)',
                                          border: `1px solid ${entry.dataKey === 'desktop' ? 'var(--color-desktop)' : 'var(--color-mobile)'}`
                                        }}
                                      />
                                      <div className="flex flex-1 justify-between leading-none items-center">
                                        <div className="grid gap-1.5">
                                          <span className="text-muted-foreground">
                                            {entry.dataKey === 'desktop' ? '桌面端' : '移动端'}
                                          </span>
                                        </div>
                                        <span className="font-mono font-medium tabular-nums text-foreground">
                                          {entry.value}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="mobile"
                        stackId="1"
                        stroke="var(--color-mobile)"
                        fill="url(#fillMobile)"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="desktop"
                        stackId="1"
                        stroke="var(--color-desktop)"
                        fill="url(#fillDesktop)"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
              </div>
            </div>
          
          {/* 表格内容 */}
            <div className="space-y-6">
              <Tabs defaultValue="all" className="w-full">
                <TabsList>
                  <TabsTrigger value="all">全部用户</TabsTrigger>
                  <TabsTrigger value="recent">最近注册</TabsTrigger>
                  <TabsTrigger value="active">活跃用户</TabsTrigger>
                  <TabsTrigger value="inactive">待激活</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-4">
                  <TableWrapper bordered className="overflow-x-auto">
                    <Table className="min-w-max">
                      <TableHeader>
                        <TableRow>
                          <TableHead cellWidth="fit">ID</TableHead>
                          <TableHead cellWidth="fit">姓名</TableHead>
                          <TableHead cellWidth="fit">邮箱</TableHead>
                          <TableHead cellWidth="fit">部门</TableHead>
                          <TableHead cellWidth="fit">状态</TableHead>
                          <TableHead cellWidth="fit">创建时间</TableHead>
                          <TableHead cellWidth="fit">最后登录</TableHead>
                          <TableHead cellWidth="fit">操作</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockUsers.map((user) => (
                          <TableRow key={user.id}>
                            <IdCell id={user.id} cellWidth="fit" />
                            <NameCell name={user.name} cellWidth="fit" />
                            <TableCell cellWidth="fit">{user.email}</TableCell>
                            <TableCell cellWidth="fit">{user.role}</TableCell>
                            <StatusCell 
                              status={getStatusText(user.status)} 
                              variant={getStatusVariant(user.status)}
                              cellWidth="fit"
                            />
                            <TableCell cellWidth="fit">{user.createTime}</TableCell>
                            <TableCell cellWidth="fit">{user.lastLogin}</TableCell>
                            <ActionButtonsCell
                              cellWidth="fit"
                              actions={[
                                {
                                  label: '编辑',
                                  onClick: () => handleEditUser(user.id)
                                },
                                {
                                  label: '删除',
                                  onClick: () => handleDeleteUser(user.id),
                                  variant: 'destructive'
                                }
                              ]}
                            />
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableWrapper>
                </TabsContent>

                <TabsContent value="recent" className="mt-4">
                  <TableWrapper bordered className="overflow-x-auto">
                    <Table className="min-w-max">
                      <TableHeader>
                        <TableRow>
                          <TableHead cellWidth="fit">ID</TableHead>
                          <TableHead cellWidth="fit">姓名</TableHead>
                          <TableHead cellWidth="fit">注册时间</TableHead>
                          <TableHead cellWidth="fit">注册来源</TableHead>
                          <TableHead cellWidth="fit">状态</TableHead>
                          <TableHead cellWidth="fit">操作</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <IdCell id={6} cellWidth="fit" />
                          <NameCell name="陈八" cellWidth="fit" />
                          <TableCell cellWidth="fit">2024-01-21 15:30</TableCell>
                          <TableCell cellWidth="fit">官网注册</TableCell>
                          <StatusCell status="待审核" variant="warning" cellWidth="fit" />
                          <ActionButtonsCell
                            cellWidth="fit"
                            actions={[
                              {
                                label: '审核',
                                onClick: () => console.log('审核用户')
                              }
                            ]}
                          />
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableWrapper>
                </TabsContent>

                <TabsContent value="active" className="mt-4">
                  <TableWrapper bordered className="overflow-x-auto">
                    <Table className="min-w-max">
                      <TableHeader>
                        <TableRow>
                          <TableHead cellWidth="fit">ID</TableHead>
                          <TableHead cellWidth="fit">姓名</TableHead>
                          <TableHead cellWidth="fit">最近登录</TableHead>
                          <TableHead cellWidth="fit">活跃度</TableHead>
                          <TableHead cellWidth="fit">状态</TableHead>
                          <TableHead cellWidth="fit">操作</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <IdCell id={7} cellWidth="fit" />
                          <NameCell name="孙九" cellWidth="fit" />
                          <TableCell cellWidth="fit">10分钟前</TableCell>
                          <TableCell cellWidth="fit">高</TableCell>
                          <StatusCell status="活跃" variant="success" cellWidth="fit" />
                          <ActionButtonsCell
                            cellWidth="fit"
                            actions={[
                              {
                                label: '查看详情',
                                onClick: () => console.log('查看详情')
                              }
                            ]}
                          />
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableWrapper>
                </TabsContent>

                <TabsContent value="inactive" className="mt-4">
                  <TableWrapper bordered className="overflow-x-auto">
                    <Table className="min-w-max">
                      <TableHeader>
                        <TableRow>
                          <TableHead cellWidth="fit">ID</TableHead>
                          <TableHead cellWidth="fit">姓名</TableHead>
                          <TableHead cellWidth="fit">注册时间</TableHead>
                          <TableHead cellWidth="fit">未激活原因</TableHead>
                          <TableHead cellWidth="fit">状态</TableHead>
                          <TableHead cellWidth="fit">操作</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <IdCell id={8} cellWidth="fit" />
                          <NameCell name="周十" cellWidth="fit" />
                          <TableCell cellWidth="fit">2024-01-20</TableCell>
                          <TableCell cellWidth="fit">邮箱未验证</TableCell>
                          <StatusCell status="待激活" variant="destructive" cellWidth="fit" />
                          <ActionButtonsCell
                            cellWidth="fit"
                            actions={[
                              {
                                label: '发送提醒',
                                onClick: () => console.log('发送提醒')
                              }
                            ]}
                          />
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableWrapper>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </PageContainer>
    </div>
  );
};

export default Demo; 