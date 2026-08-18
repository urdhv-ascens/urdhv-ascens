import contentData from "@/data/content.json";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";

export function About() {
  const { about } = contentData;

  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <span className="text-primary text-sm font-bold tracking-widest uppercase mb-4 block">The Philosophy</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8">{about.title}</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {about.description}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            {about.stats.map((stat, index) => (
              <div key={index} className="flex flex-col gap-2 p-8 bg-card border border-border rounded-2xl">
                <span className="text-5xl font-bold text-primary">{stat.value}</span>
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Video Presentation */}
        <div className="w-full max-w-5xl mx-auto">
          <YouTubeEmbed 
            videoId="dQw4w9WgXcQ" // Placeholder Rickroll or any ID
            title="Ūrdhv Ascens Showreel" 
          />
        </div>
      </div>
    </section>
  );
}
