import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FileX } from 'lucide-react';

import { 
  TableWrapper,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  CheckboxCell,
  CheckboxHeaderCell,
  ActionCell,
  TableEmptyState,
  TablePagination,
  TableWithPagination,
  Button,
  Checkbox,
  Tag,
} from '../../components/ui';
import type { PaginationState } from '../../components/ui';

const meta = {
  title: 'Data Display/Table',
  component: Table,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story - basic table
export const Default: Story = {
  render: () => (
    <div className="p-6">
      <TableWrapper bordered>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead variant="status">Status</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell variant="status">
                <Tag variant="success">Active</Tag>
              </TableCell>
              <TableCell>john@example.com</TableCell>
              <TableCell>Admin</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Jane Smith</TableCell>
              <TableCell variant="status">
                <Tag variant="destructive">Inactive</Tag>
              </TableCell>
              <TableCell>jane@example.com</TableCell>
              <TableCell>User</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Bob Johnson</TableCell>
              <TableCell variant="status">
                <Tag variant="warning">Pending</Tag>
              </TableCell>
              <TableCell>bob@example.com</TableCell>
              <TableCell>Moderator</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableWrapper>
    </div>
  ),
};

// Page-level sticky header table - 页面级粘性表头
export const PageStickyHeader: Story = {
  render: () => (
    <div className="p-6">
      {/* 为页面级粘性表头创建特殊的容器，保持圆角边框但不影响sticky定位 */}
      <TableWrapper bordered pageStickyHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                产品名称
              </TableHead>
              <TableHead variant="numeric">
                价格
              </TableHead>
              <TableHead variant="numeric">
                库存
              </TableHead>
              <TableHead>
                分类
              </TableHead>
              <TableHead>
                上架日期
              </TableHead>
              <TableHead variant="status">
                状态
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 15 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>产品 {i + 1}</TableCell>
                <TableCell variant="numeric">¥{(Math.random() * 1000).toFixed(2)}</TableCell>
                <TableCell variant="numeric">{Math.floor(Math.random() * 500)}</TableCell>
                <TableCell>电子产品</TableCell>
                <TableCell>2024-{String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-{String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}</TableCell>
                <TableCell variant="status">
                  <Tag variant={
                    i % 3 === 0 ? 'success' :
                    i % 3 === 1 ? 'destructive' :
                    'warning'
                  }>
                    {i % 3 === 0 ? '在售' : i % 3 === 1 ? '缺货' : '预售'}
                  </Tag>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// Table with checkboxes and actions - 重新设计以确保对齐
export const WithSelectableRows: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    
    const data = [
      { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
      { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator' },
      { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'User' },
    ];

    const handleSelectAll = (checked: boolean) => {
      setSelectAll(checked);
      setSelectedRows(checked ? data.map(item => item.id) : []);
    };

    const handleRowSelect = (id: string, checked: boolean) => {
      if (checked) {
        setSelectedRows([...selectedRows, id]);
      } else {
        setSelectedRows(selectedRows.filter(rowId => rowId !== id));
        setSelectAll(false);
      }
    };

    return (
      <div className="p-6">
        <TableWrapper bordered>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16 p-0 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Checkbox
                      checked={selectAll}
                      onCheckedChange={(checked) => handleSelectAll(!!checked)}
                      aria-label="Select all"
                    />
                  </div>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow 
                  key={item.id}
                  className={selectedRows.includes(item.id) ? "bg-muted/50" : ""}
                >
                  <TableCell className="w-16 p-0 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Checkbox
                        checked={selectedRows.includes(item.id)}
                        onCheckedChange={(checked) => handleRowSelect(item.id, !!checked)}
                        aria-label={`Select ${item.name}`}
                      />
                    </div>
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="link" size="sm" className="h-auto p-0 text-sm">
                        Edit
                      </Button>
                      <Button variant="link" size="sm" className="h-auto p-0 text-sm">
                        View
                      </Button>
                      <Button variant="link" size="sm" className="h-auto p-0 text-sm text-destructive">
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrapper>
      </div>
    );
  },
};

// Empty state table
export const EmptyState: Story = {
  render: () => (
    <div className="p-6">
      <TableWrapper bordered>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={4}>
                <TableEmptyState
                  icon={<FileX className="h-10 w-10" />}
                  title="No users found"
                  description="There are no users in your workspace yet. Invite some users to get started."
                  action={
                    <Button>
                      Invite Users
                    </Button>
                  }
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableWrapper>
    </div>
  ),
};

// Horizontal scroll - 多列横向滚动
export const HorizontalScroll: Story = {
  render: () => (
    <div className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">多列数据表格 - 横向滚动</h3>
        <p className="text-sm text-muted-foreground">
          当列数很多时，表格会自动显示横向滚动条。尝试在较小的屏幕或容器中查看效果。
        </p>
      </div>
      
      <TableWrapper bordered>
        <Table className="min-w-max">
          <TableHeader>
            <TableRow>
              <TableHead cellWidth="fit">ID</TableHead>
              <TableHead cellWidth="fit">姓名</TableHead>
              <TableHead cellWidth="fit">邮箱地址</TableHead>
              <TableHead cellWidth="fit">年龄</TableHead>
              <TableHead cellWidth="fit">部门</TableHead>
              <TableHead cellWidth="fit">职位</TableHead>
              <TableHead cellWidth="fit">联系电话</TableHead>
              <TableHead cellWidth="fit">入职日期</TableHead>
              <TableHead cellWidth="fit">薪资等级</TableHead>
              <TableHead cellWidth="fit">工作地点</TableHead>
              <TableHead cellWidth="fit" variant="status">状态</TableHead>
              <TableHead cellWidth="fit">上级主管</TableHead>
              <TableHead cellWidth="fit">项目组</TableHead>
              <TableHead cellWidth="auto">备注信息</TableHead>
              <TableHead cellWidth="fit">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 8 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell cellWidth="fit">{1001 + i}</TableCell>
                <TableCell cellWidth="fit">员工{i + 1}</TableCell>
                <TableCell cellWidth="fit">employee{i + 1}@company.com</TableCell>
                <TableCell cellWidth="fit" variant="numeric">{25 + i}</TableCell>
                <TableCell cellWidth="fit">技术部</TableCell>
                <TableCell cellWidth="fit">
                  {i % 3 === 0 ? '高级工程师' : i % 3 === 1 ? '前端工程师' : '后端工程师'}
                </TableCell>
                <TableCell cellWidth="fit">+86 138-{String(1000 + i * 11).padStart(4, '0')}-{String(5678 + i).padStart(4, '0')}</TableCell>
                <TableCell cellWidth="fit" variant="date">2024-0{(i % 6) + 1}-{String(10 + i).padStart(2, '0')}</TableCell>
                <TableCell cellWidth="fit">P{(i % 4) + 6}</TableCell>
                <TableCell cellWidth="fit">
                  {i % 2 === 0 ? '北京总部' : '上海分部'}
                </TableCell>
                <TableCell cellWidth="fit" variant="status">
                  <Tag variant={
                    i % 3 === 0 ? 'success' :
                    i % 3 === 1 ? 'primary' :
                    'warning'
                  }>
                    {i % 3 === 0 ? '在职' : i % 3 === 1 ? '试用期' : '请假中'}
                  </Tag>
                </TableCell>
                <TableCell cellWidth="fit">主管{Math.floor(i / 2) + 1}</TableCell>
                <TableCell cellWidth="fit">项目组 {String.fromCharCode(65 + (i % 3))}</TableCell>
                <TableCell cellWidth="auto">
                  {i % 2 === 0 ? '表现优秀，积极主动' : '技术能力强，团队协作佳'}
                </TableCell>
                <TableCell cellWidth="fit">
                  <div className="flex items-center gap-1">
                    <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                      查看
                    </Button>
                    <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                      编辑
                    </Button>
                    <Button variant="link" size="sm" className="h-auto p-0 text-xs text-destructive">
                      删除
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>
    </div>
  ),
}; 


// Column width guide - 列宽选型指南
export const ColumnWidthGuide: Story = {
  render: () => (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">列宽选型指南</h3>
        
        {/* 场景一：表格不超过容器宽度 */}
        <div className="mb-6">
          <h4 className="text-md font-medium mb-2">场景一：表格宽度 ≤ 容器宽度</h4>
          <p className="text-sm text-muted-foreground mb-3">优先基于各个字段的宽度情况来选择一个合适的固定宽度，最后一个列使用auto，把容器宽度占满。</p>
          
          <TableWrapper bordered>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead cellWidth="xs">ID</TableHead>
                  <TableHead cellWidth="sm">姓名</TableHead>
                  <TableHead cellWidth="md">电话</TableHead>
                  <TableHead cellWidth="sm">状态</TableHead>
                  <TableHead cellWidth="auto">备注说明</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell cellWidth="xs">001</TableCell>
                  <TableCell cellWidth="sm">张三</TableCell>
                  <TableCell cellWidth="md">138-0000-0000</TableCell>
                  <TableCell cellWidth="sm">活跃</TableCell>
                  <TableCell cellWidth="auto">这是一段较长的备注说明，会占用剩余的所有可用空间</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableWrapper>
        </div>

        {/* 场景二：表格超过容器宽度 */}
        <div>
          <h4 className="text-md font-medium mb-2">场景二：表格宽度 &gt; 容器宽度</h4>
          <p className="text-sm text-muted-foreground mb-3">若是宽度比较确定的字段（ID、电话号码、邮箱、日期 等等）优先使用fit (whitespace-nowrap)，如果宽度不是很确定的，则基于这个字段的数据的最大多数的长度的情况，来指定一个合适的固定宽度。</p>
          
          <TableWrapper bordered>
            <Table className="min-w-max">
              <TableHeader>
                <TableRow>
                  <TableHead cellWidth="fit">ID</TableHead>
                  <TableHead cellWidth="fit">姓名</TableHead>
                  <TableHead cellWidth="fit">邮箱</TableHead>
                  <TableHead cellWidth="fit">电话</TableHead>
                  <TableHead cellWidth="fit">职位描述</TableHead>
                  <TableHead cellWidth="fit">状态</TableHead>
                  <TableHead cellWidth="xl">详细备注</TableHead>
                  <TableHead cellWidth="fit">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell cellWidth="fit">1001</TableCell>
                  <TableCell cellWidth="fit">李四</TableCell>
                  <TableCell cellWidth="fit">lisi@example.com</TableCell>
                  <TableCell cellWidth="fit">138-1111-1111</TableCell>
                  <TableCell cellWidth="fit">高级前端开发工程师</TableCell>
                  <TableCell cellWidth="fit">在职</TableCell>
                  <TableCell cellWidth="xl">负责核心业务模块开发，主导多个重要项目，技术能力强，团队协作良好，具备良好的沟通能力</TableCell>
                  <TableCell cellWidth="fit">
                    <div className="flex items-center gap-1">
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs">编辑</Button>
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs text-destructive">删除</Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell cellWidth="fit">1002</TableCell>
                  <TableCell cellWidth="fit">王五</TableCell>
                  <TableCell cellWidth="fit">wangwu@example.com</TableCell>
                  <TableCell cellWidth="fit">139-2222-2222</TableCell>
                  <TableCell cellWidth="fit">UI设计师</TableCell>
                  <TableCell cellWidth="fit">试用期</TableCell>
                  <TableCell cellWidth="xl">新入职员工，设计能力优秀</TableCell>
                  <TableCell cellWidth="fit">
                    <div className="flex items-center gap-1">
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs">编辑</Button>
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs text-destructive">删除</Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell cellWidth="fit">1003</TableCell>
                  <TableCell cellWidth="fit">赵六</TableCell>
                  <TableCell cellWidth="fit">zhaoliu@example.com</TableCell>
                  <TableCell cellWidth="fit">137-3333-3333</TableCell>
                  <TableCell cellWidth="fit">产品经理</TableCell>
                  <TableCell cellWidth="fit">在职</TableCell>
                  <TableCell cellWidth="xl">资深产品经理，负责多条产品线规划与设计，具备丰富的行业经验和敏锐的市场洞察力，擅长跨部门协调与项目推进，深受团队信任</TableCell>
                  <TableCell cellWidth="fit">
                    <div className="flex items-center gap-1">
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs">编辑</Button>
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs text-destructive">删除</Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableWrapper>
        </div>
      </div>
    </div>
  ),
};

// Left sticky columns - 左侧冻结列
export const LeftStickyColumns: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    
    const data = [
      { id: '1001', name: '张三', email: 'zhangsan@company.com', phone: '138-0000-0001', department: '技术部', position: '高级前端工程师', salary: 'P7', location: '北京总部', manager: '李经理', project: '项目A', status: 'active', notes: '技术能力强，具备良好的团队协作能力，负责核心业务模块开发' },
      { id: '1002', name: '李四', email: 'lisi@company.com', phone: '138-0000-0002', department: '产品部', position: '产品经理', salary: 'P6', location: '上海分部', manager: '王经理', project: '项目B', status: 'active', notes: '产品思维敏锐，用户体验意识强，善于跨部门沟通协调' },
      { id: '1003', name: '王五', email: 'wangwu@company.com', phone: '138-0000-0003', department: '设计部', position: 'UI设计师', salary: 'P5', location: '深圳分部', manager: '陈经理', project: '项目C', status: 'trial', notes: '设计功底扎实，对新技术敏感，具备较强的学习能力' },
      { id: '1004', name: '赵六', email: 'zhaoliu@company.com', phone: '138-0000-0004', department: '运营部', position: '运营专员', salary: 'P4', location: '广州分部', manager: '刘经理', project: '项目D', status: 'leave', notes: '数据分析能力强，运营策略制定经验丰富' },
      { id: '1005', name: '钱七', email: 'qianqi@company.com', phone: '138-0000-0005', department: '销售部', position: '销售代表', salary: 'P5', location: '北京总部', manager: '周经理', project: '项目E', status: 'active', notes: '沟通能力优秀，客户维护经验丰富，业绩表现突出' },
    ];

    const handleSelectAll = (checked: boolean) => {
      setSelectAll(checked);
      setSelectedRows(checked ? data.map(item => item.id) : []);
    };

    const handleRowSelect = (id: string, checked: boolean) => {
      if (checked) {
        setSelectedRows([...selectedRows, id]);
      } else {
        setSelectedRows(selectedRows.filter(rowId => rowId !== id));
        setSelectAll(false);
      }
    };

    const getStatusText = (status: string) => {
      switch (status) {
        case 'active': return '在职';
        case 'trial': return '试用期';
        case 'leave': return '请假中';
        default: return status;
      }
    };

    return (
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">左侧列冻结</h3>
          <p className="text-sm text-muted-foreground">
            选择框和姓名列被冻结在左侧，水平滚动时保持固定位置。适用于需要在浏览大量数据时保持关键信息可见的场景。
          </p>
        </div>
        
        <TableWrapper bordered>
          <Table className="min-w-max">
            <TableHeader>
              <TableRow>
                <CheckboxHeaderCell 
                  stickyLeft
                  checked={selectAll}
                  onCheckedChange={(checked) => handleSelectAll(!!checked)}
                  aria-label="Select all"
                />
                <TableHead stickyLeft cellWidth="fit">姓名</TableHead>
                <TableHead cellWidth="fit">邮箱地址</TableHead>
                <TableHead cellWidth="fit">联系电话</TableHead>
                <TableHead cellWidth="fit">部门</TableHead>
                <TableHead cellWidth="fit">职位</TableHead>
                <TableHead cellWidth="fit">薪资等级</TableHead>
                <TableHead cellWidth="fit">工作地点</TableHead>
                <TableHead cellWidth="fit">上级主管</TableHead>
                <TableHead cellWidth="fit">项目组</TableHead>
                <TableHead cellWidth="fit" variant="status">状态</TableHead>
                <TableHead cellWidth="auto">备注信息</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <CheckboxCell
                    stickyLeft
                    checked={selectedRows.includes(item.id)}
                    onCheckedChange={(checked) => handleRowSelect(item.id, !!checked)}
                    aria-label={`Select ${item.name}`}
                  />
                  <TableCell stickyLeft cellWidth="fit">{item.name}</TableCell>
                  <TableCell cellWidth="fit">{item.email}</TableCell>
                  <TableCell cellWidth="fit">{item.phone}</TableCell>
                  <TableCell cellWidth="fit">{item.department}</TableCell>
                  <TableCell cellWidth="fit">{item.position}</TableCell>
                  <TableCell cellWidth="fit">{item.salary}</TableCell>
                  <TableCell cellWidth="fit">{item.location}</TableCell>
                  <TableCell cellWidth="fit">{item.manager}</TableCell>
                  <TableCell cellWidth="fit">{item.project}</TableCell>
                  <TableCell cellWidth="fit" variant="status">
                    <Tag variant={
                      item.status === 'active' ? 'success' :
                      item.status === 'trial' ? 'primary' :
                      item.status === 'leave' ? 'warning' :
                      'default'
                    }>
                      {getStatusText(item.status)}
                    </Tag>
                  </TableCell>
                  <TableCell cellWidth="auto">{item.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrapper>
      </div>
    );
  },
};

// Right sticky columns - 右侧冻结列
export const RightStickyColumns: Story = {
  render: () => {
    const data = [
      { id: '1001', name: '张三', email: 'zhangsan@company.com', phone: '138-0000-0001', department: '技术部', position: '高级前端工程师', salary: 'P7', location: '北京总部', manager: '李经理', project: '项目A', status: 'active', notes: '技术能力强，具备良好的团队协作能力' },
      { id: '1002', name: '李四', email: 'lisi@company.com', phone: '138-0000-0002', department: '产品部', position: '产品经理', salary: 'P6', location: '上海分部', manager: '王经理', project: '项目B', status: 'active', notes: '产品思维敏锐，用户体验意识强' },
      { id: '1003', name: '王五', email: 'wangwu@company.com', phone: '138-0000-0003', department: '设计部', position: 'UI设计师', salary: 'P5', location: '深圳分部', manager: '陈经理', project: '项目C', status: 'trial', notes: '设计功底扎实，对新技术敏感' },
      { id: '1004', name: '赵六', email: 'zhaoliu@company.com', phone: '138-0000-0004', department: '运营部', position: '运营专员', salary: 'P4', location: '广州分部', manager: '刘经理', project: '项目D', status: 'leave', notes: '数据分析能力强，运营策略制定经验丰富' },
      { id: '1005', name: '钱七', email: 'qianqi@company.com', phone: '138-0000-0005', department: '销售部', position: '销售代表', salary: 'P5', location: '北京总部', manager: '周经理', project: '项目E', status: 'active', notes: '沟通能力优秀，客户维护经验丰富' },
    ];

    const getStatusText = (status: string) => {
      switch (status) {
        case 'active': return '在职';
        case 'trial': return '试用期';
        case 'leave': return '请假中';
        default: return status;
      }
    };

    return (
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">右侧列冻结</h3>
          <p className="text-sm text-muted-foreground">
            状态和操作列被冻结在右侧，水平滚动时保持固定位置。适用于需要在浏览大量数据时保持操作按钮始终可见的场景。
          </p>
        </div>
        
        <TableWrapper bordered>
          <Table className="min-w-max">
            <TableHeader>
              <TableRow>
                <TableHead cellWidth="fit">ID</TableHead>
                <TableHead cellWidth="fit">姓名</TableHead>
                <TableHead cellWidth="fit">邮箱地址</TableHead>
                <TableHead cellWidth="fit">联系电话</TableHead>
                <TableHead cellWidth="fit">部门</TableHead>
                <TableHead cellWidth="fit">职位</TableHead>
                <TableHead cellWidth="fit">薪资等级</TableHead>
                <TableHead cellWidth="fit">工作地点</TableHead>
                <TableHead cellWidth="fit">上级主管</TableHead>
                <TableHead cellWidth="fit">项目组</TableHead>
                <TableHead cellWidth="auto">备注信息</TableHead>
                <TableHead cellWidth="fit" variant="status">状态</TableHead>
                <TableHead stickyRight cellWidth="fit" style={{ right: '0px' }}>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell cellWidth="fit">{item.id}</TableCell>
                  <TableCell cellWidth="fit">{item.name}</TableCell>
                  <TableCell cellWidth="fit">{item.email}</TableCell>
                  <TableCell cellWidth="fit">{item.phone}</TableCell>
                  <TableCell cellWidth="fit">{item.department}</TableCell>
                  <TableCell cellWidth="fit">{item.position}</TableCell>
                  <TableCell cellWidth="fit">{item.salary}</TableCell>
                  <TableCell cellWidth="fit">{item.location}</TableCell>
                  <TableCell cellWidth="fit">{item.manager}</TableCell>
                  <TableCell cellWidth="fit">{item.project}</TableCell>
                  <TableCell cellWidth="auto">{item.notes}</TableCell>
                  <TableCell cellWidth="fit" variant="status">
                    <Tag variant={
                      item.status === 'active' ? 'success' :
                      item.status === 'trial' ? 'primary' :
                      item.status === 'leave' ? 'warning' :
                      'default'
                    }>
                      {getStatusText(item.status)}
                    </Tag>
                  </TableCell>
                  <ActionCell 
                    stickyRight
                    style={{ right: '0px' }}
                    actions={[
                      { label: '查看', onClick: () => console.log('查看', item.name) },
                      { label: '编辑', onClick: () => console.log('编辑', item.name) },
                      { label: '删除', onClick: () => console.log('删除', item.name), variant: 'destructive' },
                    ]}
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrapper>
      </div>
    );
  },
};

// 新增：分页表格故事
export const WithPagination: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    
    // 生成更多数据用于分页演示
    const allData = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `员工${i + 1}`,
      email: `employee${i + 1}@company.com`,
      role: ['管理员', '用户', '编辑'][i % 3],
      status: ['active', 'inactive', 'pending'][i % 3],
      createTime: `2024-${String(Math.floor(i / 10) + 1).padStart(2, '0')}-${String((i % 10) + 1).padStart(2, '0')}`,
    }));

    // 分页逻辑
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData = allData.slice(startIndex, endIndex);

    const pagination: PaginationState = {
      current: currentPage,
      pageSize: pageSize,
      total: allData.length,
    };

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };

    const getStatusVariant = (status: string) => {
      switch (status) {
        case 'active': return 'success';
        case 'inactive': return 'destructive';
        case 'pending': return 'warning';
        default: return 'default';
      }
    };

    const getStatusText = (status: string) => {
      switch (status) {
        case 'active': return '活跃';
        case 'inactive': return '非活跃';
        case 'pending': return '待审核';
        default: return status;
      }
    };

    return (
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">带分页的表格</h3>
          <p className="text-sm text-muted-foreground mb-4">
            演示表格与分页组件的集成使用，支持自动分页逻辑和页码切换。
          </p>
        </div>

        {/* 使用 TablePagination 组件的方式 */}
        <div className="space-y-4">
          <TableWrapper bordered>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead cellWidth="xs">ID</TableHead>
                  <TableHead cellWidth="sm">姓名</TableHead>
                  <TableHead cellWidth="md">邮箱</TableHead>
                  <TableHead cellWidth="sm">角色</TableHead>
                  <TableHead cellWidth="sm">状态</TableHead>
                  <TableHead cellWidth="sm">创建时间</TableHead>
                  <TableHead cellWidth="sm">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell cellWidth="xs" className="font-mono text-muted-foreground">
                      {item.id}
                    </TableCell>
                    <TableCell cellWidth="sm">{item.name}</TableCell>
                    <TableCell cellWidth="md">{item.email}</TableCell>
                    <TableCell cellWidth="sm">{item.role}</TableCell>
                    <TableCell cellWidth="sm">
                      <Tag variant={getStatusVariant(item.status)}>
                        {getStatusText(item.status)}
                      </Tag>
                    </TableCell>
                    <TableCell cellWidth="sm">{item.createTime}</TableCell>
                    <TableCell cellWidth="sm">
                      <div className="flex items-center gap-2">
                        <Button variant="link" size="sm" className="h-auto p-0 text-sm">
                          编辑
                        </Button>
                        <Button variant="link" size="sm" className="h-auto p-0 text-sm text-destructive">
                          删除
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableWrapper>

          <TablePagination
            pagination={pagination}
            onPageChange={handlePageChange}
            showTotal={(total, range) => `共 ${total} 条记录，显示第 ${range[0]}-${range[1]} 条`}
          />
        </div>
      </div>
    );
  },
};

// 新增：一体化分页表格故事
export const IntegratedPagination: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;
    
    // 生成数据
    const allData = Array.from({ length: 73 }, (_, i) => ({
      id: i + 1,
      name: `用户${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ['管理员', '用户', '编辑', '访客'][i % 4],
      status: ['active', 'inactive', 'pending'][i % 3],
      lastLogin: i % 5 === 0 ? '从未登录' : `2024-01-${String((i % 28) + 1).padStart(2, '0')} ${String((i % 12) + 10).padStart(2, '0')}:${String((i % 60)).padStart(2, '0')}`,
    }));

    const pagination: PaginationState = {
      current: currentPage,
      pageSize: pageSize,
      total: allData.length,
    };

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };

    const getStatusVariant = (status: string) => {
      switch (status) {
        case 'active': return 'success';
        case 'inactive': return 'destructive';
        case 'pending': return 'warning';
        default: return 'default';
      }
    };

    const getStatusText = (status: string) => {
      switch (status) {
        case 'active': return '活跃';
        case 'inactive': return '非活跃';
        case 'pending': return '待审核';
        default: return status;
      }
    };

    // 当前页数据
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData = allData.slice(startIndex, endIndex);

    return (
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">一体化分页表格</h3>
          <p className="text-sm text-muted-foreground mb-4">
            使用 TableWithPagination 组件，将表格和分页功能整合在一起，提供更简洁的 API。
          </p>
        </div>

        <TableWithPagination
          data={allData}
          columns={[]} // 在实际使用中可以定义列配置
          pagination={pagination}
          onPageChange={handlePageChange}
          wrapperProps={{ bordered: true }}
        >
          <TableHeader>
            <TableRow>
              <TableHead cellWidth="xs">ID</TableHead>
              <TableHead cellWidth="sm">用户名</TableHead>
              <TableHead cellWidth="md">邮箱</TableHead>
              <TableHead cellWidth="sm">角色</TableHead>
              <TableHead cellWidth="sm">状态</TableHead>
              <TableHead cellWidth="md">最后登录</TableHead>
              <TableHead cellWidth="sm">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((item) => (
              <TableRow key={item.id}>
                <TableCell cellWidth="xs" className="font-mono text-muted-foreground">
                  {item.id}
                </TableCell>
                <TableCell cellWidth="sm">{item.name}</TableCell>
                <TableCell cellWidth="md">{item.email}</TableCell>
                <TableCell cellWidth="sm">{item.role}</TableCell>
                <TableCell cellWidth="sm">
                  <Tag variant={getStatusVariant(item.status)}>
                    {getStatusText(item.status)}
                  </Tag>
                </TableCell>
                <TableCell cellWidth="md">{item.lastLogin}</TableCell>
                <TableCell cellWidth="sm">
                  <div className="flex items-center gap-1">
                    <Button variant="link" size="sm" className="h-auto p-0 text-sm">
                      编辑
                    </Button>
                    <Button variant="link" size="sm" className="h-auto p-0 text-sm text-destructive">
                      删除
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableWithPagination>
      </div>
    );
  },
};

// 新增：自定义分页信息显示
export const CustomPaginationInfo: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;
    
    const allData = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      product: `产品 ${i + 1}`,
      price: (Math.random() * 1000).toFixed(2),
      stock: Math.floor(Math.random() * 500),
      category: ['电子产品', '服装', '家居', '书籍'][i % 4],
      status: ['在售', '缺货', '预售'][i % 3],
    }));

    const pagination: PaginationState = {
      current: currentPage,
      pageSize: pageSize,
      total: allData.length,
    };

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };

    const currentData = allData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">自定义分页信息</h3>
          <p className="text-sm text-muted-foreground mb-4">
            演示自定义分页信息显示格式，可以根据业务需求调整显示内容。
          </p>
        </div>

        <div className="space-y-4">
          <TableWrapper bordered>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead cellWidth="xs">ID</TableHead>
                  <TableHead cellWidth="md">产品名称</TableHead>
                  <TableHead cellWidth="sm" variant="numeric">价格</TableHead>
                  <TableHead cellWidth="sm" variant="numeric">库存</TableHead>
                  <TableHead cellWidth="sm">分类</TableHead>
                  <TableHead cellWidth="sm">状态</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell cellWidth="xs" className="font-mono text-muted-foreground">
                      {item.id}
                    </TableCell>
                    <TableCell cellWidth="md">{item.product}</TableCell>
                    <TableCell cellWidth="sm" variant="numeric">¥{item.price}</TableCell>
                    <TableCell cellWidth="sm" variant="numeric">{item.stock}</TableCell>
                    <TableCell cellWidth="sm">{item.category}</TableCell>
                    <TableCell cellWidth="sm">
                      <Tag variant={
                        item.status === '在售' ? 'success' :
                        item.status === '缺货' ? 'destructive' : 'warning'
                      }>
                        {item.status}
                      </Tag>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableWrapper>

          <TablePagination
            pagination={pagination}
            onPageChange={handlePageChange}
            showTotal={(total, range) => 
              `显示第 ${range[0]}-${range[1]} 项，共 ${total} 项产品`
            }
          />
        </div>
      </div>
    );
  },
};