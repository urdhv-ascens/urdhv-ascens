'use client';

import { useState, useEffect } from 'react';
import { Save, Loader2 } from 'lucide-react';
import contentData from "@/data/content.json";
import { db } from '@/core/firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function SiteSettings() {
  const [data, setData] = useState(contentData);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = doc(db, 'config', 'siteSettings');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // Merge with static data in case there are missing fields
          setData({ ...contentData, ...docSnap.data() } as any);
        }
      } catch (err) {
        console.error("Failed to fetch live settings:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // Use merge: true so we don't overwrite projects or services if we are only saving settings
      await setDoc(doc(db, 'config', 'siteSettings'), data, { merge: true });
      alert("Settings saved to Firestore successfully! Click 'Publish' in the header to push these changes to the live site.");
    } catch (err) {
      console.error(err);
      alert("Failed to save settings. Please verify your Firebase credentials.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>;
  }

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto pb-24">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Site Settings & Content</h2>
          <p className="text-muted-foreground mt-2">Manage the core messaging and configuration for the delivery plane.</p>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
        >
          <Save size={18} />
          Save & Publish
        </button>
      </div>

      <div className="grid gap-8">
        
        {/* Global Settings */}
        <section className="bg-card border border-border rounded-xl p-6 flex flex-col gap-6">
          <h3 className="text-xl font-semibold border-b border-border pb-4">Global Brand Settings</h3>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Company Name</label>
            <input 
              type="text" 
              value={data.siteSettings.companyName} 
              onChange={e => setData({...data, siteSettings: {...data.siteSettings, companyName: e.target.value}})}
              className="px-4 py-2 bg-background border border-border rounded-lg" 
            />
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-card border border-border rounded-xl p-6 flex flex-col gap-6">
          <h3 className="text-xl font-semibold border-b border-border pb-4">Hero Section</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Tagline</label>
              <input 
                type="text" 
                value={data.hero.tagline} 
                onChange={e => setData({...data, hero: {...data.hero, tagline: e.target.value}})}
                className="px-4 py-2 bg-background border border-border rounded-lg" 
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-medium">Main Title (H1)</label>
              <input 
                type="text" 
                value={data.hero.title} 
                onChange={e => setData({...data, hero: {...data.hero, title: e.target.value}})}
                className="px-4 py-2 bg-background border border-border rounded-lg text-lg font-bold" 
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-medium">Description</label>
              <textarea 
                rows={3}
                value={data.hero.description} 
                onChange={e => setData({...data, hero: {...data.hero, description: e.target.value}})}
                className="px-4 py-2 bg-background border border-border rounded-lg" 
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-card border border-border rounded-xl p-6 flex flex-col gap-6">
          <h3 className="text-xl font-semibold border-b border-border pb-4">About Section</h3>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Title</label>
            <input 
              type="text" 
              value={data.about.title} 
              onChange={e => setData({...data, about: {...data.about, title: e.target.value}})}
              className="px-4 py-2 bg-background border border-border rounded-lg" 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Description</label>
            <textarea 
              rows={4}
              value={data.about.description} 
              onChange={e => setData({...data, about: {...data.about, description: e.target.value}})}
              className="px-4 py-2 bg-background border border-border rounded-lg" 
            />
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-card border border-border rounded-xl p-6 flex flex-col gap-6">
          <h3 className="text-xl font-semibold border-b border-border pb-4">Contact Information</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Public Email</label>
              <input 
                type="email" 
                value={data.contact.email} 
                onChange={e => setData({...data, contact: {...data.contact, email: e.target.value}})}
                className="px-4 py-2 bg-background border border-border rounded-lg" 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Phone Number</label>
              <input 
                type="text" 
                value={data.contact.phone} 
                onChange={e => setData({...data, contact: {...data.contact, phone: e.target.value}})}
                className="px-4 py-2 bg-background border border-border rounded-lg" 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Location</label>
              <input 
                type="text" 
                value={data.contact.location} 
                onChange={e => setData({...data, contact: {...data.contact, location: e.target.value}})}
                className="px-4 py-2 bg-background border border-border rounded-lg" 
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-medium">Call to Action Heading</label>
              <textarea 
                rows={2}
                value={data.contact.heading} 
                onChange={e => setData({...data, contact: {...data.contact, heading: e.target.value}})}
                className="px-4 py-2 bg-background border border-border rounded-lg" 
              />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
