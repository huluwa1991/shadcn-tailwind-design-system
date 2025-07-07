import React from 'react';
import { Typography, Skeleton } from '../../../components/ui';
import { Film } from 'lucide-react';
import { MovieCard } from './MovieCard';
import { Movie } from '../types';

interface MovieListProps {
  movies: Movie[];
  onMovieClick?: (movieId: string) => void;
  showTitle?: boolean;
  title?: string;
  isLoading?: boolean;
}

// 电影卡片骨架屏组件
const MovieCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-lg border border-block-layout-border bg-block-layout p-6">
      <div className="flex gap-3">
        {/* 海报骨架 */}
        <Skeleton className="w-16 h-20 rounded-md flex-shrink-0" />
        
        {/* 内容骨架 */}
        <div className="flex-1 min-w-0 space-y-2">
          {/* 标题 */}
          <Skeleton className="h-5 w-3/4" />
          
          {/* 评分 */}
          <div className="flex items-center gap-1">
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-3 w-16" />
          
          {/* 年份国家 */}
          <Skeleton className="h-3 w-1/2" />
          
          {/* 导演演员 */}
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />
          
          {/* 标签 */}
          <div className="flex gap-1 pt-1">
            <Skeleton className="h-5 w-12 rounded-full" />
            <Skeleton className="h-5 w-12 rounded-full" />
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const MovieList: React.FC<MovieListProps> = ({
  movies,
  onMovieClick,
  showTitle = true,
  title = '豆瓣电影排行榜',
  isLoading = false,
}) => {
  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <Film className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <Typography variant="h3" className="mb-2">暂无符合条件的电影</Typography>
        <Typography variant="muted">请尝试调整筛选条件</Typography>
      </div>
    );
  }

  return (
    <div>
      {showTitle && (
        <Typography variant="h2" className="mb-4">
          {title}
        </Typography>
      )}
      
      <div className="grid gap-4">
        {isLoading ? (
          Array.from({ length: 4 }, (_, index) => (
            <MovieCardSkeleton key={index} />
          ))
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={onMovieClick}
            />
          ))
        )}
      </div>
    </div>
  );
}; 