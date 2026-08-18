'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/core/firebase/config';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to authenticate.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-xl">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="p-3 bg-primary/10 text-primary rounded-full mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Control Plane Access</h1>
          <p className="text-muted-foreground text-sm mt-2">Enter your credentials to access the Ūrdhv Ascens Admin CMS.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" 
              placeholder="admin@urdhvascens.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" 
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit" 
            className="mt-2 w-full py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
}
