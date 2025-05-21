import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.model';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <div class="profile-page">
      <div class="container">
        <div class="profile-content">
          <h1>Mi Perfil</h1>
          
          <div class="profile-info" *ngIf="currentUser">
            <div class="info-group">
              <h3>Información Personal</h3>
              <div class="info-item">
                <label>Nombre:</label>
                <span>{{ currentUser.firstName }} {{ currentUser.lastName }}</span>
              </div>
              <div class="info-item">
                <label>Email:</label>
                <span>{{ currentUser.email }}</span>
              </div>
            </div>
            
            <div class="profile-actions">
              <button class="btn btn-primary" (click)="editProfile()">
                Editar Perfil
              </button>
            </div>
          </div>
          
          <div class="orders-section">
            <h3>Mis Pedidos</h3>
            <!-- Aquí irá la lista de pedidos -->
            <p class="no-orders" *ngIf="!hasOrders">
              Aún no tienes pedidos realizados.
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <app-footer></app-footer>
  `,
  styles: [`
    .profile-page {
      padding-top: var(--header-height);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    .container {
      padding: var(--space-xl) var(--space-md);
    }
    
    .profile-content {
      max-width: 800px;
      margin: 0 auto;
    }
    
    h1 {
      margin-bottom: var(--space-xl);
    }
    
    .profile-info {
      background-color: var(--color-white);
      border-radius: var(--border-radius-lg);
      padding: var(--space-xl);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      margin-bottom: var(--space-xl);
    }
    
    .info-group {
      margin-bottom: var(--space-lg);
    }
    
    .info-group h3 {
      margin-bottom: var(--space-md);
      padding-bottom: var(--space-sm);
      border-bottom: 1px solid var(--color-gray-200);
    }
    
    .info-item {
      display: flex;
      margin-bottom: var(--space-md);
    }
    
    .info-item label {
      font-weight: 600;
      width: 120px;
    }
    
    .profile-actions {
      margin-top: var(--space-lg);
    }
    
    .orders-section {
      background-color: var(--color-white);
      border-radius: var(--border-radius-lg);
      padding: var(--space-xl);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .no-orders {
      text-align: center;
      color: var(--color-gray-600);
      padding: var(--space-xl) 0;
    }
  `]
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null;
  hasOrders = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  editProfile() {
    // Implementar la lógica de edición de perfil
    console.log('Editar perfil');
  }
}