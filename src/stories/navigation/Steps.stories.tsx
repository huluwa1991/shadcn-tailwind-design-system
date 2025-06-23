import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Steps, type StepItem } from '../../components/ui';

const meta = {
  title: 'Navigation/Steps',
  component: Steps,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['default', 'sm'],
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    clickable: {
      control: 'boolean',
    },
    current: {
      control: { type: 'number', min: 0, max: 4 },
    },
  },
} satisfies Meta<typeof Steps>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicSteps: StepItem[] = [
  {
    id: 'step1',
    title: '个人信息',
    description: '填写您的基本信息',
  },
  {
    id: 'step2',
    title: '联系方式',
    description: '提供联系电话和邮箱',
  },
  {
    id: 'step3',
    title: '身份验证',
    description: '上传身份证明文件',
  },
  {
    id: 'step4',
    title: '完成注册',
    description: '确认信息并提交',
  },
];

export const Default: Story = {
  args: {
    steps: basicSteps,
    current: 1,
  },
  render: (args) => (
    <div className="w-full max-w-4xl">
      <Steps {...args} />
    </div>
  ),
};

export const Small: Story = {
  args: {
    steps: basicSteps,
    current: 1,
    size: 'sm',
  },
  render: (args) => (
    <div className="w-full max-w-4xl">
      <Steps {...args} />
    </div>
  ),
};

export const Clickable: Story = {
  args: {
    steps: basicSteps,
    current: 1,
    clickable: true,
  },
  render: (args) => {
    const [current, setCurrent] = useState(args.current || 0);
    
    return (
      <div className="w-full max-w-4xl">
        <Steps
          {...args}
          current={current}
          onStepClick={(step) => setCurrent(step)}
        />
      </div>
    );
  },
};

export const WithCustomStatus: Story = {
  args: {
    steps: [
      {
        id: 'step1',
        title: '订单确认',
        description: '确认订单信息',
        status: 'completed',
      },
      {
        id: 'step2',
        title: '付款',
        description: '选择付款方式',
        status: 'current',
      },
      {
        id: 'step3',
        title: '配送',
        description: '商品配送中',
        status: 'pending',
      },
      {
        id: 'step4',
        title: '完成',
        description: '订单完成',
        status: 'pending',
      },
    ],
  },
  render: (args) => (
    <div className="w-full max-w-4xl">
      <Steps {...args} />
    </div>
  ),
};

export const WithError: Story = {
  args: {
    steps: [
      {
        id: 'step1',
        title: '文件上传',
        description: '上传所需文件',
        status: 'completed',
      },
      {
        id: 'step2',
        title: '文件验证',
        description: '验证文件格式',
        status: 'error',
      },
      {
        id: 'step3',
        title: '处理完成',
        description: '文件处理完成',
        status: 'pending',
      },
    ],
  },
};



export const LongProcess: Story = {
  args: {
    steps: [
      {
        id: 'step1',
        title: '项目创建',
        description: '创建新项目',
      },
      {
        id: 'step2',
        title: '需求分析',
        description: '分析项目需求',
      },
      {
        id: 'step3',
        title: '设计阶段',
        description: 'UI/UX设计',
      },
      {
        id: 'step4',
        title: '开发阶段',
        description: '代码开发',
      },
      {
        id: 'step5',
        title: '测试阶段',
        description: '功能测试',
      },
      {
        id: 'step6',
        title: '部署上线',
        description: '项目上线',
      },
    ],
    current: 3,
    size: 'sm',
  },
};

export const Interactive: Story = {
  args: {
    steps: basicSteps,
  },
  render: () => {
    const [current, setCurrent] = useState(0);
    
    const handleNext = () => {
      if (current < basicSteps.length - 1) {
        setCurrent(current + 1);
      }
    };
    
    const handlePrev = () => {
      if (current > 0) {
        setCurrent(current - 1);
      }
    };
    
    const handleStepClick = (step: number) => {
      setCurrent(step);
    };
    
    return (
      <div className="space-y-8">
        <Steps
          steps={basicSteps}
          current={current}
          clickable
          onStepClick={handleStepClick}
        />
        <div className="flex gap-4 justify-center">
          <button
            onClick={handlePrev}
            disabled={current === 0}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
          >
            上一步
          </button>
          <button
            onClick={handleNext}
            disabled={current === basicSteps.length - 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
          >
            下一步
          </button>
        </div>
        <div className="text-center text-sm text-gray-600">
          当前步骤: {current + 1} / {basicSteps.length}
        </div>
      </div>
    );
  },
};

export const AllVariants: Story = {
  args: {
    steps: basicSteps,
  },
  render: () => {
    return (
      <div className="space-y-12 max-w-4xl">
        <div>
          <h3 className="text-lg font-medium mb-4">默认尺寸</h3>
          <Steps steps={basicSteps} current={1} />
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">小尺寸</h3>
          <Steps steps={basicSteps} current={1} size="sm" />
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">不同状态</h3>
          <Steps
            steps={[
              { id: '1', title: '已完成', description: '这一步已经完成', status: 'completed' },
              { id: '2', title: '当前步骤', description: '正在进行中', status: 'current' },
              { id: '3', title: '错误状态', description: '出现了错误', status: 'error' },
              { id: '4', title: '待完成', description: '还未开始', status: 'pending' },
            ]}
          />
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">无描述</h3>
          <Steps
            steps={[
              { id: '1', title: '步骤一' },
              { id: '2', title: '步骤二' },
              { id: '3', title: '步骤三' },
              { id: '4', title: '步骤四' },
            ]}
            current={2}
          />
        </div>
      </div>
    );
  },
};

// 纵向步骤条示例
export const Vertical: Story = {
  args: {
    steps: basicSteps,
    current: 1,
    orientation: 'vertical',
  },
  render: (args) => (
    <div className="max-w-md">
      <Steps {...args} />
    </div>
  ),
};

export const VerticalSmall: Story = {
  args: {
    steps: basicSteps,
    current: 1,
    orientation: 'vertical',
    size: 'sm',
  },
  render: (args) => (
    <div className="max-w-md">
      <Steps {...args} />
    </div>
  ),
};

export const VerticalClickable: Story = {
  args: {
    steps: basicSteps,
    current: 1,
    orientation: 'vertical',
    clickable: true,
  },
  render: (args) => {
    const [current, setCurrent] = useState(args.current || 0);
    
    return (
      <div className="max-w-md">
        <Steps
          {...args}
          current={current}
          onStepClick={(step) => setCurrent(step)}
        />
      </div>
    );
  },
};

export const VerticalWithCustomStatus: Story = {
  args: {
    steps: [
      {
        id: 'step1',
        title: '需求分析',
        description: '收集和分析用户需求',
        status: 'completed',
      },
      {
        id: 'step2',
        title: '设计方案',
        description: '制定详细的设计方案',
        status: 'completed',
      },
      {
        id: 'step3',
        title: '开发实现',
        description: '按照设计方案进行开发',
        status: 'current',
      },
      {
        id: 'step4',
        title: '测试验收',
        description: '功能测试和用户验收',
        status: 'pending',
      },
      {
        id: 'step5',
        title: '部署上线',
        description: '正式部署到生产环境',
        status: 'pending',
      },
    ],
    orientation: 'vertical',
  },
  render: (args) => (
    <div className="max-w-md">
      <Steps {...args} />
    </div>
  ),
};

export const VerticalWithError: Story = {
  args: {
    steps: [
      {
        id: 'step1',
        title: '数据准备',
        description: '准备所需的数据文件',
        status: 'completed',
      },
      {
        id: 'step2',
        title: '数据处理',
        description: '处理和清洗数据',
        status: 'error',
      },
      {
        id: 'step3',
        title: '结果输出',
        description: '生成最终结果',
        status: 'pending',
      },
    ],
    orientation: 'vertical',
  },
  render: (args) => (
    <div className="max-w-md">
      <Steps {...args} />
    </div>
  ),
};