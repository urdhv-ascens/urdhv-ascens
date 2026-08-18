import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config({ path: '.env.local' });

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

async function hydrate() {
  console.log('🔄 Initiating CMS Data Hydration...');

  if (!firebaseConfig.projectId) {
    console.warn('⚠️ No Firebase Project ID found. Skipping hydration. (Using local static data)');
    return;
  }

  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const docRef = doc(db, 'config', 'siteSettings');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const contentPath = path.join(__dirname, '..', 'src', 'data', 'content.json');
      
      // We stringify the data nicely for version control readability
      await fs.writeFile(contentPath, JSON.stringify(data, null, 2), 'utf8');
      
      console.log('✅ Successfully hydrated content.json from Firestore!');
    } else {
      console.log('⚠️ No document found in Firestore at config/siteSettings. Proceeding with default static data.');
    }
  } catch (error) {
    if (error.code === 'permission-denied') {
      console.warn('⚠️ Firebase Permission Denied. To fix this, update your Firestore Rules to allow public reads to config/siteSettings.');
    } else {
      console.error('❌ Failed to hydrate CMS data:', error.message);
    }
    console.warn('⚠️ Proceeding with existing local static data...');
    process.exit(0); // Gracefully fallback so the build doesn't crash
  }
}

hydrate();
