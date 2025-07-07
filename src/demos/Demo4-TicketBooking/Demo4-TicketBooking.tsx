import React, { useState } from 'react';
import {
  TopNav,
  PageContainer,
  Typography,
  Button
} from '../../components/ui';
import { EventFilters, EventList, ArtistInfoCard } from './components';
import { Event, Artist, FilterState } from './types';

// 图标组件
const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>
  </svg>
);

const ShareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
    <polyline points="16,6 12,2 8,6"/>
    <line x1="12" y1="2" x2="12" y2="15"/>
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>
);

// 模拟数据
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'BLACKPINK',
    venue: 'Rajamangala National Stadium',
    city: 'Bangkok',
    country: 'Thailand',
    date: '2024-10-24',
    time: '7:00 PM',
    price: { min: 85, currency: '$' },
    hasParking: true,
    isFeatured: true
  },
  {
    id: '2',
    title: 'BLACKPINK',
    venue: 'Rajamangala National Stadium',
    city: 'Bangkok',
    country: 'Thailand',
    date: '2024-10-25',
    time: '7:00 PM',
    price: { min: 95, currency: '$' },
    hasParking: true
  },
  {
    id: '3',
    title: 'BLACKPINK',
    venue: 'Rajamangala National Stadium',
    city: 'Bangkok',
    country: 'Thailand',
    date: '2024-10-26',
    time: '7:00 PM',
    price: { min: 89, currency: '$' },
    hasParking: false
  },
  {
    id: '4',
    title: 'BLACKPINK',
    venue: 'Goyang Stadium at Goyang Sports Complex - Complex',
    city: 'Goyang',
    country: 'South Korea',
    date: '2024-07-05',
    time: '8:00 PM',
    price: { min: 120, currency: '$' },
    hasParking: true
  },
  {
    id: '5',
    title: 'BLACKPINK',
    venue: 'Singapore Indoor Stadium',
    city: 'Singapore',
    country: 'Singapore',
    date: '2024-11-15',
    time: '8:00 PM',
    price: { min: 110, currency: '$' },
    hasParking: true
  },
  {
    id: '6',
    title: 'BLACKPINK',
    venue: 'Tokyo Dome',
    city: 'Tokyo',
    country: 'Japan',
    date: '2024-12-01',
    time: '7:30 PM',
    price: { min: 150, currency: '$' },
    hasParking: false
  },
  {
    id: '7',
    title: 'BLACKPINK',
    venue: 'Impact Arena',
    city: 'Bangkok',
    country: 'Thailand',
    date: '2024-11-08',
    time: '8:00 PM',
    price: { min: 75, currency: '$' },
    hasParking: true
  },
  {
    id: '8',
    title: 'BLACKPINK',
    venue: 'KSPO Dome',
    city: 'Seoul',
    country: 'South Korea',
    date: '2024-12-15',
    time: '7:00 PM',
    price: { min: 130, currency: '$' },
    hasParking: true
  }
];

const mockArtist: Artist = {
  id: 'blackpink',
  name: 'BLACKPINK',
  image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&h=300&fit=crop&crop=center',
  genres: ['K-Pop', 'Pop'],
  description: `BLACKPINK (stylized BLΛƆKPIИK) (블랙핑크) is a South Korean girl group under YG Entertainment. The members are Jisoo, Jennie, Rosé, and Lisa. They have a versatile sound, ranging from YG's signature hardcore hip-hop to slower so See more`,
  socialLinks: {
    spotify: 'https://open.spotify.com/artist/41MozSoPIsD1dJM0CLPjZF',
    instagram: 'https://www.instagram.com/blackpinkofficial/',
    facebook: 'https://www.facebook.com/BLACKPINKOFFICIAL',
    youtube: 'https://www.youtube.com/c/BLACKPINKOFFICIAL',
    twitter: 'https://twitter.com/BLACKPINK'
  }
};

export const Demo4: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    location: 'bangkok',
    date: '',
    hasParking: false,
    priceRange: 'all'
  });
  
  const [favoriteEvents, setFavoriteEvents] = useState<string[]>([]);

  // 事件处理函数
  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleEventSelect = (eventId: string) => {
    console.log('Selected event:', eventId);
    // 这里可以导航到票务详情页
  };

  const handleFavoriteToggle = (eventId: string) => {
    setFavoriteEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const handleSocialLinkClick = (_platform: string, url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleTopNavAction = (action: string) => {
    console.log('TopNav action:', action);
  };

  // 过滤活动列表
  const filteredEvents = mockEvents.filter(event => {
    // 地点筛选
    if (filters.location !== 'all' && !event.city.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    
    // 日期筛选
    if (filters.date && event.date !== filters.date) {
      return false;
    }
    
    // 停车位筛选
    if (filters.hasParking && !event.hasParking) {
      return false;
    }
    
    // 价格筛选
    if (filters.priceRange !== 'all') {
      const price = event.price.min;
      switch (filters.priceRange) {
        case 'under-100':
          return price < 100;
        case '100-300':
          return price >= 100 && price <= 300;
        case '300-500':
          return price >= 300 && price <= 500;
        case 'over-500':
          return price > 500;
        default:
          return true;
      }
    }
    
    return true;
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
          <div className="flex gap-8">
            {/* 左侧：活动列表区域 */}
            <div className="flex-[2] flex flex-col space-y-6">
              {/* 页面标题区域 */}
              <div className="flex items-center justify-between">
                <Typography variant="h1">
                  BLACKPINK Tickets
                </Typography>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm-icon"
                    tooltip="Add to favorites"
                  >
                    <HeartIcon />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm-icon"
                    tooltip="Share"
                  >
                    <ShareIcon />
                  </Button>
                </div>
              </div>

              {/* 热度提示 */}
              <div className="flex items-center gap-2">
                <ClockIcon />
                <Typography variant="body" className="text-muted-foreground">
                  Don't miss out. {mockEvents.length > 0 ? 691 : 0} people viewed BLACKPINK events in the past hour
                </Typography>
              </div>

              {/* 筛选工具栏 */}
              <EventFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
              />
              
              {/* 活动列表 */}
              <div className="flex-1">
                <EventList
                  events={filteredEvents}
                  onEventSelect={handleEventSelect}
                  onFavoriteToggle={handleFavoriteToggle}
                  favoriteEvents={favoriteEvents}
                  showTitle={false}
                />
              </div>
            </div>
            
            {/* 右侧：艺人信息卡片 */}
            <div className="flex-[1]">
              <ArtistInfoCard
                artist={mockArtist}
                onSocialLinkClick={handleSocialLinkClick}
              />
            </div>
          </div>
        </PageContainer>
      </div>
    </div>
  );
}; 