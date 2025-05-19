import React from 'react';
import { Facebook, Copy } from 'lucide-react';

interface FacebookPostProps {
  content: string;
  showCopied: boolean;
  onCopy: () => void;
}

const FacebookPost: React.FC<FacebookPostProps> = ({ content, showCopied, onCopy }) => {
  if (!content) return null;

  return (
    <div className="mt-4 mb-3 p-4 bg-gray-50 rounded-lg border border-gray-200 relative">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Facebook className="h-5 w-5 text-[#1877F2] mr-2" />
          <span className="font-medium text-gray-700">Generated Facebook Post</span>
        </div>
        <button
          onClick={onCopy}
          className="flex items-center text-gray-500 hover:text-gray-700"
          title="Copy to clipboard"
        >
          <Copy className="h-4 w-4" />
        </button>
      </div>
      <p className="text-gray-800 whitespace-pre-line">{content}</p>
      {showCopied && (
        <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
          Copied!
        </div>
      )}
    </div>
  );
};

export default FacebookPost;