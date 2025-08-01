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
    // Agregamos un delay artificial para mostrar el skeleton loader
    return new Observable<Product[]>(observer => {
      setTimeout(() => {
        observer.next(this.products);
        observer.complete();
      }, 1500); // 1.5 segundos de delay
    });
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