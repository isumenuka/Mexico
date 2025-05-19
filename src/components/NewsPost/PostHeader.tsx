import React from 'react';
import { Globe, Languages, Facebook, Sparkles } from 'lucide-react';

interface PostHeaderProps {
  sourceName: string;
  publishedAt: string;
  showTranslation: boolean;
  isGeneratingPost: boolean;
  onTranslateClick: () => void;
  onGeneratePost: () => void;
}

const PostHeader: React.FC<PostHeaderProps> = ({
  sourceName,
  publishedAt,
  showTranslation,
  isGeneratingPost,
  onTranslateClick,
  onGeneratePost,
}) => {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-MX', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return 'Fecha no disponible';
    }
  };

  return (
    <div className="p-4 flex items-start">
      <div className="flex-shrink-0">
        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
          <Globe className="h-6 w-6 text-gray-500" />
        </div>
      </div>
      <div className="ml-3 flex-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-900">{sourceName}</p>
            <div className="flex items-center text-gray-500 text-sm">
              <span>{formatDate(publishedAt)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              className={`text-gray-400 hover:text-gray-500 flex items-center ${showTranslation ? 'text-[#1877F2]' : ''}`}
              onClick={onTranslateClick}
            >
              <Languages className="h-5 w-5 mr-1" />
              <span className="text-sm">{showTranslation ? 'Ver Original' : 'Traducir'}</span>
            </button>
            <button
              onClick={onGeneratePost}
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
                  Generando...
                </>
              ) : (
                <>
                  <Facebook className="h-4 w-4 mr-1" />
                  Generar Post
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostHeader;