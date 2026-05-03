export type ProductCardType = {
  id: string;
  owner_id: string;
  name: string;
  category?: string;
  image: string; // photos: Array[string, string, ...]
  price: number;
  city: string;
  deposit: number;
  description: string;
  created_at?: string;
};

// Модель объявления 
export type ListingType = {
  id: string;
  owner_id: string;
  title: string;
  category_id: string;
  price: number;
  deposit_amount: number;
  description: string;
  images: string[];
  location: {
    lat: number;
    lon: number;
    address?: string;
  };
  rating: number;
  status: "active" | "booked" | "inactive";
  created_at: string; // ISO date-time
};

// Пользователь 
export type UserType = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  rating: number;
  reviews_count: number;
  preferred_categories: string[];
  created_at: string; // ISO date-time
};

// Полный профиль пользователя
export type UserProfileType = UserType & {
  notification_preferences?: Record<string, any>;
};

// Аутентификация
export type AuthTokenType = {
  access_token: string;
  token_type: string;
  user_id: string;
};

// Бронирование
export type BookingType = {
  id: string;
  listing_id: string;
  renter_id: string;
  owner_id: string;
  start_date: string; // ISO date
  end_date: string; // ISO date
  status: "pending" | "confirmed" | "active" | "completed" | "cancelled";
  deposit_amount: number;
  total_cost: number;
  payment_link?: string;
};

// Отзыв
export type ReviewType = {
  id: string;
  author_id: string;
  target_id: string; // user_id или listing_id
  rating: number;
  comment: string;
  created_at: string; // ISO date-time
};

// Рекомендованная цена (от ИИ)
export type PricingResponseType = {
  suggested_min: number;
  suggested_max: number;
  optimal: number;
  market_confidence: number;
  seasonality_factor: number;
};

// Оценка риска (от ИИ)
export type RiskAnalysisResponseType = {
  risk_score: number; 
  risk_level: "low" | "medium" | "high";
  flags: string[];
  recommendations: string[];
};

// Шаблон для объявления
export type ListingTemplateType = {
  id: string;
  category_id: string;
  title: string;
  default_description: string;
  suggested_fields: string[];
  safety_checklist: string[];
};

// ошибка API
export type ApiErrorType = {
  code: string;
  message: string;
  details?: Record<string, any>;
};

// Пагинированный список объявлений (ответ на /search и /users/me/listings)
export type PaginatedListingsType = {
  data: ListingType[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    has_next: boolean;
  };
};