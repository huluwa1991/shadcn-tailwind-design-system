import React from 'react';
import { Plus } from 'lucide-react';
import { 
  Button, 
  Typography, 
  BlockLayout 
} from '../../../components/ui';
import type { ResumeListItem } from '../types';
import { DeleteButton } from './DeleteButton';

interface DynamicListSectionProps<T extends ResumeListItem> {
  title: string;
  items: T[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  hasItemContent: (item: T) => boolean;
  renderItem: (item: T, index: number, onRemove: (id: string) => void) => React.ReactNode;
  emptyMessage?: string;
  addButtonText?: string;
  className?: string;
  itemClassName?: string;
  newlyAddedIds?: Set<string>;
  deletingIds?: Set<string>;
}

export const DynamicListSection = <T extends ResumeListItem>({
  title,
  items,
  onAdd,
  onRemove,
  hasItemContent,
  renderItem,
  emptyMessage = "暂无记录，点击上方按钮添加",
  addButtonText,
  className,
  itemClassName,
  newlyAddedIds = new Set(),
  deletingIds = new Set()
}: DynamicListSectionProps<T>) => {
  const defaultAddButtonText = `添加${title}`;

  return (
    <div className={`mb-10 ${className || ''}`}>
      {/* 标题和添加按钮 */}
      <div className="mb-6 flex items-center justify-between">
        <Typography variant="h3">{title}</Typography>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onAdd}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          {addButtonText || defaultAddButtonText}
        </Button>
      </div>
      
      {/* 列表项 */}
      <div className="space-y-6">
        {items.map((item, index) => {
          const isNewlyAdded = newlyAddedIds.has(item.id);
          const isDeleting = deletingIds.has(item.id);
          
          return (
            <BlockLayout 
              key={item.id} 
              className={`group transition-all duration-300 ${
                isNewlyAdded 
                  ? 'animate-in fade-in slide-in-from-top duration-500' 
                  : isDeleting 
                  ? 'animate-out fade-out slide-out-to-top duration-300'
                  : ''
              } ${itemClassName || ''}`}
            >
              <div className="space-y-4">
                {/* 标题行和删除按钮 - 使用倒序编号 */}
                <div className="flex items-center justify-between">
                  <Typography variant="h3">{title} {items.length - index}</Typography>
                  <DeleteButton
                    hasContent={hasItemContent(item)}
                    onDelete={() => onRemove(item.id)}
                    itemIndex={index}
                  />
                </div>
                
                {/* 表单内容 */}
                {renderItem(item, index, onRemove)}
              </div>
            </BlockLayout>
          );
        })}
        
        {/* 空状态 */}
        {items.length === 0 && (
          <BlockLayout>
            <div className="text-center py-10 text-gray-500">
              <Typography variant="muted">
                {emptyMessage}
              </Typography>
            </div>
          </BlockLayout>
        )}
      </div>
    </div>
  );
}; 