import { NewsDataParams, NewsArticle } from '../../types';

const NEWSDATA_API_KEY = 'pub_87842d6b96b42561dadf34a1cf7a68c34e005';

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