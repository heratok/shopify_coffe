import { Component, Input, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
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
              [attr.loading]="priority ? 'eager' : 'lazy'"
              [attr.fetchpriority]="priority ? 'high' : undefined"
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
            <ng-container *ngFor="let star of getStars(); let i = index">
              <span
                class="star-wrap"
                [class.half]="i === Math.floor(product.rating) && product.rating % 1 !== 0">
                <svg viewBox="0 0 24 24" class="star-icon star-base" aria-hidden="true">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                </svg>
                <span class="star-fill" [class.show]="i < Math.floor(product.rating) || (i === Math.floor(product.rating) && product.rating % 1 !== 0)">
                  <svg viewBox="0 0 24 24" class="star-icon" aria-hidden="true">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                  </svg>
                </span>
              </span>
            </ng-container>
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
            <div class="wheel-dots" [attr.aria-label]="'Flavor families: ' + getWheelFamilies().join(', ')">
              <span
                class="wheel-dot"
                *ngFor="let family of getWheelFamilies()"
                [style.background]="'var(--wheel-' + family + ')'"
                [attr.title]="family"></span>
            </div>
            <span class="roast-text">{{ product.roastLevel }}</span>
          </div>
        </div>
      </div>
    </article>

    <!-- Quick View Modal -->
    <div class="quickview-overlay" *ngIf="quickViewOpen" (click)="closeQuickView()" role="presentation"></div>
    <div class="quickview-modal" *ngIf="quickViewOpen" role="dialog" aria-modal="true" [attr.aria-label]="'Quick view: ' + product.name">
      <button class="quickview-close" (click)="closeQuickView()" aria-label="Close quick view">
        <svg viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      </button>
      <div class="quickview-image">
        <img [src]="imageUrl" [alt]="product.name" loading="lazy">
      </div>
      <div class="quickview-body">
        <div class="product-category">
          <span class="category-badge">{{ product.category | titlecase }}</span>
          <span class="origin-dot"></span>
          <span class="origin-text">{{ product.origin }}</span>
        </div>
        <h3 class="quickview-title">{{ product.name }}</h3>
        <div class="flavour-notes" *ngIf="product.flavourNotes?.length">
          <span class="note-tag" *ngFor="let note of product.flavourNotes.slice(0, 4)">{{ note }}</span>
        </div>
        <p class="quickview-desc">{{ product.description }}</p>
        <div class="quickview-meta">
          <span class="roast-meta">{{ product.roastLevel }} roast</span>
          <span class="weight-meta">{{ product.weight }}g</span>
          <span class="stock-meta" [class.out]="!product.inStock">{{ product.inStock ? 'In stock' : 'Out of stock' }}</span>
        </div>
        <div class="quickview-footer">
          <div class="product-price">
            <span class="currency">$</span>
            <span class="amount">{{ product.price | number:'1.2-2' }}</span>
          </div>
          <button class="btn-action btn-add-cart" (click)="onAddToCart(); closeQuickView()" aria-label="Add to cart">
            <svg viewBox="0 0 24 24" fill="none" class="action-icon">
              <path d="M6 6H20L19.5 14H6.5L6 6Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              <circle cx="9" cy="20" r="1.5" fill="currentColor"/>
              <circle cx="17" cy="20" r="1.5" fill="currentColor"/>
              <path d="M6 6L5 3H2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Add to Cart</span>
          </button>
        </div>
        <a class="quickview-detail-link" [routerLink]="['/products', product.id]" (click)="closeQuickView()">View full details</a>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }

    .product-card {
      background-color: var(--color-white);
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-md);
      transition: all var(--transition-base);
      position: relative;
      height: 100%;
      display: flex;
      flex-direction: column;
      border: 1px solid var(--color-cream-line);
    }

    .product-card::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: var(--radius-lg);
      border: 2px solid transparent;
      transition: border-color var(--transition-base);
      pointer-events: none;
      z-index: 2;
    }

    .product-card:hover {
      transform: translateY(-8px) scale(1.01);
      box-shadow: var(--shadow-xl);
    }

    .product-card:hover::before {
      border-color: var(--color-accent-muted);
    }

    .product-card.featured {
      border: 2px solid var(--color-cream-line);
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
      background: var(--color-accent);
      color: var(--color-white);
      box-shadow: 0 4px 12px rgba(200, 70, 44, 0.4);
    }

    .badge-icon {
      width: 14px;
      height: 14px;
    }

    .out-of-stock-badge {
      right: var(--space-4);
      background-color: var(--color-espresso);
      color: var(--color-cream);
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
      background-color: var(--color-cream-deep);
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
      background-color: var(--color-cream-deep);
    }

    .skeleton-loader {
      width: 60%;
      height: 60%;
      background: linear-gradient(90deg, var(--color-cream-line) 25%, var(--color-cream-deep) 50%, var(--color-cream-line) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: var(--radius-md);
    }

    /* Wishlist Button */
    .btn-wishlist {
      position: absolute;
      top: var(--space-4);
      right: var(--space-4);
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(250, 246, 239, 0.92);
      border: 1px solid var(--color-cream-line);
      border-radius: var(--radius-full);
      cursor: pointer;
      opacity: 0;
      transform: scale(0.8);
      transition: all var(--transition-base);
      z-index: 3;
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
      border-color: var(--color-error);
    }

    .wishlist-icon {
      width: 20px;
      height: 20px;
      color: var(--color-espresso-soft);
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
      background: linear-gradient(to top, rgba(20, 14, 8, 0.85) 0%, rgba(20, 14, 8, 0.35) 50%, transparent 100%);
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
      padding: var(--space-3) var(--space-5);
      min-height: 44px;
      border-radius: var(--radius-md);
      font-family: var(--font-family-body);
      font-size: var(--text-sm);
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .action-icon {
      width: 18px;
      height: 18px;
    }

    .btn-quick-view {
      background: rgba(250, 246, 239, 0.95);
      color: var(--color-espresso);
      border: 2px solid var(--color-cream-line);
    }

    .btn-quick-view:hover {
      background: var(--color-white);
      border-color: var(--color-accent);
      color: var(--color-accent);
      transform: translateY(-2px);
    }

    .btn-add-cart {
      background: var(--color-primary);
      color: var(--color-cream);
      border: 2px solid var(--color-primary);
    }

    .btn-add-cart:hover {
      background: var(--color-primary-light);
      border-color: var(--color-primary-light);
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
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
      color: var(--color-accent-dark);
      padding: var(--space-1) var(--space-2);
      border-radius: var(--radius-sm);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .origin-dot {
      width: 4px;
      height: 4px;
      background-color: var(--color-cream-line);
      border-radius: var(--radius-full);
    }

    .origin-text {
      color: var(--color-espresso-muted);
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
      color: var(--color-espresso);
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
      color: var(--color-espresso-soft);
      background-color: var(--color-cream-deep);
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

    .star-wrap {
      position: relative;
      display: inline-flex;
      width: 14px;
      height: 14px;
    }

    .star-icon {
      width: 14px;
      height: 14px;
      color: var(--color-cream-line);
      position: absolute;
      inset: 0;
    }

    .star-wrap .star-fill {
      position: absolute;
      inset: 0;
      width: 50%;
      overflow: hidden;
      color: var(--color-accent);
      opacity: 0;
    }

    .star-wrap.half .star-fill,
    .star-wrap .star-fill.show {
      opacity: 1;
    }

    .star-wrap:not(.half) .star-fill.show {
      width: 100%;
    }

    .rating-text {
      font-size: var(--text-xs);
      color: var(--color-espresso-muted);
      font-weight: 500;
    }

    /* Product Footer */
    .product-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
      padding-top: var(--space-3);
      border-top: 1px solid var(--color-cream-line);
    }

    .product-price {
      display: flex;
      align-items: flex-start;
      font-family: var(--font-family-mono);
      color: var(--color-espresso);
      font-variant-numeric: tabular-nums;
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
      color: var(--color-espresso-soft);
    }

    /* Wheel slice - the coffee's identity arc */
    .wheel-dots {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .wheel-dot {
      width: 10px;
      height: 10px;
      border-radius: var(--radius-full);
      border: 1px solid rgba(250, 246, 239, 0.9);
      box-shadow: 0 1px 2px rgba(20, 14, 8, 0.25);
    }

    .roast-text {
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    @media (hover: none), (pointer: coarse), (max-width: 767px) {
      .product-actions {
        opacity: 1;
        transform: translateY(0);
      }

      .btn-wishlist {
        opacity: 1;
        transform: scale(1);
      }
    }

    /* Quick view modal */
    .quickview-overlay {
      position: fixed;
      inset: 0;
      background: rgba(20, 14, 8, 0.6);
      backdrop-filter: blur(3px);
      z-index: 900;
      animation: fadeIn 200ms ease-out;
    }

    .quickview-modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: min(720px, calc(100vw - 32px));
      max-height: calc(100vh - 48px);
      overflow-y: auto;
      background: var(--color-cream);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-2xl);
      z-index: 901;
      display: grid;
      grid-template-columns: 1fr 1fr;
      animation: scaleIn 200ms ease-out;
    }

    .quickview-close {
      position: absolute;
      top: var(--space-3);
      right: var(--space-3);
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-cream-deep);
      border: none;
      border-radius: var(--radius-full);
      color: var(--color-espresso);
      cursor: pointer;
      z-index: 2;
      transition: background var(--transition-fast);
    }

    .quickview-close:hover {
      background: var(--color-cream-line);
    }

    .quickview-image {
      background: var(--color-cream-deep);
      border-radius: var(--radius-lg) 0 0 var(--radius-lg);
      overflow: hidden;
    }

    .quickview-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .quickview-body {
      padding: var(--space-8);
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }

    .quickview-title {
      font-family: var(--font-family-display);
      font-size: var(--text-3xl);
      font-weight: 700;
      color: var(--color-espresso);
      margin: 0;
    }

    .quickview-desc {
      color: var(--color-espresso-soft);
      font-size: var(--text-sm);
      line-height: 1.6;
      margin: 0;
    }

    .quickview-meta {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-3);
      font-family: var(--font-family-mono);
      font-size: var(--text-xs);
      color: var(--color-espresso-muted);
    }

    .stock-meta {
      color: var(--color-success);
    }

    .stock-meta.out {
      color: var(--color-error);
    }

    .quickview-footer {
      margin-top: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-4);
      padding-top: var(--space-4);
      border-top: 1px solid var(--color-cream-line);
    }

    .quickview-detail-link {
      text-align: center;
      color: var(--color-accent-dark);
      font-weight: 600;
      font-size: var(--text-sm);
    }

    .quickview-detail-link:hover {
      text-decoration: underline;
    }

    @media (max-width: 639px) {
      .quickview-modal {
        grid-template-columns: 1fr;
        max-height: calc(100vh - 24px);
        width: calc(100vw - 24px);
      }

      .quickview-image {
        border-radius: var(--radius-lg) var(--radius-lg) 0 0;
        max-height: 220px;
      }

      .quickview-body {
        padding: var(--space-6);
      }
    }
  `]
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  @Input() priority = false;
  @Output() addToCart = new EventEmitter<Product>();
  @Output() quickView = new EventEmitter<Product>();

  imageUrl: string = '';
  imageLoaded = false;
  isWishlisted = false;
  quickViewOpen = false;
  Math = Math;

  constructor(
    private imageService: ImageService,
    private router: Router
  ) {}

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(): void {
    this.closeQuickView();
  }

  ngOnInit() {
    this.imageUrl = this.imageService.getProductImage(this.product.id, this.product.name);
  }

  openQuickView(): void {
    this.quickViewOpen = true;
  }

  closeQuickView(): void {
    this.quickViewOpen = false;
  }

  getStars(): number[] {
    return [1, 2, 3, 4, 5];
  }

  getRoastColor(roastLevel: string): string {
    const colors: { [key: string]: string } = {
      'Light': 'var(--wheel-fruity)',
      'Medium-Light': 'var(--wheel-nutty)',
      'Medium': 'var(--wheel-roasty)',
      'Medium-Dark': 'var(--wheel-cocoa)',
      'Dark': 'var(--color-espresso)'
    };
    return colors[roastLevel] || 'var(--wheel-roasty)';
  }

  getWheelFamily(): string {
    const note = this.product.flavourNotes?.[0] || '';
    const n = note.toLowerCase();
    const rules: Array<[RegExp, string]> = [
      [/floral|bergamot|jasmine|rose|lavender|citrus/, 'floral'],
      [/blackcurrant|wine|berry|apple|cherry|fruit|stone/, 'fruity'],
      [/sour|vinegary|tart/, 'sour'],
      [/earthy|herbal|hay|grassy|green/, 'green'],
      [/roast|smoky|ashy|pipe|tobacco/, 'roasty'],
      [/spice|pepper|pimento|pungent/, 'spicy'],
      [/nut|almond|hazelnut|walnut|peanut|caramel/, 'nutty'],
      [/chocolate|cocoa|mocha/, 'cocoa'],
      [/sweet|sugar|honey|syrup|vanilla/, 'sweet']
    ];
    for (const [re, family] of rules) {
      if (re.test(n)) return family;
    }
    return 'nutty';
  }

  getWheelFamilies(): string[] {
    const families: string[] = [];
    const seen: { [key: string]: boolean } = {};
    for (const note of this.product.flavourNotes || []) {
      const family = this.getFamilyFromNote(note);
      if (!seen[family]) {
        seen[family] = true;
        families.push(family);
      }
    }
    if (!families.length) return ['nutty'];
    return families;
  }

  getFamilyFromNote(note: string): string {
    const n = note.toLowerCase();
    const rules: Array<[RegExp, string]> = [
      [/floral|bergamot|jasmine|rose|lavender|citrus/, 'floral'],
      [/blackcurrant|wine|berry|apple|cherry|fruit|stone/, 'fruity'],
      [/sour|vinegary|tart/, 'sour'],
      [/earthy|herbal|hay|grassy|green/, 'green'],
      [/roast|smoky|ashy|pipe|tobacco/, 'roasty'],
      [/spice|pepper|pimento|pungent/, 'spicy'],
      [/nut|almond|hazelnut|walnut|peanut|caramel/, 'nutty'],
      [/chocolate|cocoa|mocha/, 'cocoa'],
      [/sweet|sugar|honey|syrup|vanilla/, 'sweet']
    ];
    for (const [re, family] of rules) {
      if (re.test(n)) return family;
    }
    return 'nutty';
  }

  getWheelArcColor(): string {
    return 'var(--wheel-' + this.getWheelFamily() + ')';
  }

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }

  onQuickView(): void {
    this.quickView.emit(this.product);
    this.openQuickView();
  }

  toggleWishlist(): void {
    this.isWishlisted = !this.isWishlisted;
  }
}
