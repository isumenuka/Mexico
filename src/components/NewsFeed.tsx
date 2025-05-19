import React, { useEffect, useRef, useCallback } from 'react';
import NewsPost from './NewsPost';
import { NewsArticle } from '../types';
import { Loader } from 'lucide-react';

interface NewsFeedProps {
  articles: NewsArticle[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  onLoadMore: () => void;
}

const NewsFeed: React.FC<NewsFeedProps> = ({ 
  articles, 
  loading, 
  error, 
  hasMore, 
  onLoadMore 
}) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        onLoadMore();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, onLoadMore]);

  // Clean up observer on unmount
  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <h3 className="text-red-800 font-medium">Error loading news</h3>
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-4">
      {articles.length === 0 && loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader className="h-10 w-10 text-[#1877F2] animate-spin mb-4" />
          <p className="text-gray-600">Loading news from Mexico...</p>
        </div>
      ) : articles.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No news found</h3>
          <p className="text-gray-600">Try changing your filters or search query</p>
        </div>
      ) : (
        <>
          {articles.map((article, index) => (
            <NewsPost key={`${article.title}-${index}`} article={article} />
          ))}
          
          {/* Load more trigger element */}
          {hasMore && (
            <div ref={loadMoreRef} className="py-4 flex justify-center">
              {loading && (
                <div className="flex items-center">
                  <Loader className="h-5 w-5 text-[#1877F2] animate-spin mr-2" />
                  <span className="text-gray-600">Loading more...</span>
                </div>
              )}
            </div>
          )}
          
          {!hasMore && articles.length > 0 && (
            <div className="py-4 text-center text-gray-600">
              No more articles to load
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NewsFeed;