'use client';

import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Loader2 } from 'lucide-react';
import contentData from "@/data/content.json";
import { db } from '@/core/firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function ServicesCMS() {
  const [data, setData] = useState(contentData.services);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = doc(db, 'config', 'siteSettings');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().services) {
          setData(docSnap.data().services);
        }
      } catch (err) {
        console.error("Failed to fetch live services:", err);
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
      await setDoc(doc(db, 'config', 'siteSettings'), { services: data }, { merge: true });
      alert("Services saved to Firestore successfully! Click 'Publish' to push changes.");
    } catch (err) {
      console.error(err);
      alert("Failed to save services.");
    } finally {
      setIsSaving(false);
    }
  };

  const addService = () => {
    setData({
      ...data,
      list: [...data.list, { title: 'New Service', description: 'Description here' }]
    });
  };

  const removeService = (index: number) => {
    const newList = [...data.list];
    newList.splice(index, 1);
    setData({ ...data, list: newList });
  };

  const updateService = (index: number, field: string, value: string) => {
    const newList = [...data.list];
    newList[index] = { ...newList[index], [field]: value };
    setData({ ...data, list: newList });
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>;
  }

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto pb-24">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Services</h2>
          <p className="text-muted-foreground mt-2">Manage the services you offer.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save size={18} />}
          Save & Publish
        </button>
      </div>

      <div className="grid gap-8">
        <section className="bg-card border border-border rounded-xl p-6 flex flex-col gap-6">
          <h3 className="text-xl font-semibold border-b border-border pb-4">Services Header</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Tagline</label>
              <input 
                type="text" 
                value={data.tagline} 
                onChange={e => setData({...data, tagline: e.target.value})}
                className="px-4 py-2 bg-background border border-border rounded-lg" 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Main Title</label>
              <input 
                type="text" 
                value={data.title} 
                onChange={e => setData({...data, title: e.target.value})}
                className="px-4 py-2 bg-background border border-border rounded-lg" 
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-medium">Description</label>
              <textarea 
                rows={2}
                value={data.description} 
                onChange={e => setData({...data, description: e.target.value})}
                className="px-4 py-2 bg-background border border-border rounded-lg" 
              />
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Service List</h3>
            <button 
              onClick={addService}
              className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground font-medium rounded-md hover:bg-secondary/80 transition-colors text-sm"
            >
              <Plus size={16} />
              Add Service
            </button>
          </div>

          <div className="grid gap-4">
            {data.list.map((service, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6 flex flex-col gap-4 relative group">
                <button 
                  onClick={() => removeService(index)}
                  className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                  title="Remove Service"
                >
                  <Trash2 size={18} />
                </button>
                <div className="flex flex-col gap-2 pr-12">
                  <label className="text-sm font-medium">Service Title</label>
                  <input 
                    type="text" 
                    value={service.title} 
                    onChange={e => updateService(index, 'title', e.target.value)}
                    className="px-4 py-2 bg-background border border-border rounded-lg font-medium" 
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Service Description</label>
                  <textarea 
                    rows={3}
                    value={service.description} 
                    onChange={e => updateService(index, 'description', e.target.value)}
                    className="px-4 py-2 bg-background border border-border rounded-lg" 
                  />
                </div>
              </div>
            ))}
            {data.list.length === 0 && (
              <div className="p-8 text-center border border-dashed border-border rounded-xl text-muted-foreground">
                No services added yet. Click "Add Service" to start.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
