'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/core/firebase/config';

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user && pathname !== '/admin/login') {
        router.push('/admin/login');
      } else {
        setIsChecking(false);
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-muted-foreground font-medium">Authenticating...</span>
        </div>
      </div>
    );
  }

  // If on login page, don't render the dashboard layout wrapper
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return <>{children}</>;
}
