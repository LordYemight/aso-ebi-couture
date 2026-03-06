'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Ruler, 
  Diamond, 
  Users, 
  Video, 
  Star, 
  Heart, 
  MapPin, 
  Mail, 
  Phone, 
  Instagram, 
  ArrowRight, 
  Menu, 
  X, 
  CheckCircle2,
  ImageOff,
  Quote
} from 'lucide-react';

// --- DATA ---
const BRAND = {
  name: "Aso Ebi Couture",
  tagline: "Where Tradition Meets Modern Elegance in Fabric.",
  description: "Curating bespoke, high-end traditional and contemporary African attire for unforgettable moments. We specialize in luxurious Aso Ebi designs and personalized tailoring services.",
  industry: "fashion",
  region: "global",
  currency: "$",
  vibe: "elegant",
  colors: {
    primary: "#002147",
    secondary: "#FFD700",
    accent: "#A4001F"
  }
};

const IMAGES = {
  hero: "https://picsum.photos/seed/fashion0/1920/1080",
  about: "https://picsum.photos/seed/fashion1/800/1000",
  products: [
    "https://picsum.photos/seed/fashion2/800/600",
    "https://picsum.photos/seed/fashion3/800/600",
    "https://picsum.photos/seed/fashion4/800/600",
    "https://picsum.photos/seed/fashion5/800/600"
  ],
  gallery: [
    "https://picsum.photos/seed/fashion6/600/600",
    "https://picsum.photos/seed/fashion7/600/600",
    "https://picsum.photos/seed/fashion8/600/600"
  ]
};

const PRODUCTS = [
  { name: "Royal Blue Gele & Buba Set", description: "Hand-stitched premium lace featuring intricate beadwork in our signature royal blue.", price: "$1,500", image: IMAGES.products[0] },
  { name: "Modern Agbada Ensemble", description: "Luxurious silk-damask Agbada with subtle gold embroidery. Perfect for grand occasions.", price: "$2,200", image: IMAGES.products[1] },
  { name: "Bridal Lace Cascade Gown", description: "A breathtaking blend of French lace and traditional embellishments for the modern African bride.", price: "$4,500", image: IMAGES.products[2] },
  { name: "Custom Fabric Sourcing", description: "Bespoke service for sourcing the finest, hardest-to-find African fabrics from across the continent.", price: "$500 (Deposit)", image: IMAGES.products[3] }
];

const FEATURES = [
  { title: "Bespoke Tailoring", description: "Every stitch is crafted to your exact measurements and personal vision, ensuring a flawless fit.", icon: Ruler },
  { title: "Luxury Fabrics", description: "Access to exclusive, hand-selected textiles—from rich French lace to authentic Nigerian damask.", icon: Diamond },
  { title: "Aso Ebi Curation", description: "Expert coordination and bulk design services for your entire wedding or event party.", icon: Users },
  { title: "Virtual Consultations", description: "Global access to our design team via high-definition video consultations.", icon: Video }
];

const STATS = [
  { number: "15+", label: "Years of Craftsmanship", icon: Star },
  { number: "500+", label: "Satisfied Client Events", icon: Heart },
  { number: "3", label: "Global Design Studios", icon: MapPin }
];

const TESTIMONIALS = [
  { name: "Mrs. Adebayo", text: "The quality surpassed all expectations. My outfit was the centerpiece of the entire ceremony!", role: "Wedding Client" },
  { name: "Mr. Jide", text: "Professional, timely, and exquisitely tailored. Their attention to detail on the embroidery was superb.", role: "Groom/Client" },
  { name: "Chichi M.", text: "Sourcing fabrics through them saved me so much stress. The result was simply regal.", role: "Event Planner" }
];

// --- COMPONENTS ---

function SafeImage({ src, alt, fill, width, height, className, priority }: any) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-primary/40 to-accent/10 ${className}`}>
        <ImageOff size={32} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={className}
      priority={priority}
      onError={() => setError(false)}
    />
  );
}

const useScrollReveal = () => {
  const ref = useRef<any>(null);
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

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('success');
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Collections", href: "#products" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <main className="relative bg-primary text-white">
      {/* --- NAVBAR --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary/95 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo L2 Style */}
          <a href="#home" className="flex items-center gap-3">
            <span className="font-heading text-2xl font-black text-secondary tracking-tighter">AC</span>
            <span className="text-white/60 text-xs font-mono tracking-[0.2em] uppercase hidden sm:block">Aso Ebi Couture</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="text-sm font-medium hover:text-secondary transition-colors uppercase tracking-widest">{link.name}</a>
            ))}
            <a href="#contact" className="bg-secondary text-primary px-6 py-2.5 rounded-full font-bold text-sm hover:brightness-110 transition-all">VIEW OUR PORTFOLIO</a>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <div className="relative ml-auto h-full w-[80%] max-w-sm bg-primary p-10 flex flex-col shadow-2xl animate-slideIn">
            <button className="self-end text-white mb-10" onClick={() => setMenuOpen(false)}>
              <X size={32} />
            </button>
            <div className="flex flex-col gap-6">
              {navLinks.map(link => (
                <a key={link.name} href={link.href} onClick={() => setMenuOpen(false)} className="text-2xl font-heading font-bold text-white hover:text-secondary">{link.name}</a>
              ))}
              <a href="#contact" onClick={() => setMenuOpen(false)} className="mt-6 bg-secondary text-primary text-center py-4 rounded-xl font-bold">VIEW OUR PORTFOLIO</a>
            </div>
          </div>
        </div>
      )}

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Visual Layers */}
        <div className="absolute inset-0 z-0">
          <SafeImage src={IMAGES.hero} alt="Elegant African Fashion" fill className="object-cover opacity-30 grayscale-[50%]" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/80 to-primary" />
          {/* Decorative Orbs */}
          <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <h1 className="font-heading text-6xl md:text-8xl font-black text-white leading-[0.9] animate-slideUp text-balance">
            The Art of African Celebration Wear
          </h1>
          <p className="mt-8 text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            Experience unparalleled elegance and masterful tailoring in every custom design. Fusing deep cultural respect with cutting-edge fashion.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
            <a href="#products" className="group flex items-center gap-2 bg-secondary text-primary px-10 py-5 rounded-full font-black text-lg hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)]">
              EXPLORE COLLECTIONS <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </a>
            <a href="#contact" className="px-10 py-5 rounded-full font-bold text-lg border-2 border-white/20 hover:bg-white/10 transition-all">
              BOOK CONSULTATION
            </a>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="py-24 relative overflow-hidden bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold">Our Couture Difference</h2>
            <p className="text-white/60 mt-4 max-w-xl mx-auto">Why Aso Ebi Couture is the choice for discerning clients seeking excellence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, idx) => {
              const { ref, isVisible } = useScrollReveal();
              const Icon = feature.icon;
              return (
                <div 
                  key={idx} 
                  ref={ref}
                  style={{ transitionDelay: `${idx * 150}ms` }}
                  className={`p-8 rounded-3xl bg-white/5 border border-white/10 group hover:bg-white/10 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                  <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent transition-colors">
                    <Icon size={28} className="text-secondary group-hover:text-white" />
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- STAT STRIP --- */}
      <div className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <stat.icon className="text-primary/40 mb-4" size={32} />
              <p className="text-5xl font-black text-primary mb-2">{stat.number}</p>
              <p className="text-primary/70 font-bold uppercase tracking-widest text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* --- PRODUCTS SECTION --- */}
      <section id="products" className="py-24 bg-primary relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold">Signature Collections</h2>
              <p className="text-white/60 mt-4 max-w-xl">Explore our current ready-to-wear pieces and custom fabric selections.</p>
            </div>
            <a href="#contact" className="text-secondary font-bold flex items-center gap-2 hover:underline">
              Request Full Catalog <ArrowRight size={18} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.map((product, idx) => {
              const { ref, isVisible } = useScrollReveal();
              return (
                <div 
                  key={idx} 
                  ref={ref}
                  className={`group relative flex flex-col bg-white/5 rounded-3xl overflow-hidden border border-white/10 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                >
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <SafeImage src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                        {product.price}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-white/50 text-sm line-clamp-3 mb-6">{product.description}</p>
                    <a href="#contact" className="w-full inline-block text-center py-3 rounded-xl border border-secondary/30 text-secondary font-bold hover:bg-secondary hover:text-primary transition-all">
                      Inquire Now
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-24 bg-primary/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[3/4] md:aspect-square rounded-3xl overflow-hidden">
            <SafeImage src={IMAGES.about} alt="Our Heritage" fill className="object-cover" />
            <div className="absolute inset-0 border-2 border-secondary/20 m-4 rounded-2xl pointer-events-none" />
          </div>
          <div>
            <span className="text-secondary font-mono tracking-[0.3em] uppercase text-sm">Our Heritage in Fabric</span>
            <h2 className="font-heading text-4xl md:text-5xl font-black mt-6 mb-8 leading-tight">Crafting Legacies One Stitch At A Time</h2>
            <div className="space-y-6 text-white/70 text-lg leading-relaxed">
              <p>Founded on the principle that special occasions deserve extraordinary attire, Aso Ebi Couture fuses deep cultural respect with cutting-edge fashion design.</p>
              <p>We believe what you wear should tell a story of heritage, status, and individuality. Our artisans spend hundreds of hours on single pieces to ensure perfection.</p>
              <p className="italic text-secondary/80">Experience quality wey go loud — globally recognized, traditionally rooted.</p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-8">
              <div className="border-l-2 border-accent pl-6">
                <p className="text-3xl font-black font-heading">Global</p>
                <p className="text-white/40 uppercase text-xs tracking-widest mt-1">Shipping & Services</p>
              </div>
              <div className="border-l-2 border-accent pl-6">
                <p className="text-3xl font-black font-heading">Bespoke</p>
                <p className="text-white/40 uppercase text-xs tracking-widest mt-1">Design Philosophy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-4xl font-bold text-center mb-16">Client Voices</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white/5 p-10 rounded-3xl border border-white/10 relative">
                <Quote size={40} className="text-accent/20 absolute top-8 left-8" />
                <div className="relative z-10">
                  <p className="text-lg italic text-white/80 leading-relaxed mb-8">"{t.text}"</p>
                  <div>
                    <p className="font-heading font-bold text-secondary text-xl">{t.name}</p>
                    <p className="text-white/40 text-xs uppercase tracking-widest mt-1">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-24 bg-primary relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
            {/* Success Overlay */}
            {formStatus === 'success' && (
              <div className="absolute inset-0 z-20 bg-primary/95 backdrop-blur-xl flex flex-col items-center justify-center text-center p-6 animate-scaleIn">
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} className="text-primary" />
                </div>
                <h3 className="font-heading text-3xl font-bold mb-4">Message Received</h3>
                <p className="text-white/60 max-w-md">Our lead stylist will reach out within 24 hours to begin your couture journey.</p>
                <button onClick={() => setFormStatus('idle')} className="mt-8 text-secondary font-bold underline">Send another message</button>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h2 className="font-heading text-4xl md:text-5xl font-bold mb-8">Schedule Your Consultation</h2>
                <p className="text-white/60 mb-10 leading-relaxed">Whether you are planning a grand wedding or need a single standout piece, our team is ready to assist you.</p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-secondary">
                      <Phone size={20} />
                    </div>
                    <span className="text-lg font-medium">{BRAND.contact.whatsapp}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-secondary">
                      <Mail size={20} />
                    </div>
                    <span className="text-lg font-medium">{BRAND.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-secondary">
                      <MapPin size={20} />
                    </div>
                    <span className="text-lg font-medium">{BRAND.contact.address}</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-widest text-white/40 font-bold mb-2 block">Full Name</label>
                  <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-secondary transition-colors" placeholder="Jane Doe" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-white/40 font-bold mb-2 block">Email Address</label>
                  <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-secondary transition-colors" placeholder="jane@example.com" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-white/40 font-bold mb-2 block">Service Required</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-secondary transition-colors text-white/60">
                    <option>Bespoke Tailoring</option>
                    <option>Bulk Aso Ebi Curation</option>
                    <option>Fabric Sourcing</option>
                    <option>Virtual Styling</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-white/40 font-bold mb-2 block">Your Vision</label>
                  <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-secondary transition-colors" placeholder="Tell us about your event..."></textarea>
                </div>
                <button type="submit" className="w-full py-5 bg-secondary text-primary font-black text-lg rounded-xl hover:brightness-110 transition-all shadow-lg">
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-black py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <a href="#home" className="flex items-center gap-3 mb-6">
                <span className="font-heading text-2xl font-black text-secondary tracking-tighter">AC</span>
                <span className="text-white text-lg font-heading">Aso Ebi Couture</span>
              </a>
              <p className="text-white/40 text-sm leading-relaxed">
                Elevating African attire through master craftsmanship and a commitment to luxury since 2009.
              </p>
            </div>

            <div>
              <h4 className="font-heading text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4">
                {navLinks.map(link => (
                  <li key={link.name}><a href={link.href} className="text-white/40 hover:text-secondary transition-colors text-sm">{link.name}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-lg font-bold mb-6">Legal</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-white/40 hover:text-secondary transition-colors text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-white/40 hover:text-secondary transition-colors text-sm">Terms of Service</a></li>
                <li><a href="#" className="text-white/40 hover:text-secondary transition-colors text-sm">Shipping & Returns</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-lg font-bold mb-6">Connect</h4>
              <div className="flex gap-4">
                <a href={`https://instagram.com/${BRAND.contact.instagram}`} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
                  <Instagram size={20} />
                </a>
                <a href={`https://wa.me/${BRAND.contact.whatsapp}`} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
                  <Phone size={20} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono tracking-widest text-white/20">
            <p>&copy; {new Date().getFullYear()} ASO EBI COUTURE. ALL RIGHTS RESERVED.</p>
            <p>DESIGNED IN LAGOS, SERVING THE WORLD.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}