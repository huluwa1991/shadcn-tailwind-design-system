import React from 'react';
import { BlockLayout, Typography, Tag } from '../../../components/ui';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onClick?: (movieId: string) => void;
}

// 星级评分显示组件（页面内组件，不封装为独立组件）
const StarRating: React.FC<{ rating: number; maxRating?: number }> = ({ 
  rating, 
  maxRating = 10 
}) => {
  // 将0-10分制转换为0-5星制
  const stars = (rating / maxRating) * 5;
  const fullStars = Math.floor(stars);
  const hasHalfStar = stars % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {/* 满星 */}
      {Array.from({ length: fullStars }, (_, i) => (
        <svg
          key={`full-${i}`}
          className="w-3 h-3 text-amber-500 dark:text-amber-400 fill-current"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      
      {/* 半星 */}
      {hasHalfStar && (
        <svg
          className="w-3 h-3 text-amber-500 dark:text-amber-400"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="half-star">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path 
            fill="url(#half-star)"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
          <path 
            fill="transparent" 
            stroke="currentColor" 
            strokeWidth="1"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      )}
      
      {/* 空星 */}
      {Array.from({ length: emptyStars }, (_, i) => (
        <svg
          key={`empty-${i}`}
          className="w-3 h-3 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1}
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" 
          />
        </svg>
      ))}
      
      <span className="text-sm font-medium ml-1">{rating.toFixed(1)}</span>
    </div>
  );
};

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const handleClick = () => {
    onClick?.(movie.id);
  };

  return (
    <BlockLayout 
      padding="default" 
      shadow="xs" 
      className="cursor-pointer hover:shadow-md transition-shadow duration-200 relative"
      onClick={handleClick}
    >


      <div className="flex gap-3">
        {/* 电影海报 */}
        <div className="w-16 h-20 rounded-md overflow-hidden flex-shrink-0 bg-muted">
          <img 
            src={movie.poster} 
            alt={movie.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        
        {/* 电影信息 */}
        <div className="flex-1 min-w-0">
          {/* 标题 */}
          <Typography variant="h3" className="font-medium mb-1 line-clamp-1">
            {movie.title}
          </Typography>
          
          {/* 评分 */}
          <div className="mb-2">
            <StarRating rating={movie.rating} />
            {movie.ratingCount && (
              <Typography variant="muted" className="text-xs mt-1">
                ({movie.ratingCount}人评价)
              </Typography>
            )}
          </div>
          
          {/* 年份和国家 */}
          <Typography variant="muted" className="text-sm mb-1">
            {movie.year} / {movie.country}
          </Typography>
          
          {/* 导演和演员 */}
          <Typography variant="muted" className="text-sm mb-2 line-clamp-2">
            导演: {movie.directors.join('、')} / 主演: {movie.actors.join('、')}
          </Typography>
          
          {/* 类型标签 */}
          <div className="flex flex-wrap gap-1">
            {movie.genres.slice(0, 3).map((genre, index) => (
              <Tag key={index} variant="default">
                {genre}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </BlockLayout>
  );
}; 