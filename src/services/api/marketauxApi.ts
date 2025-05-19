import { MarketauxParams, NewsArticle } from '../../types';

const MARKETAUX_API_KEY = 'tDCPvsGEvCpIorvhsLvi2kNW2x7EZlPrh1MidcLC';

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