import React, { useState, useMemo } from 'react';
import { 
  Instagram, 
  Camera, 
  Paintbrush, 
  ArrowRight, 
  MapPin, 
  Calendar, 
  X, 
  ExternalLink, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Info, 
  Mail, 
  Menu, 
  Heart,
  FileText
} from 'lucide-react';
import { 
  portfolioItems, 
  exhibitionsList, 
  testimonialsList, 
  profilePortrait 
} from './data';
import { PortfolioItem } from './types';
import { PortfolioCard } from './components/PortfolioCard';

export default function App() {
  // Tabs and filtering state
  const [activeCategory, setActiveCategory] = useState<'all' | 'ringside' | 'fineart'>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Lightbox / Detail Modal state
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  
  // Exhibition filtering role state
  const [exhibitionFilter, setExhibitionFilter] = useState<'all' | 'Artist' | 'Curator'>('all');

  // Contact form state
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [formError, setFormError] = useState<string | null>(null);

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Filter items based on category and tag
  const filteredItems = useMemo(() => {
    return portfolioItems.filter(item => {
      const matchCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchTag = !selectedTag || (item.tags && item.tags.includes(selectedTag));
      return matchCategory && matchTag;
    });
  }, [activeCategory, selectedTag]);

  // Extract all unique tags based on selected category
  const availableTags = useMemo(() => {
    const items = activeCategory === 'all' 
      ? portfolioItems 
      : portfolioItems.filter(item => item.category === activeCategory);
    
    const tagsSet = new Set<string>();
    items.forEach(item => item.tags?.forEach(tag => tagsSet.add(tag)));
    return Array.from(tagsSet);
  }, [activeCategory]);

  // Handle active category changes
  const handleCategoryChange = (category: 'all' | 'ringside' | 'fineart') => {
    setActiveCategory(category);
    setSelectedTag(null); // Reset tag filters
  };

  // Lightbox Navigation
  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex === null) return;
    const prevIndex = activeLightboxIndex === 0 ? filteredItems.length - 1 : activeLightboxIndex - 1;
    setActiveLightboxIndex(prevIndex);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex === null) return;
    const nextIndex = activeLightboxIndex === filteredItems.length - 1 ? 0 : activeLightboxIndex + 1;
    setActiveLightboxIndex(nextIndex);
  };

  // Contact Form Handling
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Basic Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError('Please fill out all required fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    // Simulate sending email API
    setFormState('submitting');
    setTimeout(() => {
      setFormState('success');
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
      });
    }, 1200);
  };

  const currentLightboxItem = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f5] font-sans selection:bg-neutral-800 selection:text-white overflow-x-hidden">
      
      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-40 bg-[#050505]/95 backdrop-blur-md border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex flex-col select-none group" id="logo-nav">
            <span className="font-display text-xl font-black tracking-tighter uppercase text-white transition-colors duration-300">
              TONY KNOX <span className="text-zinc-600 font-light lowercase">.org.uk</span>
            </span>
            <span className="font-mono text-[9px] tracking-[0.45em] text-zinc-500 uppercase">
              Ringside & Curation
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10 font-mono text-[10px] tracking-widest" id="desktop-nav">
            <a href="#work" className="text-zinc-400 hover:text-red-500 transition-colors uppercase font-bold py-2 relative group">
              WORK
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#about" className="text-zinc-400 hover:text-red-500 transition-colors uppercase font-bold py-2 relative group">
              ABOUT
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#exhibitions" className="text-zinc-400 hover:text-red-500 transition-colors uppercase font-bold py-2 relative group">
              EXHIBITIONS
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#mothman" className="text-zinc-400 hover:text-red-500 transition-colors uppercase font-bold py-2 relative group">
              MOTHMAN
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#contact" className="text-zinc-400 hover:text-red-500 transition-colors uppercase font-bold py-2 relative group">
              CONTACT
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>

          {/* Socials / Action */}
          <div className="hidden md:flex items-center space-x-5">
            <a 
              href="https://www.instagram.com/tonyknox99/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-4 py-2 bg-white text-black hover:bg-zinc-200 text-[10px] uppercase font-bold tracking-tighter transition-all duration-300 hover:scale-102 flex items-center gap-2"
              id="header-instagram-link"
            >
              <Instagram size={13} />
              <span>@tonyknox99</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-zinc-400 hover:text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
            id="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-0 w-full bg-[#0d0d0d] border-b border-white/10 z-30 transition-all duration-300">
          <nav className="flex flex-col px-6 py-8 space-y-5 font-mono text-[11px] tracking-widest">
            <a 
              href="#work" 
              className="text-zinc-400 hover:text-red-500 py-2 border-b border-white/5"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              01 / WORK
            </a>
            <a 
              href="#about" 
              className="text-zinc-400 hover:text-red-500 py-2 border-b border-white/5"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              02 / ABOUT
            </a>
            <a 
              href="#exhibitions" 
              className="text-zinc-400 hover:text-red-500 py-2 border-b border-white/5"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              03 / EXHIBITIONS
            </a>
            <a 
              href="#mothman" 
              className="text-zinc-400 hover:text-red-500 py-2 border-b border-white/5"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              04 / MOTHMAN
            </a>
            <a 
              href="#contact" 
              className="text-zinc-400 hover:text-red-500 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              05 / CONTACT
            </a>
            <div className="pt-4 flex">
              <a 
                href="https://www.instagram.com/tonyknox99/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full text-center text-black bg-white hover:bg-zinc-200 font-mono text-xs font-black uppercase py-3 rounded-xs flex items-center justify-center gap-2"
              >
                <Instagram size={14} />
                <span>Follow @tonyknox99</span>
              </a>
            </div>
          </nav>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center py-20 px-6 overflow-hidden" id="hero-section">
        
        {/* Minimalist Grid Pattern Background */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
          <div className="w-full h-full bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        {/* Ambient Gradient Glows (Subtle, Dark Theme) */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-red-950/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-zinc-800/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center z-10 relative">
          
          {/* Subtitle / Intro tag */}
          <div className="inline-flex items-center gap-3 px-3 py-1.5 mb-8 border border-white/10 bg-[#0d0d0d] rounded-sm">
            <span className="flex h-2 w-2 rounded-full bg-red-600 animate-pulse"></span>
            <span className="font-mono text-[9px] tracking-[0.25em] text-zinc-400 uppercase">
              Ringside Photography & Contemporary Curation
            </span>
          </div>

          {/* Dual Identity Display Headline */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8 leading-[1.1]" id="hero-headline">
            Where the raw <span className="font-black italic uppercase tracking-tighter text-red-500">grit</span> of the <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-zinc-100 to-white font-black italic uppercase tracking-tighter">
              squared circle
            </span> <br className="hidden sm:inline" />
            meets the <span className="font-serif italic font-light tracking-wide text-zinc-300">white cube</span>.
          </h1>

          {/* Introduction paragraph */}
          <p className="max-w-2xl mx-auto text-zinc-400 text-sm sm:text-base leading-relaxed font-sans mb-12" id="hero-subtext">
            Tony Knox is a UK-based ringside wrestling photographer, fine artist, and curator. 
            Blending high-impact sports action with conceptual gallery installation and public art, 
            he documents global stars and orchestrates avant-garde curatorial programs.
          </p>

          {/* Action Callouts */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6" id="hero-actions">
            <a 
              href="#work" 
              className="w-full sm:w-auto px-8 py-4 bg-white text-black font-mono text-[11px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-colors duration-300 rounded-sm flex items-center justify-center gap-3"
            >
              <span>EXPLORE PORTFOLIO</span>
              <ArrowRight size={14} />
            </a>
            <a 
              href="#contact" 
              className="w-full sm:w-auto px-8 py-4 bg-transparent text-white border border-white/10 hover:border-white/40 font-mono text-[11px] font-black uppercase tracking-widest transition-colors duration-300 rounded-sm flex items-center justify-center gap-2"
            >
              <span>SECURE COMMISSION</span>
            </a>
          </div>

          {/* Split Duality Visualizer Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto mt-24 text-left">
            
            {/* Wrestling Card */}
            <div className="p-10 bg-[#0a0a0a] border border-white/5 rounded-sm hover:border-red-950 hover:bg-[#0f0a0a] transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-2 right-4 text-[10px] font-mono text-white/5 select-none">01_ACTION</div>
              <div className="flex items-center justify-between mb-6">
                <Camera className="text-red-500 group-hover:scale-110 transition-transform duration-300" size={20} />
                <span className="font-mono text-[9px] tracking-[0.2em] text-zinc-600 uppercase font-bold">01 / RINGSIDE</span>
              </div>
              <h3 className="font-display text-2xl font-black italic uppercase leading-none mb-3 tracking-tighter text-white">
                Ringside Action
              </h3>
              <p className="text-zinc-500 text-xs leading-relaxed">
                Visceral impact of global wrestling and independent UK circuits. Capturing the sweat, lighting, and athletic commitment under <span className="text-white">@tonyknox99</span>.
              </p>
            </div>

            {/* Fine Art Card */}
            <div className="p-10 bg-[#080808] border border-white/5 rounded-sm hover:border-white/10 hover:bg-[#0d0d0d] transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-2 right-4 text-[10px] font-mono text-white/5 select-none">02_GALLERY</div>
              <div className="flex items-center justify-between mb-6">
                <Paintbrush className="text-zinc-400 group-hover:scale-110 transition-transform duration-300" size={20} />
                <span className="font-mono text-[9px] tracking-[0.2em] text-zinc-600 uppercase font-bold">02 / FINE ART</span>
              </div>
              <h3 className="font-serif italic text-2xl font-extralight uppercase leading-none mb-3 tracking-tight text-white">
                Fine Art Curation
              </h3>
              <p className="text-zinc-500 text-xs leading-relaxed">
                MFA (UCLan) curatorial projects and contemporary interventions with the Liverpool Biennial and St Helens. Exploring relational subcultures and the <span className="text-white">MothMan</span> project.
              </p>
            </div>

          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60">
          <span className="font-mono text-[8px] tracking-[0.3em] text-zinc-500 uppercase">SCROLL</span>
          <div className="w-[1px] h-10 bg-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-red-500 animate-bounce"></div>
          </div>
        </div>

      </section>

      {/* PORTFOLIO / WORK SECTION */}
      <section className="py-24 border-t border-white/10 bg-[#050505]" id="work">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Section Title */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="font-mono text-xs text-red-500 tracking-[0.25em] block mb-3 uppercase font-bold">
                / PORTFOLIO ARCHIVE
              </span>
              <h2 className="font-display text-4xl font-bold text-white tracking-tight">
                Dualistic Fields
              </h2>
            </div>
            
            {/* Filter Navigation */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#0a0a0a] border border-white/10 rounded-sm font-mono text-[10px] tracking-widest font-bold">
              <button 
                onClick={() => handleCategoryChange('all')}
                className={`px-5 py-2.5 rounded-xs transition-all duration-300 uppercase ${activeCategory === 'all' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
                id="filter-all-btn"
              >
                ALL ARCHIVE
              </button>
              <button 
                onClick={() => handleCategoryChange('ringside')}
                className={`px-5 py-2.5 rounded-xs transition-all duration-300 flex items-center gap-1.5 uppercase ${activeCategory === 'ringside' ? 'bg-red-950/80 border border-red-900/40 text-red-300' : 'text-zinc-500 hover:text-white'}`}
                id="filter-ringside-btn"
              >
                <Camera size={11} />
                <span>RINGSIDE</span>
              </button>
              <button 
                onClick={() => handleCategoryChange('fineart')}
                className={`px-5 py-2.5 rounded-xs transition-all duration-300 flex items-center gap-1.5 uppercase ${activeCategory === 'fineart' ? 'bg-zinc-900 border border-zinc-800 text-white' : 'text-zinc-500 hover:text-white'}`}
                id="filter-fineart-btn"
              >
                <Paintbrush size={11} />
                <span>FINE ART & CURATION</span>
              </button>
            </div>
          </div>

          {/* Sub-tag Filtering */}
          {availableTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-12 py-3 border-y border-white/5 font-mono text-[9px] text-zinc-400 tracking-wider">
              <span className="mr-3 text-zinc-600 uppercase font-bold">Filter by tag:</span>
              <button 
                onClick={() => setSelectedTag(null)}
                className={`px-3 py-1 border transition-all rounded-xs uppercase ${!selectedTag ? 'border-white/40 text-white bg-zinc-900' : 'border-white/5 hover:border-white/20 text-zinc-500'}`}
              >
                Reset tags ({availableTags.length})
              </button>
              {availableTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  className={`px-3 py-1 border transition-all rounded-xs uppercase ${tag === selectedTag ? 'border-red-800 text-red-400 bg-red-950/20' : 'border-white/5 hover:border-white/20 text-zinc-500 hover:text-zinc-300'}`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}

          {/* PORTFOLIO GRID */}
          {filteredItems.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-white/10 rounded-sm">
              <p className="font-mono text-xs text-zinc-500">No items match your active filters.</p>
              <button 
                onClick={() => { setActiveCategory('all'); setSelectedTag(null); }}
                className="mt-4 font-mono text-xs text-red-500 hover:underline font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, index) => {
                const globalIndex = index;
                return (
                  <PortfolioCard 
                    key={item.id}
                    item={item}
                    index={globalIndex}
                    onClick={() => setActiveLightboxIndex(globalIndex)}
                  />
                );
              })}
            </div>
          )}

          {/* Secondary Action/Bio pitch */}
          <div className="mt-16 text-center">
            <p className="font-mono text-[10px] text-zinc-500 tracking-wider">
              Curious about archival prints or collaborative exhibitions? 
              <a href="#contact" className="text-red-500 hover:underline font-bold ml-2 inline-flex items-center gap-1 uppercase">
                Let’s talk <ArrowRight size={10} />
              </a>
            </p>
          </div>

        </div>
      </section>

      {/* LIGHTBOX / DETAIL MODAL */}
      {currentLightboxItem && activeLightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-[#030303]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10"
          onClick={() => setActiveLightboxIndex(null)}
          id="lightbox-backdrop"
        >
          {/* Close button */}
          <button 
            className="absolute top-6 right-6 z-50 text-neutral-400 hover:text-white bg-neutral-900/50 hover:bg-neutral-900 border border-neutral-800 p-2.5 rounded-full transition-all"
            onClick={() => setActiveLightboxIndex(null)}
            aria-label="Close Lightbox"
            id="lightbox-close"
          >
            <X size={18} />
          </button>

          {/* Navigation Controls */}
          <button 
            className="absolute left-4 sm:left-8 z-40 text-neutral-400 hover:text-white bg-neutral-900/50 hover:bg-neutral-900 border border-neutral-800 p-3 rounded-full transition-all"
            onClick={handlePrevImage}
            aria-label="Previous Image"
          >
            <ChevronLeft size={20} />
          </button>

          <button 
            className="absolute right-4 sm:right-8 z-40 text-neutral-400 hover:text-white bg-neutral-900/50 hover:bg-neutral-900 border border-neutral-800 p-3 rounded-full transition-all"
            onClick={handleNextImage}
            aria-label="Next Image"
          >
            <ChevronRight size={20} />
          </button>

          {/* Lightbox Layout Container */}
          <div 
            className="bg-[#0b0b0b] border border-neutral-950 w-full max-w-5xl rounded-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 max-h-[90vh] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Left: Huge Image Area (Span 7) */}
            <div className="md:col-span-7 bg-neutral-950 flex items-center justify-center relative overflow-hidden min-h-[300px] md:min-h-[500px]">
              <img 
                src={currentLightboxItem.image} 
                alt={currentLightboxItem.title} 
                className="w-full h-full object-contain max-h-[40vh] md:max-h-[80vh]"
                referrerPolicy="no-referrer"
              />
              
              {/* Category indicator bottom left of image */}
              <div className="absolute bottom-4 left-4 font-mono text-[9px] tracking-widest bg-black/60 px-3 py-1 rounded-xs">
                {currentLightboxItem.category === 'ringside' ? '01 / RINGSIDE WORK' : '02 / FINE ART CURATION'}
              </div>
            </div>

            {/* Right: Rich Metadata & Deep Dive Text (Span 5) */}
            <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[40vh] md:max-h-[90vh] bg-[#0c0c0c] border-t md:border-t-0 md:border-l border-neutral-900">
              <div>
                
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] text-neutral-500 mb-6">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="text-red-500" />
                    {currentLightboxItem.year}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {currentLightboxItem.location || 'United Kingdom'}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-4 leading-tight">
                  {currentLightboxItem.title}
                </h3>

                {/* Main description paragraph */}
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                  {currentLightboxItem.description}
                </p>                 {/* Curatorial Context Alert */}
                 {currentLightboxItem.category === 'fineart' && (
                  <div className="p-4 bg-black border border-white/5 rounded-sm mb-6 flex items-start gap-3">
                    <Info size={14} className="text-zinc-500 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-mono text-[9px] text-white font-bold mb-1 uppercase tracking-widest">
                        Curator Context
                      </h4>
                      <p className="text-zinc-500 text-[11px] leading-normal">
                        This work was coordinated as part of Tony's ongoing exploration of community-specific subcultures and relational exhibition curation.
                      </p>
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="mb-8">
                  <h4 className="font-mono text-[9px] text-zinc-500 mb-2 uppercase tracking-widest font-bold">Tags</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {currentLightboxItem.tags?.map(tag => (
                      <span key={tag} className="font-mono text-[10px] text-zinc-400 bg-black px-2.5 py-1 rounded-xs border border-white/5 uppercase">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Box Footer (Nav hints & Lightbox index status) */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="font-mono text-[10px] text-zinc-600">
                  Item {activeLightboxIndex + 1} of {filteredItems.length}
                </span>
                
                <button 
                  onClick={() => setActiveLightboxIndex(null)}
                  className="font-mono text-[10px] text-red-500 hover:text-red-400 uppercase tracking-widest hover:underline font-bold"
                >
                  Close Archive View
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* BIOGRAPHY & THE HUMAN STORY SECTION */}
      <section className="py-24 bg-[#050505] border-t border-white/10 relative" id="about">
        
        {/* Subtle geometric lines */}
        <div className="absolute right-0 top-0 w-1/3 h-[1px] bg-gradient-to-l from-white/10 to-transparent"></div>
        <div className="absolute left-0 bottom-0 w-1/3 h-[1px] bg-gradient-to-r from-white/10 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left: Profile Portrait (Span 5) */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-square sm:max-w-md mx-auto lg:max-w-none bg-neutral-950 rounded-sm overflow-hidden border border-white/10 p-2 bg-[#0d0d0d]">
                <img 
                  src={profilePortrait} 
                  alt="Tony Knox Portrait" 
                  className="w-full h-full object-cover rounded-sm transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Vintage stamp/label overlay */}
                <div className="absolute bottom-6 right-6 bg-[#050505]/95 backdrop-blur-sm border border-white/10 p-4 font-mono rounded-xs">
                  <span className="block text-[9px] text-zinc-500 uppercase tracking-widest font-bold">EST. NORTH WEST</span>
                  <span className="block text-xs text-white font-bold tracking-wide">MFA CONTEMPORARY ART</span>
                </div>
              </div>

              {/* Quote caption below portrait */}
              <div className="mt-6 text-center lg:text-left">
                <p className="font-serif text-sm italic text-zinc-400 max-w-sm mx-auto lg:mx-0 leading-relaxed font-light">
                  "I don't separate my fine art practice from the wrestling ring. They are both spaces of immense physical theater, sacrifice, and myth-making."
                </p>
              </div>
            </div>

            {/* Right: Compelling Factual Narrative Bio (Span 7) */}
            <div className="lg:col-span-7">
              <span className="font-mono text-xs text-red-500 tracking-[0.25em] block mb-3 uppercase font-bold">
                / THE MAN BEHIND THE LENS
              </span>
              <h2 className="font-display text-4xl font-bold text-white tracking-tight mb-8">
                Tony Knox: Photographer, Artist, Curator
              </h2>

              <div className="space-y-6 text-zinc-400 text-sm leading-relaxed font-sans">
                
                <p>
                  Based in the North West of England, Tony Knox has spent over two decades bridging two seemingly disparate subcultures: the high-octane, sweat-soaked drama of modern wrestling and the sterile, conceptual spaces of contemporary galleries. 
                </p>

                {/* Highlight MFA and Curation details */}
                <div className="p-6 bg-[#0a0a0a] border border-white/5 rounded-sm">
                  <h4 className="font-display text-white font-bold text-sm mb-2 tracking-wide uppercase font-bold">
                    Academic Background & Curatorial Reach
                  </h4>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                    Tony holds a <strong className="text-white font-semibold">Masters in Fine Art (MFA)</strong> from the <strong className="text-white font-semibold">University of Central Lancashire</strong> (awarded in 2007). His curatorial practice focuses on public arts programs, community cohesion, and subcultural exhibitions. Over his career, he has successfully executed curation assignments and artistic projects alongside some of the UK's most prominent cultural entities, including the <strong className="text-white font-semibold">Liverpool Biennial</strong>, <strong className="text-white font-semibold">A Foundation</strong>, and <strong className="text-white font-semibold">St Helens Borough Council</strong>.
                  </p>
                </div>

                <p>
                  Under his heavily followed digital handle, <strong className="text-white">@tonyknox99</strong>, he is widely regarded as one of the UK’s premier ringside sports action photographers. Tony has captured historical in-ring collisions featuring legendary global icons like <strong className="text-white">Rey Mysterio</strong> and <strong className="text-white font-semibold">Kurt Angle</strong>, alongside the rise of the modern British independent wrestling resurgence.
                </p>

                {/* THE HUMAN STORY - KIDNEY DONATION (ITV NEWS 2018) */}
                <div className="mt-8 p-6 bg-red-950/10 border border-red-950/40 rounded-sm relative overflow-hidden">
                  
                  {/* Decorative glowing red heart */}
                  <div className="absolute -right-8 -bottom-8 opacity-5 text-red-500">
                    <Heart size={120} />
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-7 w-7 rounded-full bg-red-950 border border-red-900/30 flex items-center justify-center text-red-400">
                      <Heart size={13} />
                    </div>
                    <span className="font-mono text-[9px] tracking-widest text-red-400 uppercase font-bold">
                      A STORY OF SACRIFICE
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-white mb-2">
                    The Human Story: Saving His Sister's Life
                  </h3>

                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4">
                    In 2018, Tony Knox captured national attention outside the arts world when he hit headlines across the UK, including <strong className="text-white">ITV News</strong>, for an inspiring act of selflessness. Tony voluntarily donated one of his kidneys to his sister, Amanda, who was suffering from chronic kidney failure, ultimately saving her life and demonstrating the real-world depth of the character he brings to both his art and family.
                  </p>

                  <div className="flex items-center gap-2 font-mono text-[9px] text-zinc-500 tracking-wider">
                    <FileText size={12} className="text-red-500" />
                    <span>REPORTED NATIONALLY VIA ITV NEWS CHANNEL & REGIONAL OUTLETS, 2018</span>
                  </div>
                </div>

                <p className="pt-4">
                  Today, Tony continues to lecture, consult, and accept commissions worldwide for creative sports reportage, gallery installations, and performance arts curation.
                </p>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* EXHIBITIONS & CURATORIAL HISTORY TABLE */}
      <section className="py-24 bg-[#050505] border-t border-white/10" id="exhibitions">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="font-mono text-xs text-red-500 tracking-[0.25em] block mb-3 uppercase font-bold">
                / ARCHIVAL DIRECTORY
              </span>
              <h2 className="font-display text-4xl font-bold text-white tracking-tight">
                Exhibitions & Curatorial Record
              </h2>
            </div>

            {/* Filter buttons for the table */}
            <div className="flex items-center gap-2 bg-[#0a0a0a] p-1.5 border border-white/10 rounded-sm font-mono text-[9px] font-bold tracking-widest">
              <button 
                onClick={() => setExhibitionFilter('all')}
                className={`px-4 py-2 rounded-xs transition-all uppercase ${exhibitionFilter === 'all' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
              >
                ALL RECORDS
              </button>
              <button 
                onClick={() => setExhibitionFilter('Artist')}
                className={`px-4 py-2 rounded-xs transition-all uppercase ${exhibitionFilter === 'Artist' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
              >
                ARTIST ONLY
              </button>
              <button 
                onClick={() => setExhibitionFilter('Curator')}
                className={`px-4 py-2 rounded-xs transition-all uppercase ${exhibitionFilter === 'Curator' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
              >
                CURATOR ONLY
              </button>
            </div>
          </div>

          {/* Exhibition table */}
          <div className="border border-white/5 bg-[#0a0a0a] rounded-sm overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-black font-mono text-[10px] tracking-widest text-zinc-500 uppercase font-bold">
                    <th className="py-4 px-6 font-medium">Year</th>
                    <th className="py-4 px-6 font-medium">Exhibition / Project Title</th>
                    <th className="py-4 px-6 font-medium">Venue / Institution</th>
                    <th className="py-4 px-6 font-medium">Location</th>
                    <th className="py-4 px-6 font-medium text-right">My Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-sans text-xs">
                  {exhibitionsList
                    .filter(ex => exhibitionFilter === 'all' || ex.role.includes(exhibitionFilter))
                    .map(ex => (
                      <tr key={ex.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-5 px-6 font-mono text-zinc-400 font-bold">
                          {ex.year}
                        </td>
                        <td className="py-5 px-6 text-white font-bold tracking-wide">
                          {ex.title}
                        </td>
                        <td className="py-5 px-6 text-zinc-300">
                          {ex.venue}
                        </td>
                        <td className="py-5 px-6 text-zinc-400 font-mono text-[10px] tracking-wider uppercase">
                          {ex.location}
                        </td>
                        <td className="py-5 px-6 text-right">
                          <span className={`inline-block px-2.5 py-1 rounded-xs font-mono text-[9px] uppercase tracking-widest ${
                            ex.role === 'Artist' 
                              ? 'bg-zinc-900 text-zinc-300 border border-zinc-800 font-bold' 
                              : ex.role === 'Curator' 
                              ? 'bg-red-950/40 text-red-400 border border-red-900/30 font-bold' 
                              : 'bg-white text-black font-bold'
                          }`}>
                            {ex.role}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* MOTHMAN FEATURE BENTO CALLOUT */}
      <section className="py-24 bg-[#050505] border-t border-white/10 overflow-hidden relative" id="mothman">
        
        {/* Abstract background elements */}
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-red-950/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-white/10 p-8 sm:p-12 lg:p-16 rounded-sm relative overflow-hidden">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              
              {/* Left Column: Text & Lore (Span 7) */}
              <div className="lg:col-span-7">
                <span className="font-mono text-xs text-red-500 tracking-[0.25em] block mb-3 uppercase font-bold">
                  / PERFORMANCE ART PROJECT
                </span>
                
                <h2 className="font-display text-4xl font-bold text-white tracking-tight mb-6">
                  MothMan: The Comic-Wrestler Persona
                </h2>

                <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-sans">
                  "MothMan" is Tony Knox’s highly acclaimed pseudo-wrestler performance art character and ongoing graphic-comic project. Bridging the theatrical theatrics of professional lucha-libre, indie-circuit bravado, and high-concept gallery interventions, the performance explores the psychological armor of public performance.
                </p>

                <p className="text-zinc-500 text-xs leading-relaxed mb-8">
                  Dressed in an elaborate custom-made moth-themed wrestling mask and a velvet protective cape, MothMan has "invaded" various white-cube gallery exhibitions, regional festivals, and art installations across the UK, challenging traditional boundaries of contemporary art spaces and performance mediums.
                </p>

                {/* Highlight badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-white/5 pt-8 font-mono text-[9px] uppercase tracking-widest text-zinc-400 font-bold">
                  <div>
                    <span className="block text-zinc-600 mb-1">FORMATS</span>
                    <span className="text-white">Live Interventions, Zines, Illustration</span>
                  </div>
                  <div>
                    <span className="block text-zinc-600 mb-1">DEBUTED</span>
                    <span className="text-white">A Foundation Gallery (2009)</span>
                  </div>
                  <div>
                    <span className="block text-zinc-600 mb-1">EXHIBITED</span>
                    <span className="text-white">Liverpool, Preston, London</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Custom Mothman Generated Artwork (Span 5) */}
              <div className="lg:col-span-5 relative">
                <div className="aspect-[4/3] rounded-sm overflow-hidden border border-white/5 bg-neutral-950 p-1.5">
                  <img 
                    src={portfolioItems.find(item => item.id === 'mothman-1')?.image || 'https://picsum.photos/seed/mothman/800/600'} 
                    alt="MothMan Performance Art Photo" 
                    className="w-full h-full object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Visual Label */}
                <span className="absolute -bottom-3 -right-3 bg-red-950 text-red-400 font-mono text-[9px] tracking-widest px-3 py-1 border border-red-900/30 rounded-xs uppercase font-bold">
                  Archival Capture: MothMan Live (2016)
                </span>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS SLIDER SECTION */}
      <section className="py-24 bg-[#050505] border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          
          <span className="font-mono text-xs text-red-500 tracking-[0.25em] block mb-4 uppercase font-bold">
            / PROFESSIONAL VOICES
          </span>

          <div className="space-y-12">
            {testimonialsList.map((test, index) => (
              <div key={test.id} className="pt-4 pb-8 border-b border-white/5 last:border-b-0">
                <p className="font-serif text-lg sm:text-xl md:text-2xl font-light italic text-[#f5f5f5] leading-relaxed max-w-3xl mx-auto">
                  "{test.quote}"
                </p>
                <div className="mt-6 font-mono text-[10px] tracking-widest uppercase">
                  <span className="text-white font-bold">{test.author}</span>
                  <span className="text-zinc-600 mx-2">—</span>
                  <span className="text-zinc-500">{test.role}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CONTACT & COMMISSIONING FORM SECTION */}
      <section className="py-24 bg-[#050505] border-t border-white/10 relative" id="contact">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left: Contact Information (Span 5) */}
            <div className="lg:col-span-5">
              <span className="font-mono text-xs text-red-500 tracking-[0.25em] block mb-3 uppercase font-bold">
                / CONNECT & INQUIRE
              </span>
              <h2 className="font-display text-4xl font-bold text-white tracking-tight mb-8">
                Securing a Commission or Exhibition
              </h2>

              <p className="text-zinc-400 text-sm leading-relaxed mb-8 font-sans">
                Tony is open to select ringside sports assignments, gallery curation commissions, guest lecturing requests, print purchase sales, or conceptual performance engagements.
              </p>

              {/* Contact metadata */}
              <div className="space-y-6 font-mono text-[9px] tracking-widest font-bold">
                
                <div className="flex items-center gap-4 p-4 bg-[#0a0a0a] border border-white/5 rounded-sm">
                  <div className="h-10 w-10 bg-black flex items-center justify-center text-red-500 border border-white/10 rounded-sm shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="block text-zinc-500 uppercase">LOCATION COVERAGE</span>
                    <span className="text-white">North West, UK / International Travel</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-[#0a0a0a] border border-white/5 rounded-sm">
                  <div className="h-10 w-10 bg-black flex items-center justify-center text-red-500 border border-white/10 rounded-sm shrink-0">
                    <Instagram size={16} />
                  </div>
                  <div>
                    <span className="block text-zinc-500 uppercase">INSTAGRAM PROFILE</span>
                    <a 
                      href="https://www.instagram.com/tonyknox99/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-white hover:text-red-400 hover:underline flex items-center gap-1.5"
                    >
                      <span>@tonyknox99</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>



              </div>

              {/* Print notice */}
              <div className="mt-8 p-6 bg-[#0a0a0a] border border-white/5 rounded-sm">
                <h4 className="font-display text-white font-bold text-xs uppercase mb-2 tracking-widest">
                  Archival Print Sales
                </h4>
                <p className="text-zinc-500 text-xs leading-relaxed">
                  All images displayed on this site and under the @tonyknox99 Instagram archive are available for professional framing, limited-edition runs, and high-quality artistic prints. Specify your interest in the form.
                </p>
              </div>
            </div>

            {/* Right: Sleek Interactive Form (Span 7) */}
            <div className="lg:col-span-7 bg-[#0a0a0a] border border-white/10 p-6 sm:p-10 rounded-sm shadow-sm" id="contact-form-container">
              
              {formState === 'success' ? (
                <div className="py-12 text-center" id="form-success-state">
                  <div className="h-16 w-16 bg-neutral-950 border border-white/10 flex items-center justify-center text-red-400 rounded-full mx-auto mb-6">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-3">
                    Inquiry Transmitted Successfully
                  </h3>
                  <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed mb-8">
                    Thank you for reaching out, Tony has received your message and will respond within 48 hours to discuss project parameters.
                  </p>
                  <button 
                    onClick={() => setFormState('idle')}
                    className="px-6 py-2.5 bg-zinc-900 border border-white/10 text-[#f5f5f5] hover:bg-zinc-800 font-mono text-[10px] tracking-widest font-bold transition-all rounded-xs uppercase"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-8" id="tony-knox-contact-form">
                  
                  <div className="border-b border-white/10 pb-4 mb-6">
                    <h3 className="font-display text-xl font-bold text-white mb-1">
                      Direct Correspondence
                    </h3>
                    <p className="text-zinc-500 text-[9px] font-mono font-bold tracking-widest">
                      FIELDS MARKED WITH * ARE MANDATORY
                    </p>
                  </div>

                  {formError && (
                    <div className="p-4 bg-red-950/40 border border-red-900/50 text-red-400 text-xs rounded-sm font-mono flex items-center gap-2">
                      <X size={14} />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    
                    {/* Name input */}
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="name" className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest font-bold">
                        Full Name *
                      </label>
                      <input 
                        type="text" 
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="Amanda Knox"
                        required
                        className="w-full bg-transparent border-b border-white/10 rounded-none py-3.5 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-white transition-all"
                      />
                    </div>

                    {/* Email input */}
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="email" className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest font-bold">
                        Email Address *
                      </label>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="correspondent@domain.com"
                        required
                        className="w-full bg-transparent border-b border-white/10 rounded-none py-3.5 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-white transition-all"
                      />
                    </div>

                  </div>

                  {/* Subject input */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="subject" className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest font-bold">
                      Subject of Inquiry
                    </label>
                    <select 
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleFormChange}
                      className="w-full bg-[#050505] border-b border-white/10 rounded-none py-3.5 text-xs text-white focus:outline-none focus:border-white transition-all appearance-none"
                    >
                      <option value="General Inquiry">General Correspondence</option>
                      <option value="Ringside Booking">Ringside Sports Action Assignment</option>
                      <option value="Curation Project">Contemporary Exhibition Curation</option>
                      <option value="Print Purchase">Limited Edition Archival Print Sales</option>
                      <option value="MothMan Performance">MothMan Lore / Guest Lecturing</option>
                    </select>
                  </div>

                  {/* Message input */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="message" className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest font-bold">
                      Inquiry Details *
                    </label>
                    <textarea 
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      rows={4}
                      placeholder="Please specify dates, locations, dimension sizing, or structural briefs for your assignment..."
                      required
                      className="w-full bg-transparent border-b border-white/10 rounded-none py-3.5 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-white transition-all resize-none"
                    />
                  </div>

                  {/* Submission Button */}
                  <button 
                    type="submit" 
                    disabled={formState === 'submitting'}
                    className="w-full py-4 bg-white hover:bg-zinc-200 disabled:bg-zinc-800 text-black font-mono text-[11px] font-black uppercase tracking-widest transition-colors duration-300 rounded-sm flex items-center justify-center gap-3"
                    id="submit-contact-btn"
                  >
                    <span>{formState === 'submitting' ? 'TRANSMITTING INQUIRY...' : 'TRANSMIT MESSAGE'}</span>
                    <ArrowRight size={14} />
                  </button>

                  <p className="text-center font-mono text-[9px] text-zinc-600 tracking-wider">
                    By submitting you agree to direct transactional communications via tonyknox.org.uk.
                  </p>

                </form>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#050505] border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Copyright Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-display text-sm font-black tracking-widest text-white">
              TONY KNOX
            </span>
            <span className="font-mono text-[8px] tracking-[0.25em] text-zinc-500 mt-1 uppercase">
              © {new Date().getFullYear()} tonyknox.org.uk. All rights reserved.
            </span>
          </div>

          {/* Social Links & Legal */}
          <div className="flex flex-wrap items-center justify-center gap-8 font-mono text-[9px] text-zinc-500 uppercase tracking-widest font-bold">
            <a 
              href="https://www.instagram.com/tonyknox99/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-red-500 transition-colors flex items-center gap-1.5"
            >
              <Instagram size={11} />
              <span>Instagram</span>
            </a>
            <a href="#work" className="hover:text-red-500 transition-colors">
              Portfolio
            </a>
            <a href="#about" className="hover:text-red-500 transition-colors">
              Biography
            </a>
            <a href="#contact" className="hover:text-red-500 transition-colors">
              Curation Inquiries
            </a>
          </div>

        </div>
      </footer>

    </div>
  );
}
