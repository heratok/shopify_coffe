import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from '../skeleton/skeleton.component';

@Component({
  selector: 'app-cart-skeleton',
  standalone: true,
  imports: [CommonModule, SkeletonComponent],
  template: `
    <div class="cart-skeleton container">
      <div class="cart-items">
        <app-skeleton height="24px" width="200px" class="mb-4"></app-skeleton>
        <div class="cart-item" *ngFor="let i of [1,2,3]">
          <div class="item-content">
            <app-skeleton height="100px" width="100px" [rounded]="true"></app-skeleton>
            <div class="item-details">
              <app-skeleton height="24px" width="60%" class="mb-2"></app-skeleton>
              <app-skeleton height="20px" width="30%" class="mb-2"></app-skeleton>
              <app-skeleton height="32px" width="120px"></app-skeleton>
            </div>
          </div>
        </div>
      </div>
      <div class="cart-summary">
        <app-skeleton height="24px" width="150px" class="mb-4"></app-skeleton>
        <app-skeleton height="20px" width="100%" class="mb-2"></app-skeleton>
        <app-skeleton height="20px" width="100%" class="mb-2"></app-skeleton>
        <app-skeleton height="48px" width="100%"></app-skeleton>
      </div>
    </div>
  `,
  styles: [`
    .cart-skeleton {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 2rem;
      padding: 2rem;
    }
    .cart-item {
      padding: 1rem;
      border-bottom: 1px solid #eee;
    }
    .item-content {
      display: flex;
      gap: 1rem;
    }
    .item-details {
      flex: 1;
    }
    .mb-2 {
      margin-bottom: 0.5rem;
    }
    .mb-4 {
      margin-bottom: 1rem;
    }
    @media (max-width: 768px) {
      .cart-skeleton {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CartSkeletonComponent {}
