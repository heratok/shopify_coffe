import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';
import { QuantitySelectorComponent } from '../../shared/components/quantity-selector/quantity-selector.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    QuantitySelectorComponent,
    HeaderComponent,
    FooterComponent
  ],
  styles: [`
    .product-detail-page {
      padding-top: var(--header-height);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--space-md);
    }

    .breadcrumbs {
      margin: var(--space-lg) 0;
      font-size: 0.9rem;
    }

    .breadcrumbs a {
      color: var(--color-primary);
      text-decoration: none;
    }

    .breadcrumbs span {
      color: var(--color-gray-600);
    }

    .product-detail {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-xl);
      margin-bottom: var(--space-xxl);
    }

    @media (min-width: 992px) {
      .product-detail {
        grid-template-columns: 1fr 1fr;
      }
    }

    .product-images {
      border-radius: var(--border-radius-lg);
      overflow: hidden;
    }

    .main-image img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }

    .product-info {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }

    .product-title {
      font-size: 2rem;
      margin-bottom: var(--space-sm);
    }

    .product-meta {
      display: flex;
      gap: var(--space-lg);
      color: var(--color-gray-600);
    }

    .product-rating {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
    }

    .stars {
      color: var(--color-gray-400);
    }

    .stars .filled {
      color: var(--color-warning);
    }

    .product-price {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--color-primary);
    }

    .product-description {
      line-height: 1.6;
      color: var(--color-gray-700);
    }

    .flavor-notes {
      margin: var(--space-md) 0;
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-sm);
      margin-top: var(--space-sm);
    }

    .tag {
      background-color: var(--color-gray-100);
      padding: var(--space-xs) var(--space-sm);
      border-radius: var(--border-radius-sm);
      font-size: 0.9rem;
    }

    .product-actions {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
      margin: var(--space-lg) 0;
    }

    .quantity {
      display: flex;
      align-items: center;
      gap: var(--space-md);
    }

    .shipping-info {
      background-color: var(--color-gray-50);
      padding: var(--space-md);
      border-radius: var(--border-radius-md);
      margin-top: var(--space-lg);
    }

    .shipping-info p {
      margin: var(--space-xs) 0;
      color: var(--color-gray-700);
    }

    .product-tabs {
      margin-top: var(--space-xxl);
    }

    .tabs-header {
      display: flex;
      gap: var(--space-sm);
      border-bottom: 2px solid var(--color-gray-200);
      margin-bottom: var(--space-lg);
    }

    .tab-btn {
      padding: var(--space-sm) var(--space-lg);
      border: none;
      background: none;
      font-size: 1rem;
      color: var(--color-gray-600);
      cursor: pointer;
      border-bottom: 2px solid transparent;
      margin-bottom: -2px;
    }

    .tab-btn.active {
      color: var(--color-primary);
      border-bottom-color: var(--color-primary);
    }

    .tab-pane {
      padding: var(--space-lg) 0;
    }

    .details-table {
      width: 100%;
      border-collapse: collapse;
    }

    .details-table td {
      padding: var(--space-sm);
      border-bottom: 1px solid var(--color-gray-200);
    }

    .details-table td:first-child {
      font-weight: 600;
      width: 30%;
    }

    .brewing-methods {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--space-lg);
    }

    .brewing-method {
      background-color: var(--color-gray-50);
      padding: var(--space-md);
      border-radius: var(--border-radius-md);
    }

    .brewing-method h4 {
      margin-bottom: var(--space-sm);
      color: var(--color-gray-900);
    }

    .brewing-method p {
      color: var(--color-gray-700);
      line-height: 1.5;
    }

    .reviews-summary {
      text-align: center;
      margin-bottom: var(--space-xl);
    }

    .average-rating {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-sm);
    }

    .rating-number {
      font-size: 3rem;
      font-weight: 600;
      color: var(--color-primary);
    }

    .reviews-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-lg);
    }

    .review {
      border-bottom: 1px solid var(--color-gray-200);
      padding-bottom: var(--space-lg);
    }

    .review-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: var(--space-sm);
    }

    .reviewer {
      font-weight: 600;
    }

    .review-date {
      color: var(--color-gray-500);
    }

    .review-rating {
      margin-bottom: var(--space-sm);
    }

    .review-content {
      line-height: 1.6;
      color: var(--color-gray-700);
    }

    .loading {
      text-align: center;
      padding: var(--space-xxl) 0;
      color: var(--color-gray-600);
    }
  `],
  template: `
    <app-header></app-header>
    
    <div class="product-detail-page">
      <div class="container">
        <!-- Breadcrumbs -->
        <div class="breadcrumbs">
          <a routerLink="/">Home</a> /
          <a routerLink="/products">Products</a> /
          <span>{{ product?.name || 'Product Details' }}</span>
        </div>
        
        <!-- Product Detail -->
        <div class="product-detail" *ngIf="product">
          <div class="product-images">
            <div class="main-image">
              <img [src]="product.imageUrl" [alt]="product.name">
            </div>
          </div>
          
          <div class="product-info">
            <h1 class="product-title">{{ product.name }}</h1>
            
            <div class="product-meta">
              <div class="product-origin">Origin: <span>{{ product.origin }}</span></div>
              <div class="product-roast">Roast Level: <span>{{ product.roastLevel }}</span></div>
            </div>
            
            <div class="product-rating">
              <div class="stars">
                <span *ngFor="let star of [1,2,3,4,5]" [class.filled]="star <= product.rating">★</span>
              </div>
              <span class="rating-count">{{ product.reviewCount }} reviews</span>
            </div>
            
            <div class="product-price">{{ product.price | number:'1.2-2' }}</div>
            
            <div class="product-description">
              <p>{{ product.description }}</p>
            </div>
            
            <div class="flavor-notes">
              <h3>Flavor Notes</h3>
              <div class="tags">
                <span class="tag" *ngFor="let note of product.flavourNotes">{{ note }}</span>
              </div>
            </div>
            
            <div class="product-actions">
              <div class="quantity">
                <span class="label">Quantity:</span>
                <app-quantity-selector 
                  [quantity]="quantity" 
                  (quantityChange)="updateQuantity($event)">
                </app-quantity-selector>
              </div>
              
              <button 
                class="btn btn-primary btn-lg"
                (click)="addToCart()"
                [disabled]="!product.inStock">
                {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
              </button>
            </div>
            
            <div class="shipping-info">
              <p>🚚 Free shipping on orders over $50</p>
              <p>🔄 30-day money-back guarantee</p>
              <p>☕ Freshly roasted to order</p>
            </div>
          </div>
        </div>
        
        <!-- Product Details Tabs -->
        <div class="product-tabs" *ngIf="product">
          <div class="tabs-header">
            <button 
              class="tab-btn" 
              [class.active]="activeTab === 'details'"
              (click)="setActiveTab('details')">
              Details
            </button>
            <button 
              class="tab-btn" 
              [class.active]="activeTab === 'brewing'"
              (click)="setActiveTab('brewing')">
              Brewing Guide
            </button>
            <button 
              class="tab-btn" 
              [class.active]="activeTab === 'reviews'"
              (click)="setActiveTab('reviews')">
              Reviews ({{ product.reviewCount }})
            </button>
          </div>
          
          <div class="tab-content">
            <div *ngIf="activeTab === 'details'" class="tab-pane">
              <h3>Product Details</h3>
              <table class="details-table">
                <tr>
                  <td>Origin</td>
                  <td>{{ product.origin }}</td>
                </tr>
                <tr>
                  <td>Roast Level</td>
                  <td>{{ product.roastLevel }}</td>
                </tr>
                <tr>
                  <td>Weight</td>
                  <td>{{ product.weight }}g</td>
                </tr>
                <tr>
                  <td>Flavor Notes</td>
                  <td>{{ product.flavourNotes.join(', ') }}</td>
                </tr>
                <tr>
                  <td>Category</td>
                  <td>{{ product.category }}</td>
                </tr>
              </table>
            </div>
            
            <div *ngIf="activeTab === 'brewing'" class="tab-pane">
              <h3>Brewing Guide</h3>
              <div class="brewing-methods">
                <div class="brewing-method">
                  <h4>French Press</h4>
                  <p>Coarse grind. 1:15 coffee to water ratio. 4-minute steep time.</p>
                </div>
                <div class="brewing-method">
                  <h4>Pour Over</h4>
                  <p>Medium grind. 1:17 coffee to water ratio. 3-minute brew time.</p>
                </div>
                <div class="brewing-method">
                  <h4>Espresso</h4>
                  <p>Fine grind. 1:2 coffee to water ratio. 25-30 second extraction.</p>
                </div>
              </div>
            </div>
            
            <div *ngIf="activeTab === 'reviews'" class="tab-pane">
              <h3>Customer Reviews</h3>
              <div class="reviews-summary">
                <div class="average-rating">
                  <div class="rating-number">{{ product.rating.toFixed(1) }}</div>
                  <div class="stars">
                    <span *ngFor="let star of [1,2,3,4,5]" [class.filled]="star <= product.rating">★</span>
                  </div>
                  <div class="rating-count">Based on {{ product.reviewCount }} reviews</div>
                </div>
              </div>
              
              <!-- This would be populated with actual reviews in a real app -->
              <div class="reviews-list">
                <div class="review">
                  <div class="review-header">
                    <div class="reviewer">John D.</div>
                    <div class="review-date">2 months ago</div>
                  </div>
                  <div class="review-rating">
                    <span *ngFor="let star of [1,2,3,4,5]" [class.filled]="star <= 5">★</span>
                  </div>
                  <div class="review-content">
                    <p>This coffee is amazing! Rich flavor with notes of chocolate and berries as described. Will definitely purchase again.</p>
                  </div>
                </div>
                
                <div class="review">
                  <div class="review-header">
                    <div class="reviewer">Sarah M.</div>
                    <div class="review-date">1 month ago</div>
                  </div>
                  <div class="review-rating">
                    <span *ngFor="let star of [1,2,3,4,5]" [class.filled]="star <= 4">★</span>
                  </div>
                  <div class="review-content">
                    <p>Great coffee with a smooth finish. Works well as both espresso and pour over. The aroma is wonderful!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Loading state -->
        <div class="loading" *ngIf="!product">
          Loading product details...
        </div>
      </div>
    </div>
    
    <app-footer></app-footer>
  `
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  quantity: number = 1;
  activeTab: string = 'details';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.loadProduct(productId);
      }
    });
  }
  
  loadProduct(id: string): void {
    this.productService.getProductById(id).subscribe(product => {
      this.product = product;
    });
  }
  
  updateQuantity(quantity: number): void {
    this.quantity = quantity;
  }
  
  addToCart(): void {
    if (this.product && this.product.inStock) {
      this.cartService.addToCart(this.product, this.quantity);
    }
  }
  
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}