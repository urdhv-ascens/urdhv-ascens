import Link from 'next/link';
import contentData from "@/data/content.json";

export function Projects() {
  const { projects } = contentData;
  
  // Note: Individual projects are still mock here since they will be derived from a separate CMS collection/file
  const projectItems = [
    {
      title: "Star Excellent Academy",
      category: "Web Design & Development",
      description: "A comprehensive digital platform for an educational institution — featuring dynamic content management, responsive design, and an admin CMS built on our API-hydration architecture.",
      tech: ["Next.js", "Tailwind CSS", "Firebase"],
      link: "#",
    }
  ];

  return (
    <section id="projects" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-primary text-sm font-bold tracking-widest uppercase mb-4 block">{projects.tagline}</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">{projects.title}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              {projects.description}
            </p>
          </div>
          <Link href="/projects" className="shrink-0 px-6 py-3 rounded-full border border-border hover:bg-secondary transition-colors font-medium text-sm">
            View All Projects
          </Link>
        </div>
        
        <div className="grid gap-16">
          {projectItems.map((project, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-12 items-center group">
              <div className="order-2 md:order-1 flex flex-col gap-6">
                <span className="text-sm font-medium tracking-wider uppercase text-primary">
                  {project.category}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold">{project.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tech.map((tag, i) => (
                    <span key={i} className="px-3 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Link href={project.link} className="mt-4 inline-flex items-center text-primary font-medium hover:underline underline-offset-4">
                  View Project
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
              
              <div className="order-1 md:order-2 relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-border/50 group-hover:border-primary/30 transition-colors">
                <div className="absolute inset-0 bg-secondary flex items-center justify-center">
                  <span className="text-muted-foreground font-mono">Project Image Placeholder</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
