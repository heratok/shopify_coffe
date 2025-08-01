import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from '../skeleton/skeleton.component';

@Component({
  selector: 'app-product-card-skeleton',
  standalone: true,
  imports: [CommonModule, SkeletonComponent],
  template: `
    <div class="product-card-skeleton">
      <app-skeleton height="200px" [rounded]="true"></app-skeleton>
      <div class="content">
        <app-skeleton height="24px" width="70%"></app-skeleton>
        <app-skeleton height="16px" width="40%"></app-skeleton>
        <app-skeleton height="20px" width="30%"></app-skeleton>
        <app-skeleton height="36px" width="100%" class="button"></app-skeleton>
      </div>
    </div>
  `,
  styles: [`
    .product-card-skeleton {
      border: 1px solid var(--color-gray-200);
      border-radius: 8px;
      padding: 1rem;
      height: 100%;
    }

    .content {
      padding-top: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .button {
      margin-top: 0.5rem;
    }
  `]
})
export class ProductCardSkeletonComponent {}
