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
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
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