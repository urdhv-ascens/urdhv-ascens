'use client';

import { useState } from 'react';

export function PublishButton() {
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      const res = await fetch('/api/publish', {
        method: 'POST'
      });
      const data = await res.json();
      
      if (res.ok) {
        alert(data.message || 'Site published successfully!');
      } else {
        alert(data.error || 'Failed to publish site.');
      }
    } catch (error) {
      alert('An error occurred during publishing.');
      console.error(error);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <button 
      onClick={handlePublish}
      disabled={isPublishing}
      className={`px-4 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-full shadow-sm transition-colors ${
        isPublishing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90'
      }`}
    >
      {isPublishing ? 'Publishing...' : 'Publish Site'}
    </button>
  );
}
