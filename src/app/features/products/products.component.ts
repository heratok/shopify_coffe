import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { combineLatest } from 'rxjs';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ProductCardSkeletonComponent } from '../../shared/components/product-card-skeleton/product-card-skeleton.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
    ProductCardSkeletonComponent,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public loading = true;
  public products: Product[] = [];
  public filteredProducts: Product[] = [];
  public category: string | null = null;
  public searchTerm: string = '';
  public wheel: string | null = null;

  private readonly wheelLabels: { [key: string]: string } = {
    floral: 'Floral',
    fruity: 'Fruity',
    sour: 'Sour',
    green: 'Green',
    roasty: 'Roasty',
    spicy: 'Spicy',
    nutty: 'Nutty',
    cocoa: 'Cocoa',
    sweet: 'Sweet'
  };

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.route.params,
      this.route.queryParams
    ]).subscribe(([params, queryParams]) => {
      this.category = params['id'] ?? this.route.snapshot.paramMap.get('id') ?? null;
      this.searchTerm = queryParams['q'] ?? this.route.snapshot.queryParamMap.get('q') ?? '';
      this.wheel = queryParams['wheel'] ?? this.route.snapshot.queryParamMap.get('wheel') ?? null;
      this.loadProducts();
    });
  }

  get visibleProducts(): Product[] {
    if (this.category || this.searchTerm || this.wheel) {
      return this.filteredProducts;
    }
    return this.filteredProducts.length ? this.filteredProducts : this.products;
  }

  get categoryName(): string {
    const labels: { [key: string]: string } = {
      'single-origin': 'Single Origin',
      'blends': 'Blends',
      'espresso': 'Espresso',
      'decaf': 'Decaf'
    };
    return this.category ? (labels[this.category] ?? this.category) : '';
  }

  get wheelLabel(): string {
    if (!this.wheel) return '';
    return this.wheelLabels[this.wheel] ?? this.wheel.charAt(0).toUpperCase() + this.wheel.slice(1);
  }

  get wheelColor(): string {
    return this.wheel ? `var(--wheel-${this.wheel})` : '';
  }

  loadProducts(): void {
    this.loading = true;
    let source;

    if (this.category) {
      source = this.productService.getProductsByCategory(this.category);
    } else if (this.searchTerm) {
      source = this.productService.searchProducts(this.searchTerm);
    } else {
      source = this.productService.getProducts();
    }

    source.subscribe({
      next: (products) => {
        let filtered = products;
        if (this.category && this.searchTerm) {
          const term = this.searchTerm.toLowerCase();
          filtered = products.filter(p =>
            p.name.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term) ||
            p.origin.toLowerCase().includes(term) ||
            p.flavourNotes.some(note => note.toLowerCase().includes(term))
          );
        }
        if (this.wheel) {
          filtered = filtered.filter(p =>
            p.flavourNotes.some(note => this.getFamilyFromNote(note) === this.wheel)
          );
        }
        this.products = products;
        this.filteredProducts = filtered;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      }
    });
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

  clearWheelFilter(): void {
    const queryParams = this.searchTerm ? { q: this.searchTerm } : {};
    this.router.navigate(['/products'], { queryParams });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product, 1);
  }
}
