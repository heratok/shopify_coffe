import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private initialCart: Cart = { items: [], total: 0 };
  private cartSubject = new BehaviorSubject<Cart>(this.initialCart);
  
  constructor() {
    // Load cart from local storage if available
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartSubject.next(JSON.parse(savedCart));
    }
  }

  getCart(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  addToCart(product: Product, quantity: number = 1): void {
    const currentCart = this.cartSubject.value;
    const existingItemIndex = currentCart.items.findIndex(item => item.product.id === product.id);

    if (existingItemIndex !== -1) {
      // If product already exists in cart, increase quantity
      const updatedItems = [...currentCart.items];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + quantity
      };
      
      this.updateCart({ items: updatedItems, total: this.calculateTotal(updatedItems) });
    } else {
      // If product doesn't exist in cart, add it
      const updatedItems = [...currentCart.items, { product, quantity }];
      this.updateCart({ items: updatedItems, total: this.calculateTotal(updatedItems) });
    }
  }

  updateQuantity(productId: string, quantity: number): void {
    const currentCart = this.cartSubject.value;
    const updatedItems = currentCart.items.map(item => 
      item.product.id === productId 
        ? { ...item, quantity: Math.max(1, quantity) } 
        : item
    );
    
    this.updateCart({ items: updatedItems, total: this.calculateTotal(updatedItems) });
  }

  removeFromCart(productId: string): void {
    const currentCart = this.cartSubject.value;
    const updatedItems = currentCart.items.filter(item => item.product.id !== productId);
    
    this.updateCart({ items: updatedItems, total: this.calculateTotal(updatedItems) });
  }

  clearCart(): void {
    this.updateCart(this.initialCart);
  }

  private updateCart(cart: Cart): void {
    this.cartSubject.next(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  private calculateTotal(items: CartItem[]): number {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }
}