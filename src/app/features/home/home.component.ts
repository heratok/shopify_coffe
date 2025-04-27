import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    ProductCardComponent,
    HeaderComponent,
    FooterComponent
  ],
  template: `
    <app-header></app-header>
    
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Experience Coffee Perfection</h1>
        <p class="hero-subtitle">
          From bean to cup, savor the world's finest coffee blends. 
          Crafted for connoisseurs, delivered to your doorstep.
        </p>
        <div class="hero-buttons">
          <a routerLink="/products" class="btn btn-accent btn-lg">Shop Now</a>
          <a routerLink="/about" class="btn btn-secondary btn-lg">Learn More</a>
        </div>
      </div>
    </section>
    
    <!-- Featured Products -->
    <section class="section featured-products">
      <div class="container">
        <div class="section-header">
          <h2>Featured Coffee Collections</h2>
          <p>Discover our most loved coffee blends and single origins</p>
        </div>
        
        <div class="grid grid-3">
          <app-product-card 
            *ngFor="let product of featuredProducts" 
            [product]="product"
            (addToCart)="addToCart($event)"
            (quickView)="viewProduct($event)">
          </app-product-card>
        </div>
        
        <div class="text-center mb-xl">
          <a routerLink="/products" class="btn btn-primary">View All Products</a>
        </div>
      </div>
    </section>
    
    <!-- Categories Section -->
    <section class="section categories">
      <div class="container">
        <div class="section-header">
          <h2>Shop by Category</h2>
          <p>Find your perfect brew</p>
        </div>
        
        <div class="category-grid">
          <div class="category-card" *ngFor="let category of categories">
            <div class="category-image">
              <img [src]="category.imageUrl" [alt]="category.name">
            </div>
            <div class="category-content">
              <h3>{{ category.name }}</h3>
              <p>{{ category.description }}</p>
              <a [routerLink]="['/products/category', category.id]" class="btn btn-secondary">Browse</a>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- About Section -->
    <section class="section about">
      <div class="container">
        <div class="about-content">
          <div class="about-image">
            <img src="https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg" alt="Coffee roasting process">
          </div>
          <div class="about-text">
            <h2>Our Coffee Story</h2>
            <p>
              At Brew Haven, we believe great coffee is an art form. For over a decade, 
              we've sourced the finest beans from sustainable farms around the world.
            </p>
            <p>
              Our expert roasters carefully craft each batch to bring out unique flavors 
              and aromas that make every cup extraordinary.
            </p>
            <a routerLink="/about" class="btn btn-primary">Learn More About Us</a>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Testimonials -->
    <section class="section testimonials">
      <div class="container">
        <div class="section-header">
          <h2>What Our Customers Say</h2>
          <p>Join thousands of satisfied coffee lovers</p>
        </div>
        
        <div class="testimonial-carousel">
          <div class="testimonial-item" *ngFor="let testimonial of testimonials">
            <div class="testimonial-rating">
              <span *ngFor="let star of [1,2,3,4,5]" [class.filled]="star <= testimonial.rating">★</span>
            </div>
            <p class="testimonial-text">{{ testimonial.text }}</p>
            <div class="testimonial-author">
              <span class="author-name">{{ testimonial.author }}</span>
              <span class="author-title">{{ testimonial.title }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Newsletter -->
    <section class="section newsletter">
      <div class="container">
        <div class="newsletter-content">
          <h2>Join Our Coffee Club</h2>
          <p>
            Subscribe to our newsletter and get 10% off your first order, 
            plus exclusive access to new products and brewing tips.
          </p>
          <form (submit)="$event.preventDefault(); subscribeNewsletter()">
            <div class="newsletter-form">
              <input type="email" placeholder="Your email address" required>
              <button type="submit" class="btn btn-accent">Subscribe</button>
            </div>
          </form>
        </div>
      </div>
    </section>
    
    <app-footer></app-footer>
  `,
  styles: [`
    .hero {
      height: 80vh;
      min-height: 600px;
      background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), 
                        url('https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg');
      background-size: cover;
      background-position: center;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: var(--color-white);
      padding: 0 var(--space-md);
    }
    
    .hero-content {
      max-width: 800px;
    }
    
    .hero-title {
      font-size: 3rem;
      margin-bottom: var(--space-md);
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      color: var(--color-white);
    }
    
    .hero-subtitle {
      font-size: 1.2rem;
      margin-bottom: var(--space-xl);
      line-height: 1.6;
    }
    
    .hero-buttons {
      display: flex;
      gap: var(--space-md);
      justify-content: center;
    }
    
    .section-header {
      text-align: center;
      margin-bottom: var(--space-xl);
    }
    
    .section-header h2 {
      font-size: 2.5rem;
      margin-bottom: var(--space-sm);
    }
    
    .section-header p {
      color: var(--color-gray-600);
      font-size: 1.1rem;
    }
    
    .featured-products {
      background-color: var(--color-gray-100);
      padding: var(--space-xl) 0;
    }

    .grid {
      display: grid;
      gap: var(--space-lg);
    }

    .grid-3 {
      grid-template-columns: repeat(1, 1fr);
    }

    @media (min-width: 768px) {
      .grid-3 {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 992px) {
      .grid-3 {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .text-center {
      text-align: center;
    }

    .mb-xl {
      margin-bottom: var(--space-xl);
    }
    
    .category-grid {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: var(--space-lg);
    }
    
    @media (min-width: 768px) {
      .category-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (min-width: 992px) {
      .category-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }
    
    .category-card {
      background-color: var(--color-white);
      border-radius: var(--border-radius-md);
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease;
    }
    
    .category-card:hover {
      transform: translateY(-5px);
    }
    
    .category-image {
      height: 200px;
      overflow: hidden;
    }
    
    .category-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    
    .category-card:hover .category-image img {
      transform: scale(1.05);
    }
    
    .category-content {
      padding: var(--space-md);
      text-align: center;
    }
    
    .category-content h3 {
      margin-bottom: var(--space-xs);
    }
    
    .category-content p {
      margin-bottom: var(--space-md);
      color: var(--color-gray-600);
      font-size: 0.9rem;
    }
    
    .about {
      background-color: var(--color-secondary);
    }
    
    .about-content {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-xl);
      align-items: center;
    }
    
    @media (min-width: 992px) {
      .about-content {
        grid-template-columns: 1fr 1fr;
      }
    }
    
    .about-image img {
      width: 100%;
      border-radius: var(--border-radius-md);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
    
    .about-text {
      padding: var(--space-lg) 0;
    }
    
    .about-text h2 {
      margin-bottom: var(--space-md);
    }
    
    .about-text p {
      margin-bottom: var(--space-md);
      line-height: 1.8;
    }
    
    .testimonials {
      background-color: var(--color-gray-100);
    }
    
    .testimonial-carousel {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: var(--space-md);
    }
    
    @media (min-width: 768px) {
      .testimonial-carousel {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (min-width: 992px) {
      .testimonial-carousel {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    
    .testimonial-item {
      background-color: var(--color-white);
      padding: var(--space-lg);
      border-radius: var(--border-radius-md);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    }
    
    .testimonial-rating {
      margin-bottom: var(--space-md);
      font-size: 1.2rem;
      color: var(--color-gray-400);
    }
    
    .testimonial-rating .filled {
      color: var(--color-accent);
    }
    
    .testimonial-text {
      font-style: italic;
      margin-bottom: var(--space-md);
      line-height: 1.7;
    }
    
    .testimonial-author {
      display: flex;
      flex-direction: column;
    }
    
    .author-name {
      font-weight: 700;
    }
    
    .author-title {
      color: var(--color-gray-600);
      font-size: 0.9rem;
    }
    
    .newsletter {
      background-color: var(--color-primary);
      color: var(--color-white);
    }
    
    .newsletter-content {
      max-width: 700px;
      margin: 0 auto;
      text-align: center;
    }
    
    .newsletter-content h2 {
      color: var(--color-white);
      margin-bottom: var(--space-md);
    }
    
    .newsletter-content p {
      margin-bottom: var(--space-lg);
    }
    
    .newsletter-form {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }
    
    .newsletter-form input {
      padding: var(--space-md);
      border-radius: var(--border-radius-sm);
      border: none;
      flex-grow: 1;
      font-size: 1rem;
    }
    
    .newsletter-form button {
      padding: var(--space-md);
    }
    
    @media (min-width: 576px) {
      .newsletter-form {
        flex-direction: row;
      }
      
      .newsletter-form button {
        flex-grow: 0;
      }
    }
  `]
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

  ngOnInit(): void {
    this.productService.getFeaturedProducts().subscribe(products => {
      this.featuredProducts = products.slice(0, 3);
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