import { GNewsParams, NewsArticle } from '../../types';

const GNEWS_API_KEY = '3d92a3c6a60b89438b357604c3c32419';

export const fetchGNews = async (params: Partial<GNewsParams> = {}): Promise<NewsArticle[]> => {
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
    const data = await response.json();
    
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
    console.error('Error fetching from GNews:', error);
    return [];
  }
};