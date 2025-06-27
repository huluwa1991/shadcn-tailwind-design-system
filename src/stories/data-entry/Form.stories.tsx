import { Meta, StoryObj } from "@storybook/react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { 
  Form, 
  FormRow,
  FormSection,
  FormHeader,
  FormTitle, 
  FormSubtitle,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormButtons,
} from "@/components/ui/data-entry/form"
import { Input } from "@/components/ui/data-entry/input"
import { Button } from "@/components/ui/base/button"


const meta = {
  title: "Data Entry/Form",
  component: Form,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Form>

export default meta
type Story = StoryObj<typeof meta>

// 定义表单验证 Schema
const formSchema = z.object({
  username: z.string().min(2, {
    message: "用户名至少需要2个字符",
  }),
  email: z.string().email({
    message: "请输入有效的邮箱地址",
  }),
  password: z.string().min(6, {
    message: "密码至少需要6个字符",
  }),
})

// 基础表单示例
export const BasicForm: Story = {
  render: () => {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        email: "",
        password: "",
      },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values)
    }

    return (
      <FormProvider {...form}>
        <Form onSubmit={form.handleSubmit(onSubmit)} className="w-[400px]">
          <FormItem>
            <FormLabel required>用户名</FormLabel>
            <FormControl name="username">
              <Input 
                {...form.register("username")} 
                placeholder="请输入用户名"
              />
            </FormControl>
            <FormMessage error>{form.formState.errors.username?.message}</FormMessage>
          </FormItem>

          <FormItem>
            <FormLabel required>邮箱</FormLabel>
            <FormControl name="email">
              <Input 
                {...form.register("email")} 
                type="email" 
                placeholder="请输入邮箱"
              />
            </FormControl>
            <FormMessage error>{form.formState.errors.email?.message}</FormMessage>
          </FormItem>

          <FormItem>
            <FormLabel required>密码</FormLabel>
            <FormControl name="password">
              <Input 
                {...form.register("password")} 
                type="password" 
                placeholder="请输入密码"
              />
            </FormControl>
            {!form.formState.errors.password && (
              <FormDescription>密码至少需要6个字符</FormDescription>
            )}
            <FormMessage error>{form.formState.errors.password?.message}</FormMessage>
          </FormItem>

          <Button type="submit" className="w-full">提交</Button>
        </Form>
      </FormProvider>
    )
  }
}

// 水平布局表单示例
export const HorizontalForm: Story = {
  render: () => {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        email: "",
        password: "",
      },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values)
    }

    return (
      <FormProvider {...form}>
        <Form onSubmit={form.handleSubmit(onSubmit)} className="w-[800px]">
          <FormRow>
            <FormItem>
              <FormLabel required>用户名</FormLabel>
              <FormControl name="username">
                <Input 
                  {...form.register("username")} 
                  placeholder="请输入用户名"
                />
              </FormControl>
              <FormMessage error>{form.formState.errors.username?.message}</FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel required>邮箱</FormLabel>
              <FormControl name="email">
                <Input 
                  {...form.register("email")} 
                  type="email" 
                  placeholder="请输入邮箱"
                />
              </FormControl>
              <FormMessage error>{form.formState.errors.email?.message}</FormMessage>
            </FormItem>
          </FormRow>

          <FormItem>
            <FormLabel required>密码</FormLabel>
            <FormControl name="password">
              <Input 
                {...form.register("password")} 
                type="password" 
                placeholder="请输入密码"
              />
            </FormControl>
            {!form.formState.errors.password && (
              <FormDescription>密码至少需要6个字符</FormDescription>
            )}
            <FormMessage error>{form.formState.errors.password?.message}</FormMessage>
          </FormItem>

          <Button type="submit" className="w-full">提交</Button>
        </Form>
      </FormProvider>
    )
  }
}

// 实时校验示例
export const RealTimeValidation: Story = {
  render: () => {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      mode: "onChange", // 启用实时校验
      defaultValues: {
        username: "",
        email: "",
        password: "",
      },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values)
    }

    return (
      <FormProvider {...form}>
        <Form onSubmit={form.handleSubmit(onSubmit)} className="w-[400px]">
          <FormItem>
            <FormLabel required>用户名</FormLabel>
            <FormControl name="username">
              <Input 
                {...form.register("username")} 
                placeholder="请输入用户名"
              />
            </FormControl>
            <FormMessage error>{form.formState.errors.username?.message}</FormMessage>
          </FormItem>

          <FormItem>
            <FormLabel required>邮箱</FormLabel>
            <FormControl name="email">
              <Input 
                {...form.register("email")} 
                type="email" 
                placeholder="请输入邮箱"
              />
            </FormControl>
            <FormMessage error>{form.formState.errors.email?.message}</FormMessage>
          </FormItem>

          <FormItem>
            <FormLabel required>密码</FormLabel>
            <FormControl name="password">
              <Input 
                {...form.register("password")} 
                type="password" 
                placeholder="请输入密码"
              />
            </FormControl>
            {!form.formState.errors.password && (
              <FormDescription>密码至少需要6个字符</FormDescription>
            )}
            <FormMessage error>{form.formState.errors.password?.message}</FormMessage>
          </FormItem>

          <Button type="submit" className="w-full">提交</Button>
        </Form>
      </FormProvider>
    )
  }
}

// 表单验证状态示例
export const ValidationStates: Story = {
  render: () => {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        email: "",
        password: "",
      },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values)
    }

    return (
      <FormProvider {...form}>
        <Form onSubmit={form.handleSubmit(onSubmit)} className="w-[400px]">
          <FormItem>
            <FormLabel required>用户名</FormLabel>
            <FormControl name="username">
              <Input 
                {...form.register("username")} 
                placeholder="请输入用户名"
              />
            </FormControl>
            <FormMessage error>{form.formState.errors.username?.message}</FormMessage>
          </FormItem>

          <FormItem>
            <FormLabel required>邮箱</FormLabel>
            <FormControl name="email">
              <Input 
                {...form.register("email")} 
                type="email" 
                placeholder="请输入邮箱"
              />
            </FormControl>
            <FormMessage error>{form.formState.errors.email?.message}</FormMessage>
          </FormItem>

          <FormItem>
            <FormLabel required>密码</FormLabel>
            <FormControl name="password">
              <Input 
                {...form.register("password")} 
                type="password" 
                placeholder="请输入密码"
              />
            </FormControl>
            {!form.formState.errors.password && (
              <FormDescription>密码至少需要6个字符</FormDescription>
            )}
            <FormMessage error>{form.formState.errors.password?.message}</FormMessage>
          </FormItem>

          <Button type="submit" className="w-full">提交</Button>
        </Form>
      </FormProvider>
    )
  }
}

// 禁用状态示例
export const DisabledForm: Story = {
  render: () => {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "john_doe",
        email: "john@example.com",
        password: "password123",
      },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values)
    }

    return (
      <FormProvider {...form}>
        <Form onSubmit={form.handleSubmit(onSubmit)} className="w-[400px]">
          <FormItem>
            <FormLabel required>用户名</FormLabel>
            <FormControl name="username">
              <Input 
                {...form.register("username")} 
                placeholder="请输入用户名"
                disabled
              />
            </FormControl>
            <FormMessage error>{form.formState.errors.username?.message}</FormMessage>
          </FormItem>

          <FormItem>
            <FormLabel required>邮箱</FormLabel>
            <FormControl name="email">
              <Input 
                {...form.register("email")} 
                type="email" 
                placeholder="请输入邮箱"
                disabled
              />
            </FormControl>
            <FormMessage error>{form.formState.errors.email?.message}</FormMessage>
          </FormItem>

          <FormItem>
            <FormLabel required>密码</FormLabel>
            <FormControl name="password">
              <Input 
                {...form.register("password")} 
                type="password" 
                placeholder="请输入密码"
                disabled
              />
            </FormControl>
            <FormMessage error>{form.formState.errors.password?.message}</FormMessage>
          </FormItem>

          <Button type="submit" className="w-full" disabled>提交</Button>
        </Form>
      </FormProvider>
    )
  }
}

// 按钮布局示例
export const ButtonLayouts: Story = {
  render: () => {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        email: "",
        password: "",
      },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values)
    }

    return (
      <FormProvider {...form}>
        <Form onSubmit={form.handleSubmit(onSubmit)} className="w-[400px]">
          <FormItem>
            <FormLabel required>用户名</FormLabel>
            <FormControl name="username">
              <Input 
                {...form.register("username")} 
                placeholder="请输入用户名"
              />
            </FormControl>
            <FormMessage error>{form.formState.errors.username?.message}</FormMessage>
          </FormItem>

          <FormItem>
            <FormLabel required>邮箱</FormLabel>
            <FormControl name="email">
              <Input 
                {...form.register("email")} 
                type="email" 
                placeholder="请输入邮箱"
              />
            </FormControl>
            <FormMessage error>{form.formState.errors.email?.message}</FormMessage>
          </FormItem>

          <FormItem>
            <FormLabel required>密码</FormLabel>
            <FormControl name="password">
              <Input 
                {...form.register("password")} 
                type="password" 
                placeholder="请输入密码"
              />
            </FormControl>
            <FormMessage error>{form.formState.errors.password?.message}</FormMessage>
          </FormItem>

          <FormButtons layout="full" direction="vertical">
            <Button type="submit" className="w-full">提交</Button>
            <Button variant="outline" className="w-full">取消</Button>
          </FormButtons>
        </Form>
      </FormProvider>
    )
  }
}

// 布局展示表单示例 - 展示各种灵活的布局方式
const layoutDemoSchema = z.object({
  // 工作经历相关字段
  company: z.string().optional(),
  position: z.string().optional(),
  startYear: z.string().optional(),
  startMonth: z.string().optional(),
  endYear: z.string().optional(),
  endMonth: z.string().optional(),
  city: z.string().optional(),
  department: z.string().optional(),
  workType: z.string().optional(),
  achievement: z.string().optional(),
  
  // 个人信息字段  
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  
  // 地址信息
  country: z.string().optional(),
  state: z.string().optional(),
  city2: z.string().optional(),
  zipCode: z.string().optional(),
  
  // 技能标签
  skills: z.array(z.string()).optional(),
})

export const ComplexForm: Story = {
  render: () => {
    const form = useForm<z.infer<typeof layoutDemoSchema>>({
      resolver: zodResolver(layoutDemoSchema),
      defaultValues: {},
    })

    function onSubmit(values: z.infer<typeof layoutDemoSchema>) {
      console.log(values)
    }

    return (
      <FormProvider {...form}>
        <Form onSubmit={form.handleSubmit(onSubmit)} layout="sectioned" className="max-w-4xl mx-auto">
          <FormHeader>
            <FormTitle>工作经历表单</FormTitle>
            <FormSubtitle>完全使用 FormRow 实现的简洁布局</FormSubtitle>
          </FormHeader>

          {/* 工作经历示例 - 完全用 FormRow 实现 */}
          <FormSection title="工作经历 1" subtitle="展示不同列数的灵活组合">
            
            {/* 第一行：工作单位 + 职称 (1:1) */}
            <FormRow columns={2}>
              <FormItem>
                <FormLabel>工作单位</FormLabel>
                <FormControl>
                  <Input placeholder="请输入工作单位" />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel>职称</FormLabel>
                <FormControl>
                  <Input placeholder="高级后端工程师" />
                </FormControl>
              </FormItem>
            </FormRow>

            {/* 第二行：开始时间 + 结束时间 (嵌套FormRow实现不同间距) */}
            <FormRow columns={2}>
              {/* 开始时间组 - 内部小间距 */}
              <FormRow columns={2} spacing="sm">
                <FormItem>
                  <FormLabel>开始时间</FormLabel>
                  <FormControl>
                    <Input placeholder="选择年份" />
                  </FormControl>
                </FormItem>
                <FormItem>
                  <FormLabel className="invisible">占位</FormLabel>
                  <FormControl>
                    <Input placeholder="选择月份" />
                  </FormControl>
                </FormItem>
              </FormRow>
              
              {/* 结束时间组 - 内部小间距 */}
              <FormRow columns={2} spacing="sm">
                <FormItem>
                  <FormLabel>结束时间</FormLabel>
                  <FormControl>
                    <Input placeholder="选择年份" />
                  </FormControl>
                </FormItem>
                <FormItem>
                  <FormLabel className="invisible">占位</FormLabel>
                  <FormControl>
                    <Input placeholder="选择月份" />
                  </FormControl>
                </FormItem>
              </FormRow>
            </FormRow>

            {/* 第三行：城市 + 部门 (1:1) */}
            <FormRow columns={2}>
              <FormItem>
                <FormLabel>城市</FormLabel>
                <FormControl>
                  <Input placeholder="请选择城市" />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel>部门</FormLabel>
                <FormControl>
                  <Input placeholder="例如：Data" />
                </FormControl>
              </FormItem>
            </FormRow>

            {/* 第四行：类型 + 成果 (1:3) - 用 FormRow 的 4 列实现 */}
            <FormRow columns={4}>
              <FormItem span={1}>
                <FormLabel>类型</FormLabel>
                <FormControl>
                  <Input placeholder="请选择工作类型" />
                </FormControl>
              </FormItem>
              <FormItem span={3}>
                <FormLabel>成果</FormLabel>
                <FormControl>
                  <Input placeholder="例如：写代码，优化系统性能，项目管理等..." />
                </FormControl>
              </FormItem>
            </FormRow>
          </FormSection>

          <FormButtons>
            <Button variant="outline">重置表单</Button>
            <Button type="submit">提交申请</Button>
          </FormButtons>
        </Form>
      </FormProvider>
    )
  }
}