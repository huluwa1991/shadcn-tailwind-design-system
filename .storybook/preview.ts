import type { Preview } from "@storybook/react";
import { withThemeByClassName } from '@storybook/addon-themes';
import { StagewiseToolbar } from '@stagewise/toolbar-react';
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import '../src/index.css';

// Stagewise 装饰器
const withStagewise = (Story: any) => {
  // 确保工具栏只初始化一次
  if (typeof window !== 'undefined' && !document.getElementById('stagewise-toolbar-root')) {
    const toolbarRoot = document.createElement('div');
    toolbarRoot.id = 'stagewise-toolbar-root';
    document.body.appendChild(toolbarRoot);

    const toolbarConfig = {
      plugins: [], // 可以在这里添加自定义插件
    };

    createRoot(toolbarRoot).render(
      createElement(StagewiseToolbar, { config: toolbarConfig })
    );
  }

  return Story();
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      classTarget: 'html',
      darkClass: 'dark',
      lightClass: 'light',
    }
  },
  decorators:[
    withStagewise,
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light'
    })
  ]
};

export default preview;
