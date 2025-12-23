
import { Product } from './types';

export const WHATSAPP_NUMBER = "923000000000";

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'X-PHANTOM V1',
    price: 12500,
    description: 'Ultra-lightweight tactical sneakers with high-rebound cushioning.',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600',
    category: 'Shoes'
  },
  {
    id: '2',
    name: 'ARC-WAVE TEE',
    price: 3200,
    description: 'Heavyweight oversized tee with cyber-print detailing.',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=600',
    category: 'Shirts'
  },
  {
    id: '3',
    name: 'SECTOR CARGO',
    price: 5800,
    description: 'Water-resistant tactical pants with storage nodes.',
    image: 'https://images.unsplash.com/photo-1517438476312-10d79c67750d?auto=format&fit=crop&q=80&w=600',
    category: 'Paints'
  },
  {
    id: '4',
    name: 'NEON RUNNER',
    price: 9500,
    description: 'Reflective elements for high-visibility night operations.',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=600',
    category: 'Shoes'
  },
  {
    id: '5',
    name: 'MIDNIGHT HOODIE',
    price: 6500,
    description: 'Reinforced cuffs and signature box-cut silhouette.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600',
    category: 'Shirts'
  },
  {
    id: '6',
    name: 'VOID JOGGER',
    price: 4900,
    description: 'Tapered fit pants with reinforced knee articulation.',
    image: 'https://images.unsplash.com/photo-1580906853203-f493cea9ff28?auto=format&fit=crop&q=80&w=600',
    category: 'Paints'
  }
];

export const CATEGORIES = ['All', 'Shoes', 'Shirts', 'Paints'];
