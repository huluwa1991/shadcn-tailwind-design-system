export interface Movie {
  id: string;
  title: string;
  poster: string;
  rating: number;        // 豆瓣评分 0-10分制
  genres: string[];      // 电影类型标签
  year: string;
  country: string;
  directors: string[];
  actors: string[];
  description: string;
  isHot?: boolean;       // 是否为热门
  rank?: number;         // 排名
  ratingCount?: number;  // 评分人数
}

export interface MovieCategory {
  id: string;
  name: string;
  value: string;
}

export interface FilterState {
  category: string;
}

export interface WeeklyRankingItem {
  id: string;
  title: string;
  change: number;  // 排名变化 正数上升，负数下降，0无变化
} 