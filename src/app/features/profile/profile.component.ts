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
          <h1>My Profile</h1>
          
          <div class="profile-info" *ngIf="currentUser">
            <div class="info-group">
              <h3>Personal Information</h3>
              <div class="info-item">
                <label>Name:</label>
                <span>{{ currentUser.firstName }} {{ currentUser.lastName }}</span>
              </div>
              <div class="info-item">
                <label>Email:</label>
                <span>{{ currentUser.email }}</span>
              </div>
            </div>
            
            <div class="profile-actions">
              <button class="btn btn-primary" (click)="editProfile()">
                Edit Profile
              </button>
            </div>
          </div>
          
          <div class="orders-section">
            <h3>My Orders</h3>
            <p class="no-orders" *ngIf="!hasOrders">
              You have no orders yet.
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
      background: var(--color-cream);
    }

    .container {
      padding: var(--space-8) var(--space-6);
    }

    .profile-content {
      max-width: 800px;
      margin: 0 auto;
    }

    h1 {
      margin-bottom: var(--space-8);
      color: var(--color-espresso);
    }

    .profile-info {
      background-color: var(--color-white);
      border: 1px solid var(--color-cream-line);
      border-radius: var(--radius-lg);
      padding: var(--space-8);
      box-shadow: var(--shadow-md);
      margin-bottom: var(--space-8);
    }

    .info-group {
      margin-bottom: var(--space-6);
    }

    .info-group h3 {
      margin-bottom: var(--space-4);
      padding-bottom: var(--space-3);
      border-bottom: 1px solid var(--color-cream-line);
      color: var(--color-espresso);
    }

    .info-item {
      display: flex;
      margin-bottom: var(--space-4);
    }

    .info-item label {
      font-weight: 600;
      width: 120px;
      color: var(--color-espresso-soft);
    }

    .info-item span {
      color: var(--color-espresso);
      font-family: var(--font-family-mono);
    }

    .profile-actions {
      margin-top: var(--space-6);
    }

    .orders-section {
      background-color: var(--color-white);
      border: 1px solid var(--color-cream-line);
      border-radius: var(--radius-lg);
      padding: var(--space-8);
      box-shadow: var(--shadow-md);
    }

    .orders-section h3 {
      margin-bottom: var(--space-4);
      padding-bottom: var(--space-3);
      border-bottom: 1px solid var(--color-cream-line);
      color: var(--color-espresso);
    }

    .no-orders {
      text-align: center;
      color: var(--color-espresso-muted);
      padding: var(--space-8) 0;
      margin: 0;
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
    // TODO: implement profile editing
    console.log('Edit profile');
  }
}