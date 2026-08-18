'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

export default function ProjectEditor() {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    status: 'DRAFT',
    categoryId: '',
    shortDescription: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving project draft to Firestore:', formData);
    // TODO: Wire up Firebase Firestore write here
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/projects" className="p-2 hover:bg-secondary rounded-full transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Create Project</h2>
            <p className="text-muted-foreground mt-1">Draft a new portfolio piece.</p>
          </div>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
        >
          <Save size={18} />
          Save Draft
        </button>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Editor */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium">Project Name</label>
              <input 
                id="name" name="name" type="text" 
                value={formData.name} onChange={handleChange}
                className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" 
                placeholder="E.g. Star Excellent Academy"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="slug" className="text-sm font-medium">URL Slug</label>
              <input 
                id="slug" name="slug" type="text" 
                value={formData.slug} onChange={handleChange}
                className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-sm" 
                placeholder="star-excellent-academy"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="shortDescription" className="text-sm font-medium">Short Description (Summary)</label>
              <textarea 
                id="shortDescription" name="shortDescription" rows={3}
                value={formData.shortDescription} onChange={handleChange}
                className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" 
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="text-sm font-medium">Full Description</label>
              <textarea 
                id="description" name="description" rows={8}
                value={formData.description} onChange={handleChange}
                className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" 
              />
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="flex flex-col gap-6">
          <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-4">
            <h3 className="font-semibold text-lg border-b border-border pb-2">Status & Categorization</h3>
            
            <div className="flex flex-col gap-2 mt-2">
              <label htmlFor="status" className="text-sm font-medium">Status</label>
              <select 
                id="status" name="status" 
                value={formData.status} onChange={handleChange}
                className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="DRAFT">Draft</option>
                <option value="ACTIVE">Active / Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="categoryId" className="text-sm font-medium">Category</label>
              <select 
                id="categoryId" name="categoryId" 
                value={formData.categoryId} onChange={handleChange}
                className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Select a category</option>
                <option value="web-design">Web Design</option>
                <option value="graphic-design">Graphic Design</option>
                <option value="video-editing">Video Editing</option>
              </select>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-4">
            <h3 className="font-semibold text-lg border-b border-border pb-2">Media</h3>
            <div className="w-full aspect-video bg-secondary/50 rounded-lg border border-dashed border-border flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-secondary/70 transition-colors">
              <span className="text-sm font-medium text-muted-foreground">Click to upload Primary Image</span>
              <span className="text-xs text-muted-foreground">via Cloudinary</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
