export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: {
    id?: string;
    name: string;
  };
  content?: string;
  author?: string;
}

export interface NewsResponse {
  articles: NewsArticle[];
  totalResults?: number;
  status?: string;
  code?: string;
  message?: string;
}

export interface NewsApiParams {
  apiKey: string;
  country: string;
  category?: string;
  q?: string;
  pageSize?: number;
  page?: number;
  from?: string;
  to?: string;
}

export interface NewsDataParams {
  apikey: string;
  country: string;
  category?: string;
  q?: string;
  page?: number;
  from?: string;
  to?: string;
}

export interface TheNewsApiParams {
  api_token: string;
  locale?: string;
  language?: string;
  search?: string;
  categories?: string;
  limit?: number;
  page?: number;
  from?: string;
  to?: string;
}

export interface MediastackParams {
  access_key: string;
  countries: string;
  categories?: string;
  keywords?: string;
  limit?: number;
  offset?: number;
  date?: string;
  date_to?: string;
}

export interface GNewsParams {
  apikey: string;
  country: string;
  category?: string;
  q?: string;
  max?: number;
  from?: string;
  to?: string;
}

export interface CurrentsParams {
  apiKey: string;
  country: string;
  category?: string;
  keywords?: string;
  start_date?: string;
  end_date?: string;
}

export interface MarketauxParams {
  api_token: string;
  countries: string;
  language?: string;
  search?: string;
  published_after?: string;
  published_before?: string;
  limit?: number;
}