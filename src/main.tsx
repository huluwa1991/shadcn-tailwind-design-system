import React from 'react';
import ReactDOM from 'react-dom/client';
import { StagewiseToolbar } from '@stagewise/toolbar-react';
import { Demo } from './demos/Demo1-UserManagement/Demo1-UserManagement';
import { Toaster } from './components/ui/feedback/toast';
import './index.css';

function App() {
  return (
    <>
      <Demo />
      <Toaster />
    </>
  );
}

// 渲染主应用
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// 初始化 Stagewise 工具栏（独立渲染）
const toolbarConfig = {
  plugins: [], // 可以在这里添加自定义插件
};

document.addEventListener('DOMContentLoaded', () => {
  // 只在开发模式下初始化工具栏
  if (process.env.NODE_ENV === 'development') {
    const toolbarRoot = document.createElement('div');
    toolbarRoot.id = 'stagewise-toolbar-root';
    document.body.appendChild(toolbarRoot);

    ReactDOM.createRoot(toolbarRoot).render(
      <React.StrictMode>
        <StagewiseToolbar config={toolbarConfig} />
      </React.StrictMode>
    );
  }
});
