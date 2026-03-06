'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Menu, X, Phone, Mail, MapPin, Instagram, Facebook, Twitter, 
  ArrowRight, Sparkles, Scissors, Users, Star, Heart, Globe, ImageOff, CheckCircle2
} from 'lucide-react';

// --- Components ---

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: any) {
  const [error, setError] = useState(false);
  if (error || !src) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-primary via-primary/80 to-accent/20 ${fallbackClassName || className || ''}`}>
        <ImageOff size={32} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className}
      priority={priority}
      onError={() => setError(true)}
    />
  );
}

const useScrollReveal = () => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
};

const useTypewriter = (text: string, speed = 80) => {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplay(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return display;
};

// --- Data ---

const BRAND = {
  name: "Aso Ebi Couture",
  tagline: "Where Tradition Meets Timeless Glamour",
  description: "We specialize in bespoke, high-end traditional and modern African wear, blending timeless elegance with contemporary luxury for unforgettable moments.",
  industry: "fashion",
  region: "global",
  currency: "$",
  vibe: "elegant",
  colors: {
    primary: "#002D62",
    secondary: "#FFD700",
    accent: "#A52A2A"
  }
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1745460724839-d8d16f2ee280?auto=format&fit=crop&w=1920&q=80",
  about: "https://images.unsplash.com/photo-1592288853364-b3982e85c553?auto=format&fit=crop&w=1080&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1702468508641-a832a0b37bea?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1669296585488-b41a4e47538a?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1573227896288-1d51c740a96e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1601757941476-4939910d7737?auto=format&fit=crop&w=800&q=80"
  ]
};

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "Collections", href: "#products" },
  { name: "About Us", href: "#about" },
  { name: "Contact", href: "#contact" }
];

const PRODUCTS = [
  {
    name: "Bespoke Aso-Oke Ensemble",
    description: "Custom-tailored Aso-Oke fabric set, meticulously detailed with hand-sewn beadwork. Perfect for weddings.",
    price: "$1,200",
    image: IMAGES.gallery[0]
  },
  {
    name: "Modern Ankara Jumpsuit",
    description: "A vibrant, contemporary jumpsuit crafted from premium Ankara wax print, expertly tailored for a flawless fit.",
    price: "$450",
    image: IMAGES.gallery[1]
  },
  {
    name: "Lace Evening Gown",
    description: "An ethereal, floor-length gown made with French lace, featuring intricate ruching and a flattering silhouette.",
    price: "$1,850",
    image: IMAGES.gallery[2]
  },
  {
    name: "Groom's Agbada Set",
    description: "A regal, three-piece Agbada set made from high-quality damask, complete with a matching Fila cap.",
    price: "$950",
    image: IMAGES.gallery[3]
  }
];

const FEATURES = [
  {
    title: "Bespoke Consultation",
    description: "Personalized one-on-one design sessions to translate your vision into a wearable masterpiece.",
    icon: Sparkles
  },
  {
    title: "Premium Fabric Sourcing",
    description: "We source only the finest, authentic materials globally and locally for unparalleled quality.",
    icon: Scissors
  },
  {
    title: "Flawless Tailoring",
    description: "Expert craftsmanship ensures every stitch, bead, and fold contributes to a perfect fit and finish.",
    icon: Users
  }
];

const STATS = [
  { number: "15+", label: "Years of Craftsmanship", icon: Star },
  { number: "500+", label: "Client Testimonials", icon: Heart },
  { number: "10+", label: "International Showcases", icon: Globe }
];

const TESTIMONIALS = [
  { name: "Dr. Adetola K.", text: "The fit of my wedding attire was beyond perfect. It truly stole the show. Elegant and unforgettable.", role: "Bride" },
  { name: "Mr. S. Jide", text: "Professional service from consultation to final fitting. The Agbada was magnificent. Worth every penny.", role: "Groom" },
  { name: "Ms. Amina R.", text: "Transformed my vision for my sister's engagement into the most stunning gown I've ever worn.", role: "Client" }
];

// --- Sections ---

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const typedHeadline = useTypewriter(BRAND.tagline);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <main className="relative min-h-screen">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-primary/95 backdrop-blur-md shadow-2xl py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 group">
            <span className="font-heading text-3xl font-bold text-secondary tracking-tighter transition-transform group-hover:scale-110">
              AC
            </span>
            <span className="text-white/80 text-[10px] font-mono tracking-[0.3em] uppercase hidden sm:block">
              {BRAND.name}
            </span>
          </a>

          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map(link => (
              <a key={link.name} href={link.href} className="text-sm font-medium text-white/70 hover:text-secondary transition-colors tracking-wide">
                {link.name.toUpperCase()}
              </a>
            ))}
            <a href="#contact" className="bg-secondary text-primary px-6 py-2.5 rounded-full font-bold text-sm hover:brightness-110 transition-all hover:shadow-[0_0_20px_rgba(255,215,0,0.3)]">
              BOOK A CALL
            </a>
          </div>

          <button onClick={() => setMenuOpen(true)} className="md:hidden text-secondary">
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex animate-fadeIn">
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-md" onClick={() => setMenuOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary border-l border-white/10 p-8 flex flex-col shadow-2xl animate-slideIn">
            <div className="flex justify-between items-center mb-12">
              <span className="font-heading text-2xl font-bold text-secondary tracking-tighter">AC</span>
              <button onClick={() => setMenuOpen(false)} className="text-white"><X size={32} /></button>
            </div>
            <div className="flex flex-col gap-8">
              {NAV_LINKS.map(link => (
                <a key={link.name} href={link.href} onClick={() => setMenuOpen(false)} className="text-2xl font-heading font-bold text-white hover:text-secondary transition-colors">
                  {link.name}
                </a>
              ))}
              <a href="#contact" onClick={() => setMenuOpen(false)} className="bg-secondary text-primary p-4 rounded-xl font-bold text-center mt-4">
                BOOK A CALL
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section (HR-D Pattern) */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <SafeImage src={IMAGES.hero} alt="Elegant Couture" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-5xl w-full">
          <div className="max-w-3xl animate-fadeIn">
            <h1 className="font-heading text-6xl md:text-8xl font-bold text-white leading-[1.1] tracking-tight">
              {typedHeadline}<span className="text-secondary animate-pulse">_</span>
            </h1>
            <p className="text-white/60 mt-8 text-xl leading-relaxed font-light max-w-xl border-l-2 border-secondary/30 pl-6">
              {BRAND.description}
            </p>
            <div className="flex flex-wrap gap-4 mt-12">
              <a href="#products" className="bg-secondary text-primary px-10 py-4 rounded-full font-bold text-lg hover:brightness-110 hover:scale-105 transition-all shadow-xl">
                View Collections
              </a>
              <a href="#contact" className="border border-white/30 text-white backdrop-blur-md px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-primary transition-all">
                Contact Us
              </a>
            </div>
          </div>
        </div>

        {/* Floating Decoration */}
        <div className="absolute bottom-20 right-10 hidden lg:block animate-float">
          <div className="w-32 h-32 border-2 border-secondary/20 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-secondary/40 rounded-full" />
        </div>
      </section>

      {/* Marquee (A6 Pattern) */}
      <div className="py-8 bg-secondary overflow-hidden border-y border-secondary/30">
        <div className="flex gap-12 whitespace-nowrap animate-marquee">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex gap-12 items-center">
              {["Royal Elegance", "Hand-Finished Details", "Bespoke Fit", "Vibrant Luxury", "Timeless Fashion"].map((item, j) => (
                <span key={j} className="text-primary font-heading text-2xl font-black uppercase flex items-center gap-6">
                  {item} <div className="w-2 h-2 rounded-full bg-primary" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <SectionWrapper id="features" className="bg-primary/50 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-heading text-5xl md:text-6xl font-bold text-white mb-6">The Couture Difference</h2>
          <p className="text-white/50 text-lg">Why Aso Ebi Couture is the choice for discerning clients who demand perfection.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {FEATURES.map((feature, idx) => (
            <div key={idx} className="group p-10 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-8 group-hover:bg-secondary transition-colors duration-500">
                <feature.icon size={32} className="text-secondary group-hover:text-primary transition-colors duration-500" />
              </div>
              <h3 className="font-heading text-3xl font-bold mb-4">{feature.title}</h3>
              <p className="text-white/60 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Products Section */}
      <SectionWrapper id="products" className="bg-primary">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-heading text-5xl md:text-6xl font-bold text-white mb-6">Signature Tailored Pieces</h2>
            <p className="text-white/50 text-lg">Explore our recent creations and starting points for your next bespoke outfit.</p>
          </div>
          <div className="hidden md:block">
            <div className="h-px w-32 bg-secondary/30 mb-8" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02]">
              <div className="relative aspect-[3/4] overflow-hidden">
                <SafeImage src={product.image} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent opacity-60" />
              </div>
              <div className="p-8">
                <h3 className="font-heading text-2xl font-bold text-white mb-2">{product.name}</h3>
                <p className="text-white/50 text-sm mb-6 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-secondary font-bold text-xl">{product.price}</span>
                  <a href="#contact" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-secondary hover:text-primary transition-all">
                    <ArrowRight size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* About Section */}
      <SectionWrapper id="about" className="bg-primary/50 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative aspect-square rounded-[3rem] overflow-hidden">
              <SafeImage src={IMAGES.about} alt="Our Vision" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-secondary p-10 rounded-3xl hidden lg:block shadow-2xl animate-float">
              <span className="text-primary font-heading text-5xl font-black block">15+</span>
              <span className="text-primary/70 text-sm font-bold uppercase tracking-widest">Years of Craft</span>
            </div>
          </div>
          <div>
            <h2 className="font-heading text-5xl md:text-6xl font-bold mb-8">Our Vision</h2>
            <p className="text-white/60 text-xl leading-relaxed mb-10">
              Founded on the principle that celebration wear should be as unique as the event itself, Aso Ebi Couture has dedicated years to mastering the fusion of cultural richness and modern sophistication. We don&apos;t just make clothes; we craft heirlooms.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-white/10">
              {STATS.map((stat, idx) => (
                <div key={idx} className="text-center md:text-left">
                  <div className="flex items-center gap-2 mb-2 text-secondary justify-center md:justify-start">
                    <stat.icon size={20} />
                    <span className="font-heading text-3xl font-bold text-white">{stat.number}</span>
                  </div>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Testimonials */}
      <SectionWrapper id="testimonials" className="bg-primary">
        <div className="text-center mb-16">
          <h2 className="font-heading text-5xl font-bold mb-4">Voices of Our Clients</h2>
          <div className="h-1 w-24 bg-secondary mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="p-10 rounded-3xl bg-white/[0.03] border border-white/5 relative">
              <div className="text-secondary/20 absolute top-8 right-8">
                <Heart size={48} fill="currentColor" />
              </div>
              <p className="text-white/80 text-lg italic mb-8 relative z-10">&quot;{t.text}&quot;</p>
              <div>
                <p className="font-heading text-xl font-bold text-white">{t.name}</p>
                <p className="text-secondary text-sm font-bold uppercase tracking-widest mt-1">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Contact Section (C2 Pattern) */}
      <SectionWrapper id="contact" className="bg-primary relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="bg-white/[0.02] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2">
              <div className="p-12 md:p-16 bg-white/[0.02]">
                <h2 className="font-heading text-5xl font-bold mb-6">Book Your Design Consultation</h2>
                <p className="text-white/50 mb-10 text-lg">Let&apos;s bring your vision to life. Fill out the form below and our lead designer will contact you within 24 hours.</p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-white/70">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                      <Mail size={18} />
                    </div>
                    <span>inquiry@asoebicouture.com</span>
                  </div>
                  <div className="flex items-center gap-4 text-white/70">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                      <MapPin size={18} />
                    </div>
                    <span>Lagos Island, Nigeria</span>
                  </div>
                  <div className="flex items-center gap-4 text-white/70">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                      <Instagram size={18} />
                    </div>
                    <span>@asoebicouture</span>
                  </div>
                </div>
              </div>

              <div className="p-12 md:p-16">
                {formSubmitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center animate-scaleIn">
                    <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-primary mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="font-heading text-3xl font-bold mb-4">Message Sent</h3>
                    <p className="text-white/60">Thank you for reaching out. We will be in touch shortly to discuss your custom piece.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Name</label>
                      <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-secondary transition-colors" placeholder="Your Full Name" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Email</label>
                      <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-secondary transition-colors" placeholder="email@example.com" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Details</label>
                      <textarea required rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-secondary transition-colors resize-none" placeholder="Tell us about your event and desired style..."></textarea>
                    </div>
                    <button type="submit" className="w-full bg-secondary text-primary font-bold py-4 rounded-xl hover:brightness-110 transition-all shadow-xl">
                      Send Request
                    </button>
                    <p className="text-center text-white/30 text-[10px] uppercase tracking-widest">Sharp Craftsmanship, Worldwide Delivery</p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Footer (F1 Pattern) */}
      <footer className="bg-primary pt-24 pb-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <a href="#home" className="flex items-center gap-3 mb-8">
                <span className="font-heading text-4xl font-bold text-secondary tracking-tighter">AC</span>
                <span className="text-white text-xl font-heading tracking-tight">{BRAND.name}</span>
              </a>
              <p className="text-white/40 max-w-sm leading-relaxed">
                Elevating African fashion to global standards of luxury. Bespoke tailoring for the discerning elite since 2009.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white uppercase tracking-widest text-xs mb-6">Quick Links</h4>
              <ul className="space-y-4">
                {NAV_LINKS.map(link => (
                  <li key={link.name}><a href={link.href} className="text-white/40 hover:text-secondary text-sm transition-colors">{link.name}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white uppercase tracking-widest text-xs mb-6">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-secondary hover:border-secondary transition-all">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-secondary hover:border-secondary transition-all">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/20 text-xs tracking-widest uppercase">&copy; {new Date().getFullYear()} {BRAND.name}. All Rights Reserved.</p>
            <p className="text-white/20 text-[10px] tracking-widest uppercase">Crafted with Luxury & Purpose</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function SectionWrapper({ children, id, className }: { children: React.ReactNode, id: string, className?: string }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section 
      id={id} 
      ref={ref}
      className={`py-24 sm:py-32 px-6 transition-all duration-1000 ${className} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
}