import React from 'react';
import { ExternalLink, TrendingUp as Trending, BarChart2 } from 'lucide-react';

const RightSidebar: React.FC = () => {
  // Simulated trending topics about Mexico
  const trendingTopics = [
    { id: 1, topic: 'Mexico Elections', posts: '24.5K posts' },
    { id: 2, topic: 'Tourism in Cancun', posts: '12.8K posts' },
    { id: 3, topic: 'Peso Exchange Rate', posts: '8.6K posts' },
    { id: 4, topic: 'Mexico World Cup Bid', posts: '7.2K posts' },
    { id: 5, topic: 'Day of the Dead', posts: '6.9K posts' },
  ];
  
  return (
    <aside className="hidden xl:block w-80 h-screen sticky top-16 pt-4 overflow-y-auto">
      <div className="px-4">
        <div className="rounded-lg bg-white shadow-sm p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Trending in Mexico</h3>
            <BarChart2 className="h-5 w-5 text-gray-500" />
          </div>
          
          <ul className="space-y-3">
            {trendingTopics.map(topic => (
              <li key={topic.id}>
                <a href="#" className="flex justify-between group hover:bg-gray-50 p-2 -mx-2 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 group-hover:text-[#1877F2]">{topic.topic}</p>
                    <p className="text-xs text-gray-500">{topic.posts}</p>
                  </div>
                  <Trending className="h-5 w-5 text-gray-400 self-center" />
                </a>
              </li>
            ))}
          </ul>
          
          <a href="#" className="mt-3 text-[#1877F2] font-medium text-sm hover:underline block">
            See more
          </a>
        </div>
        
        <div className="rounded-lg bg-white shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Suggested Pages</h3>
          </div>
          
          <ul className="space-y-3">
            <li>
              <a href="#" className="flex items-center hover:bg-gray-50 p-2 -mx-2 rounded-lg">
                <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-red-800 font-bold">MX</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Mexico Tourism Board</p>
                  <p className="text-xs text-gray-500">Government Organization</p>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center hover:bg-gray-50 p-2 -mx-2 rounded-lg">
                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-800 font-bold">CD</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Ciudad de México</p>
                  <p className="text-xs text-gray-500">City</p>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center hover:bg-gray-50 p-2 -mx-2 rounded-lg">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-800 font-bold">FT</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Mexican Football Team</p>
                  <p className="text-xs text-gray-500">Sports Team</p>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </a>
            </li>
          </ul>
          
          <a href="#" className="mt-3 text-[#1877F2] font-medium text-sm hover:underline block">
            See all suggestions
          </a>
        </div>
        
        <div className="mt-4 text-xs text-gray-500">
          <div className="flex flex-wrap gap-x-2 mb-2">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Advertising</a>
            <a href="#" className="hover:underline">Ad Choices</a>
            <a href="#" className="hover:underline">Cookies</a>
          </div>
          <p>© 2025 MexicoNews Feed</p>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;