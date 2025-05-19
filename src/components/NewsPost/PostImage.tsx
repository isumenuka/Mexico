import React from 'react';

interface PostImageProps {
  imageUrl: string | undefined;
  title: string;
  defaultImage: string;
}

const PostImage: React.FC<PostImageProps> = ({ imageUrl, title, defaultImage }) => {
  if (!imageUrl && !defaultImage) return null;

  return (
    <div className="mb-2">
      <img 
        src={imageUrl || defaultImage} 
        alt={title}
        className="w-full h-auto max-h-96 object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src = defaultImage;
        }}
      />
    </div>
  );
};

export default PostImage;