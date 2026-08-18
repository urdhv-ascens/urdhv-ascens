'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Loader2 } from 'lucide-react';
import contentData from "@/data/content.json";
import { db } from '@/core/firebase/config';
import { doc, getDoc } from 'firebase/firestore';

export default function ProjectsCMS() {
  const [projects, setProjects] = useState<any[]>(contentData.projectsList || []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const docRef = doc(db, 'config', 'siteSettings');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().projectsList) {
          setProjects(docSnap.data().projectsList);
        }
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>;
  }
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground mt-2">Manage your portfolio projects and case studies.</p>
        </div>
        <Link 
          href="/admin/projects/new" 
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus size={18} />
          New Project
        </Link>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="px-6 py-4 font-medium text-sm text-muted-foreground">Project Name</th>
              <th className="px-6 py-4 font-medium text-sm text-muted-foreground">Status</th>
              <th className="px-6 py-4 font-medium text-sm text-muted-foreground">Category</th>
              <th className="px-6 py-4 font-medium text-sm text-muted-foreground">Last Updated</th>
              <th className="px-6 py-4 font-medium text-sm text-muted-foreground text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                <td className="px-6 py-4 font-medium">{project.name}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    project.status === 'ACTIVE' 
                      ? 'bg-emerald-500/10 text-emerald-500' 
                      : 'bg-amber-500/10 text-amber-500'
                  }`}>
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-muted-foreground">{project.category}</td>
                <td className="px-6 py-4 text-muted-foreground text-sm">{project.lastUpdated || 'Unknown'}</td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/admin/projects/${project.id}`} className="text-sm font-medium text-primary hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {projects.length === 0 && (
          <div className="p-12 text-center text-muted-foreground flex flex-col items-center gap-4">
            <p>No projects found. Create your first project to get started.</p>
            <Link 
              href="/admin/projects/new" 
              className="px-4 py-2 bg-secondary text-secondary-foreground font-medium rounded-md hover:bg-secondary/80 transition-colors"
            >
              Create Project
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
