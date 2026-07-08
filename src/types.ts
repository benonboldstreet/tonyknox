export interface PortfolioItem {
  id: string;
  title: string;
  category: 'ringside' | 'fineart';
  description: string;
  image: string;
  year: string;
  location?: string;
  tags?: string[];
  size?: 'normal' | 'large' | 'tall'; // For elegant layout grid variations
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

export interface Exhibition {
  id: string;
  title: string;
  venue: string;
  location: string;
  year: string;
  role: 'Artist' | 'Curator' | 'Artist & Curator';
}
