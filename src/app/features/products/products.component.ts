import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ProductCardComponent,
    HeaderComponent,
    FooterComponent
  ],
  template: `
    <app-header></app-header>
    
    <div class="products-page">
      <div class="products-hero">
        <div class="container">
          <h1>Our Coffee Collection</h1>
          <p>Discover premium coffee beans from around the world</p>
        </div>
      </div>
      
      <div class="container">
        <div class="products-layout">
          <!-- Filters -->
          <aside class="filters">
            <div class="filter-group">
              <h3>Categories</h3>
              <ul>
                <li>
                  <a 
                    [routerLink]="['/products']" 
                    [class.active]="!currentCategory">
                    All Products
                  </a>
                </li>
                <li *ngFor="let category of categories">
                  <a 
                    [routerLink]="['/products/category', category.id]" 
                    [class.active]="currentCategory === category.id">
                    {{ category.name }}
                  </a>
                </li>
              </ul>
            </div>
            
            <div class="filter-group">
              <h3>Roast Level</h3>
              <div class="filter-options">
                <label *ngFor="let roast of roastLevels">
                  <input 
                    type="checkbox" 
                    [value]="roast" 
                    [checked]="selectedRoasts.includes(roast)"
                    (change)="toggleRoast(roast)">
                  {{ roast }}
                </label>
              </div>
            </div>
            
            <div class="filter-group">
              <h3>Origin</h3>
              <div class="filter-options">
                <label *ngFor="let origin of origins">
                  <input 
                    type="checkbox" 
                    [value]="origin" 
                    [checked]="selectedOrigins.includes(origin)"
                    (change)="toggleOrigin(origin)">
                  {{ origin }}
                </label>
              </div>
            </div>
            
            <div class="filter-group">
              <h3>Price Range</h3>
              <div class="price-slider">
                <input 
                  type="range" 
                  [min]="priceRange.min" 
                  [max]="priceRange.max" 
                  [(ngModel)]="selectedPrice" 
                  (change)="filterProducts()">
                <div class="price-range-values">
                  <span>{{ priceRange.min | currency }}</span>
                  <span>{{ selectedPrice | currency }}</span>
                </div>
              </div>
            </div>
            
            <button class="btn btn-primary" (click)="resetFilters()">Reset Filters</button>
          </aside>
          
          <!-- Products List -->
          <div class="products-content">
            <div class="products-header">
              <div class="results-count">
                Showing {{ filteredProducts.length }} results
              </div>
              
              <div class="sort-options">
                <label for="sort">Sort by:</label>
                <select id="sort" [(ngModel)]="sortOption" (change)="sortProducts()">
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                  <option value="rating-desc">Highest Rated</option>
                </select>
              </div>
            </div>
            
            <div *ngIf="filteredProducts.length > 0" class="products-grid">
              <app-product-card 
                *ngFor="let product of filteredProducts" 
                [product]="product"
                (addToCart)="addToCart($event)"
                (quickView)="quickView($event)">
              </app-product-card>
            </div>
            
            <div *ngIf="filteredProducts.length === 0" class="no-products">
              <p>No products found matching your criteria.</p>
              <button class="btn btn-primary" (click)="resetFilters()">Reset Filters</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <app-footer></app-footer>
  `,
  styles: [`
    .products-page {
      padding-top: var(--header-height);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    .products-hero {
      background-color: var(--color-primary);
      color: var(--color-white);
      padding: var(--space-xl) 0;
      text-align: center;
      margin-bottom: var(--space-xl);
    }
    
    .products-hero h1 {
      color: var(--color-white);
      margin-bottom: var(--space-sm);
    }
    
    .products-layout {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-xl);
      margin-bottom: var(--space-xxl);
    }
    
    @media (min-width: 992px) {
      .products-layout {
        grid-template-columns: 250px 1fr;
      }
    }
    
    .filters {
      background-color: var(--color-white);
      border-radius: var(--border-radius-md);
      padding: var(--space-md);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
    
    .filter-group {
      margin-bottom: var(--space-lg);
    }
    
    .filter-group h3 {
      font-size: 1.1rem;
      margin-bottom: var(--space-sm);
      padding-bottom: var(--space-xs);
      border-bottom: 1px solid var(--color-gray-200);
    }
    
    .filter-group ul {
      list-style-type: none;
      padding: 0;
    }
    
    .filter-group li {
      margin-bottom: var(--space-xs);
    }
    
    .filter-group a {
      color: var(--color-gray-700);
      transition: color 0.2s ease;
      display: block;
      padding: var(--space-xs) 0;
    }
    
    .filter-group a:hover,
    .filter-group a.active {
      color: var(--color-primary);
    }
    
    .filter-options {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
    }
    
    .filter-options label {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    
    .filter-options input[type="checkbox"] {
      margin-right: var(--space-sm);
    }
    
    .price-slider {
      padding: var(--space-sm) 0;
    }
    
    .price-slider input {
      width: 100%;
    }
    
    .price-range-values {
      display: flex;
      justify-content: space-between;
      margin-top: var(--space-xs);
      font-size: 0.9rem;
      color: var(--color-gray-600);
    }
    
    .products-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-lg);
      flex-wrap: wrap;
      gap: var(--space-sm);
    }
    
    .sort-options {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
    }
    
    .sort-options select {
      padding: var(--space-xs) var(--space-sm);
      border: 1px solid var(--color-gray-300);
      border-radius: var(--border-radius-sm);
    }
    
    .products-grid {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: var(--space-md);
    }
    
    @media (min-width: 576px) {
      .products-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (min-width: 992px) {
      .products-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    
    .no-products {
      padding: var(--space-xl);
      text-align: center;
      background-color: var(--color-gray-100);
      border-radius: var(--border-radius-md);
    }
    
    .no-products p {
      margin-bottom: var(--space-md);
    }
  `]
})
export class ProductsComponent implements OnInit {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  currentCategory: string | null = null;
  
  categories = [
    { id: 'single-origin', name: 'Single Origin' },
    { id: 'blends', name: 'Signature Blends' },
    { id: 'espresso', name: 'Espresso' },
    { id: 'decaf', name: 'Decaf' }
  ];
  
  roastLevels = ['Light', 'Medium', 'Medium-Dark', 'Dark'];
  selectedRoasts: string[] = [];
  
  origins = ['Ethiopia', 'Colombia', 'Brazil', 'Guatemala', 'Kenya'];
  selectedOrigins: string[] = [];
  
  priceRange = { min: 10, max: 50 };
  selectedPrice = 50;
  
  sortOption = 'price-asc';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const categoryId = params.get('id');
      this.currentCategory = categoryId;
      
      this.loadProducts();
    });
  }
  
  loadProducts(): void {
    if (this.currentCategory) {
      this.productService.getProductsByCategory(this.currentCategory).subscribe(products => {
        this.allProducts = products;
        this.filterProducts();
      });
    } else {
      this.productService.getProducts().subscribe(products => {
        this.allProducts = products;
        this.filterProducts();
      });
    }
  }
  
  filterProducts(): void {
    let filtered = [...this.allProducts];
    
    // Filter by roast level
    if (this.selectedRoasts.length > 0) {
      filtered = filtered.filter(product => 
        this.selectedRoasts.includes(product.roastLevel)
      );
    }
    
    // Filter by origin
    if (this.selectedOrigins.length > 0) {
      filtered = filtered.filter(product => 
        this.selectedOrigins.includes(product.origin)
      );
    }
    
    // Filter by price
    filtered = filtered.filter(product => 
      product.price <= this.selectedPrice
    );
    
    this.filteredProducts = filtered;
    this.sortProducts();
  }
  
  sortProducts(): void {
    switch (this.sortOption) {
      case 'price-asc':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating-desc':
        this.filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
    }
  }
  
  toggleRoast(roast: string): void {
    const index = this.selectedRoasts.indexOf(roast);
    if (index === -1) {
      this.selectedRoasts.push(roast);
    } else {
      this.selectedRoasts.splice(index, 1);
    }
    this.filterProducts();
  }
  
  toggleOrigin(origin: string): void {
    const index = this.selectedOrigins.indexOf(origin);
    if (index === -1) {
      this.selectedOrigins.push(origin);
    } else {
      this.selectedOrigins.splice(index, 1);
    }
    this.filterProducts();
  }
  
  resetFilters(): void {
    this.selectedRoasts = [];
    this.selectedOrigins = [];
    this.selectedPrice = this.priceRange.max;
    this.sortOption = 'price-asc';
    this.filterProducts();
  }
  
  addToCart(product: Product): void {
    this.cartService.addToCart(product, 1);
  }
  
  quickView(product: Product): void {
    console.log('Quick view:', product);
  }
}