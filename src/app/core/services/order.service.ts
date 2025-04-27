import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Order, ShippingDetails } from '../models/order.model';
import { CartService } from './cart.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [];

  constructor(private cartService: CartService) {
    // Load orders from local storage if available
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      this.orders = JSON.parse(savedOrders);
    }
  }

  getOrders(userId: string): Observable<Order[]> {
    const userOrders = this.orders.filter(order => order.userId === userId);
    return of(userOrders).pipe(delay(500)); // Simulate API delay
  }

  getOrderById(orderId: string): Observable<Order | undefined> {
    const order = this.orders.find(o => o.id === orderId);
    return of(order).pipe(delay(500)); // Simulate API delay
  }

  createOrder(userId: string, shippingDetails: ShippingDetails, paymentMethod: string): Observable<Order> {
    return new Observable<Order>(observer => {
      // Get current cart
      this.cartService.getCart().subscribe(cart => {
        if (cart.items.length === 0) {
          observer.error(new Error('Cannot create order with empty cart'));
          return;
        }

        // Create new order
        const newOrder: Order = {
          id: uuidv4(),
          userId,
          items: [...cart.items], // Clone cart items
          total: cart.total,
          shippingDetails,
          orderDate: new Date(),
          status: 'pending',
          paymentMethod
        };

        // Save order
        this.orders.push(newOrder);
        localStorage.setItem('orders', JSON.stringify(this.orders));

        // Clear cart after successful order
        this.cartService.clearCart();

        // Return the created order
        setTimeout(() => {
          observer.next(newOrder);
          observer.complete();
        }, 1000); // Simulate API delay
      });
    });
  }
}