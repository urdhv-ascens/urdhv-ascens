'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import contentData from "@/data/content.json";

export function Contact() {
  const { contact } = contentData;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const text = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    const encodedText = encodeURIComponent(text);
    const subject = encodeURIComponent(`Inquiry: ${formData.subject || 'New Project'}`);
    
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${encodedText}`;
  };

  return (
    <section id="contact" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16">
          <span className="text-primary text-sm font-bold tracking-widest uppercase mb-4 block">{contact.tagline}</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">{contact.title}</h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="flex flex-col gap-10">
            <div>
              <h3 className="text-3xl font-medium leading-tight mb-6" dangerouslySetInnerHTML={{ __html: contact.heading.replace(/\n/g, '<br/>') }} />
              <p className="text-muted-foreground text-lg leading-relaxed">
                {contact.description}
              </p>
            </div>
            
            <div className="flex flex-col gap-6 pt-8 border-t border-border">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary rounded-full shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <span className="text-lg font-medium">{contact.email}</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary rounded-full shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <span className="text-lg font-medium">{contact.phone}</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary rounded-full shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <span className="text-lg font-medium">{contact.location}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-border p-8 md:p-10 rounded-2xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" 
                  placeholder="John Doe"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" 
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  className="px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" 
                  placeholder="Project Inquiry"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-y" 
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="mt-2 w-full py-4 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
