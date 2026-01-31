import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';
import { QuantitySelectorComponent } from '../../shared/components/quantity-selector/quantity-selector.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { ProductDetailSkeletonComponent } from '../../shared/components/product-detail-skeleton/product-detail-skeleton.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    QuantitySelectorComponent,
    HeaderComponent,
    FooterComponent,
    ProductDetailSkeletonComponent
  ],
  styleUrls: ['./product-detail.component.css'],
  templateUrl: './product-detail.component.html'
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
  
  loading: boolean = true;

  loadProduct(id: string): void {
    this.loading = true;
    this.productService.getProductById(id).subscribe(product => {
      this.product = product;
      this.loading = false;
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
}