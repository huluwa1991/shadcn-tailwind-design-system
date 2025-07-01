// 演出活动类型
export interface Event {
  id: string;
  title: string;
  venue: string;
  city: string;
  country: string;
  date: string;
  time: string;
  price: {
    min: number;
    currency: string;
  };
  hasParking: boolean;
  isFeatured?: boolean;
}

// 艺人信息类型
export interface Artist {
  id: string;
  name: string;
  image: string;
  genres: string[];
  description: string;
  socialLinks: {
    spotify?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
    twitter?: string;
  };
}

// 筛选条件类型
export interface FilterState {
  location: string;
  date: string;
  hasParking: boolean;
  priceRange: string;
} 