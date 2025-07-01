import React from 'react';
import { BlockLayout, Typography, Badge } from '../../../components/ui';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { WeeklyRankingItem } from '../types';

interface WeeklyRankingSidebarProps {
  rankingData: WeeklyRankingItem[];
  onItemClick?: (itemId: string) => void;
}

// 排名变化箭头组件
const RankingChangeIcon: React.FC<{ change: number }> = ({ change }) => {
  if (change > 0) {
    return (
      <div className="flex items-center text-destructive">
        <TrendingUp className="w-3 h-3 mr-1" />
        <span className="text-xs font-medium">{change}</span>
      </div>
    );
  } else if (change < 0) {
    return (
      <div className="flex items-center text-success">
        <TrendingDown className="w-3 h-3 mr-1" />
        <span className="text-xs font-medium">{Math.abs(change)}</span>
      </div>
    );
  } else {
    return (
      <div className="flex items-center text-muted-foreground">
        <span className="text-xs">-</span>
      </div>
    );
  }
};

export const WeeklyRankingSidebar: React.FC<WeeklyRankingSidebarProps> = ({
  rankingData,
  onItemClick,
}) => {
  return (
    <BlockLayout padding="default" shadow="sm">
      {/* 标题 */}
      <div className="flex items-center justify-between mb-4">
        <Typography variant="h3" className="font-medium">
          一周口碑榜
        </Typography>
        <Typography variant="muted" className="text-xs">
          ······
        </Typography>
      </div>
      
      {/* 更新时间 */}
      <Typography variant="muted" className="text-xs mb-4">
        6月27日 更新
      </Typography>
      
      {/* 排行榜列表 */}
      <div className="space-y-3">
        {rankingData.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center justify-between cursor-pointer hover:bg-muted/50 p-2 -m-2 rounded transition-colors duration-200"
            onClick={() => onItemClick?.(item.id)}
          >
            {/* 排名和标题 */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Badge 
                variant={index < 3 ? 'destructive' : 'muted'}
                className="w-4 h-4 rounded-full p-0 text-xs flex items-center justify-center"
              >
                {index + 1}
              </Badge>
              <Typography 
                variant="body" 
                className="text-sm line-clamp-1 flex-1"
              >
                {item.title}
              </Typography>
            </div>
            
            {/* 排名变化 */}
            <RankingChangeIcon change={item.change} />
          </div>
        ))}
      </div>
    </BlockLayout>
  );
}; 