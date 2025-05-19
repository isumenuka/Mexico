import { useState, useEffect, useCallback } from 'react';
import { NewsArticle } from '../types';
import { fetchAllNews, fetchNewsApi, fetchNewsData, fetchTheNewsApi, fetchMediastack } from '../services/newsApi';

export type NewsSource = 'all' | 'newsApi' | 'newsData' | 'theNewsApi' | 'mediastack';
export type NewsCategory = 'general' | 'business' | 'entertainment' | 'health' | 'science' | 'sports' | 'technology';

interface UseNewsOptions {
  initialSource?: NewsSource;
  initialCategory?: NewsCategory;
  initialSearchQuery?: string;
  initialFromDate?: string;
  initialToDate?: string;
}

export const useNews = ({
  initialSource = 'all',
  initialCategory = 'general',
  initialSearchQuery = '',
  initialFromDate = '',
  initialToDate = ''
}: UseNewsOptions = {}) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<NewsSource>(initialSource);
  const [category, setCategory] = useState<NewsCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [fromDate, setFromDate] = useState(initialFromDate);
  const [toDate, setToDate] = useState(initialToDate);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [lastFetchTime, setLastFetchTime] = useState(0);

  const fetchNews = useCallback(async (resetPage = false) => {
    const currentPage = resetPage ? 1 : page;
    
    if (resetPage) {
      setArticles([]);
      setPage(1);
    }
    
    // Add rate limiting
    const now = Date.now();
    const timeSinceLastFetch = now - lastFetchTime;
    if (timeSinceLastFetch < 2000) { // Minimum 2 seconds between fetches
      await new Promise(resolve => setTimeout(resolve, 2000 - timeSinceLastFetch));
    }
    
    setLoading(true);
    setError(null);
    
    try {
      let fetchedArticles: NewsArticle[] = [];
      
      switch (source) {
        case 'all':
          fetchedArticles = await fetchAllNews({ fromDate, toDate });
          break;
        case 'newsApi':
          fetchedArticles = await fetchNewsApi({ 
            category, 
            q: searchQuery || undefined,
            page: currentPage,
            pageSize: 10,
            from: fromDate || undefined,
            to: toDate || undefined
          });
          break;
        case 'newsData':
          fetchedArticles = await fetchNewsData({ 
            category, 
            q: searchQuery || undefined,
            page: currentPage,
            from: fromDate || undefined,
            to: toDate || undefined
          });
          break;
        case 'theNewsApi':
          fetchedArticles = await fetchTheNewsApi({ 
            categories: category !== 'general' ? category : undefined,
            search: searchQuery || undefined,
            page: currentPage,
            limit: 10,
            from: fromDate || undefined,
            to: toDate || undefined
          });
          break;
        case 'mediastack':
          fetchedArticles = await fetchMediastack({ 
            categories: category !== 'general' ? category : undefined,
            keywords: searchQuery || undefined,
            offset: (currentPage - 1) * 10,
            limit: 10,
            date: fromDate || undefined,
            date_to: toDate || undefined
          });
          break;
      }
      
      setLastFetchTime(Date.now());
      
      if (resetPage) {
        setArticles(fetchedArticles);
      } else {
        setArticles(prevArticles => [...prevArticles, ...fetchedArticles]);
      }
      
      setHasMore(fetchedArticles.length > 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch news');
    } finally {
      setLoading(false);
    }
  }, [source, category, searchQuery, fromDate, toDate, page, lastFetchTime]);

  useEffect(() => {
    fetchNews(true);
  }, [source, category, searchQuery, fromDate, toDate]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setTimeout(() => {
        setPage(prevPage => prevPage + 1);
        fetchNews();
      }, 2000); // Add delay before loading more
    }
  }, [loading, hasMore, fetchNews]);

  const refresh = useCallback(() => {
    fetchNews(true);
  }, [fetchNews]);

  return {
    articles,
    loading,
    error,
    source,
    setSource,
    category,
    setCategory,
    searchQuery,
    setSearchQuery,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    hasMore,
    loadMore,
    refresh,
    page
  };
};