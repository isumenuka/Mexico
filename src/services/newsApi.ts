import { 
  NewsApiParams, 
  NewsDataParams, 
  TheNewsApiParams, 
  MediastackParams,
  GNewsParams,
  CurrentsParams,
  MarketauxParams,
  NewsResponse,
  NewsArticle
} from '../types';

// API keys
const NEWS_API_KEY = '06e19803ec9541d3861f2ba369b71ed4';
const NEWSDATA_API_KEY = 'pub_87842d6b96b42561dadf34a1cf7a68c34e005';
const THE_NEWS_API_KEY = 'UraTlsMPjBngXNJlAqLUGhWU5iPRgqt6GugiLovq';
const MEDIASTACK_API_KEY = '8189d3904caa1a4c540b87a4af8bf9a8';
const GNEWS_API_KEY = '3d92a3c6a60b89438b357604c3c32419';
const CURRENTS_API_KEY = 'kEAxkRWrG5R5w5awQJUrzB_ziDwIBMGIcLpBJb7bWzbwn7RG';
const MARKETAUX_API_KEY = 'tDCPvsGEvCpIorvhsLvi2kNW2x7EZlPrh1MidcLC';

// Check if we're running on localhost
const isLocalhost = window.location.hostname === 'localhost' || 
                   window.location.hostname === '127.0.0.1';

// Helper function to handle API responses
const handleApiResponse = async (response: Response, apiName: string) => {
  if (!response.ok) {
    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After') || '60';
      const waitTime = parseInt(retryAfter, 10) * 1000;
      console.warn(`Rate limit exceeded for ${apiName}. Retrying after ${retryAfter} seconds.`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      throw new Error(`RETRY_AFTER_${waitTime}`);
    }
    throw new Error(`${apiName} API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

// GNews API
export const fetchGNews = async (params: Partial<GNewsParams> = {}, retryCount = 0): Promise<NewsArticle[]> => {
  try {
    const url = new URL('https://gnews.io/api/v4/search');
    url.searchParams.append('apikey', GNEWS_API_KEY);
    url.searchParams.append('country', 'mx');
    url.searchParams.append('q', params.q || 'Mexico');
    
    if (params.category) url.searchParams.append('category', params.category);
    if (params.from) url.searchParams.append('from', params.from);
    if (params.to) url.searchParams.append('to', params.to);
    if (params.max) url.searchParams.append('max', params.max.toString());
    
    const response = await fetch(url.toString());
    const data = await handleApiResponse(response, 'GNews');
    
    if (!data.articles) {
      throw new Error(data.errors?.[0] || 'Failed to fetch news from GNews');
    }
    
    return data.articles.map((article: any) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.image,
      publishedAt: article.publishedAt,
      source: {
        name: article.source.name
      },
      content: article.content
    }));
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('RETRY_AFTER_') && retryCount < 3) {
      return fetchGNews(params, retryCount + 1);
    }
    console.error('Error fetching from GNews:', error);
    return [];
  }
};

// Currents API
export const fetchCurrents = async (params: Partial<CurrentsParams> = {}): Promise<NewsArticle[]> => {
  try {
    const url = new URL('https://api.currentsapi.services/v1/search');
    url.searchParams.append('apiKey', CURRENTS_API_KEY);
    url.searchParams.append('country', 'MX');
    
    if (params.category) url.searchParams.append('category', params.category);
    if (params.keywords) url.searchParams.append('keywords', params.keywords);
    if (params.start_date) url.searchParams.append('start_date', params.start_date);
    if (params.end_date) url.searchParams.append('end_date', params.end_date);
    
    const response = await fetch(url.toString());
    const data = await handleApiResponse(response, 'Currents');
    
    if (!data.news) {
      throw new Error(data.message || 'Failed to fetch news from Currents API');
    }
    
    return data.news.map((article: any) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.image,
      publishedAt: article.published,
      source: {
        name: article.source
      },
      author: article.author
    }));
  } catch (error) {
    console.error('Error fetching from Currents API:', error);
    return [];
  }
};

// Marketaux API
export const fetchMarketaux = async (params: Partial<MarketauxParams> = {}): Promise<NewsArticle[]> => {
  try {
    const url = new URL('https://api.marketaux.com/v1/news/all');
    url.searchParams.append('api_token', MARKETAUX_API_KEY);
    url.searchParams.append('countries', 'mx');
    url.searchParams.append('language', 'es');
    
    if (params.search) url.searchParams.append('search', params.search);
    if (params.published_after) url.searchParams.append('published_after', params.published_after);
    if (params.published_before) url.searchParams.append('published_before', params.published_before);
    if (params.limit) url.searchParams.append('limit', params.limit.toString());
    
    const response = await fetch(url.toString());
    const data = await response.json();
    
    if (!data.data) {
      throw new Error(data.error?.message || 'Failed to fetch news from Marketaux');
    }
    
    return data.data.map((article: any) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.image_url,
      publishedAt: article.published_at,
      source: {
        name: article.source
      },
      author: article.author
    }));
  } catch (error) {
    console.error('Error fetching from Marketaux:', error);
    return [];
  }
};

// NewsAPI.org
export const fetchNewsApi = async (params: Partial<NewsApiParams> = {}): Promise<NewsArticle[]> => {
  // Only proceed if we're on localhost, otherwise return empty array
  if (!isLocalhost) {
    console.log('NewsAPI requests are only allowed from localhost in development mode');
    return [];
  }

  try {
    const url = new URL('https://newsapi.org/v2/top-headlines');
    url.searchParams.append('apiKey', NEWS_API_KEY);
    url.searchParams.append('country', 'mx');
    
    if (params.category) url.searchParams.append('category', params.category);
    if (params.q) url.searchParams.append('q', params.q);
    if (params.pageSize) url.searchParams.append('pageSize', params.pageSize.toString());
    if (params.page) url.searchParams.append('page', params.page.toString());
    
    const response = await fetch(url.toString());
    const data = await response.json();
    
    if (data.status !== 'ok') {
      throw new Error(data.message || 'Failed to fetch news from NewsAPI');
    }
    
    return data.articles;
  } catch (error) {
    console.error('Error fetching from NewsAPI:', error);
    return [];
  }
};

// Newsdata.io
export const fetchNewsData = async (params: Partial<NewsDataParams> = {}): Promise<NewsArticle[]> => {
  try {
    const url = new URL('https://newsdata.io/api/1/news');
    url.searchParams.append('apikey', NEWSDATA_API_KEY);
    url.searchParams.append('country', 'mx');
    
    if (params.category) url.searchParams.append('category', params.category);
    if (params.q) url.searchParams.append('q', params.q);
    if (params.page) url.searchParams.append('page', params.page.toString());
    
    const response = await fetch(url.toString());
    const data = await response.json();
    
    if (data.status !== 'success') {
      throw new Error(data.message || 'Failed to fetch news from Newsdata.io');
    }
    
    // Transform to match our NewsArticle interface
    return data.results.map((article: any) => ({
      title: article.title,
      description: article.description,
      url: article.link,
      urlToImage: article.image_url,
      publishedAt: article.pubDate,
      source: {
        name: article.source_id
      },
      content: article.content,
      author: article.creator?.[0] || undefined
    }));
  } catch (error) {
    console.error('Error fetching from Newsdata.io:', error);
    return [];
  }
};

// TheNewsAPI.com
export const fetchTheNewsApi = async (params: Partial<TheNewsApiParams> = {}): Promise<NewsArticle[]> => {
  try {
    const url = new URL('https://api.thenewsapi.com/v1/news/top');
    url.searchParams.append('api_token', THE_NEWS_API_KEY);
    url.searchParams.append('locale', 'mx');
    url.searchParams.append('language', 'es');
    
    if (params.search) url.searchParams.append('search', params.search);
    if (params.categories) url.searchParams.append('categories', params.categories);
    if (params.limit) url.searchParams.append('limit', params.limit.toString());
    if (params.page) url.searchParams.append('page', params.page.toString());
    
    const response = await fetch(url.toString());
    const data = await response.json();
    
    if (!data.data) {
      throw new Error(data.message || 'Failed to fetch news from TheNewsAPI');
    }
    
    // Transform to match our NewsArticle interface
    return data.data.map((article: any) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.image_url,
      publishedAt: article.published_at,
      source: {
        name: article.source
      },
      content: article.snippet,
      author: article.source
    }));
  } catch (error) {
    console.error('Error fetching from TheNewsAPI:', error);
    return [];
  }
};

// Mediastack
export const fetchMediastack = async (params: Partial<MediastackParams> = {}): Promise<NewsArticle[]> => {
  try {
    // Use HTTP instead of HTTPS for free tier
    const url = new URL('http://api.mediastack.com/v1/news');
    url.searchParams.append('access_key', MEDIASTACK_API_KEY);
    url.searchParams.append('countries', 'mx');
    
    if (params.categories) url.searchParams.append('categories', params.categories);
    if (params.keywords) url.searchParams.append('keywords', params.keywords);
    if (params.limit) url.searchParams.append('limit', params.limit.toString());
    if (params.offset) url.searchParams.append('offset', params.offset.toString());
    
    const response = await fetch(url.toString());
    const data = await response.json();
    
    if (!data.data) {
      throw new Error(data.error?.message || 'Failed to fetch news from Mediastack');
    }
    
    // Transform to match our NewsArticle interface
    return data.data.map((article: any) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.image,
      publishedAt: article.published_at,
      source: {
        name: article.source
      },
      author: article.author
    }));
  } catch (error) {
    console.error('Error fetching from Mediastack:', error);
    return [];
  }
};

// Updated fetchAllNews function with rate limiting
export const fetchAllNews = async (params: { fromDate?: string; toDate?: string } = {}): Promise<NewsArticle[]> => {
  try {
    // Add delays between API calls to prevent rate limiting
    const fetchWithDelay = async (fn: () => Promise<NewsArticle[]>, delay: number) => {
      await new Promise(resolve => setTimeout(resolve, delay));
      return fn();
    };

    const [
      newsApiResults,
      newsDataResults,
      theNewsApiResults,
      mediastackResults,
      gNewsResults,
      currentsResults,
      marketauxResults
    ] = await Promise.allSettled([
      fetchWithDelay(() => fetchNewsApi({ pageSize: 10, from: params.fromDate, to: params.toDate }), 0),
      fetchWithDelay(() => fetchNewsData({ page: 1, from: params.fromDate, to: params.toDate }), 500),
      fetchWithDelay(() => fetchTheNewsApi({ limit: 10, from: params.fromDate, to: params.toDate }), 1000),
      fetchWithDelay(() => fetchMediastack({ limit: 10, date: params.fromDate, date_to: params.toDate }), 1500),
      fetchWithDelay(() => fetchGNews({ max: 10, from: params.fromDate, to: params.toDate }), 2000),
      fetchWithDelay(() => fetchCurrents({ start_date: params.fromDate, end_date: params.toDate }), 2500),
      fetchWithDelay(() => fetchMarketaux({ limit: 10, published_after: params.fromDate, published_before: params.toDate }), 3000)
    ]);
    
    let allArticles: NewsArticle[] = [];
    
    if (newsApiResults.status === 'fulfilled') allArticles = [...allArticles, ...newsApiResults.value];
    if (newsDataResults.status === 'fulfilled') allArticles = [...allArticles, ...newsDataResults.value];
    if (theNewsApiResults.status === 'fulfilled') allArticles = [...allArticles, ...theNewsApiResults.value];
    if (mediastackResults.status === 'fulfilled') allArticles = [...allArticles, ...mediastackResults.value];
    if (gNewsResults.status === 'fulfilled') allArticles = [...allArticles, ...gNewsResults.value];
    if (currentsResults.status === 'fulfilled') allArticles = [...allArticles, ...currentsResults.value];
    if (marketauxResults.status === 'fulfilled') allArticles = [...allArticles, ...marketauxResults.value];
    
    // Remove duplicates (based on title)
    const uniqueArticles = Array.from(new Map(allArticles.map(article => 
      [article.title, article]
    )).values());
    
    // Sort by publishedAt, newest first
    return uniqueArticles.sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
  } catch (error) {
    console.error('Error fetching news from all sources:', error);
    return [];
  }
};