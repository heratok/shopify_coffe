import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent, RouterLink],
  template: `
    <app-header></app-header>
    
    <div class="login-page">
      <div class="container">
        <div class="auth-form">
          <h1>Iniciar Sesión</h1>
          
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label for="email">Correo Electrónico</label>
              <input 
                type="email" 
                id="email" 
                formControlName="email" 
                class="form-control"
                [class.is-invalid]="email?.invalid && email?.touched"
              >
              <div class="invalid-feedback" *ngIf="email?.invalid && email?.touched">
                <span *ngIf="email?.errors?.['required']">El correo electrónico es requerido</span>
                <span *ngIf="email?.errors?.['email']">Ingrese un correo electrónico válido</span>
              </div>
            </div>
            
            <div class="form-group">
              <label for="password">Contraseña</label>
              <input 
                type="password" 
                id="password" 
                formControlName="password" 
                class="form-control"
                [class.is-invalid]="password?.invalid && password?.touched"
              >
              <div class="invalid-feedback" *ngIf="password?.invalid && password?.touched">
                <span *ngIf="password?.errors?.['required']">La contraseña es requerida</span>
                <span *ngIf="password?.errors?.['minlength']">La contraseña debe tener al menos 6 caracteres</span>
              </div>
            </div>
            
            <div class="form-actions">
              <button type="submit" class="btn btn-primary" [disabled]="loginForm.invalid || isLoading">
                {{ isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
              </button>
            </div>
            
            <div class="auth-links">
              <p>¿No tienes una cuenta? <a [routerLink]="['/auth/register']">Regístrate aquí</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
    
    <app-footer></app-footer>
  `,
  styles: [`
    .login-page {
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
    
    .auth-form {
      max-width: 400px;
      margin: 0 auto;
      padding: var(--space-xl);
      background-color: var(--color-white);
      border-radius: var(--border-radius-lg);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .form-group {
      margin-bottom: var(--space-md);
    }
    
    label {
      display: block;
      margin-bottom: var(--space-xs);
      font-weight: 500;
    }
    
    .form-control {
      width: 100%;
      padding: var(--space-sm);
      border: 1px solid var(--color-gray-300);
      border-radius: var(--border-radius-sm);
      transition: border-color 0.3s ease;
    }
    
    .form-control:focus {
      outline: none;
      border-color: var(--color-primary);
    }
    
    .form-control.is-invalid {
      border-color: var(--color-danger);
    }
    
    .invalid-feedback {
      color: var(--color-danger);
      font-size: 0.875rem;
      margin-top: var(--space-xs);
    }
    
    .form-actions {
      margin-top: var(--space-lg);
    }
    
    .auth-links {
      margin-top: var(--space-lg);
      text-align: center;
    }
    
    .auth-links a {
      color: var(--color-primary);
      text-decoration: none;
    }
    
    .auth-links a:hover {
      text-decoration: underline;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error de inicio de sesión:', error);
        this.isLoading = false;
      }
    });
  }
}