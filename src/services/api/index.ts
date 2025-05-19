import { NewsArticle } from '../../types';
import { fetchNewsApi } from './newsApi';
import { fetchNewsData } from './newsDataApi';
import { fetchTheNewsApi } from './theNewsApi';
import { fetchMediastack } from './mediastackApi';
import { fetchGNews } from './gnewsApi';
import { fetchCurrents } from './currentsApi';
import { fetchMarketaux } from './marketauxApi';

export * from './newsApi';
export * from './newsDataApi';
export * from './theNewsApi';
export * from './mediastackApi';
export * from './gnewsApi';
export * from './currentsApi';
export * from './marketauxApi';

export const fetchAllNews = async (params: { fromDate?: string; toDate?: string } = {}): Promise<NewsArticle[]> => {
  try {
    const [
      newsApiResults,
      newsDataResults,
      theNewsApiResults,
      mediastackResults,
      gNewsResults,
      currentsResults,
      marketauxResults
    ] = await Promise.allSettled([
      fetchNewsApi({ pageSize: 10, from: params.fromDate, to: params.toDate }),
      fetchNewsData({ page: 1, from: params.fromDate, to: params.toDate }),
      fetchTheNewsApi({ limit: 10, from: params.fromDate, to: params.toDate }),
      fetchMediastack({ limit: 10, date: params.fromDate, date_to: params.toDate }),
      fetchGNews({ max: 10, from: params.fromDate, to: params.toDate }),
      fetchCurrents({ start_date: params.fromDate, end_date: params.toDate }),
      fetchMarketaux({ limit: 10, published_after: params.fromDate, published_before: params.toDate })
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