import React from 'react';
import { ThumbsUp, MessageSquare, Share2 } from 'lucide-react';

interface PostActionsProps {
  liked: boolean;
  onLike: () => void;
  onShare: () => void;
  articleUrl: string;
}

const PostActions: React.FC<PostActionsProps> = ({ liked, onLike, onShare, articleUrl }) => {
  return (
    <>
      <div className="px-2 py-1 flex border-t border-gray-100">
        <button 
          className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md ${
            liked ? 'text-[#1877F2] font-medium' : 'text-gray-600 hover:bg-gray-100'
          }`}
          onClick={onLike}
        >
          <ThumbsUp className={`h-5 w-5 ${liked ? 'fill-[#1877F2] text-[#1877F2]' : ''}`} />
          <span className="ml-2">Like</span>
        </button>
        <button className="flex-1 flex items-center justify-center py-2 px-4 text-gray-600 hover:bg-gray-100 rounded-md">
          <MessageSquare className="h-5 w-5" />
          <span className="ml-2">Comment</span>
        </button>
        <button 
          className="flex-1 flex items-center justify-center py-2 px-4 text-gray-600 hover:bg-gray-100 rounded-md"
          onClick={onShare}
        >
          <Share2 className="h-5 w-5" />
          <span className="ml-2">Share</span>
        </button>
      </div>
      
      <div className="px-4 pb-4 pt-2">
        <a 
          href={articleUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full py-2 text-center bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors text-sm font-medium"
        >
          Read Full Article
        </a>
      </div>
    </>
  );
};

export default PostActions;