import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'products',
    loadComponent: () => import('./features/products/products.component').then(c => c.ProductsComponent)
  },
  {
    path: 'products/category/:id',
    loadComponent: () => import('./features/products/products.component').then(c => c.ProductsComponent)
  },
  {
    path: 'products/:id',
    loadComponent: () => import('./features/product-detail/product-detail.component').then(c => c.ProductDetailComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart.component').then(c => c.CartComponent)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./features/checkout/checkout.component').then(c => c.CheckoutComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./features/auth/register/register.component').then(c => c.RegisterComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];