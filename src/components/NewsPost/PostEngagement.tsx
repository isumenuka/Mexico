import React from 'react';
import { ThumbsUp } from 'lucide-react';
import { PostEngagement as PostEngagementType } from '../../types';

interface PostEngagementProps {
  engagement: PostEngagementType;
}

const PostEngagement: React.FC<PostEngagementProps> = ({ engagement }) => {
  return (
    <div className="px-4 py-2 flex items-center justify-between text-gray-500 text-sm border-t border-gray-100">
      <div className="flex items-center">
        <div className="bg-[#1877F2] rounded-full h-5 w-5 flex items-center justify-center">
          <ThumbsUp className="h-3 w-3 text-white" />
        </div>
        <span className="ml-1">{engagement.likes}</span>
      </div>
      <div>
        <span>{engagement.comments} comments</span>
        <span className="mx-2">•</span>
        <span>{engagement.shares} shares</span>
      </div>
    </div>
  );
};

export default PostEngagement;