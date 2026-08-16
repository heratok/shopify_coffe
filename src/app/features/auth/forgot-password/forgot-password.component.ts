import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-page">
      <div class="auth-container">
        <div class="auth-card">
          <div class="card-header">
            <div class="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 8H19C20.1046 8 21 8.89543 21 10V12C21 13.1046 20.1046 14 19 14H18M18 8V14M18 8H15M18 14H15M15 8V14M15 8H12C11.4477 8 11 8.44772 11 9V13C11 13.5523 11.4477 14 12 14H15M9 8H6C5.44772 8 5 8.44772 5 9V13C5 13.5523 5.44772 14 6 14H9M3 8V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 17H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <h1 class="card-title">Reset your password</h1>
            <p class="card-subtitle">Enter your email and we'll send you a reset link.</p>
          </div>

          <form (ngSubmit)="onSubmit()" class="auth-form" *ngIf="!submitted">
            <div class="form-group">
              <label for="email" class="form-label">
                <span class="label-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </span>
                Email Address
              </label>
              <div class="input-wrapper">
                <input
                  type="email"
                  id="email"
                  class="form-input"
                  [(ngModel)]="email"
                  name="email"
                  placeholder="your@email.com"
                  autocomplete="email"
                  required
                >
                <div class="input-focus-line"></div>
              </div>
              <div class="error-message" *ngIf="error">{{ error }}</div>
            </div>

            <button type="submit" class="submit-btn" [disabled]="!email">
              Send reset link
            </button>
          </form>

          <div class="reset-success" *ngIf="submitted">
            <div class="success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <p class="success-title">Check your inbox</p>
            <p class="success-text">
              If an account exists for {{ email }}, we've sent a link to reset your password.
            </p>
          </div>

          <div class="auth-footer">
            <p><a [routerLink]="['/auth/login']" class="auth-link">Back to sign in</a></p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--space-8);
      background: var(--color-cream);
      background-image: radial-gradient(circle at 12% 20%, var(--color-cream-deep) 0%, transparent 42%),
        radial-gradient(circle at 88% 82%, var(--color-cream-deep) 0%, transparent 42%);
    }

    .auth-container {
      width: 100%;
      max-width: 480px;
    }

    .auth-card {
      background: var(--color-espresso);
      border: 1px solid rgba(250, 246, 239, 0.12);
      border-radius: var(--radius-xl);
      padding: var(--space-10);
      box-shadow: var(--shadow-xl);
      animation: cardEnter 0.4s ease-out;
    }

    @keyframes cardEnter {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .card-header {
      text-align: center;
      margin-bottom: var(--space-8);
    }

    .logo-icon {
      width: 56px;
      height: 56px;
      margin: 0 auto var(--space-4);
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-cream);
      border-radius: var(--radius-full);
      color: var(--color-espresso);
    }

    .logo-icon svg {
      width: 28px;
      height: 28px;
    }

    .card-title {
      color: var(--color-cream);
      font-family: var(--font-family-display);
      font-size: var(--text-3xl);
      font-weight: 700;
      margin: 0 0 var(--space-2);
    }

    .card-subtitle {
      color: var(--color-cream-deep);
      opacity: 0.8;
      margin: 0;
      font-size: var(--text-sm);
    }

    .form-group {
      margin-bottom: var(--space-6);
    }

    .form-label {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      margin-bottom: var(--space-2);
      color: var(--color-cream);
      font-size: var(--text-xs);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .label-icon svg {
      width: 16px;
      height: 16px;
    }

    .input-wrapper {
      position: relative;
    }

    .form-input {
      width: 100%;
      padding: var(--space-3) var(--space-4);
      background: rgba(250, 246, 239, 0.08);
      border: 1px solid rgba(250, 246, 239, 0.2);
      border-radius: var(--radius-md);
      color: var(--color-cream);
      font-family: var(--font-family-body);
      font-size: var(--text-base);
      transition: border-color var(--transition-fast);
    }

    .form-input::placeholder {
      color: rgba(250, 246, 239, 0.4);
    }

    .form-input:focus {
      outline: none;
      border-color: var(--color-accent);
    }

    .input-focus-line {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: var(--color-accent);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform var(--transition-base);
    }

    .form-input:focus ~ .input-focus-line {
      transform: scaleX(1);
    }

    .error-message {
      color: #ffb4ab;
      font-size: var(--text-xs);
      margin-top: var(--space-2);
    }

    .submit-btn {
      width: 100%;
      padding: var(--space-4);
      background: var(--color-cream);
      color: var(--color-espresso);
      border: none;
      border-radius: var(--radius-md);
      font-family: var(--font-family-body);
      font-size: var(--text-sm);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      cursor: pointer;
      transition: background var(--transition-fast), transform var(--transition-fast);
    }

    .submit-btn:hover:not(:disabled) {
      background: var(--color-cream-deep);
      transform: translateY(-1px);
    }

    .submit-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .reset-success {
      text-align: center;
      padding: var(--space-4) 0;
    }

    .success-icon {
      width: 56px;
      height: 56px;
      margin: 0 auto var(--space-4);
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(46, 125, 50, 0.2);
      border-radius: var(--radius-full);
      color: #9fd6a4;
    }

    .success-icon svg {
      width: 28px;
      height: 28px;
    }

    .success-title {
      color: var(--color-cream);
      font-family: var(--font-family-display);
      font-size: var(--text-2xl);
      font-weight: 700;
      margin: 0 0 var(--space-3);
    }

    .success-text {
      color: var(--color-cream-deep);
      opacity: 0.85;
      margin: 0;
      font-size: var(--text-sm);
      line-height: 1.6;
    }

    .auth-footer {
      margin-top: var(--space-8);
      text-align: center;
    }

    .auth-link {
      color: var(--color-cream-deep);
      opacity: 0.9;
      font-weight: 600;
      text-decoration: underline;
    }

    .auth-link:hover {
      color: var(--color-cream);
    }

    @media (max-width: 480px) {
      .auth-card {
        padding: var(--space-8);
      }
    }
  `]
})
export class ForgotPasswordComponent {
  email: string = '';
  submitted = false;
  error: string = '';

  onSubmit(): void {
    const trimmed = this.email.trim();
    if (!trimmed || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmed)) {
      this.error = 'Please enter a valid email address.';
      return;
    }
    this.error = '';
    this.submitted = true;
  }
}
