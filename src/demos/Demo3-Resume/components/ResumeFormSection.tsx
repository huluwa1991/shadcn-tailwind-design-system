import React from 'react';
import { 
  Form, 
  BlockLayout, 
  Typography 
} from '../../../components/ui';

interface ResumeFormSectionProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  // 控制是否使用 BlockLayout 包装
  useBlockLayout?: boolean;
  // 表单布局模式
  layout?: "default" | "grid" | "sectioned";
}

export const ResumeFormSection: React.FC<ResumeFormSectionProps> = ({
  title,
  subtitle,
  children,
  className,
  useBlockLayout = true,
  layout = "default"
}) => {
  const content = (
    <Form layout={layout} className={className}>
      {children}
    </Form>
  );

  if (useBlockLayout) {
    return (
      <div>
        {title && (
          <div className="mb-6">
            <Typography variant="h2">{title}</Typography>
            {subtitle && (
              <Typography variant="muted" className="mt-1">
                {subtitle}
              </Typography>
            )}
          </div>
        )}
        <BlockLayout>
          {content}
        </BlockLayout>
      </div>
    );
  }

  return content;
}; 