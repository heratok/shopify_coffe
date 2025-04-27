import { CartItem } from './cart-item.model';

export interface ShippingDetails {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phoneNumber: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  shippingDetails: ShippingDetails;
  orderDate: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  paymentMethod: string;
  trackingNumber?: string;
}