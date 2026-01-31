import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';
import { Cart } from '../../../core/models/cart-item.model';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  scrolled = false;
  isHomePage = true;
  searchOpen = false;
  userMenuOpen = false;
  mobileMenuOpen = false;
  currentUser: User | null = null;
  cart: Cart | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    // Check initial route
    this.checkCurrentRoute();

    // Subscribe to route changes
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.checkCurrentRoute();
      });

    this.authService.getCurrentUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
      });

    this.cartService.getCart()
      .pipe(takeUntil(this.destroy$))
      .subscribe(cart => {
        this.cart = cart;
      });
  }

  private checkCurrentRoute() {
    this.isHomePage = this.router.url === '/' || this.router.url === '';
    // Force scrolled state if not on home page
    if (!this.isHomePage) {
      this.scrolled = true;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    // Only toggle scrolled state based on scroll on home page
    // On other pages, always keep scrolled=true for visibility
    if (this.isHomePage) {
      this.scrolled = window.scrollY > 50;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const userIcon = target.closest('.user-icon');
    const userDropdown = target.closest('.user-dropdown');
    const searchContainer = target.closest('.search-bar');
    const searchIcon = target.closest('.search-icon');
    
    if (!userIcon && !userDropdown) {
      this.userMenuOpen = false;
    }
    
    if (!searchContainer && !searchIcon) {
      this.searchOpen = false;
    }
  }

  toggleSearch() {
    this.searchOpen = !this.searchOpen;
    this.userMenuOpen = false;
  }

  toggleUserMenu(event: Event) {
    event.stopPropagation();
    this.userMenuOpen = !this.userMenuOpen;
    this.searchOpen = false;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    if (this.mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
    document.body.style.overflow = '';
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