# Form 组件使用指南

Form 组件是一个基于 react-hook-form 的表单系统，提供了灵活的布局和验证支持。

## 核心组件

### Form
表单根容器，基于 `react-hook-form` 的 `FormProvider`。

### FormField
表单字段包装器，连接验证逻辑。

### FormItem
表单项容器，包含标签、控件和消息。支持不同宽度：
- `width="full"` (默认) - 占满容器宽度
- `width="auto"` - 自动宽度
- `width="sm"` - 256px
- `width="md"` - 320px
- `width="lg"` - 384px
- `width="xl"` - 448px
- `width="2xl"` - 512px

### FormRow
水平布局容器，支持一行显示两个字段：
- `columns={2}` (默认) - 两列网格
- `gap="sm|md|lg"` - 间距控制

### FormLabel
表单标签，支持必填标识：
- `required` - 显示红点标识

### FormControl
表单控件包装器，自动应用验证状态样式。

### FormMessage
消息显示组件：
- 优先显示验证错误信息
- 无错误时显示描述文字
- `description` prop 用于辅助文字

## 基础用法

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormRow,
  Input,
  Button,
} from "@/components/ui";

// 定义表单验证 schema
const formSchema = z.object({
  username: z.string().min(2, "用户名至少2个字符"),
  email: z.string().email("请输入有效的邮箱地址"),
});

export function BasicForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form.register} onSubmit={form.handleSubmit(onSubmit)}>
      <FormField>
        <FormLabel required>用户名</FormLabel>
        <FormControl name="username">
          <Input {...form.register("username")} />
        </FormControl>
        <FormMessage error>{form.formState.errors.username?.message}</FormMessage>
      </FormField>

      <FormField>
        <FormLabel required>邮箱</FormLabel>
        <FormControl name="email">
          <Input {...form.register("email")} type="email" />
        </FormControl>
        <FormMessage error>{form.formState.errors.email?.message}</FormMessage>
      </FormField>

      <Button type="submit">提交</Button>
    </Form>
  );
}
```

## 宽度变体

FormItem 组件支持三种宽度变体：

```tsx
<FormRow>
  <FormItem width="half">
    <FormLabel>姓名</FormLabel>
    <FormControl name="name">
      <Input />
    </FormControl>
  </FormItem>

  <FormItem width="half">
    <FormLabel>年龄</FormLabel>
    <FormControl name="age">
      <Input type="number" />
    </FormControl>
  </FormItem>
</FormRow>

<FormItem width="third">
  <FormLabel>城市</FormLabel>
  <FormControl name="city">
    <CitySelect />
  </FormControl>
</FormItem>

<FormItem width="full">
  <FormLabel>简介</FormLabel>
  <FormControl name="bio">
    <Textarea />
  </FormControl>
</FormItem>
```

## 水平布局

FormRow 组件用于创建水平布局，支持不同的间距：

```tsx
<FormRow spacing="sm">
  <FormField>
    <FormLabel>开始时间</FormLabel>
    <FormControl name="startDate">
      <DatePicker />
    </FormControl>
  </FormField>

  <FormField>
    <FormLabel>结束时间</FormLabel>
    <FormControl name="endDate">
      <DatePicker />
    </FormControl>
  </FormField>
</FormRow>
```

## 辅助信息

FormMessage 组件用于显示错误信息和辅助文字：

```tsx
<FormField>
  <FormLabel>手机号</FormLabel>
  <FormControl name="phone">
    <Input />
  </FormControl>
  <FormMessage>我们会向您发送验证码</FormMessage>
  <FormMessage error>{form.formState.errors.phone?.message}</FormMessage>
</FormField>
```

## 混合布局示例

```tsx
<Form>
  {/* 基本信息 */}
  <div className="space-y-4">
    <Typography variant="h3">基本信息</Typography>
    
    <FormRow>
      <FormField>
        <FormLabel required>姓名</FormLabel>
        <FormControl name="name">
          <Input />
        </FormControl>
        <FormMessage>请输入真实姓名</FormMessage>
      </FormField>

      <FormField>
        <FormLabel>性别</FormLabel>
        <FormControl name="gender">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="请选择性别" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">男</SelectItem>
              <SelectItem value="female">女</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
      </FormField>
    </FormRow>

    <FormRow>
      <FormField>
        <FormLabel required>手机号</FormLabel>
        <FormControl name="phone">
          <Input />
        </FormControl>
        <FormMessage>我们会向您发送验证码</FormMessage>
      </FormField>

      <FormField>
        <FormLabel>邮箱</FormLabel>
        <FormControl name="email">
          <Input type="email" />
        </FormControl>
      </FormField>
    </FormRow>

    <FormRow>
      <FormField>
        <FormLabel>所在城市</FormLabel>
        <FormControl name="city">
          <CitySelect />
        </FormControl>
      </FormField>

      <FormField>
        <FormLabel>籍贯</FormLabel>
        <FormControl name="hometown">
          <Input />
        </FormControl>
      </FormField>
    </FormRow>
  </div>

  {/* 工作经历 */}
  <div className="space-y-4">
    <Typography variant="h3">工作经历</Typography>

    <FormRow>
      <FormField>
        <FormLabel>公司名称</FormLabel>
        <FormControl name="company">
          <Input />
        </FormControl>
      </FormField>

      <FormField>
        <FormLabel>职位</FormLabel>
        <FormControl name="title">
          <Input />
        </FormControl>
      </FormField>
    </FormRow>

    <FormRow>
      <FormField>
        <FormLabel>开始时间</FormLabel>
        <FormControl name="startDate">
          <DatePicker />
        </FormControl>
      </FormField>

      <FormField>
        <FormLabel>结束时间</FormLabel>
        <FormControl name="endDate">
          <DatePicker />
        </FormControl>
      </FormField>
    </FormRow>

    <FormField>
      <FormLabel>工作内容</FormLabel>
      <FormControl name="description">
        <Textarea />
      </FormControl>
    </FormField>
  </div>
</Form>
```

## 特性

- ✅ 自动验证状态样式（红色边框）
- ✅ 错误信息优先显示
- ✅ 完整的无障碍支持
- ✅ 响应式布局（桌面端）
- ✅ 多种宽度选项
- ✅ 水平和垂直布局混用
- ✅ TypeScript 完整支持 