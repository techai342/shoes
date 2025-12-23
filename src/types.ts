
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export type Category = 'All' | 'Shoes' | 'Shirts' | 'Paints';
