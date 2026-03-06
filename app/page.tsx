'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Ruler, 
  Star, 
  Headphones, 
  Globe, 
  ArrowRight, 
  Award, 
  Trophy, 
  Menu, 
  X, 
  Instagram, 
  Mail, 
  MapPin, 
  Quote,
  ImageOff,
  ChevronRight
} from 'lucide-react';

// --- DATA ---
const BRAND = {
  name: "Aso Ebi Couture",
  tagline: "Crafting Timeless Elegance in African Fashion",
  description: "Specializing in bespoke, high-end traditional and modern African attire. We blend rich heritage fabrics with contemporary silhouettes to create unforgettable statement pieces.",
  industry: "fashion",
  region: "global",
  currency: "$",
  vibe: "elegant"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1716034092365-31a3dea7b01d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
  about: "https://images.unsplash.com/photo-1545873175-210406c06b91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  products: [
    "https://images.unsplash.com/photo-1762285315034-0df9960d9905?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1583767506124-0a2cc0455d10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1725497086174-6f7e162edc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1612151291351-c5ef474a47d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  ],
  gallery: [
    "https://images.unsplash.com/photo-1650377509454-1a40a19c2484?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1765812927581-c6eee39460e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1707222609355-74a0e5d9272d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  ]
};

const PRODUCTS = [
  { name: "The Royal Damask Gown", desc: "A bespoke floor-length gown made from imported French lace overlaid with intricate damask embroidery. Perfect for main celebrants.", price: "$4,500", img: IMAGES.products[0] },
  { name: "Modern Iro & Buba Set", desc: "A contemporary take on the classic wrapper and blouse, featuring hand-beaded accents and vibrant silk Ankara fabric.", price: "$1,850", img: IMAGES.products[1] },
  { name: "Groom's Agbada Ensemble", desc: "A luxuriously tailored three-piece Agbada set, crafted from hand-stitched velvet with gold thread detailing.", price: "$2,900", img: IMAGES.products[2] },
  { name: "Bridesmaid Aso Ebi Package", desc: "Coordinated set of dresses for the bridal party, utilizing premium Nigerian cotton in a vibrant hue.", price: "$850 per piece", img: IMAGES.products[3] }
];

const FEATURES = [
  { title: "Bespoke Tailoring", desc: "Every piece is cut and sewn specifically to your measurements, ensuring a flawless fit.", icon: Ruler },
  { title: "Premium Fabrics", desc: "Sourcing only the finest textiles, including French lace and genuine silk velvet.", icon: Star },
  { title: "Design Consultation", desc: "Personalized guidance from our head designer to bring your vision to life.", icon: Headphones },
  { title: "Global Shipping", desc: "Secure and insured delivery of your masterpiece anywhere in the world.", icon: Globe }
];

const TESTIMONIALS = [
  { name: "Mrs. Adebayo T.", role: "Wedding Client", text: "The gown was breathtaking! It fit perfectly and was the highlight of the wedding. Thank you for your artistry." },
  { name: "Mr. Kolawole S.", role: "Groom", text: "The Agbada was regal. The precision in the embroidery is unmatched. Truly worth the investment." },
  { name: "Zara M.", role: "Event Planner", text: "Their team handled my entire bridal party's Aso Ebi. Seamless process and stunning results!" }
];

// --- HOOKS ---
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

// --- COMPONENTS ---
function SafeImage({ src, alt, fill, className, priority }: { src: string, alt: string, fill?: boolean, className?: string, priority?: boolean }) {
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
      width={fill ? undefined : 800}
      height={fill ? undefined : 600}
      className={className}
      priority={priority}
      onError={() => setError(true)}
    />
  );
}

export default function Website() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Logo L2 Monogram
  const Logo = () => (
    <a href="#home" className="flex items-center gap-3">
      <span className="font-heading text-2xl font-black text-secondary tracking-tighter">
        AC
      </span>
      <span className="text-white/60 text-[10px] font-mono tracking-[0.3em] uppercase hidden sm:block">
        {BRAND.name}
      </span>
    </a>
  );

  return (
    <div className="relative">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-primary/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo />
          
          <div className="hidden md:flex items-center gap-10">
            {['Home', 'Collections', 'About', 'Contact'].map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`} 
                className="text-sm font-medium text-white/70 hover:text-secondary transition-colors"
              >
                {link}
              </a>
            ))}
            <a 
              href="#contact" 
              className="bg-secondary text-primary px-6 py-2.5 rounded-full font-bold text-sm hover:brightness-110 transition-all flex items-center gap-2 group"
            >
              Book Styling <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary shadow-2xl p-8 animate-slideIn">
            <button className="absolute top-6 right-6 text-white" onClick={() => setMenuOpen(false)}>
              <X size={28} />
            </button>
            <div className="mt-12 flex flex-col gap-8">
              <Logo />
              {['Home', 'Collections', 'About', 'Contact'].map((link) => (
                <a 
                  key={link} 
                  href={`#${link.toLowerCase()}`} 
                  className="text-2xl font-heading font-bold text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {link}
                </a>
              ))}
              <a 
                href="#contact" 
                className="mt-4 bg-secondary text-primary px-8 py-4 rounded-full font-bold text-center"
                onClick={() => setMenuOpen(false)}
              >
                View Lookbook
              </a>
            </div>
          </div>
        </div>
      )}

      {/* HERO SECTION (Pattern HR-A) */}
      <section id="home" className="min-h-screen relative flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <SafeImage src={IMAGES.hero} alt="Aso Ebi Couture Hero" fill className="object-cover opacity-40" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/80 to-primary" />
        </div>
        
        {/* Abstract Depth */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 text-center max-w-4xl px-6">
          <h1 className="font-heading text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
            Where Heritage Meets <span className="text-secondary">High Fashion</span>
          </h1>
          <p className="text-white/60 mt-8 text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto">
            Experience the pinnacle of African couture. Custom-made elegance for your most cherished moments.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center mt-12">
            <a href="#products" className="bg-secondary text-primary px-10 py-5 rounded-full font-black text-lg hover:brightness-110 hover:scale-105 transition-all shadow-xl">
              VIEW OUR LOOKBOOK
            </a>
            <a href="#contact" className="border border-white/30 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-primary transition-all backdrop-blur-sm">
              BOOK A CONSULTATION
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <SectionWrapper id="features" className="bg-primary py-32 border-y border-white/5">
        <div className="text-center mb-20">
          <h2 className="font-heading text-4xl md:text-6xl font-black text-white">The Couture Difference</h2>
          <p className="text-secondary mt-4 font-mono tracking-widest text-sm uppercase">Uncompromising Quality from Concept to Creation</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feat, idx) => (
            <div key={idx} className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary transition-colors duration-500">
                <feat.icon size={28} className="text-secondary group-hover:text-primary transition-colors" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-white mb-3">{feat.title}</h3>
              <p className="text-white/50 leading-relaxed text-sm">
                {feat.title === "Global Shipping" ? "Sharp global delivery, insured and tracked." : feat.desc}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* PRODUCTS SECTION */}
      <SectionWrapper id="products" className="bg-primary/50 py-32 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="font-heading text-4xl md:text-6xl font-black text-white">Signature Collections</h2>
            <p className="text-white/40 mt-4 text-lg">Explore our latest designs in traditional and contemporary African wear.</p>
          </div>
          <div className="flex-shrink-0">
             <div className="h-px w-24 bg-secondary mb-4 hidden md:block" />
             <p className="text-secondary font-bold text-sm tracking-[0.2em] uppercase">Autumn / Winter 24</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((prod, idx) => (
            <div key={idx} className="group flex flex-col bg-white/5 rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500">
              <div className="relative aspect-[3/4] overflow-hidden">
                <SafeImage src={prod.img} alt={prod.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <a href="#contact" className="w-full bg-white text-primary py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2">
                    Enquire Now <ChevronRight size={14} />
                  </a>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold text-white">{prod.name}</h3>
                <p className="text-white/40 text-xs mt-1 uppercase tracking-widest">{prod.price}</p>
                <p className="text-white/60 text-sm mt-4 line-clamp-2">{prod.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* STAT STRIP - A6c variant */}
      <div className="bg-secondary py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { number: '12+', label: 'Years of Craftsmanship', icon: Award },
            { number: '300+', label: 'Bespoke Creations Annually', icon: Trophy },
            { number: '5', label: 'International Showcases', icon: Star }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <stat.icon size={32} className="text-primary/40 mb-4" />
              <p className="text-5xl font-black text-primary leading-none tracking-tighter">{stat.number}</p>
              <p className="text-primary/70 text-sm mt-3 font-bold uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT SECTION */}
      <SectionWrapper id="about" className="py-32 bg-primary">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-square md:aspect-auto md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            <SafeImage src={IMAGES.about} alt="Aso Ebi Couture Legacy" fill className="object-cover" />
            <div className="absolute inset-0 border-[20px] border-secondary/20" />
          </div>
          <div className="space-y-8">
            <h2 className="font-heading text-4xl md:text-6xl font-black text-white leading-tight">Our Legacy of Elegance</h2>
            <div className="w-20 h-2 bg-secondary" />
            <p className="text-white/60 text-lg leading-relaxed">
              Founded on the principle that African attire should be as luxurious as it is meaningful, Aso Ebi Couture has been setting benchmarks in occasion wear for over a decade.
            </p>
            <p className="text-white/60 text-lg leading-relaxed">
              We are dedicated to celebrating African beauty through meticulous craftsmanship. Every stitch tells a story of heritage, reimagined for the modern global stage.
            </p>
            <div className="pt-6">
               <a href="#contact" className="inline-flex items-center gap-4 text-secondary font-bold text-lg group">
                Read Our Story <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
               </a>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* TESTIMONIALS */}
      <SectionWrapper id="testimonials" className="bg-primary/30 py-32 border-y border-white/5">
        <div className="text-center mb-20">
          <h2 className="font-heading text-4xl md:text-6xl font-black text-white">Client Love Stories</h2>
          <p className="text-white/40 mt-4 text-lg">What it feels like to wear a masterpiece.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="bg-white/5 p-10 rounded-3xl relative border border-white/10">
              <Quote size={40} className="text-secondary/20 absolute top-8 right-8" />
              <p className="text-white/80 italic leading-relaxed text-lg mb-8 relative z-10">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center font-heading font-bold text-secondary">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-bold">{t.name}</h4>
                  <p className="text-white/40 text-xs uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* CONTACT SECTION (C3 Pattern) */}
      <SectionWrapper id="contact" className="py-32 bg-primary">
        <div className="max-w-5xl mx-auto bg-white/5 rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
          <div className="grid md:grid-cols-2">
            <div className="p-12 md:p-16 bg-gradient-to-br from-primary to-accent/20">
              <h2 className="font-heading text-4xl md:text-5xl font-black text-white mb-6">Begin Your Design Journey</h2>
              <p className="text-white/60 mb-10 text-lg">Fill out the form below and our lead consultant will contact you within 24 hours to discuss your bespoke requirements.</p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Mail size={18} className="text-secondary" />
                  </div>
                  <span className="text-white/70">contact@asoebicouture.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Instagram size={18} className="text-secondary" />
                  </div>
                  <span className="text-white/70">@asoebicouture</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <MapPin size={18} className="text-secondary" />
                  </div>
                  <span className="text-white/70">Lagos, Nigeria (Global Service)</span>
                </div>
              </div>
            </div>

            <div className="p-12 md:p-16">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center animate-scaleIn">
                  <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
                    <ArrowRight size={32} className="text-primary -rotate-45" />
                  </div>
                  <h3 className="font-heading text-3xl font-bold text-white mb-2">Message Sent</h3>
                  <p className="text-white/50">Our team will be in touch shortly. Thank you for choosing excellence.</p>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-secondary uppercase tracking-widest">Full Name</label>
                    <input type="text" required className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-secondary uppercase tracking-widest">Email</label>
                      <input type="email" required className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-secondary uppercase tracking-widest">Phone</label>
                      <input type="tel" required className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-secondary uppercase tracking-widest">Event Type</label>
                    <select className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors">
                      <option className="bg-primary">Wedding (Bride/Groom)</option>
                      <option className="bg-primary">Bridal Party (Aso Ebi)</option>
                      <option className="bg-primary">Red Carpet / Gala</option>
                      <option className="bg-primary">Other Celebration</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-secondary uppercase tracking-widest">Message</label>
                    <textarea rows={4} className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors" />
                  </div>
                  <button type="submit" className="w-full bg-secondary text-primary font-black py-4 rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2">
                    SEND REQUEST <ArrowRight size={20} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* FOOTER (Pattern F2) */}
      <footer className="bg-black py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Logo />
            <p className="text-white/40 max-w-sm leading-relaxed">
              Crafting timeless statement pieces that honor African tradition while embracing modern luxury. Serving discerning clients worldwide from our heart in Lagos.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-secondary hover:border-secondary transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-secondary hover:border-secondary transition-all">
                <Mail size={20} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Explore</h4>
            <ul className="space-y-4 text-white/40 text-sm">
              <li><a href="#home" className="hover:text-secondary transition-colors">Home</a></li>
              <li><a href="#products" className="hover:text-secondary transition-colors">Collections</a></li>
              <li><a href="#about" className="hover:text-secondary transition-colors">About Legacy</a></li>
              <li><a href="#contact" className="hover:text-secondary transition-colors">Consultations</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Concierge</h4>
            <ul className="space-y-4 text-white/40 text-sm">
              <li>Lagos, Nigeria HQ</li>
              <li>Global Express Shipping</li>
              <li>Measurement Guide</li>
              <li>Terms of Bespoke Service</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/20 text-xs">
          <p>&copy; {new Date().getFullYear()} Aso Ebi Couture. All rights reserved.</p>
          <p className="tracking-[0.2em] uppercase">Designed for Excellence</p>
        </div>
      </footer>
    </div>
  );
}

function SectionWrapper({ children, id, className }: { children: React.ReactNode, id?: string, className?: string }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section 
      id={id} 
      ref={ref} 
      className={`px-6 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
}