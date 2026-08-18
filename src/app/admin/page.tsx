export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground mt-2">Manage the Ūrdhv Ascens digital presence.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border border-border rounded-xl bg-card flex flex-col gap-2">
          <span className="text-sm font-medium text-muted-foreground">Total Projects</span>
          <span className="text-4xl font-bold">12</span>
        </div>
        <div className="p-6 border border-border rounded-xl bg-card flex flex-col gap-2">
          <span className="text-sm font-medium text-muted-foreground">Active Services</span>
          <span className="text-4xl font-bold">4</span>
        </div>
        <div className="p-6 border border-border rounded-xl bg-card flex flex-col gap-2">
          <span className="text-sm font-medium text-muted-foreground">Unpublished Changes</span>
          <span className="text-4xl font-bold text-amber-500">3</span>
        </div>
      </div>
      
      <div className="p-6 border border-border rounded-xl bg-card">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center py-3 border-b border-border/50">
            <div>
              <p className="font-medium">Updated Hero Section</p>
              <p className="text-sm text-muted-foreground">Modified tagline text</p>
            </div>
            <span className="text-sm text-muted-foreground">2 hours ago</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-border/50">
            <div>
              <p className="font-medium">Added New Project</p>
              <p className="text-sm text-muted-foreground">Star Excellent Academy</p>
            </div>
            <span className="text-sm text-muted-foreground">Yesterday</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <div>
              <p className="font-medium">Published Site</p>
              <p className="text-sm text-muted-foreground">Release v1.0.4 deployed to Cloudflare</p>
            </div>
            <span className="text-sm text-muted-foreground">2 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
