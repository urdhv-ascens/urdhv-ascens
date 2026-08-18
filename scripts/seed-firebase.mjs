import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
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

async function seed() {
  console.log('🚀 Seeding Firebase with initial content.json data...');

  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const contentPath = path.join(__dirname, '..', 'src', 'data', 'content.json');
    const rawData = await fs.readFile(contentPath, 'utf8');
    const data = JSON.parse(rawData);

    const docRef = doc(db, 'config', 'siteSettings');
    
    // Upload the entire content.json to Firebase!
    await setDoc(docRef, data, { merge: true });

    console.log('✅ Successfully seeded Firebase! Your database is now fully populated.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to seed Firebase:', error.message);
    process.exit(1);
  }
}

seed();
