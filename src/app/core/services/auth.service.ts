import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  
  constructor() {
    // Check if user is logged in from local storage
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  isAuthenticated(): boolean {
    const user = this.currentUserSubject.value;
    return !!user && user.isAuthenticated;
  }

  login(email: string, password: string): Observable<User> {
    // This is a mock implementation. In a real app, this would call an API
    if (email === 'user@example.com' && password === 'password') {
      const user: User = {
        id: '1',
        email: email,
        firstName: 'John',
        lastName: 'Doe',
        isAuthenticated: true
      };
      
      return of(user).pipe(
        delay(1000), // Simulate API delay
        tap(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        })
      );
    }
    
    return throwError(() => new Error('Invalid email or password'));
  }

  register(email: string, password: string, firstName: string, lastName: string): Observable<User> {
    // This is a mock implementation. In a real app, this would call an API
    const user: User = {
      id: '1',
      email: email,
      firstName: firstName,
      lastName: lastName,
      isAuthenticated: true
    };
    
    return of(user).pipe(
      delay(1000), // Simulate API delay
      tap(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}