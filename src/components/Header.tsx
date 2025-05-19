import React, { useState } from 'react';
import { Search, RefreshCw, Globe, Calendar } from 'lucide-react';
import { NewsCategory, NewsSource } from '../hooks/useNews';

interface HeaderProps {
  onSourceChange: (source: NewsSource) => void;
  onCategoryChange: (category: NewsCategory) => void;
  onSearchChange: (query: string) => void;
  onFromDateChange: (date: string) => void;
  onToDateChange: (date: string) => void;
  onRefresh: () => void;
  loading: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  onSourceChange, 
  onCategoryChange, 
  onSearchChange,
  onFromDateChange,
  onToDateChange,
  onRefresh,
  loading
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(searchQuery);
  };

  const handleDateChange = () => {
    onFromDateChange(fromDate);
    onToDateChange(toDate);
    setShowDatePicker(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Globe className="h-8 w-8 text-[#1877F2]" />
            <h1 className="ml-2 text-xl font-bold text-[#1877F2]">Mexico News</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search news..."
                className="w-64 py-2 pl-10 pr-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1877F2]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
            </form>

            <div className="relative">
              <button
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                title="Filter by date"
              >
                <Calendar className="h-5 w-5 text-gray-600" />
              </button>

              {showDatePicker && (
                <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg p-4 w-72">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                      <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1877F2]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                      <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1877F2]"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setShowDatePicker(false)}
                        className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleDateChange}
                        className="px-4 py-2 text-sm bg-[#1877F2] text-white rounded-md hover:bg-[#1665d8]"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <button 
              onClick={onRefresh} 
              disabled={loading}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Refresh news"
            >
              <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin text-[#1877F2]' : 'text-gray-600'}`} />
            </button>
          </div>
        </div>
        
        <nav className="mt-3">
          <div className="flex space-x-1 overflow-x-auto pb-2">
            {['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'].map((cat) => (
              <button 
                key={cat}
                className="px-4 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-full whitespace-nowrap transition-colors"
                onClick={() => onCategoryChange(cat as NewsCategory)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;