import type { Metadata } from "next";
import Link from "next/link";
import { AdminAuthGuard } from "@/components/admin/AdminAuthGuard";
import { PublishButton } from "@/components/admin/PublishButton";

export const metadata: Metadata = {
  title: "Admin | Ūrdhv Ascens",
  description: "Control Plane",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthGuard>
      <div className="flex min-h-screen bg-background text-foreground">
        {/* Admin Sidebar */}
        <aside className="w-64 border-r border-border bg-card flex flex-col hidden md:flex">
          <div className="p-6 border-b border-border">
            <Link href="/admin" className="text-xl font-bold tracking-tighter">
              Ūrdhv Ascens <span className="text-primary">Admin</span>
            </Link>
          </div>
          
          <nav className="flex-1 p-4 flex flex-col gap-2">
            <Link href="/admin" className="px-4 py-2 rounded-md hover:bg-secondary transition-colors font-medium text-sm">Dashboard</Link>
            <Link href="/admin/projects" className="px-4 py-2 rounded-md hover:bg-secondary transition-colors font-medium text-sm">Projects</Link>
            <Link href="/admin/services" className="px-4 py-2 rounded-md hover:bg-secondary transition-colors font-medium text-sm">Services</Link>
            <Link href="/admin/media" className="px-4 py-2 rounded-md hover:bg-secondary transition-colors font-medium text-sm">Media</Link>
            <Link href="/admin/settings" className="px-4 py-2 rounded-md hover:bg-secondary transition-colors font-medium text-sm">Site Settings</Link>
          </nav>
          
          <div className="p-4 border-t border-border">
            <button className="w-full px-4 py-2 bg-destructive/10 text-destructive rounded-md font-medium text-sm hover:bg-destructive/20 transition-colors text-left">
              Sign Out
            </button>
          </div>
        </aside>

        {/* Admin Main Content */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden bg-secondary/10">
          <header className="h-16 border-b border-border bg-background flex items-center justify-between px-8 shrink-0 hidden md:flex">
            <h1 className="text-lg font-medium">Control Plane</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">admin@urdhvascens.com</span>
              <PublishButton />
            </div>
          </header>
          <div className="p-8 overflow-auto flex-1">
            {children}
          </div>
        </main>
      </div>
    </AdminAuthGuard>
  );
}
