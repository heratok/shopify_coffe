import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <div class="checkout-page">
      <div class="container">
        <h1>Checkout</h1>
        <p>Checkout functionality coming soon!</p>
      </div>
    </div>
    
    <app-footer></app-footer>
  `,
  styles: [`
    .checkout-page {
      padding-top: var(--header-height);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    .container {
      padding: var(--space-xl) var(--space-md);
    }
    
    h1 {
      margin-bottom: var(--space-md);
    }
  `]
})
export class CheckoutComponent {}