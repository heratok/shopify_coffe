import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { CartItem } from '../../core/models/cart-item.model';
import { QuantitySelectorComponent } from '../../shared/components/quantity-selector/quantity-selector.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CartSkeletonComponent } from '../../shared/components/cart-skeleton/cart-skeleton.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    QuantitySelectorComponent,
    HeaderComponent,
    FooterComponent,
    CartSkeletonComponent
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartTotal: number = 0;
  loading: boolean = true;
  showPromo: boolean = false;
  confirmClear: boolean = false;
  promoCode: string = '';
  promoApplied: string = '';
  promoDiscount: number = 0;
  promoError: string = '';
  promoMessage: string = '';
  Math = Math;

  private readonly validPromoCodes: { [code: string]: number } = {
    'SAVE10': 0.10,
    'BREW15': 0.15
  };

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loading = true;
    this.cartService.getCart().subscribe(cart => {
      this.cartItems = cart.items;
      this.cartTotal = cart.total;
      this.loading = false;
    });
  }

  get discountAmount(): number {
    return this.cartTotal * this.promoDiscount;
  }

  get promoTotal(): number {
    const subtotal = this.cartTotal - this.discountAmount;
    return subtotal + (subtotal > 50 ? 0 : 5);
  }

  applyPromo(): void {
    const code = this.promoCode.trim().toUpperCase();
    if (!code) {
      this.promoError = 'Enter a promo code.';
      this.promoMessage = '';
      return;
    }
    const rate = this.validPromoCodes[code];
    if (rate === undefined) {
      this.promoError = `"${code}" is not a valid code.`;
      this.promoMessage = '';
      return;
    }
    if (this.promoApplied === code) {
      this.promoError = '';
      this.promoMessage = `${code} is already applied.`;
      return;
    }
    this.promoApplied = code;
    this.promoDiscount = rate;
    this.promoError = '';
    this.promoMessage = `${code} applied — ${Math.round(rate * 100)}% off.`;
    this.showPromo = false;
  }

  removePromo(): void {
    this.promoApplied = '';
    this.promoDiscount = 0;
    this.promoMessage = '';
    this.promoError = '';
  }

  updateQuantity(productId: string, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
  }
  
  removeItem(productId: string): void {
    this.cartService.removeFromCart(productId);
  }

  clearCart(): void {
    if (this.confirmClear) {
      this.cartService.clearCart();
      this.confirmClear = false;
      this.promoApplied = '';
      this.promoDiscount = 0;
      this.promoMessage = '';
    } else {
      this.confirmClear = true;
    }
  }

  cancelClear(): void {
    this.confirmClear = false;
  }
}