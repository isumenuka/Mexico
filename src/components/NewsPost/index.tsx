import React, { useState, useEffect } from 'react';
import { NewsArticle } from '../../types';
import { translateContent, generateFacebookPost } from '../../services/geminiService';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostImage from './PostImage';
import FacebookPost from './FacebookPost';

const DEFAULT_IMAGE = 'https://images.pexels.com/photos/3844528/pexels-photo-3844528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

interface NewsPostProps {
  article: NewsArticle;
}

const NewsPost: React.FC<NewsPostProps> = ({ article }) => {
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

  const handleGenerateFacebookPost = async () => {
    setIsGeneratingPost(true);
    const title = showTranslation ? translatedTitle : article.title;
    const description = showTranslation ? translatedDescription : article.description;
    const post = await generateFacebookPost(title, description, article.url);
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: showTranslation ? translatedTitle : article.title,
        text: showTranslation ? translatedDescription : article.description,
        url: article.url
      });
    } else {
      window.open(article.url, '_blank');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden transition-shadow hover:shadow-md">
      <PostHeader
        sourceName={article.source.name}
        publishedAt={article.publishedAt}
        showTranslation={showTranslation}
        isGeneratingPost={isGeneratingPost}
        onTranslateClick={() => setShowTranslation(!showTranslation)}
        onGeneratePost={handleGenerateFacebookPost}
      />
      
      <PostContent
        title={showTranslation ? translatedTitle : article.title}
        description={showTranslation ? translatedDescription : article.description}
        isLoading={isLoading}
      />
      
      <PostImage
        imageUrl={article.urlToImage}
        title={article.title}
        defaultImage={DEFAULT_IMAGE}
      />
      
      <FacebookPost
        content={facebookPost}
        showCopied={showCopiedMessage}
        onCopy={handleCopyPost}
      />
      
      <div className="px-4 pb-4 pt-2">
        <div className="flex space-x-2">
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 py-2 text-center bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors text-sm font-medium"
          >
            Read Full Article
          </a>
          {navigator.share && (
            <button
              onClick={handleShare}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors text-sm font-medium"
            >
              Share
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsPost;