'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '/#about' },
    { label: 'Capabilities', href: '/#capabilities' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Services', href: '/#services' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-border/50 py-4 shadow-sm'
          : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tighter">
          Ūrdhv<span className="text-primary">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="px-5 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
          >
            Start a Project
          </Link>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border shadow-lg py-4 px-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-lg font-medium py-2 border-b border-border/50 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="mt-4 px-6 py-3 text-center font-medium bg-primary text-primary-foreground rounded-full"
            onClick={() => setMobileMenuOpen(false)}
          >
            Start a Project
          </Link>
        </div>
      )}
    </header>
  );
}
