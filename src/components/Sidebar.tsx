import React from 'react';
import { Globe, Bookmark, Users, Calendar, Flag, LayoutGrid, Home } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <aside className="hidden lg:block w-60 h-screen sticky top-16 pt-4 overflow-y-auto bg-white">
      <nav className="px-2">
        <ul className="space-y-1">
          <li>
            <a 
              href="#" 
              className="flex items-center p-2 rounded-lg text-gray-900 hover:bg-gray-100 font-medium"
            >
              <Home className="h-6 w-6 text-[#1877F2] mr-4" />
              <span>Home</span>
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className="flex items-center p-2 rounded-lg text-gray-900 hover:bg-gray-100 font-medium"
            >
              <Globe className="h-6 w-6 text-[#1877F2] mr-4" />
              <span>Mexico News</span>
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className="flex items-center p-2 rounded-lg text-gray-900 hover:bg-gray-100"
            >
              <Bookmark className="h-6 w-6 text-purple-600 mr-4" />
              <span>Saved Articles</span>
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className="flex items-center p-2 rounded-lg text-gray-900 hover:bg-gray-100"
            >
              <Users className="h-6 w-6 text-blue-500 mr-4" />
              <span>Groups</span>
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className="flex items-center p-2 rounded-lg text-gray-900 hover:bg-gray-100"
            >
              <Calendar className="h-6 w-6 text-red-500 mr-4" />
              <span>Events</span>
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className="flex items-center p-2 rounded-lg text-gray-900 hover:bg-gray-100"
            >
              <Flag className="h-6 w-6 text-orange-500 mr-4" />
              <span>Pages</span>
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className="flex items-center p-2 rounded-lg text-gray-900 hover:bg-gray-100"
            >
              <LayoutGrid className="h-6 w-6 text-green-500 mr-4" />
              <span>Explore</span>
            </a>
          </li>
        </ul>
      </nav>
      
      <div className="mt-6 px-4">
        <h3 className="text-gray-500 font-medium px-2 mb-2">Top Sources</h3>
        <ul className="space-y-1">
          <li>
            <a href="#" className="flex items-center p-2 rounded-lg text-gray-900 hover:bg-gray-100">
              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                <span className="text-sm font-semibold text-red-800">CNN</span>
              </div>
              <span>CNN Mexico</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 rounded-lg text-gray-900 hover:bg-gray-100">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <span className="text-sm font-semibold text-blue-800">BBC</span>
              </div>
              <span>BBC Mundo</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 rounded-lg text-gray-900 hover:bg-gray-100">
              <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                <span className="text-sm font-semibold text-yellow-800">El</span>
              </div>
              <span>El Universal</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 rounded-lg text-gray-900 hover:bg-gray-100">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <span className="text-sm font-semibold text-green-800">MX</span>
              </div>
              <span>Mexico News Daily</span>
            </a>
          </li>
        </ul>
      </div>
      
      <div className="mt-6 px-4 pb-8">
        <div className="text-xs text-gray-500">
          <p className="mb-1">© 2025 MexicoNews Feed</p>
          <div className="flex flex-wrap gap-x-2">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Cookies</a>
            <a href="#" className="hover:underline">More</a>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;