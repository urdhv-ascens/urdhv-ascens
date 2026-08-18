'use client';

import { useState } from 'react';

export function PublishButton() {
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      // Fallback to the hardcoded URL if environment variable is missing
      const webhookUrl = process.env.NEXT_PUBLIC_CLOUDFLARE_DEPLOY_WEBHOOK_URL || 'https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/65cdffce-bf30-4481-bd90-9191fa4be082';
      
      if (!webhookUrl) {
        alert('Please configure NEXT_PUBLIC_CLOUDFLARE_DEPLOY_WEBHOOK_URL in .env.local');
        return;
      }

      const res = await fetch(webhookUrl, { method: 'POST' });
      
      if (res.ok) {
        alert('Site publish triggered! Changes will be live in 1-2 minutes.');
      } else {
        alert('Failed to trigger Cloudflare build hook.');
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
