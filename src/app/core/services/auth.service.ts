import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  private jwtHelper: JwtHelperService;
  private tokenKey = 'auth_token';

  constructor() {
    this.jwtHelper = new JwtHelperService();
    this.currentUserSubject = new BehaviorSubject<User | null>(this.getCurrentUserFromToken());
  }

  private getCurrentUserFromToken(): User | null {
    const token = localStorage.getItem(this.tokenKey);
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return {
        id: decodedToken.sub,
        email: decodedToken.email,
        firstName: decodedToken.firstName,
        lastName: decodedToken.lastName,
        isAuthenticated: true
      };
    }
    return null;
  }

  login(email: string, password: string): Observable<{ user: User; token: string }> {
    // Simulación de login con token JWT
    const mockToken = this.generateMockToken({
      sub: '1',
      email: email,
      firstName: 'Usuario',
      lastName: 'Temporal'
    });

    const mockUser: User = {
      id: '1',
      email: email,
      firstName: 'Usuario',
      lastName: 'Temporal',
      isAuthenticated: true
    };

    return new Observable(observer => {
      // Simular delay de red
      setTimeout(() => {
        localStorage.setItem(this.tokenKey, mockToken);
        this.currentUserSubject.next(mockUser);
        observer.next({ user: mockUser, token: mockToken });
        observer.complete();
      }, 1000);
    });
  }

  register(email: string, password: string, firstName: string, lastName: string): Observable<{ user: User; token: string }> {
    const mockToken = this.generateMockToken({
      sub: '1',
      email,
      firstName,
      lastName
    });

    const mockUser: User = {
      id: '1',
      email,
      firstName,
      lastName,
      isAuthenticated: true
    };

    return new Observable(observer => {
      setTimeout(() => {
        localStorage.setItem(this.tokenKey, mockToken);
        this.currentUserSubject.next(mockUser);
        observer.next({ user: mockUser, token: mockToken });
        observer.complete();
      }, 1000);
    });
  }

  logout(): Observable<void> {
    return new Observable(observer => {
      localStorage.removeItem(this.tokenKey);
      this.currentUserSubject.next(null);
      observer.next();
      observer.complete();
    });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private generateMockToken(payload: any): string {
    // Esta es una implementación simplificada para generar un token JWT mock
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const encodedPayload = btoa(JSON.stringify({
      ...payload,
      iat: new Date().getTime(),
      exp: new Date().getTime() + (24 * 60 * 60 * 1000) // 24 horas
    }));
    const signature = btoa('mock_signature'); // En producción, esto sería una firma real

    return `${header}.${encodedPayload}.${signature}`;
  }
}
