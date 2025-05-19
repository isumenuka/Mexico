import { CurrentsParams, NewsArticle } from '../../types';

const CURRENTS_API_KEY = 'kEAxkRWrG5R5w5awQJUrzB_ziDwIBMGIcLpBJb7bWzbwn7RG';

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
    const data = await response.json();
    
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