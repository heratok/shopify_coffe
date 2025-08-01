import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from '../skeleton/skeleton.component';

@Component({
  selector: 'app-product-detail-skeleton',
  standalone: true,
  imports: [CommonModule, SkeletonComponent],
  template: `
    <div class="product-detail-skeleton container">
      <div class="product-image">
        <app-skeleton height="400px" [rounded]="true"></app-skeleton>
      </div>
      <div class="product-info">
        <app-skeleton height="32px" width="60%" class="mb-4"></app-skeleton>
        <app-skeleton height="24px" width="30%" class="mb-4"></app-skeleton>
        <app-skeleton height="100px" width="90%" class="mb-4"></app-skeleton>
        <app-skeleton height="48px" width="200px"></app-skeleton>
      </div>
    </div>
  `,
  styles: [`
    .product-detail-skeleton {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      padding: 2rem;
    }
    .mb-4 {
      margin-bottom: 1rem;
    }
    @media (max-width: 768px) {
      .product-detail-skeleton {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProductDetailSkeletonComponent {}
