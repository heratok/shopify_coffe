import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor() {
    // Eliminar lógica relacionada con Supabase
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return new Observable((observer) => {
      // Lógica de inicio de sesión simulada
      setTimeout(() => {
        const user = {
          id: "1",
          email: email,
          firstName: "John",
          lastName: "Doe",
          isAuthenticated: true,
        };
        this.currentUserSubject.next(user);
        observer.next(user);
        observer.complete();
      }, 1000);
    });
  }

  register(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Observable<any> {
    return new Observable((observer) => {
      // Lógica de registro simulada
      setTimeout(() => {
        const user = {
          id: "1",
          email: email,
          firstName: firstName,
          lastName: lastName,
          isAuthenticated: true,
        };
        this.currentUserSubject.next(user);
        observer.next(user);
        observer.complete();
      }, 1000);
    });
  }

  logout(): Observable<void> {
    return new Observable((observer) => {
      // Lógica de cierre de sesión simulada
      setTimeout(() => {
        this.currentUserSubject.next(null);
        observer.next();
        observer.complete();
      }, 1000);
    });
  }
}
