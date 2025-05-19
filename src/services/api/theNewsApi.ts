import { TheNewsApiParams, NewsArticle } from '../../types';

const THE_NEWS_API_KEY = 'UraTlsMPjBngXNJlAqLUGhWU5iPRgqt6GugiLovq';

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