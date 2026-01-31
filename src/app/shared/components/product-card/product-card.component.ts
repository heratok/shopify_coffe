import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/models/product.model';
import { ImageService } from '../../../core/services/image.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <article class="product-card" [class.featured]="product.featured" [class.in-stock]="product.inStock">
      <!-- Badge -->
      <div class="product-badge featured-badge" *ngIf="product.featured">
        <svg viewBox="0 0 24 24" fill="none" class="badge-icon">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
        </svg>
        <span>Featured</span>
      </div>

      <div class="product-badge out-of-stock-badge" *ngIf="!product.inStock">
        <span>Out of Stock</span>
      </div>

      <!-- Image Container -->
      <div class="product-image-wrapper">
        <a [routerLink]="['/products', product.id]" class="product-image-link">
          <div class="product-image">
            <img 
              [src]="imageUrl" 
              [alt]="product.name"
              loading="lazy"
              (load)="imageLoaded = true"
              [class.loaded]="imageLoaded">
            <div class="image-placeholder" *ngIf="!imageLoaded">
              <div class="skeleton-loader"></div>
            </div>
          </div>
        </a>

        <!-- Hover Actions -->
        <div class="product-actions" *ngIf="product.inStock">
          <button 
            class="btn-action btn-quick-view" 
            (click)="onQuickView()"
            aria-label="Quick view">
            <svg viewBox="0 0 24 24" fill="none" class="action-icon">
              <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
              <path d="M2 12S5 5 12 5S22 12 22 12S19 19 12 19S2 12 2 12Z" stroke="currentColor" stroke-width="2"/>
            </svg>
            <span>Quick View</span>
          </button>
          <button 
            class="btn-action btn-add-cart" 
            (click)="onAddToCart()"
            aria-label="Add to cart">
            <svg viewBox="0 0 24 24" fill="none" class="action-icon">
              <path d="M6 6H20L19.5 14H6.5L6 6Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              <circle cx="9" cy="20" r="1.5" fill="currentColor"/>
              <circle cx="17" cy="20" r="1.5" fill="currentColor"/>
              <path d="M6 6L5 3H2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Add to Cart</span>
          </button>
        </div>

        <!-- Wishlist Button -->
        <button 
          class="btn-wishlist" 
          [class.active]="isWishlisted"
          (click)="toggleWishlist()"
          aria-label="Add to wishlist">
          <svg viewBox="0 0 24 24" fill="none" class="wishlist-icon">
            <path 
              d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" 
              [attr.fill]="isWishlisted ? 'currentColor' : 'none'"
              stroke="currentColor" 
              stroke-width="2" 
              stroke-linecap="round" 
              stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <!-- Product Info -->
      <div class="product-info">
        <!-- Category & Origin -->
        <div class="product-category">
          <span class="category-badge">{{ product.category | titlecase }}</span>
          <span class="origin-dot"></span>
          <span class="origin-text">{{ product.origin }}</span>
        </div>

        <!-- Title -->
        <h3 class="product-title">
          <a [routerLink]="['/products', product.id]">{{ product.name }}</a>
        </h3>

        <!-- Flavour Notes -->
        <div class="flavour-notes" *ngIf="product.flavourNotes?.length">
          <span class="note-tag" *ngFor="let note of product.flavourNotes.slice(0, 3)">{{ note }}</span>
        </div>

        <!-- Rating -->
        <div class="product-rating" *ngIf="product.rating">
          <div class="stars">
            <svg 
              *ngFor="let star of getStars(); let i = index" 
              viewBox="0 0 24 24" 
              class="star-icon"
              [class.filled]="i < Math.floor(product.rating)"
              [class.half]="i === Math.floor(product.rating) && product.rating % 1 !== 0">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
            </svg>
          </div>
          <span class="rating-text">{{ product.rating }} ({{ product.reviewCount }})</span>
        </div>

        <!-- Footer -->
        <div class="product-footer">
          <div class="product-price">
            <span class="currency">$</span>
            <span class="amount">{{ product.price | number:'1.2-2' }}</span>
          </div>
          <div class="roast-level">
            <span class="roast-indicator" [style.background]="getRoastColor(product.roastLevel)"></span>
            <span class="roast-text">{{ product.roastLevel }}</span>
          </div>
        </div>
      </div>
    </article>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }

    .product-card {
      background-color: var(--color-white);
      border-radius: var(--radius-xl);
      overflow: hidden;
      box-shadow: var(--shadow-md);
      transition: all var(--transition-base);
      position: relative;
      height: 100%;
      display: flex;
      flex-direction: column;
      border: 1px solid transparent;
    }

    .product-card::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: var(--radius-xl);
      border: 2px solid transparent;
      transition: border-color var(--transition-base);
      pointer-events: none;
      z-index: 2;
    }

    .product-card:hover {
      transform: translateY(-12px) scale(1.02);
      box-shadow: var(--shadow-2xl);
    }

    .product-card:hover::before {
      border-color: var(--color-accent-muted);
    }

    .product-card.featured {
      border: 2px solid var(--color-accent);
    }

    .product-card:not(.in-stock) {
      opacity: 0.7;
    }

    /* Badges */
    .product-badge {
      position: absolute;
      top: var(--space-4);
      z-index: 3;
      display: flex;
      align-items: center;
      gap: var(--space-2);
      padding: var(--space-2) var(--space-3);
      border-radius: var(--radius-full);
      font-size: var(--text-xs);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      animation: fadeIn 0.3s ease;
    }

    .featured-badge {
      left: var(--space-4);
      background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-dark) 100%);
      color: var(--color-white);
      box-shadow: 0 4px 12px rgba(199, 91, 57, 0.4);
    }

    .badge-icon {
      width: 14px;
      height: 14px;
    }

    .out-of-stock-badge {
      right: var(--space-4);
      background-color: var(--color-gray-700);
      color: var(--color-white);
    }

    /* Image Wrapper */
    .product-image-wrapper {
      position: relative;
      overflow: hidden;
    }

    .product-image-link {
      display: block;
      position: relative;
      padding-top: 100%;
      overflow: hidden;
    }

    .product-image {
      position: absolute;
      inset: 0;
      background-color: var(--color-gray-100);
    }

    .product-image img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--transition-slower);
      opacity: 0;
    }

    .product-image img.loaded {
      opacity: 1;
    }

    .product-card:hover .product-image img {
      transform: scale(1.08);
    }

    /* Image Placeholder */
    .image-placeholder {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-gray-100);
    }

    .skeleton-loader {
      width: 60%;
      height: 60%;
      background: linear-gradient(90deg, var(--color-gray-200) 25%, var(--color-gray-300) 50%, var(--color-gray-200) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: var(--radius-md);
    }

    /* Wishlist Button */
    .btn-wishlist {
      position: absolute;
      top: var(--space-4);
      right: var(--space-4);
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.9);
      border: none;
      border-radius: var(--radius-full);
      cursor: pointer;
      opacity: 0;
      transform: scale(0.8);
      transition: all var(--transition-base);
      z-index: 3;
      backdrop-filter: blur(4px);
    }

    .product-card:hover .btn-wishlist {
      opacity: 1;
      transform: scale(1);
    }

    .btn-wishlist:hover {
      background: var(--color-white);
      transform: scale(1.1) !important;
      box-shadow: var(--shadow-lg);
    }

    .btn-wishlist.active {
      opacity: 1;
      transform: scale(1);
      color: var(--color-error);
    }

    .wishlist-icon {
      width: 20px;
      height: 20px;
      color: var(--color-gray-600);
      transition: color var(--transition-fast);
    }

    .btn-wishlist:hover .wishlist-icon,
    .btn-wishlist.active .wishlist-icon {
      color: var(--color-error);
    }

    /* Product Actions */
    .product-actions {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: var(--space-6);
      background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%);
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
      opacity: 0;
      transform: translateY(20px);
      transition: all var(--transition-base);
      z-index: 2;
    }

    .product-card:hover .product-actions {
      opacity: 1;
      transform: translateY(0);
    }

    .btn-action {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-2);
      padding: var(--space-3) var(--space-4);
      border: none;
      border-radius: var(--radius-md);
      font-family: var(--font-family-body);
      font-size: var(--text-sm);
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition-fast);
      backdrop-filter: blur(8px);
    }

    .action-icon {
      width: 18px;
      height: 18px;
    }

    .btn-quick-view {
      background: rgba(255, 255, 255, 0.95);
      color: var(--color-primary);
    }

    .btn-quick-view:hover {
      background: var(--color-white);
      transform: translateY(-2px);
    }

    .btn-add-cart {
      background: var(--color-accent);
      color: var(--color-white);
    }

    .btn-add-cart:hover {
      background: var(--color-accent-light);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(199, 91, 57, 0.4);
    }

    /* Product Info */
    .product-info {
      padding: var(--space-6);
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }

    /* Category & Origin */
    .product-category {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      font-size: var(--text-xs);
    }

    .category-badge {
      background-color: var(--color-accent-muted);
      color: var(--color-accent);
      padding: var(--space-1) var(--space-2);
      border-radius: var(--radius-sm);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .origin-dot {
      width: 4px;
      height: 4px;
      background-color: var(--color-gray-400);
      border-radius: var(--radius-full);
    }

    .origin-text {
      color: var(--color-gray-500);
      font-weight: 500;
    }

    /* Title */
    .product-title {
      font-family: var(--font-family-heading);
      font-size: var(--text-lg);
      font-weight: 600;
      line-height: 1.3;
      margin: 0;
    }

    .product-title a {
      color: var(--color-primary);
      text-decoration: none;
      transition: color var(--transition-fast);
    }

    .product-title a:hover {
      color: var(--color-accent);
    }

    /* Flavour Notes */
    .flavour-notes {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
    }

    .note-tag {
      font-size: var(--text-xs);
      color: var(--color-gray-600);
      background-color: var(--color-gray-100);
      padding: var(--space-1) var(--space-2);
      border-radius: var(--radius-sm);
    }

    /* Rating */
    .product-rating {
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }

    .stars {
      display: flex;
      gap: 2px;
    }

    .star-icon {
      width: 14px;
      height: 14px;
      color: var(--color-gray-300);
    }

    .star-icon.filled {
      color: var(--color-accent);
    }

    .star-icon.half {
      position: relative;
      color: var(--color-gray-300);
    }

    .star-icon.half::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, var(--color-accent) 50%, transparent 50%);
      -webkit-background-clip: text;
      background-clip: text;
    }

    .rating-text {
      font-size: var(--text-xs);
      color: var(--color-gray-500);
      font-weight: 500;
    }

    /* Product Footer */
    .product-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
      padding-top: var(--space-3);
      border-top: 1px solid var(--color-gray-200);
    }

    .product-price {
      display: flex;
      align-items: flex-start;
      font-family: var(--font-family-mono);
      color: var(--color-accent);
    }

    .currency {
      font-size: var(--text-sm);
      font-weight: 600;
      margin-top: 2px;
    }

    .amount {
      font-size: var(--text-xl);
      font-weight: 700;
    }

    .roast-level {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      font-size: var(--text-xs);
      color: var(--color-gray-600);
    }

    .roast-indicator {
      width: 12px;
      height: 12px;
      border-radius: var(--radius-full);
      border: 2px solid var(--color-white);
      box-shadow: var(--shadow-sm);
    }

    .roast-text {
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  `]
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();
  @Output() quickView = new EventEmitter<Product>();

  imageUrl: string = '';
  imageLoaded = false;
  isWishlisted = false;
  Math = Math;

  constructor(private imageService: ImageService) {}

  ngOnInit() {
    this.imageUrl = this.imageService.getProductImage(this.product.id, this.product.name);
  }

  getStars(): number[] {
    return [1, 2, 3, 4, 5];
  }

  getRoastColor(roastLevel: string): string {
    const colors: { [key: string]: string } = {
      'Light': '#d4a574',
      'Medium-Light': '#c4956a',
      'Medium': '#a67c52',
      'Medium-Dark': '#8b6914',
      'Dark': '#5d4037'
    };
    return colors[roastLevel] || '#a67c52';
  }

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }

  onQuickView(): void {
    this.quickView.emit(this.product);
  }

  toggleWishlist(): void {
    this.isWishlisted = !this.isWishlisted;
  }
}