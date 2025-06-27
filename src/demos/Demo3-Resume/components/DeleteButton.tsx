import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Button, Popconfirm } from '../../../components/ui';

interface DeleteButtonProps {
  hasContent: boolean;
  onDelete: () => void;
  itemIndex?: number;
  confirmMessage?: string;
  className?: string;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ 
  hasContent, 
  onDelete, 
  itemIndex: _itemIndex,
  confirmMessage = "确认删除本条吗？",
  className
}) => {
  // 用于跟踪Popconfirm的开启状态
  const [popconfirmOpen, setPopconfirmOpen] = useState(false);

  const baseClassName = `transition-opacity ${
    popconfirmOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
  } ${className || ''}`;

  if (hasContent) {
    return (
      <Popconfirm
        description={confirmMessage}
        onConfirm={onDelete}
        confirmText="删除"
        cancelText="取消"
        open={popconfirmOpen}
        onOpenChange={setPopconfirmOpen}
      >
        <Button
          variant="ghost"
          size="sm-icon"
          className={baseClassName}
          allowNoTooltip={true}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </Popconfirm>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm-icon"
      onClick={onDelete}
      className={baseClassName}
      tooltip="删除本条记录"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}; 