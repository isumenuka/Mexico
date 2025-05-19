import React from 'react';

interface PostContentProps {
  title: string;
  description: string;
  isLoading: boolean;
}

const PostContent: React.FC<PostContentProps> = ({ title, description, isLoading }) => {
  if (isLoading) {
    return (
      <div className="px-4 pb-2">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pb-2">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-800 mb-3">{description}</p>
    </div>
  );
};

export default PostContent;