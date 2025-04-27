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
      height: 38px;
      border: 1px solid var(--color-gray-300);
      border-radius: var(--border-radius-sm);
      overflow: hidden;
    }
    
    .quantity-btn {
      width: 38px;
      height: 38px;
      background-color: var(--color-gray-100);
      border: none;
      font-size: 1.2rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
    
    .quantity-btn:hover:not(:disabled) {
      background-color: var(--color-gray-200);
    }
    
    .quantity-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .quantity-value {
      width: 40px;
      text-align: center;
      font-weight: 600;
      font-size: 1rem;
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