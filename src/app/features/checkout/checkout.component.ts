import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { PaypalService } from '../../core/services/paypal.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements AfterViewInit {
  total = 0;

  constructor(
    private paypal: PaypalService,
    private cartService: CartService
  ) {
    this.total = this.cartService.getTotal();
  }

  async ngAfterViewInit(): Promise<void> {
    const container = document.getElementById('paypal-button-container');
    if (!container) return;
    if (this.total <= 0) return;
    await this.paypal.renderButtons(container, this.total, {
      currency: 'USD',
      onApprove: (details) => {
        const name = details?.payer?.name?.given_name || 'Customer';
        console.log('[Checkout] Approved:', details);
        alert(`Thanks, ${name}! Your payment was captured.`);
      },
      onError: (err) => console.error('[Checkout] PayPal error:', err)
    });
  }
}