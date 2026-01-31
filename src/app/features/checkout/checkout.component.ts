import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { PaypalService } from '../../core/services/paypal.service';
import { CartService } from '../../core/services/cart.service';
import { Cart, CartItem } from '../../core/models/cart-item.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, AfterViewInit, OnDestroy {
  cart: Cart = { items: [], total: 0 };
  currentStep = 1;
  totalSteps = 3;
  loading = true;
  private destroy$ = new Subject<void>();

  // Form data
  shippingData = {
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: ''
  };

  get total(): number {
    return this.cart.total;
  }

  get shippingCost(): number {
    return this.total > 50 ? 0 : 5;
  }

  get finalTotal(): number {
    return this.total + this.shippingCost;
  }

  get itemCount(): number {
    return this.cart.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  constructor(
    private paypal: PaypalService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.cartService.getCart()
      .pipe(takeUntil(this.destroy$))
      .subscribe(cart => {
        this.cart = cart;
        this.loading = false;
      });
  }

  ngAfterViewInit(): void {
    // PayPal will be rendered when reaching step 3
    this.renderPayPalButtons();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private renderPayPalButtons(): void {
    if (this.currentStep !== 3) return;
    
    setTimeout(async () => {
      const container = document.getElementById('paypal-button-container');
      if (!container || this.finalTotal <= 0) return;
      
      container.innerHTML = '';
      
      await this.paypal.renderButtons(container, this.finalTotal, {
        currency: 'USD',
        onApprove: (details) => {
          const name = details?.payer?.name?.given_name || 'Customer';
          console.log('[Checkout] Approved:', details);
          this.currentStep = 4; // Success step
          this.cartService.clearCart();
          alert(`Thank you, ${name}! Your order has been confirmed.`);
        },
        onError: (err) => console.error('[Checkout] PayPal error:', err)
      });
    }, 100);
  }

  nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      if (this.currentStep === 3) {
        this.renderPayPalButtons();
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  goToStep(step: number): void {
    if (step <= this.currentStep) {
      this.currentStep = step;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  isStepValid(): boolean {
    switch (this.currentStep) {
      case 1:
        return !!(this.shippingData.email && this.shippingData.firstName && 
                  this.shippingData.lastName && this.shippingData.address && 
                  this.shippingData.city && this.shippingData.zip);
      case 2:
        return true; // Review step is always valid
      case 3:
        return true; // Payment step
      default:
        return false;
    }
  }
}