import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border py-12 md:py-16">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start gap-12">
        
        <div className="flex flex-col max-w-sm gap-6">
          <Link href="/" className="text-3xl font-bold tracking-tighter">
            Ūrdhv<span className="text-primary">.</span>
          </Link>
          <p className="text-muted-foreground">
            A digital atelier for brands that demand distinction. Precision-engineered. Distinctly elevated.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-foreground">Studio</h4>
            <Link href="/#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link>
            <Link href="/#capabilities" className="text-sm text-muted-foreground hover:text-primary transition-colors">Capabilities</Link>
            <Link href="/#projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">Projects</Link>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-foreground">Social</h4>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Instagram</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">LinkedIn</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Twitter</a>
          </div>

          <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
            <h4 className="font-semibold text-foreground">Contact</h4>
            <a href="mailto:hello@urdhvascens.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">hello@urdhvascens.com</a>
            <p className="text-sm text-muted-foreground">+91 XXXXX XXXXX</p>
          </div>
        </div>

      </div>
      
      <div className="container mx-auto px-6 md:px-12 mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Ūrdhv Ascens. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
