import { MediastackParams, NewsArticle } from '../../types';

const MEDIASTACK_API_KEY = '8189d3904caa1a4c540b87a4af8bf9a8';

export const fetchMediastack = async (params: Partial<MediastackParams> = {}): Promise<NewsArticle[]> => {
  try {
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