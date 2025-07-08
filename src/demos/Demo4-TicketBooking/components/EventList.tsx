import React from 'react';
import {
  Typography,
  Button,
  Tag,
  BlockLayout
} from '../../../components/ui';
import { Event } from '../types';

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



interface EventListProps {
  events: Event[];
  onEventSelect: (eventId: string) => void;
  onFavoriteToggle: (eventId: string) => void;
  favoriteEvents: string[];
  showTitle?: boolean;
}

export const EventList: React.FC<EventListProps> = ({
  events,
  onEventSelect,
  onFavoriteToggle,
  favoriteEvents,
  showTitle = true
}) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options).toUpperCase();
  };

  const getDayOfWeek = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  };

  const formatPrice = (price: { min: number; currency: string }) => {
    return `${price.currency}${price.min}`;
  };

  return (
    <div className="space-y-4">
      {showTitle && (
        <div className="space-y-4">
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
        </div>
      )}



      {/* 活动计数 */}
      <Typography variant="body">
        {events.length} events near you
      </Typography>

      {/* 活动列表 */}
      <div className="space-y-4">
        {events.map((event) => (
          <BlockLayout key={event.id} padding="default">
            <div className="flex items-center justify-between">
              {/* 左侧：日期 */}
              <div className="flex items-center gap-4">
                <div className="text-center min-w-[60px]">
                  <Typography variant="h3" className="font-medium">
                    {formatDate(event.date).split(' ')[1]}
                  </Typography>
                  <Typography variant="body" className="text-sm">
                    {getDayOfWeek(event.date)}
                  </Typography>
                </div>

                {/* 活动信息 */}
                <div className="flex-1">
                  <Typography variant="h3" className="font-medium mb-1">
                    {event.title}
                  </Typography>
                  <Typography variant="body" className="text-muted-foreground mb-1">
                    {event.time} | {event.venue} | {event.city}, {event.country}
                  </Typography>
                  {event.hasParking && (
                    <Tag variant="success" className="text-xs">
                      Parking available
                    </Tag>
                  )}
                </div>
              </div>

              {/* 右侧：操作按钮 */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm-icon"
                  onClick={() => onFavoriteToggle(event.id)}
                  tooltip={favoriteEvents.includes(event.id) ? "Remove from favorites" : "Add to favorites"}
                >
                  <HeartIcon />
                </Button>
                
                <Typography variant="body" className="text-muted-foreground text-sm">
                  from {formatPrice(event.price)}
                </Typography>
                
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => onEventSelect(event.id)}
                >
                  See Tickets
                </Button>
              </div>
            </div>
          </BlockLayout>
        ))}
      </div>
    </div>
  );
}; 