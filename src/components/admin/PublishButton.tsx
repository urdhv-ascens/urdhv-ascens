'use client';

import { useState } from 'react';
import { db } from '@/core/firebase/config';
import { doc, getDoc } from 'firebase/firestore';

export function PublishButton() {
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      // Fetch the Webhook URL from Firestore first
      const docRef = doc(db, 'config', 'siteSettings');
      const docSnap = await getDoc(docRef);
      
      let webhookUrl = process.env.NEXT_PUBLIC_CLOUDFLARE_DEPLOY_WEBHOOK_URL;
      
      if (docSnap.exists() && docSnap.data().cloudflareWebhookUrl) {
        webhookUrl = docSnap.data().cloudflareWebhookUrl;
      }
      
      if (!webhookUrl) {
        alert('Please configure the Cloudflare Webhook URL in the Admin Panel -> Settings tab.');
        return;
      }

      // Send as an opaque request (mode: no-cors) to bypass browser CORS blocks
      await fetch(webhookUrl, { method: 'POST', mode: 'no-cors' });
      
      // With no-cors, we can't read the response status, so we assume success if no network error occurred
      alert('Site publish triggered! Changes will be live in 1-2 minutes.');
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
