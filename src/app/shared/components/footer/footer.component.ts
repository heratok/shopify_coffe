import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styles: [`
    .footer {
      background-color: var(--color-primary-dark, #1a1a1a);
      color: var(--color-white, #ffffff);
      padding: var(--space-xl, 4rem) 0 var(--space-md, 2rem);
      margin-top: auto;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--space-md, 2rem);
    }

    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--space-xl, 4rem);
      margin-bottom: var(--space-xl, 4rem);
    }

    .footer-section h3 {
      color: var(--color-white, #ffffff);
      font-size: 1.25rem;
      margin-bottom: var(--space-md, 2rem);
    }

    .footer-section p {
      margin-bottom: var(--space-md, 2rem);
      line-height: 1.6;
    }

    .contact p {
      margin-bottom: var(--space-sm, 1rem);
      display: flex;
      align-items: center;
      gap: var(--space-sm, 1rem);
    }

    .socials {
      display: flex;
      gap: var(--space-md, 2rem);
      margin-top: var(--space-lg, 3rem);
    }

    .socials a {
      color: var(--color-white, #ffffff);
      text-decoration: none;
      font-size: 1.1rem;
      transition: color 0.3s ease;
    }

    .socials a:hover {
      color: var(--color-accent, #ffd700);
    }

    .footer-section ul {
      list-style: none;
      padding: 0;
    }

    .footer-section ul li {
      margin-bottom: var(--space-sm, 1rem);
    }

    .footer-section ul a {
      color: var(--color-gray-300, #d1d1d1);
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .footer-section ul a:hover {
      color: var(--color-white, #ffffff);
    }

    .newsletter form {
      display: flex;
      gap: var(--space-sm, 1rem);
    }

    .newsletter input {
      flex: 1;
      padding: var(--space-sm, 1rem);
      border: 1px solid var(--color-gray-700, #404040);
      background-color: var(--color-gray-800, #1f1f1f);
      color: var(--color-white, #ffffff);
      border-radius: var(--border-radius-sm, 4px);
    }

    .newsletter button {
      padding: var(--space-sm, 1rem) var(--space-md, 2rem);
      background-color: var(--color-accent, #ffd700);
      color: var(--color-primary-dark, #1a1a1a);
      border: none;
      border-radius: var(--border-radius-sm, 4px);
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .newsletter button:hover {
      background-color: var(--color-accent-light, #ffe44d);
    }

    .footer-bottom {
      padding-top: var(--space-lg, 3rem);
      border-top: 1px solid var(--color-gray-700, #404040);
      text-align: center;
    }

    .footer-bottom p {
      margin-bottom: var(--space-md, 2rem);
      color: var(--color-gray-400, #9ca3af);
    }

    .footer-bottom-links {
      display: flex;
      justify-content: center;
      gap: var(--space-lg, 3rem);
      flex-wrap: wrap;
    }

    .footer-bottom-links a {
      color: var(--color-gray-300, #d1d1d1);
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .footer-bottom-links a:hover {
      color: var(--color-white, #ffffff);
    }

    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        gap: var(--space-lg, 3rem);
      }

      .newsletter form {
        flex-direction: column;
      }

      .footer-bottom-links {
        gap: var(--space-md, 2rem);
      }
    }
  `],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section about">
            <h3 class="logo">Brew Haven</h3>
            <p>
              Premium coffee shop offering the finest selection of coffee beans 
              from around the world, crafted with passion and expertise.
            </p>
            <div class="contact">
              <p><span>📍</span> 123 Coffee Street, Bean City</p>
              <p><span>📞</span> +1 (555) 123-4567</p>
              <p><span>✉️</span> info&#64;brewhaven.com</p>
            </div>
            <div class="socials">
              <a href="#" aria-label="Facebook">FB</a>
              <a href="#" aria-label="Twitter">TW</a>
              <a href="#" aria-label="Instagram">IG</a>
              <a href="#" aria-label="Pinterest">PI</a>
            </div>
          </div>
          <div class="footer-section links">
            <h3>Quick Links</h3>
            <ul>
              <li><a routerLink="/">Home</a></li>
              <li><a routerLink="/products">Shop</a></li>
              <li><a routerLink="/about">About Us</a></li>
              <li><a routerLink="/contact">Contact</a></li>
              <li><a routerLink="/blog">Blog</a></li>
            </ul>
          </div>
          <div class="footer-section categories">
            <h3>Categories</h3>
            <ul>
              <li><a routerLink="/products/category/single-origin">Single Origin</a></li>
              <li><a routerLink="/products/category/blends">Blends</a></li>
              <li><a routerLink="/products/category/espresso">Espresso</a></li>
              <li><a routerLink="/products/category/decaf">Decaf</a></li>
              <li><a routerLink="/products/category/subscriptions">Subscriptions</a></li>
            </ul>
          </div>
          <div class="footer-section newsletter">
            <h3>Subscribe to Our Newsletter</h3>
            <p>Stay updated with our latest offers and coffee tips.</p>
            <form (submit)="$event.preventDefault(); subscribeToNewsletter()">
              <input type="email" placeholder="Enter your email" required>
              <button type="submit" class="btn">Subscribe</button>
            </form>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; {{ currentYear }} Brew Haven Coffee Shop. All rights reserved.</p>
          <div class="footer-bottom-links">
            <a routerLink="/privacy-policy">Privacy Policy</a>
            <a routerLink="/terms-of-service">Terms of Service</a>
            <a routerLink="/shipping-info">Shipping Information</a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  subscribeToNewsletter() {
    alert('Thank you for subscribing to our newsletter!');
  }
}