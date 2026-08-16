import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quantity-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="quantity-selector">
      <button 
        class="quantity-btn" 
        (click)="decreaseQuantity()" 
        [disabled]="quantity <= 1">
        -
      </button>
      <span class="quantity-value">{{ quantity }}</span>
      <button 
        class="quantity-btn" 
        (click)="increaseQuantity()" 
        [disabled]="quantity >= max">
        +
      </button>
    </div>
  `,
  styles: [`
    .quantity-selector {
      display: flex;
      align-items: center;
      height: 44px;
      border: 1px solid var(--color-cream-line);
      border-radius: var(--radius-md);
      overflow: hidden;
      background: var(--color-white);
    }
    
    .quantity-btn {
      width: 44px;
      height: 44px;
      background-color: var(--color-cream-deep);
      border: none;
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--color-espresso);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
    
    .quantity-btn:hover:not(:disabled) {
      background-color: var(--color-cream-line);
    }
    
    .quantity-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .quantity-value {
      width: 44px;
      text-align: center;
      font-weight: 600;
      font-size: 1rem;
      font-family: var(--font-family-mono);
      color: var(--color-espresso);
    }
  `]
})
export class QuantitySelectorComponent {
  @Input() quantity: number = 1;
  @Input() max: number = 99;
  @Output() quantityChange = new EventEmitter<number>();

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
      this.quantityChange.emit(this.quantity);
    }
  }

  increaseQuantity(): void {
    if (this.quantity < this.max) {
      this.quantity++;
      this.quantityChange.emit(this.quantity);
    }
  }
}