
export type TabType = 'home' | 'services' | 'me';

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'marketing' | 'efficiency' | 'assistant' | 'play';
  color: string;
}

export interface ReviewResponse {
  reviews: string[];
}
