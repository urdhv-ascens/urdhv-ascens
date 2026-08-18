import Link from 'next/link';
import contentData from "@/data/content.json";

export function Services() {
  const { services } = contentData;

  return (
    <section id="services" className="py-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16">
          <span className="text-primary text-sm font-bold tracking-widest uppercase mb-4 block">{services.tagline}</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">{services.title}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            {services.description}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {services.list.map((service, index) => (
            <div key={index} className="flex gap-6 md:gap-8 group">
              <span className="text-4xl md:text-5xl font-bold text-muted/30 group-hover:text-primary/50 transition-colors shrink-0 font-serif italic">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 pt-10 border-t border-border flex justify-center">
          <Link href="/services" className="inline-flex items-center text-primary font-medium hover:underline underline-offset-4 text-lg">
            View Complete Service Catalog
            <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
