import Link from "next/link";
import contentData from "@/data/content.json";

export function Hero() {
  const { hero } = contentData;

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-12 relative overflow-hidden">
      {/* Background abstract shape */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm md:text-base mb-6 inline-block">
          {hero.tagline}
        </span>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[1.1] mb-8 max-w-5xl text-foreground">
          {hero.title}
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed">
          {hero.description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="#contact" 
            className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/20"
          >
            Start a Project
          </Link>
          <Link 
            href="#projects" 
            className="px-8 py-4 rounded-full bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-all"
          >
            View Our Work
          </Link>
        </div>
      </div>
    </section>
  );
}
