import { PortfolioItem, Exhibition, Testimonial } from './types';

// Import our custom-generated high-fidelity images
// @ts-ignore
import ringsideImg1 from './assets/images/ringside_wrestling_action_1783495139197.jpg';
// @ts-ignore
import ringsideImg2 from './assets/images/ringside_ankle_lock_real_1783496474035.jpg';
// @ts-ignore
import ringsideImg3 from './assets/images/ringside_indie_wrestling_real_1783496491292.jpg';
// @ts-ignore
import ringsideImg4 from './assets/images/ringside_backstage_briefing_real_1783496506845.jpg';
// @ts-ignore
import fineArtImg1 from './assets/images/fine_art_exhibition_1783495151596.jpg';
// @ts-ignore
import fineArtImg2 from './assets/images/fineart_community_canvas_1783495847086.jpg';
// @ts-ignore
import fineArtImg3 from './assets/images/fineart_mfa_thesis_1783495862345.jpg';
// @ts-ignore
import mothmanImg1 from './assets/images/mothman_performance_art_1783495165539.jpg';
// @ts-ignore
import portraitImg from './assets/images/tony_portrait_real_1783496432797.jpg';

export const profilePortrait = portraitImg;

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'ringside-1',
    title: 'The Air Up There',
    category: 'ringside',
    description: 'A striking high-flying athletic leap during a championship wrestling match. Shot ringside under sharp spotlights, capturing the raw tension and physical commitment of global stars.',
    image: ringsideImg1,
    year: '2019',
    location: 'Manchester Town Hall',
    tags: ['Action', 'Rey Mysterio', 'Spotlight', '35mm'],
    size: 'large'
  },
  {
    id: 'fineart-1',
    title: 'The Spatial Void',
    category: 'fineart',
    description: 'An exhibition curation showcasing minimalist contemporary conceptual canvases on clean walls, framed with stark geometric lighting. Created as part of an experimental public art series.',
    image: fineArtImg1,
    year: '2014',
    location: 'Liverpool Biennial Parallel',
    tags: ['Curation', 'Exhibition', 'Minimalism', 'Industrial'],
    size: 'large'
  },
  {
    id: 'mothman-1',
    title: 'The Chrysalis Cloak',
    category: 'fineart',
    description: 'A performance art piece from the "MothMan" comic-character series. Explores the overlapping theatrics of professional wrestling and high-concept public gallery performances.',
    image: mothmanImg1,
    year: '2016',
    location: 'A Foundation Gallery',
    tags: ['Performance', 'MothMan', 'Identity', 'Concept'],
    size: 'tall'
  },
  {
    id: 'ringside-2',
    title: 'Ankle Lock Submission',
    category: 'ringside',
    description: 'Kurt Angle securing his iconic lock-in submission during an intense UK appearance. High-contrast detail highlighting the pure grit, exhaustion, and physical toll of the squared circle.',
    image: ringsideImg2,
    year: '2016',
    location: 'Preston Guild Hall',
    tags: ['Kurt Angle', 'Monochrome', 'Submission', 'Intensity'],
    size: 'normal'
  },
  {
    id: 'ringside-3',
    title: 'Indie Blood, Indie Sweat',
    category: 'ringside',
    description: 'A close-up documentation of the local British independent wrestling circuit. Raw physical contact, sweat-sprayed canvas, and a passionate, high-energy local crowd.',
    image: ringsideImg3,
    year: '2021',
    location: 'St Helens Arena',
    tags: ['British Indie', 'Raw', 'High Contrast', 'Detail'],
    size: 'tall'
  },
  {
    id: 'ringside-4',
    title: 'The Briefing Posture',
    category: 'ringside',
    description: 'An atmospheric, quiet moment before the storm. A referee briefing two tag-team contenders in the dim backstage passage before their main event clash.',
    image: ringsideImg4,
    year: '2018',
    location: 'Liverpool Olympia',
    tags: ['Backstage', 'Atmosphere', 'Quiet Intensity', 'Shadows'],
    size: 'normal'
  },
  {
    id: 'fineart-2',
    title: 'Community Canvas Integration',
    category: 'fineart',
    description: 'An expansive community integration art project coordinated with the St Helens Borough Council, creating accessible public art in urban development zones.',
    image: fineArtImg2,
    year: '2015',
    location: 'St Helens Public Library',
    tags: ['Curation', 'St Helens', 'Public Art', 'Social Practice'],
    size: 'normal'
  },
  {
    id: 'fineart-3',
    title: 'Ephemeral Constructs',
    category: 'fineart',
    description: 'A physical archive of Tony Knox’s MFA thesis exhibition, exploring temporary spatial installations and post-industrial structures.',
    image: fineArtImg3,
    year: '2007',
    location: 'University of Central Lancashire',
    tags: ['MFA', 'Installation', 'UCLan', 'Sculpture'],
    size: 'normal'
  }
];

export const exhibitionsList: Exhibition[] = [
  {
    id: 'ex-1',
    title: 'Metamorphosis of the Squared Circle',
    venue: 'Liverpool Olympia Gallery',
    location: 'Liverpool, UK',
    year: '2023',
    role: 'Artist & Curator'
  },
  {
    id: 'ex-2',
    title: 'MothMan: The Anti-Hero Saga',
    venue: 'A Foundation Gallery',
    location: 'Liverpool, UK',
    year: '2017',
    role: 'Artist'
  },
  {
    id: 'ex-3',
    title: 'Industrial Rhythms & Public Spaces',
    venue: 'St Helens Arts Festival',
    location: 'St Helens, UK',
    year: '2015',
    role: 'Curator'
  },
  {
    id: 'ex-4',
    title: 'Liverpool Biennial Associates Exhibition',
    venue: 'Biennial Hub Gallery',
    location: 'Liverpool, UK',
    year: '2012',
    role: 'Curator'
  },
  {
    id: 'ex-5',
    title: 'Masters of Fine Art Showcase',
    venue: 'PR1 Gallery, University of Central Lancashire',
    location: 'Preston, UK',
    year: '2007',
    role: 'Artist'
  }
];

export const testimonialsList: Testimonial[] = [
  {
    id: 't-1',
    quote: 'Tony’s ringside photography captures something deeper than sport—it’s high drama, theatrical passion, and raw physical commitment. He makes wrestling look like the high art it truly is.',
    author: 'Mark "The Machine" Adams',
    role: 'British Wrestling Veteran'
  },
  {
    id: 't-2',
    quote: 'As a curator, Tony brings a rare, grounded perspective to public art. His background in fine art combined with his understanding of subcultures bridges the gap between high gallery spaces and industrial communities.',
    author: 'Sarah Lin',
    role: 'Lead Arts Officer, St Helens Borough Council'
  }
];
