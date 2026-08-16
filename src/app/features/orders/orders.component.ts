import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CheckoutComponent } from '../checkout/checkout.component';

interface StoredOrder {
  number: string;
  date: string;
  email: string;
  items: Array<{ productId: string; name: string; quantity: number; price: number }>;
  total: number;
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: StoredOrder[] = [];

  ngOnInit(): void {
    this.orders = CheckoutComponent.getStoredOrders();
  }

  formatDate(iso: string): string {
    try {
      return new Date(iso).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return iso;
    }
  }
}
