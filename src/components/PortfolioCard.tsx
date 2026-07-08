import React, { useState, useRef } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { PortfolioItem } from '../types';

interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
  onClick: () => void;
  key?: any;
}

export function PortfolioCard({ item, index, onClick }: PortfolioCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Relative mouse position from center of the card (-0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Subtle transform effect constants
  const maxTranslateX = 10; // Max horizontal movement in pixels
  const maxTranslateY = 10; // Max vertical movement in pixels
  const maxRotateX = -8;    // Max tilt in degrees (tilted towards cursor)
  const maxRotateY = 8;

  const translateX = coords.x * maxTranslateX;
  const translateY = coords.y * maxTranslateY;
  const rotateX = coords.y * maxRotateX;
  const rotateY = coords.x * maxRotateY;

  const cardStyle: React.CSSProperties = {
    transform: isHovered 
      ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(${translateX}px, ${translateY}px, 0px)`
      : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0px, 0px, 0px)',
    transition: isHovered 
      ? 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s ease, shadow 0.3s ease' 
      : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s ease, shadow 0.3s ease',
    transformStyle: 'preserve-3d',
  };

  // Shift image slightly opposite to create a deep, multilayer 3D depth effect
  const imageTranslateX = coords.x * -10;
  const imageTranslateY = coords.y * -10;
  const imageStyle: React.CSSProperties = {
    transform: isHovered
      ? `scale(1.1) translate3d(${imageTranslateX}px, ${imageTranslateY}px, 0px)`
      : 'scale(1) translate3d(0px, 0px, 0px)',
    transition: isHovered
      ? 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease'
      : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease',
  };

  return (
    <div 
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={cardStyle}
      className="group relative bg-[#0a0a0a] border border-white/5 hover:border-white/10 rounded-sm overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-red-950/10 transition-shadow duration-300"
    >
      {/* Image Container */}
      <div className="aspect-[4/3] bg-neutral-950 overflow-hidden relative">
        <img 
          src={item.image} 
          alt={item.title} 
          style={imageStyle}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-90"
          referrerPolicy="no-referrer"
        />
        
        {/* Dynamic Badge for Category */}
        <span 
          className={`absolute top-4 left-4 font-mono text-[9px] tracking-widest px-2.5 py-1 rounded-xs backdrop-blur-md transition-transform duration-300 ${
            item.category === 'ringside' 
              ? 'bg-red-950/80 text-red-300 border border-red-900/30 font-bold' 
              : 'bg-black/80 text-zinc-300 border border-white/10 font-bold'
          }`}
          style={{
            transform: isHovered ? `translate3d(${coords.x * 6}px, ${coords.y * 6}px, 15px)` : 'none'
          }}
        >
          {item.category === 'ringside' ? '01 / RINGSIDE' : '02 / FINE ART'}
        </span>

        {/* Year Overlay */}
        <span 
          className="absolute top-4 right-4 font-mono text-[9px] tracking-widest text-zinc-400 bg-black/50 backdrop-blur-md px-2 py-1 border border-white/5 rounded-xs transition-transform duration-300"
          style={{
            transform: isHovered ? `translate3d(${coords.x * 6}px, ${coords.y * 6}px, 15px)` : 'none'
          }}
        >
          {item.year}
        </span>

        {/* Hover Overlay Icon indicator */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="font-mono text-xs text-white border border-white/20 bg-neutral-950/80 px-4 py-2 rounded-xs tracking-wider flex items-center gap-2">
            <span>VIEW DETAILS</span>
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>

      {/* Metadata Content */}
      <div 
        className="p-6 transition-transform duration-300"
        style={{
          transform: isHovered ? `translate3d(${coords.x * 8}px, ${coords.y * 8}px, 10px)` : 'none'
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <MapPin size={12} className="text-zinc-500" />
          <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest font-semibold">
            {item.location || 'UK Exhibition'}
          </span>
        </div>
        
        <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-red-400 transition-colors duration-300">
          {item.title}
        </h3>
        
        <p className="text-zinc-400 text-xs leading-relaxed mb-4 line-clamp-2">
          {item.description}
        </p>

        {/* Tags list */}
        <div className="flex flex-wrap gap-1.5">
          {item.tags?.slice(0, 3).map(tag => (
            <span key={tag} className="font-mono text-[9px] text-zinc-500 bg-black/40 px-2 py-0.5 rounded-xs border border-white/5 uppercase">
              #{tag}
            </span>
          ))}
          {(item.tags?.length || 0) > 3 && (
            <span className="font-mono text-[9px] text-zinc-600 px-1.5 py-0.5">
              +{item.tags!.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
