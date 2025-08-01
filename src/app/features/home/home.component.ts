import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HomeSkeletonComponent } from '../../shared/components/home-skeleton/home-skeleton.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    ProductCardComponent,
    HeaderComponent,
    FooterComponent,
    HomeSkeletonComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  
  categories = [
    {
      id: 'single-origin',
      name: 'Single Origin',
      description: 'Experience the unique flavors of specific regions',
      imageUrl: 'https://images.pexels.com/photos/2074122/pexels-photo-2074122.jpeg'
    },
    {
      id: 'blends',
      name: 'Signature Blends',
      description: 'Carefully crafted combinations for perfect balance',
      imageUrl: 'https://images.pexels.com/photos/2608495/pexels-photo-2608495.jpeg'
    },
    {
      id: 'espresso',
      name: 'Espresso',
      description: 'Bold and robust beans for the perfect shot',
      imageUrl: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg'
    },
    {
      id: 'decaf',
      name: 'Decaf',
      description: 'Full flavor without the caffeine',
      imageUrl: 'https://images.pexels.com/photos/2067628/pexels-photo-2067628.jpeg'
    }
  ];
  
  testimonials = [
    {
      rating: 5,
      text: 'The Kenyan single origin coffee from Brew Haven is extraordinary. The fruity notes are perfectly balanced with a delightful acidity.',
      author: 'Emma Johnson',
      title: 'Coffee Enthusiast'
    },
    {
      rating: 5,
      text: 'I\'ve tried many subscription services, but Brew Haven consistently delivers the freshest and most flavorful coffee I\'ve ever had.',
      author: 'Michael Chang',
      title: 'Home Barista'
    },
    {
      rating: 4,
      text: 'Their Colombian blend has become my morning ritual. Rich, smooth, and always delivered right when I need it.',
      author: 'Sarah Williams',
      title: 'Loyal Customer'
    }
  ];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  loading = true;

  ngOnInit(): void {
    this.productService.getFeaturedProducts().subscribe(products => {
      this.featuredProducts = products.slice(0, 3);
      this.loading = false;
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product, 1);
    // You could add a notification here
  }

  viewProduct(product: Product): void {
    // In a real app, this would open a quick view modal
    console.log('Quick view:', product);
  }
  
  subscribeNewsletter(): void {
    // This would call a service to handle the subscription
    alert('Thank you for subscribing to our newsletter!');
  }
}