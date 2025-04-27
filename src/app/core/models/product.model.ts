export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  origin: string;
  roastLevel: string;
  flavourNotes: string[];
  weight: number;
  inStock: boolean;
  featured: boolean;
  rating: number;
  reviewCount: number;
}