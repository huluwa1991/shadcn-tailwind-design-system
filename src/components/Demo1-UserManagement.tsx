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
  MultiSelectItem
} from './ui';

// 模拟用户数据
const mockUsers = [
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    role: '管理员',
    status: 'active',
    createTime: '2024-01-15',
    lastLogin: '2024-01-20 14:30'
  },
  {
    id: 2,
    name: '李四',
    email: 'lisi@example.com',
    role: '用户',
    status: 'inactive',
    createTime: '2024-01-10',
    lastLogin: '2024-01-18 09:15'
  },
  {
    id: 3,
    name: '王五',
    email: 'wangwu@example.com',
    role: '编辑',
    status: 'active',
    createTime: '2024-01-05',
    lastLogin: '2024-01-19 16:45'
  },
  {
    id: 4,
    name: '赵六',
    email: 'zhaoliu@example.com',
    role: '用户',
    status: 'pending',
    createTime: '2024-01-12',
    lastLogin: '从未登录'
  },
  {
    id: 5,
    name: '钱七',
    email: 'qianqi@example.com',
    role: '管理员',
    status: 'active',
    createTime: '2024-01-08',
    lastLogin: '2024-01-20 11:20'
  }
];

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

// 角色选项配置
const roleOptions = [
  { value: 'admin', label: '管理员' },
  { value: 'editor', label: '编辑' },
  { value: 'user', label: '用户' },
];

// 角色标签映射
const roleLabels = roleOptions.reduce((acc, option) => {
  acc[option.value] = option.label;
  return acc;
}, {} as Record<string, string>);

export const Demo: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [isRoleSelectOpen, setIsRoleSelectOpen] = useState(false);

  const handleAddUser = () => {
    console.log('添加用户');
  };

  const handleExport = () => {
    console.log('导出数据');
  };

  const handleEditUser = (userId: number) => {
    console.log('编辑用户:', userId);
  };

  const handleDeleteUser = (userId: number) => {
    console.log('删除用户:', userId);
  };

  const handleRoleToggle = (value: string, selected: boolean) => {
    if (selected) {
      setSelectedRoles(prev => [...prev, value]);
    } else {
      setSelectedRoles(prev => prev.filter(v => v !== value));
    }
  };

  const handleRoleRemove = (value: string) => {
    setSelectedRoles(prev => prev.filter(v => v !== value));
  };

  return (
    <div className="flex h-screen w-full">
      {/* 侧边栏区域 */}
      <div>
        <Sidebar 
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
        />
      </div>
      
      {/* 主内容区域 */}
      <PageContainer variant="full">
          {/* 页面头部 */}
          <PageHeaderWrapper
            variant="title-with-toolbar"
            title="用户管理"
            filters={
              <>
                <SelectContainer>
                  <Select defaultValue="all-status">
                    <SelectTrigger>
                      <SelectValue placeholder="选择状态" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-status">全部状态</SelectItem>
                      <SelectItem value="active">活跃</SelectItem>
                      <SelectItem value="inactive">非活跃</SelectItem>
                      <SelectItem value="pending">待审核</SelectItem>
                    </SelectContent>
                  </Select>
                </SelectContainer>
                
                <SelectContainer>
                  <Select open={isRoleSelectOpen} onOpenChange={setIsRoleSelectOpen}>
                    <MultiSelectTrigger
                      display="text-only"
                      selectedValues={selectedRoles}
                      selectedLabels={roleLabels}
                      onRemoveValue={handleRoleRemove}
                      placeholder="选择角色"
                      maxDisplay={2}
                    />
                    <SelectContent>
                      {roleOptions.map((option) => (
                        <MultiSelectItem
                          key={option.value}
                          value={option.value}
                          selected={selectedRoles.includes(option.value)}
                          onToggle={handleRoleToggle}
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
                      <SelectItem value="recent-30">最近30天</SelectItem>
                      <SelectItem value="recent-7">最近7天</SelectItem>
                      <SelectItem value="recent-1">最近1天</SelectItem>
                      <SelectItem value="custom">自定义</SelectItem>
                    </SelectContent>
                  </Select>
                </SelectContainer>
              </>
            }
            toolbarActions={
              <>
                <Button variant="outline" onClick={handleExport}>
                  导出
                </Button>
                <Button onClick={handleAddUser}>
                  添加用户
                </Button>
              </>
            }
          />
          
          {/* 表格内容 */}
          <TableWrapper bordered className="overflow-x-auto">
            <Table className="min-w-max">
              <TableHeader>
                <TableRow>
                  <TableHead cellWidth="fit">ID</TableHead>
                  <TableHead cellWidth="fit">姓名</TableHead>
                  <TableHead cellWidth="fit">邮箱</TableHead>
                  <TableHead cellWidth="fit">角色</TableHead>
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
        </PageContainer>
    </div>
  );
};

export default Demo; 