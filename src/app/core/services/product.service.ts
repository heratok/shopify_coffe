import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import { PRODUCTS } from '../../../assets/mock-data/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products = PRODUCTS;

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: string): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return of(product);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    const products = this.products.filter(p => p.category === category);
    return of(products);
  }

  getFeaturedProducts(): Observable<Product[]> {
    const products = this.products.filter(p => p.featured);
    return of(products);
  }

  searchProducts(term: string): Observable<Product[]> {
    const searchTerm = term.toLowerCase();
    const results = this.products.filter(p => 
      p.name.toLowerCase().includes(searchTerm) || 
      p.description.toLowerCase().includes(searchTerm) ||
      p.origin.toLowerCase().includes(searchTerm) ||
      p.flavourNotes.some(note => note.toLowerCase().includes(searchTerm))
    );
    return of(results);
  }
}