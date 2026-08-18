import { PenTool, Monitor, Video, Smartphone } from 'lucide-react';
import contentData from "@/data/content.json";

export function Capabilities() {
  const { capabilities } = contentData;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Monitor': return <Monitor className="w-8 h-8 text-primary" />;
      case 'PenTool': return <PenTool className="w-8 h-8 text-primary" />;
      case 'Video': return <Video className="w-8 h-8 text-primary" />;
      case 'Smartphone': return <Smartphone className="w-8 h-8 text-primary" />;
      default: return <Monitor className="w-8 h-8 text-primary" />;
    }
  };

  return (
    <section id="capabilities" className="py-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16">
          <span className="text-primary text-sm font-bold tracking-widest uppercase mb-4 block">{capabilities.tagline}</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">{capabilities.title}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            {capabilities.description}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {capabilities.list.map((cap, index) => (
            <div key={index} className="p-8 rounded-2xl border border-border bg-card hover:border-primary/50 transition-colors group">
              <div className="mb-6 p-4 rounded-xl bg-secondary inline-block group-hover:scale-110 transition-transform">
                {getIcon(cap.icon)}
              </div>
              <h3 className="text-2xl font-semibold mb-4">{cap.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
