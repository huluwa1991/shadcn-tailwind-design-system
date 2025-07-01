import React, { useState } from 'react';
import {
  TopNav,
  PageContainer,
  Typography,
} from '../../components/ui';
import { MovieFilters, MovieList, WeeklyRankingSidebar } from './components';
import { FilterState } from './types';
import { mockMovies, movieCategories, weeklyRanking } from './mockData';

export const Demo5: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
  });

  // 事件处理函数
  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleMovieClick = (movieId: string) => {
    console.log('Selected movie:', movieId);
    // 这里可以导航到电影详情页
  };

  const handleWeeklyRankingClick = (itemId: string) => {
    console.log('Selected weekly ranking item:', itemId);
    // 这里可以导航到对应电影页面
  };

  const handleTopNavAction = (action: string) => {
    console.log('TopNav action:', action);
  };

  // 过滤电影列表
  const filteredMovies = mockMovies.filter(movie => {
    if (filters.category === 'all') {
      return true;
    }
    
    // 根据选择的分类筛选
    const categoryMap: Record<string, string[]> = {
      drama: ['剧情'],
      comedy: ['喜剧'],
      action: ['动作'],
      scifi: ['科幻'],
      animation: ['动画'],
      romance: ['爱情'],
      thriller: ['惊悚'],
      fantasy: ['奇幻'],
      crime: ['犯罪'],
      family: ['家庭'],
      war: ['战争'],
      history: ['历史'],
      western: ['西部'],
      musical: ['歌舞'],
      sport: ['运动'],
      documentary: ['纪录片'],
      short: ['短片'],
      adult: ['情色'],
      gay: ['同性'],
    };
    
    const selectedGenres = categoryMap[filters.category] || [];
    return selectedGenres.some(genre => movie.genres.includes(genre));
  });

  return (
    <div className="flex flex-col h-screen w-full">
      {/* 顶部导航栏 */}
      <TopNav
        isLoggedIn={true}
        avatarFallback="U"
        userName="User"
        onHelpClick={() => handleTopNavAction('help')}
        onAvatarClick={() => handleTopNavAction('profile')}
        onLogoClick={() => handleTopNavAction('home')}
      />
      
      {/* 主内容区域 */}
      <div className="flex-1 overflow-auto">
        <PageContainer variant="full" padding="nav-layout">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* 左侧：电影列表区域 */}
            <div className="flex-1 lg:flex-[2] flex flex-col gap-6">
              {/* 页面标题区域 */}
              <div>
                <Typography variant="h1" className="mb-2">
                  豆瓣电影排行榜
                </Typography>
                <Typography variant="body" className="text-muted-foreground">
                  {movieCategories.find(cat => cat.value === filters.category)?.name || '全部'} ·····
                </Typography>
              </div>

              {/* 分类筛选工具栏 */}
              <MovieFilters
                categories={movieCategories}
                filters={filters}
                onFiltersChange={handleFiltersChange}
              />
              
              {/* 电影列表 */}
              <div className="flex-1">
                <MovieList
                  movies={filteredMovies}
                  onMovieClick={handleMovieClick}
                  showTitle={false}
                />
              </div>
            </div>
            
            {/* 右侧：一周口碑榜 */}
            <div className="w-full lg:w-80 lg:flex-shrink-0">
              <WeeklyRankingSidebar
                rankingData={weeklyRanking}
                onItemClick={handleWeeklyRankingClick}
              />
            </div>
          </div>
        </PageContainer>
      </div>
    </div>
  );
}; 