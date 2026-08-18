'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Save, Loader2, Trash2 } from 'lucide-react';
import { db } from '@/core/firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

function EditProjectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get('id');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    slug: '',
    status: 'DRAFT',
    categoryId: '',
    category: '',
    shortDescription: '',
    description: '',
    tech: [] as string[],
    lastUpdated: ''
  });

  useEffect(() => {
    async function fetchProject() {
      if (!projectId) return;
      try {
        const docRef = doc(db, 'config', 'siteSettings');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().projectsList) {
          const project = docSnap.data().projectsList.find((p: any) => p.id === projectId);
          if (project) {
            setFormData({
              ...project,
              categoryId: project.category || '', // Use category as categoryId for the select dropdown
            });
          } else {
            alert("Project not found!");
            router.push('/admin/projects');
          }
        }
      } catch (err) {
        console.error("Failed to fetch project:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProject();
  }, [projectId, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return alert("Project name is required");
    setIsSaving(true);
    try {
      const docRef = doc(db, 'config', 'siteSettings');
      const docSnap = await getDoc(docRef);
      const existingData = docSnap.exists() ? docSnap.data() : {};
      const projectsList = existingData.projectsList || [];
      
      const updatedProject = {
        ...formData,
        category: formData.categoryId,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      
      const updatedList = projectsList.map((p: any) => p.id === formData.id ? updatedProject : p);
      
      await setDoc(docRef, { projectsList: updatedList }, { merge: true });
      router.push('/admin/projects');
    } catch (err) {
      console.error(err);
      alert("Failed to update project.");
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this project? This cannot be undone.")) return;
    setIsSaving(true);
    try {
      const docRef = doc(db, 'config', 'siteSettings');
      const docSnap = await getDoc(docRef);
      const existingData = docSnap.exists() ? docSnap.data() : {};
      const projectsList = existingData.projectsList || [];
      
      const updatedList = projectsList.filter((p: any) => p.id !== formData.id);
      
      await setDoc(docRef, { projectsList: updatedList }, { merge: true });
      router.push('/admin/projects');
    } catch (err) {
      console.error(err);
      alert("Failed to delete project.");
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>;
  }

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/projects" className="p-2 hover:bg-secondary rounded-full transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Edit Project</h2>
            <p className="text-muted-foreground mt-1">Update your portfolio piece.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleDelete}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive font-medium rounded-md hover:bg-destructive/20 transition-colors disabled:opacity-50"
          >
            <Trash2 size={18} />
            Delete
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save size={18} />}
            Save Changes
          </button>
        </div>
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
                <option value="Web Design">Web Design</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Video Editing">Video Editing</option>
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

export default function EditProject() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>}>
      <EditProjectContent />
    </Suspense>
  );
}
