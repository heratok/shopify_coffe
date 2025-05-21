import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';
import { Cart } from '../../../core/models/cart-item.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header [class.scrolled]="scrolled" class="header">
      <div class="container header-container">
        <div class="logo">
          <a routerLink="/">
            <h1>Brew Haven</h1>
          </a>
        </div>
        <nav class="main-nav" [class.active]="mobileMenuOpen">
          <ul>
            <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a></li>
            <li><a routerLink="/products" routerLinkActive="active">Shop</a></li>
            <li><a routerLink="/about" routerLinkActive="active">About</a></li>
            <li><a routerLink="/contact" routerLinkActive="active">Contact</a></li>
          </ul>
        </nav>
        <div class="header-actions">
          <div class="search-icon" (click)="toggleSearch()">
            <span class="icon">🔍</span>
          </div>
          <div class="cart-icon" (click)="toggleCart()">
            <span class="icon">🛒</span>
            <span class="badge" *ngIf="cart && cart.items.length > 0">{{ getTotalItems() }}</span>
          </div>
          <div class="user-icon" *ngIf="!currentUser">
            <a routerLink="/auth/login">
              <span class="icon">👤</span>
            </a>
          </div>
          <div class="user-icon" *ngIf="currentUser" [class.active]="userMenuOpen" (click)="toggleUserMenu($event)">
            <span class="icon">👑</span>
            <div class="user-dropdown" *ngIf="userMenuOpen">
              <div class="user-info">
                <p>{{ currentUser.firstName }} {{ currentUser.lastName }}</p>
                <small>{{ currentUser.email }}</small>
              </div>
              <ul>
                <li><a routerLink="/profile">Mi Cuenta</a></li>
                <li><a routerLink="/orders">Mis Pedidos</a></li>
                <li><a (click)="logout()">Cerrar Sesión</a></li>
              </ul>
            </div>
          </div>
          <div class="mobile-menu-toggle" (click)="toggleMobileMenu()">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <div class="search-bar" [class.active]="searchOpen">
        <div class="container">
          <input type="text" placeholder="Search for coffee..." #searchInput>
          <button class="btn-search">Search</button>
          <button class="btn-close" (click)="toggleSearch()">✕</button>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background-color: var(--color-primary-dark);
      padding: var(--space-sm) 0;
      transition: all 0.3s ease;
    }
    
    .header.scrolled {
      background-color: var(--color-primary-dark);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      padding: var(--space-xs) 0;
    }
    
    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .logo h1 {
      font-size: 1.8rem;
      margin: 0;
      color: var(--color-white);
      transition: all 0.3s ease;
    }
    
    .main-nav ul {
      display: flex;
      list-style-type: none;
      margin: 0;
      padding: 0;
    }
    
    .main-nav li {
      margin: 0 var(--space-md);
    }
    
    .main-nav a {
      color: var(--color-white);
      font-weight: 600;
      position: relative;
      padding: var(--space-xs) 0;
    }
    
    .main-nav a::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background-color: var(--color-accent);
      transition: width 0.3s ease;
    }
    
    .main-nav a:hover::after,
    .main-nav a.active::after {
      width: 100%;
    }
    
    .header-actions {
      display: flex;
      align-items: center;
    }
    
    .search-icon, .cart-icon, .user-icon {
      margin-left: var(--space-md);
      position: relative;
      cursor: pointer;
    }
    
    .icon {
      font-size: 1.4rem;
      color: var(--color-white);
    }
    
    .badge {
      position: absolute;
      top: -8px;
      right: -8px;
      background-color: var(--color-accent);
      color: var(--color-primary-dark);
      font-size: 0.7rem;
      font-weight: 700;
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }
    
    .user-dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      margin-top: var(--space-xs);
      background-color: var(--color-white);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      border-radius: var(--border-radius-md);
      width: 220px;
      overflow: hidden;
      z-index: 1000;
    }
    
    .user-info {
      padding: var(--space-md);
      background-color: var(--color-primary-light);
      color: var(--color-white);
    }
    
    .user-info p {
      margin: 0 0 var(--space-xs);
      font-weight: 600;
    }
    
    .user-dropdown ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
    }
    
    .user-dropdown li {
      border-bottom: 1px solid var(--color-gray-200);
    }
    
    .user-dropdown li:last-child {
      border-bottom: none;
    }
    
    .user-dropdown a {
      display: block;
      padding: var(--space-sm) var(--space-md);
      color: var(--color-gray-800);
      transition: all 0.2s ease;
    }
    
    .user-dropdown a:hover {
      background-color: var(--color-gray-100);
      color: var(--color-primary);
    }
    
    .search-bar {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background-color: var(--color-white);
      padding: var(--space-md) 0;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }
    
    .search-bar.active {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
    
    .search-bar input {
      width: 100%;
      padding: var(--space-sm) var(--space-md);
      font-size: 1rem;
      border: 1px solid var(--color-gray-300);
      border-radius: var(--border-radius-sm);
    }
    
    .btn-search {
      background-color: var(--color-primary);
      color: var(--color-white);
      border: none;
      padding: var(--space-sm) var(--space-md);
      border-radius: var(--border-radius-sm);
      margin-left: var(--space-sm);
      cursor: pointer;
    }
    
    .btn-close {
      background: none;
      border: none;
      color: var(--color-gray-600);
      font-size: 1.2rem;
      cursor: pointer;
      margin-left: var(--space-sm);
    }
    
    .mobile-menu-toggle {
      display: none;
      flex-direction: column;
      justify-content: space-between;
      width: 30px;
      height: 21px;
      cursor: pointer;
      margin-left: var(--space-md);
    }
    
    .mobile-menu-toggle span {
      display: block;
      height: 3px;
      width: 100%;
      background-color: var(--color-white);
      border-radius: 3px;
      transition: all 0.3s ease;
    }
    
    @media (max-width: 768px) {
      .main-nav {
        position: fixed;
        top: var(--header-height);
        left: 0;
        right: 0;
        background-color: var(--color-primary-dark);
        height: 0;
        overflow: hidden;
        transition: height 0.3s ease;
      }
      
      .main-nav.active {
        height: calc(100vh - var(--header-height));
      }
      
      .main-nav ul {
        flex-direction: column;
        padding: var(--space-md);
      }
      
      .main-nav li {
        margin: var(--space-sm) 0;
      }
      
      .mobile-menu-toggle {
        display: flex;
      }
    }
  `]
})
export class HeaderComponent implements OnInit {
  scrolled = false;
  searchOpen = false;
  userMenuOpen = false;
  mobileMenuOpen = false;
  currentUser: User | null = null;
  cart: Cart | null = null;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });

    this.cartService.getCart().subscribe(cart => {
      this.cart = cart;
    });
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.scrolled = window.scrollY > 50;
  }

  toggleSearch() {
    this.searchOpen = !this.searchOpen;
    this.userMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const userIcon = (event.target as HTMLElement).closest('.user-icon');
    const userDropdown = (event.target as HTMLElement).closest('.user-dropdown');
    
    if (!userIcon && !userDropdown) {
      this.userMenuOpen = false;
    }
  }

  toggleUserMenu(event: Event) {
    event.stopPropagation(); // Evitar que el clic se propague al documento
    this.userMenuOpen = !this.userMenuOpen;
    this.searchOpen = false;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  toggleCart() {
    this.router.navigate(['/cart']);
  }

  getTotalItems(): number {
    if (!this.cart) return 0;
    return this.cart.items.reduce((total, item) => total + item.quantity, 0);
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.userMenuOpen = false;
      this.router.navigate(['/']);
    });
  }
}