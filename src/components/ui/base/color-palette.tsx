import React from 'react';

interface ColorItemProps {
  name: string;
  description?: string;
  colorClass: string;
  textColorClass?: string;
  hslValue?: string;
}

const ColorItem: React.FC<ColorItemProps> = ({ 
  name, 
  description, 
  colorClass, 
  hslValue 
}) => (
  <div className="flex items-center space-x-4 mb-4">
    <div 
      className={`w-12 h-12 rounded-lg border border-border ${colorClass}`}
    />
    <div className="flex-1">
      <div className="font-medium text-foreground">{name}</div>
      {description && (
        <div className="text-sm text-muted-foreground">{description}</div>
      )}
      {hslValue && (
        <div className="text-xs text-muted-foreground font-mono">{hslValue}</div>
      )}
    </div>
  </div>
);

interface ColorSectionProps {
  title: string;
  children: React.ReactNode;
}

const ColorSection: React.FC<ColorSectionProps> = ({ title, children }) => (
  <div className="mb-8">
    <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {children}
    </div>
  </div>
);

export const ColorPalette: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 bg-background">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">设计系统颜色调色板</h1>
        <p className="text-muted-foreground">
          这里展示了设计系统中所有可用的颜色主题，包括主色调、辅助色、组件色和状态色。
        </p>
      </div>

      {/* Primary Theme Colors */}
      <ColorSection title="Primary Theme Colors">
        <div>
          <ColorItem
            name="Background"
            description="背景色"
            colorClass="bg-background"
            hslValue="oklch(1 0 0)"
          />
        </div>
        <div>
          <ColorItem
            name="Foreground"
            description="前景文字色"
            colorClass="bg-foreground"
            hslValue="oklch(0.145 0 0)"
          />
        </div>
        <div>
          <ColorItem
            name="Primary"
            description="主色调"
            colorClass="bg-primary"
            hslValue="#015eff"
          />
        </div>
        <div>
          <ColorItem
            name="Primary Foreground"
            description="主色调文字色"
            colorClass="bg-primary-foreground"
            hslValue="oklch(0.985 0 0)"
          />
        </div>
      </ColorSection>

      {/* Secondary & Accent Colors */}
      <ColorSection title="Secondary & Accent Colors">
        <div>
          <ColorItem
            name="Secondary"
            description="次要色"
            colorClass="bg-secondary"
            hslValue="oklch(0.97 0 0)"
          />
        </div>
        <div>
          <ColorItem
            name="Secondary Foreground"
            description="次要色文字色"
            colorClass="bg-secondary-foreground"
            hslValue="oklch(0.205 0 0)"
          />
        </div>
        <div>
          <ColorItem
            name="Accent"
            description="强调色"
            colorClass="bg-accent"
            hslValue="oklch(0.97 0 0)"
          />
        </div>
        <div>
          <ColorItem
            name="Accent Foreground"
            description="强调色文字色"
            colorClass="bg-accent-foreground"
            hslValue="oklch(0.205 0 0)"
          />
        </div>
      </ColorSection>

      {/* UI Component Colors */}
      <ColorSection title="UI Component Colors">
        <div>
          <ColorItem
            name="Card"
            description="卡片背景色"
            colorClass="bg-card border"
            hslValue="oklch(1 0 0)"
          />
        </div>
        <div>
          <ColorItem
            name="Card Foreground"
            description="卡片文字色"
            colorClass="bg-card-foreground"
            hslValue="oklch(0.145 0 0)"
          />
        </div>
        <div>
          <ColorItem
            name="Popover"
            description="弹出层背景色"
            colorClass="bg-popover border"
            hslValue="oklch(1 0 0)"
          />
        </div>
        <div>
          <ColorItem
            name="Popover Foreground"
            description="弹出层文字色"
            colorClass="bg-popover-foreground"
            hslValue="oklch(0.145 0 0)"
          />
        </div>
        <div>
          <ColorItem
            name="Muted"
            description="柔和背景色"
            colorClass="bg-muted"
            hslValue="oklch(0.97 0 0)"
          />
        </div>
        <div>
          <ColorItem
            name="Muted Foreground"
            description="柔和文字色"
            colorClass="bg-muted-foreground"
            hslValue="oklch(0.556 0 0)"
          />
        </div>
      </ColorSection>

      {/* Utility & Form Colors */}
      <ColorSection title="Utility & Form Colors">
        <div>
          <ColorItem
            name="Border"
            description="边框色"
            colorClass="bg-border"
            hslValue="oklch(0.922 0 0)"
          />
        </div>
        <div>
          <ColorItem
            name="Input"
            description="输入框背景色"
            colorClass="bg-input"
            hslValue="oklch(0.922 0 0)"
          />
        </div>
        <div>
          <ColorItem
            name="Ring"
            description="焦点环颜色"
            colorClass="bg-ring"
            hslValue="oklch(0.708 0 0)"
          />
        </div>
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <div 
              className="w-12 h-12 border border-border flex items-center justify-center text-xs text-muted-foreground"
              style={{ borderRadius: '0.625rem' }}
            >
              Radius
            </div>
            <div className="flex-1">
              <div className="font-medium text-foreground">Radius</div>
              <div className="text-xs text-muted-foreground font-mono">0.625rem</div>
            </div>
          </div>
        </div>
      </ColorSection>

      {/* Status & Feedback Colors */}
      <ColorSection title="Status & Feedback Colors">
        <div>
          <ColorItem
            name="Destructive"
            description="危险/错误色"
            colorClass="bg-destructive"
            hslValue="oklch(0.577 0.245 27.325)"
          />
        </div>
        <div>
          <ColorItem
            name="Destructive Foreground"
            description="危险色文字色"
            colorClass="bg-destructive-foreground"
            hslValue="oklch(1 0)"
          />
        </div>
        <div>
          <ColorItem
            name="Success"
            description="成功色"
            colorClass="bg-success"
            hslValue="hsl(142 76% 36%)"
          />
        </div>
        <div>
          <ColorItem
            name="Success Foreground"
            description="成功色文字色"
            colorClass="bg-success-foreground"
            hslValue="hsl(0 0% 100%)"
          />
        </div>
        <div>
          <ColorItem
            name="Warning"
            description="警告色"
            colorClass="bg-warning"
            hslValue="hsl(45 93% 47%)"
          />
        </div>
        <div>
          <ColorItem
            name="Warning Foreground"
            description="警告色文字色"
            colorClass="bg-warning-foreground"
            hslValue="hsl(0 0% 100%)"
          />
        </div>
      </ColorSection>

      {/* Chart & Visualization Colors */}
      <ColorSection title="Chart & Visualization Colors">
        <div>
          <ColorItem
            name="Chart 1"
            description="图表色彩 1"
            colorClass="bg-chart-1"
            hslValue="hsl(213 77% 78%)"
          />
        </div>
        <div>
          <ColorItem
            name="Chart 2"
            description="图表色彩 2"
            colorClass="bg-chart-2"
            hslValue="hsl(213 77% 66%)"
          />
        </div>
        <div>
          <ColorItem
            name="Chart 3"
            description="图表色彩 3"
            colorClass="bg-chart-3"
            hslValue="hsl(213 82% 54%)"
          />
        </div>
        <div>
          <ColorItem
            name="Chart 4"
            description="图表色彩 4"
            colorClass="bg-chart-4"
            hslValue="hsl(213 82% 47%)"
          />
        </div>
        <div>
          <ColorItem
            name="Chart 5"
            description="图表色彩 5"
            colorClass="bg-chart-5"
            hslValue="hsl(213 75% 40%)"
          />
        </div>
      </ColorSection>

      {/* Layout & Container Colors */}
      <ColorSection title="Layout & Container Colors">
        <div>
          <ColorItem
            name="Container"
            description="容器背景色"
            colorClass="bg-container border-container-border border"
            hslValue="hsl(0 0% 98.8%)"
          />
        </div>
        <div>
          <ColorItem
            name="Container Foreground"
            description="容器文字色"
            colorClass="bg-container-foreground"
            hslValue="hsl(0 0% 4%)"
          />
        </div>
        <div>
          <ColorItem
            name="Block Layout"
            description="块布局背景色"
            colorClass="bg-block-layout border-block-layout-border border"
            hslValue="hsl(0 0% 100%)"
          />
        </div>
        <div>
          <ColorItem
            name="Block Layout Foreground"
            description="块布局文字色"
            colorClass="bg-block-layout-foreground"
            hslValue="hsl(0 0% 4%)"
          />
        </div>
      </ColorSection>

      {/* Sidebar Colors */}
      <ColorSection title="Sidebar Colors">
        <div>
          <ColorItem
            name="Sidebar"
            description="侧边栏背景色"
            colorClass="bg-sidebar"
            hslValue="hsl(0 0% 96.3%)"
          />
        </div>
        <div>
          <ColorItem
            name="Sidebar Foreground"
            description="侧边栏文字色"
            colorClass="bg-sidebar-foreground"
            hslValue="hsl(0 0% 4%)"
          />
        </div>
        <div>
          <ColorItem
            name="Sidebar Primary"
            description="侧边栏主色"
            colorClass="bg-sidebar-primary"
            hslValue="hsl(0 0% 9%)"
          />
        </div>
        <div>
          <ColorItem
            name="Sidebar Accent"
            description="侧边栏强调色"
            colorClass="bg-sidebar-accent"
            hslValue="hsl(0 0% 93.7%)"
          />
        </div>
        <div>
          <ColorItem
            name="Sidebar Selected"
            description="侧边栏选中状态"
            colorClass="bg-sidebar-selected"
            hslValue="hsl(0 0% 91%)"
          />
        </div>
      </ColorSection>
    </div>
  );
};

export default ColorPalette; 