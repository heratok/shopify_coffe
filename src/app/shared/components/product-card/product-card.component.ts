import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="product-card" [class.featured]="product.featured">
      <div class="product-badge" *ngIf="product.featured">
        Featured
      </div>
      <div class="product-image">
        <img [src]="product.imageUrl" [alt]="product.name">
        <div class="product-actions">
          <button class="btn-action quick-view" (click)="onQuickView()">
            Quick View
          </button>
          <button class="btn-action add-to-cart" (click)="onAddToCart()">
            Add to Cart
          </button>
        </div>
      </div>
      <div class="product-info">
        <h3 class="product-title">
          <a [routerLink]="['/products', product.id]">{{ product.name }}</a>
        </h3>
        <div class="product-meta">
          <span class="product-origin">{{ product.origin }}</span>
          <span class="product-roast">{{ product.roastLevel }}</span>
        </div>
        <div class="product-rating" *ngIf="product.rating">
          <div class="stars">
            <span *ngFor="let star of getStars()" [class.filled]="star <= product.rating">★</span>
          </div>
          <span class="rating-count">({{ product.reviewCount }})</span>
        </div>
        <div class="product-price">
          {{ product.price | number:'1.2-2' }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-card {
      background-color: var(--color-white);
      border-radius: var(--border-radius-lg);
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      position: relative;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
    }

    .product-badge {
      position: absolute;
      top: var(--space-sm);
      right: var(--space-sm);
      background-color: var(--color-accent);
      color: var(--color-white);
      padding: var(--space-xs) var(--space-sm);
      border-radius: var(--border-radius-sm);
      font-size: 0.875rem;
      font-weight: 600;
      z-index: 1;
    }

    .product-image {
      position: relative;
      padding-top: 100%;
      overflow: hidden;
    }

    .product-image img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .product-card:hover .product-image img {
      transform: scale(1.05);
    }

    .product-actions {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: var(--space-md);
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
      display: flex;
      gap: var(--space-sm);
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .product-card:hover .product-actions {
      opacity: 1;
      transform: translateY(0);
    }

    .btn-action {
      flex: 1;
      padding: var(--space-sm) var(--space-md);
      border: none;
      border-radius: var(--border-radius-sm);
      font-weight: 600;
      font-size: 0.875rem;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .quick-view {
      background-color: var(--color-white);
      color: var(--color-primary);
    }

    .quick-view:hover {
      background-color: var(--color-gray-100);
    }

    .add-to-cart {
      background-color: var(--color-accent);
      color: var(--color-white);
    }

    .add-to-cart:hover {
      background-color: var(--color-accent-dark);
    }

    .product-info {
      padding: var(--space-md);
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }

    .product-title {
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0;
    }

    .product-title a {
      color: var(--color-gray-900);
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .product-title a:hover {
      color: var(--color-primary);
    }

    .product-meta {
      display: flex;
      gap: var(--space-sm);
      color: var(--color-gray-600);
      font-size: 0.875rem;
    }

    .product-meta span:not(:last-child)::after {
      content: '•';
      margin-left: var(--space-sm);
    }

    .product-rating {
      display: flex;
      align-items: center;
      gap: var(--space-xs);
    }

    .stars {
      color: var(--color-gray-400);
      font-size: 1rem;
    }

    .stars .filled {
      color: var(--color-accent);
    }

    .rating-count {
      color: var(--color-gray-600);
      font-size: 0.875rem;
    }

    .product-price {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-primary);
      margin-top: auto;
    }

    .product-price::before {
      content: '$';
      font-size: 0.875rem;
      vertical-align: top;
      margin-right: 2px;
    }
  `]
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();
  @Output() quickView = new EventEmitter<Product>();

  getStars(): number[] {
    return [1, 2, 3, 4, 5];
  }

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }

  onQuickView(): void {
    this.quickView.emit(this.product);
  }
}