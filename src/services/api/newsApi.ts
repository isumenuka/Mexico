import { NewsApiParams, NewsArticle } from '../../types';

const NEWS_API_KEY = '06e19803ec9541d3861f2ba369b71ed4';

// Check if we're running on localhost
const isLocalhost = window.location.hostname === 'localhost' || 
                   window.location.hostname === '127.0.0.1';

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