'use client';

import React from 'react';

interface NewsProseContentProps {
  html: string;
  className?: string;
}

/**
 * Renders rich text (from Filament/editor) with theme-specific styles
 * so default editor tags (h2, h3, p, blockquote, ul, ol) look distinct and on-brand.
 */
export const NewsProseContent: React.FC<NewsProseContentProps> = ({ html, className = '' }) => {
  return (
    <div
      className={`news-prose ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
