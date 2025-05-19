import React from 'react';
import Header from './components/Header';
import NewsFeed from './components/NewsFeed';
import { useNews } from './hooks/useNews';

function App() {
  const {
    articles,
    loading,
    error,
    setSource,
    setCategory,
    searchQuery,
    setSearchQuery,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    hasMore,
    loadMore,
    refresh
  } = useNews();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        onSourceChange={setSource}
        onCategoryChange={setCategory}
        onSearchChange={setSearchQuery}
        onFromDateChange={setFromDate}
        onToDateChange={setToDate}
        onRefresh={refresh}
        loading={loading}
      />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        <NewsFeed
          articles={articles}
          loading={loading}
          error={error}
          hasMore={hasMore}
          onLoadMore={loadMore}
        />
      </main>
    </div>
  );
}

export default App;