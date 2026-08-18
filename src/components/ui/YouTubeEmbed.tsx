'use client';

import { useState, useEffect } from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  posterUrl?: string; // Optional: Provide a high-res poster from Cloudinary to load instantly
  autoPlay?: boolean;
}

export function YouTubeEmbed({ videoId, title = 'Video', posterUrl, autoPlay = false }: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (autoPlay) {
      setIsLoaded(true);
    }
  }, [autoPlay]);

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-secondary border border-border group flex items-center justify-center">
      {!isLoaded ? (
        <button 
          onClick={() => setIsLoaded(true)}
          className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
          aria-label={`Play ${title}`}
        >
          {posterUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={posterUrl} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-secondary/50 flex flex-col items-center justify-center gap-4">
              <span className="text-muted-foreground font-medium">Video Placeholder</span>
            </div>
          )}
          
          <div className="absolute w-16 h-16 bg-primary/90 text-primary-foreground rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      ) : (
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&hl=en&showinfo=0`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}
