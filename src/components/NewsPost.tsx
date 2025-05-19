import React, { useState, useEffect } from 'react';
import { 
  ThumbsUp, 
  MessageSquare, 
  Share2, 
  MoreHorizontal, 
  Globe,
  Clock,
  Languages,
  Facebook,
  Sparkles,
  Copy
} from 'lucide-react';
import { NewsArticle, PostEngagement } from '../types';
import { translateContent, enhanceDescription, generateFacebookPost } from '../services/geminiService';

interface NewsPostProps {
  article: NewsArticle;
}

const DEFAULT_IMAGE = 'https://images.pexels.com/photos/3844528/pexels-photo-3844528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

const NewsPost: React.FC<NewsPostProps> = ({ article }) => {
  const [engagement, setEngagement] = useState<PostEngagement>({
    likes: Math.floor(Math.random() * 1000),
    comments: Math.floor(Math.random() * 100),
    shares: Math.floor(Math.random() * 50)
  });
  
  const [liked, setLiked] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [translatedTitle, setTranslatedTitle] = useState('');
  const [translatedDescription, setTranslatedDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [facebookPost, setFacebookPost] = useState('');
  const [isGeneratingPost, setIsGeneratingPost] = useState(false);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  
  useEffect(() => {
    const translateArticle = async () => {
      if (showTranslation && !translatedTitle) {
        setIsLoading(true);
        const [titleResult, descResult] = await Promise.all([
          translateContent(article.title),
          translateContent(article.description)
        ]);
        setTranslatedTitle(titleResult);
        setTranslatedDescription(descResult);
        setIsLoading(false);
      }
    };
    
    translateArticle();
  }, [showTranslation, article]);
  
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      
      if (diffMins < 60) {
        return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
      } else if (diffHours < 24) {
        return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
      } else if (diffDays < 7) {
        return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
      } else {
        return date.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        });
      }
    } catch (e) {
      return 'Recently';
    }
  };
  
  const handleLike = () => {
    if (liked) {
      setEngagement(prev => ({
        ...prev,
        likes: prev.likes - 1
      }));
    } else {
      setEngagement(prev => ({
        ...prev,
        likes: prev.likes + 1
      }));
    }
    setLiked(!liked);
  };

  const handleGenerateFacebookPost = async () => {
    setIsGeneratingPost(true);
    const title = showTranslation ? translatedTitle : article.title;
    const description = showTranslation ? translatedDescription : article.description;
    const post = await generateFacebookPost(title, description);
    setFacebookPost(post);
    setIsGeneratingPost(false);
  };

  const handleCopyPost = async () => {
    try {
      await navigator.clipboard.writeText(facebookPost);
      setShowCopiedMessage(true);
      setTimeout(() => setShowCopiedMessage(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden transition-shadow hover:shadow-md">
      {/* Post Header */}
      <div className="p-4 flex items-start">
        <div className="flex-shrink-0">
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
            <Globe className="h-6 w-6 text-gray-500" />
          </div>
        </div>
        <div className="ml-3 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">{article.source.name}</p>
              <div className="flex items-center text-gray-500 text-sm">
                <span>{formatDate(article.publishedAt)}</span>
                <span className="mx-1">•</span>
                <Globe className="h-3 w-3" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                className={`text-gray-400 hover:text-gray-500 flex items-center ${showTranslation ? 'text-[#1877F2]' : ''}`}
                onClick={() => setShowTranslation(!showTranslation)}
              >
                <Languages className="h-5 w-5 mr-1" />
                <span className="text-sm">{showTranslation ? 'Show Original' : 'Translate'}</span>
              </button>
              <button
                onClick={handleGenerateFacebookPost}
                disabled={isGeneratingPost}
                className={`flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  isGeneratingPost 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-[#1877F2] text-white hover:bg-[#1665d8]'
                }`}
              >
                {isGeneratingPost ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-1 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Facebook className="h-4 w-4 mr-1" />
                    Generate Post
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Post Content */}
      <div className="px-4 pb-2">
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-2">
              {showTranslation ? translatedTitle : article.title}
            </h2>
            <p className="text-gray-800 mb-3">
              {showTranslation ? translatedDescription : article.description}
            </p>
          </>
        )}

        {/* Facebook Generated Post */}
        {facebookPost && (
          <div className="mt-4 mb-3 p-4 bg-gray-50 rounded-lg border border-gray-200 relative">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Facebook className="h-5 w-5 text-[#1877F2] mr-2" />
                <span className="font-medium text-gray-700">Generated Facebook Post</span>
              </div>
              <button
                onClick={handleCopyPost}
                className="flex items-center text-gray-500 hover:text-gray-700"
                title="Copy to clipboard"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
            <p className="text-gray-800 whitespace-pre-line">{facebookPost}</p>
            {showCopiedMessage && (
              <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                Copied!
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Post Image */}
      {(article.urlToImage || DEFAULT_IMAGE) && (
        <div className="mb-2">
          <img 
            src={article.urlToImage || DEFAULT_IMAGE} 
            alt={article.title}
            className="w-full h-auto max-h-96 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = DEFAULT_IMAGE;
            }}
          />
        </div>
      )}
      
      {/* Engagement Stats */}
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
      
      {/* Action Buttons */}
      <div className="px-2 py-1 flex border-t border-gray-100">
        <button 
          className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md ${
            liked ? 'text-[#1877F2] font-medium' : 'text-gray-600 hover:bg-gray-100'
          }`}
          onClick={handleLike}
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
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: showTranslation ? translatedTitle : article.title,
                text: showTranslation ? translatedDescription : article.description,
                url: article.url
              });
            } else {
              window.open(article.url, '_blank');
            }
            
            setEngagement(prev => ({
              ...prev,
              shares: prev.shares + 1
            }));
          }}
        >
          <Share2 className="h-5 w-5" />
          <span className="ml-2">Share</span>
        </button>
      </div>
      
      {/* Article Link */}
      <div className="px-4 pb-4 pt-2">
        <a 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full py-2 text-center bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors text-sm font-medium"
        >
          Read Full Article
        </a>
      </div>
    </div>
  );
};

export default NewsPost;