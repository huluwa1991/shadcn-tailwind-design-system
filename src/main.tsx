import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// 这里可以添加一个简单的欢迎页面或者导入 Demo 组件
const App = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          设计系统组件库
        </h1>
        <div className="text-center text-muted-foreground">
          <p className="mb-4">欢迎使用基于 shadcn/ui 的设计系统组件库</p>
          <p>请使用 Storybook 查看组件文档和示例</p>
        </div>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
) 