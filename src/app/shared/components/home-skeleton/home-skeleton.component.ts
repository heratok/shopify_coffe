import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { ProductCardSkeletonComponent } from '../product-card-skeleton/product-card-skeleton.component';

@Component({
  selector: 'app-home-skeleton',
  standalone: true,
  imports: [CommonModule, SkeletonComponent, ProductCardSkeletonComponent],
  template: `
    <div class="home-skeleton">
      <!-- Hero Section Skeleton -->
      <section class="hero-skeleton">
        <div class="container">
          <app-skeleton height="48px" width="60%" class="mb-4"></app-skeleton>
          <app-skeleton height="24px" width="40%" class="mb-4"></app-skeleton>
          <app-skeleton height="48px" width="200px"></app-skeleton>
        </div>
      </section>

      <!-- Featured Products Skeleton -->
      <section class="featured-products container">
        <app-skeleton height="32px" width="300px" class="mb-4"></app-skeleton>
        <div class="products-grid">
          <app-product-card-skeleton *ngFor="let i of [1,2,3,4]"></app-product-card-skeleton>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .hero-skeleton {
      padding: 4rem 0;
      background-color: var(--color-background-light);
      margin-bottom: 2rem;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    .mb-4 {
      margin-bottom: 1rem;
    }
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 2rem;
      padding: 2rem 0;
    }
  `]
})
export class HomeSkeletonComponent {}
