import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { CartItem } from '../../core/models/cart-item.model';
import { QuantitySelectorComponent } from '../../shared/components/quantity-selector/quantity-selector.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    QuantitySelectorComponent,
    HeaderComponent,
    FooterComponent
  ],
  template: `
    <app-header></app-header>
    
    <div class="cart-page">
      <div class="container">
        <h1 class="page-title">Your Shopping Cart</h1>
        
        <div class="cart-content" *ngIf="cartItems.length > 0">
          <div class="cart-items">
            <div class="cart-table">
              <div class="cart-header">
                <div class="cart-header-item product-col">Product</div>
                <div class="cart-header-item price-col">Price</div>
                <div class="cart-header-item quantity-col">Quantity</div>
                <div class="cart-header-item total-col">Total</div>
                <div class="cart-header-item action-col"></div>
              </div>
              
              <div class="cart-item" *ngFor="let item of cartItems">
                <div class="product-col">
                  <div class="cart-product">
                    <img [src]="item.product.imageUrl" [alt]="item.product.name">
                    <div class="cart-product-details">
                      <h3>
                        <a [routerLink]="['/products', item.product.id]">{{ item.product.name }}</a>
                      </h3>
                      <div class="product-meta">
                        <span>{{ item.product.origin }}</span>
                        <span>{{ item.product.roastLevel }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="price-col">{{ item.product.price | number:'1.2-2' }}</div>
                <div class="quantity-col">
                  <app-quantity-selector
                    [quantity]="item.quantity"
                    (quantityChange)="updateQuantity(item.product.id, $event)">
                  </app-quantity-selector>
                </div>
                <div class="total-col">{{ item.quantity * item.product.price | number:'1.2-2' }}</div>
                <div class="action-col">
                  <button class="btn-remove" (click)="removeItem(item.product.id)">✕</button>
                </div>
              </div>
            </div>
            
            <div class="cart-actions">
              <a routerLink="/products" class="btn btn-secondary">Continue Shopping</a>
              <button class="btn btn-primary" (click)="clearCart()">Clear Cart</button>
            </div>
          </div>
          
          <div class="cart-summary">
            <h2>Order Summary</h2>
            
            <div class="summary-row">
              <span>Subtotal</span>
              <span>{{ cartTotal | number:'1.2-2' }}</span>
            </div>
            
            <div class="summary-row">
              <span>Shipping</span>
              <span>{{ cartTotal > 50 ? 'FREE' : '5.00' }}</span>
            </div>
            
            <div class="summary-row total">
              <span>Total</span>
              <span>{{ (cartTotal + (cartTotal > 50 ? 0 : 5)) | number:'1.2-2' }}</span>
            </div>
            
            <div class="promo-code">
              <h3>Promo Code</h3>
              <div class="promo-form">
                <input type="text" placeholder="Enter code">
                <button class="btn btn-secondary">Apply</button>
              </div>
            </div>
            
            <a routerLink="/checkout" class="btn btn-accent btn-checkout">Proceed to Checkout</a>
            
            <div class="secure-checkout">
              <span>🔒 Secure Checkout</span>
            </div>
          </div>
        </div>
        
        <div class="empty-cart" *ngIf="cartItems.length === 0">
          <div class="empty-cart-message">
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any coffee to your cart yet.</p>
            <a routerLink="/products" class="btn btn-primary">Browse Products</a>
          </div>
        </div>
      </div>
    </div>
    
    <app-footer></app-footer>
  `,
  styles: [`
    .cart-page {
      padding-top: var(--header-height);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    .page-title {
      margin: var(--space-xl) 0;
      text-align: center;
    }
    
    .cart-content {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-xl);
      margin-bottom: var(--space-xxl);
    }
    
    @media (min-width: 992px) {
      .cart-content {
        grid-template-columns: 2fr 1fr;
      }
    }
    
    .cart-table {
      border: 1px solid var(--color-gray-200);
      border-radius: var(--border-radius-md);
      overflow: hidden;
      margin-bottom: var(--space-lg);
    }
    
    .cart-header {
      display: grid;
      grid-template-columns: 3fr 1fr 2fr 1fr 0.5fr;
      padding: var(--space-md);
      background-color: var(--color-gray-100);
      font-weight: 600;
    }
    
    .cart-item {
      display: grid;
      grid-template-columns: 3fr 1fr 2fr 1fr 0.5fr;
      padding: var(--space-md);
      border-top: 1px solid var(--color-gray-200);
      align-items: center;
    }
    
    .cart-product {
      display: flex;
      align-items: center;
    }
    
    .cart-product img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: var(--border-radius-sm);
      margin-right: var(--space-md);
    }
    
    .cart-product-details h3 {
      margin-bottom: var(--space-xs);
      font-size: 1.1rem;
    }
    
    .product-meta {
      color: var(--color-gray-600);
      font-size: 0.9rem;
    }
    
    .product-meta span:not(:last-child)::after {
      content: '•';
      margin: 0 var(--space-xs);
    }
    
    .btn-remove {
      background: none;
      border: none;
      color: var(--color-gray-500);
      font-size: 1rem;
      cursor: pointer;
      transition: color 0.2s ease;
    }
    
    .btn-remove:hover {
      color: var(--color-error);
    }
    
    .cart-actions {
      display: flex;
      justify-content: space-between;
    }
    
    .cart-summary {
      background-color: var(--color-white);
      border-radius: var(--border-radius-md);
      padding: var(--space-lg);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
      position: sticky;
      top: calc(var(--header-height) + var(--space-md));
    }
    
    .cart-summary h2 {
      margin-bottom: var(--space-lg);
      font-size: 1.5rem;
    }
    
    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: var(--space-md);
      padding-bottom: var(--space-md);
      border-bottom: 1px solid var(--color-gray-200);
    }
    
    .summary-row.total {
      font-weight: 700;
      font-size: 1.2rem;
      color: var(--color-primary);
      border-bottom: none;
    }
    
    .promo-code {
      margin: var(--space-lg) 0;
    }
    
    .promo-code h3 {
      margin-bottom: var(--space-sm);
      font-size: 1.1rem;
    }
    
    .promo-form {
      display: flex;
    }
    
    .promo-form input {
      flex-grow: 1;
      padding: var(--space-sm);
      border: 1px solid var(--color-gray-300);
      border-radius: var(--border-radius-sm) 0 0 var(--border-radius-sm);
    }
    
    .promo-form button {
      border-radius: 0 var(--border-radius-sm) var(--border-radius-sm) 0;
    }
    
    .btn-checkout {
      display: block;
      width: 100%;
      padding: var(--space-md);
      margin-bottom: var(--space-md);
      font-weight: 700;
      font-size: 1.1rem;
    }
    
    .secure-checkout {
      text-align: center;
      color: var(--color-gray-600);
      font-size: 0.9rem;
    }
    
    .empty-cart {
      text-align: center;
      padding: var(--space-xxl) 0;
    }
    
    .empty-cart-message h2 {
      margin-bottom: var(--space-md);
    }
    
    .empty-cart-message p {
      margin-bottom: var(--space-lg);
      color: var(--color-gray-600);
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
      .cart-header {
        display: none;
      }
      
      .cart-item {
        grid-template-columns: 1fr;
        gap: var(--space-md);
      }
      
      .price-col::before,
      .quantity-col::before,
      .total-col::before {
        content: attr(data-title);
        font-weight: 600;
        margin-right: var(--space-sm);
      }
      
      .action-col {
        text-align: right;
      }
      
      .cart-product {
        margin-bottom: var(--space-sm);
      }
    }
  `]
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartTotal: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cartItems = cart.items;
      this.cartTotal = cart.total;
    });
  }
  
  updateQuantity(productId: string, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
  }
  
  removeItem(productId: string): void {
    this.cartService.removeFromCart(productId);
  }
  
  clearCart(): void {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.cartService.clearCart();
    }
  }
}