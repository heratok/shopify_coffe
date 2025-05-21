import { Injectable } from "@angular/core";
import { Observable, from, BehaviorSubject, tap } from "rxjs";
import { SupabaseService } from "./supabase.service";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor(private supabaseService: SupabaseService) {
    this.initializeUser();
  }

  private async initializeUser() {
    const session = await this.supabaseService.getSession();
    if (session) {
      const userData = session.user;
      this.currentUserSubject.next({
        id: userData.id,
        email: userData.email || "",
        firstName:
          (userData.user_metadata as { first_name?: string })?.first_name || "",
        lastName:
          (userData.user_metadata as { last_name?: string })?.last_name || "",
        isAuthenticated: true,
      });
    }
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return from(this.supabaseService.signIn(email, password)).pipe(
      tap(({ user }) => {
        if (user) {
          this.currentUserSubject.next({
            id: user.id,
            email: user.email || "",
            firstName:
              (user.user_metadata as { first_name?: string })?.first_name || "",
            lastName:
              (user.user_metadata as { last_name?: string })?.last_name || "",
            isAuthenticated: true,
          });
        }
      })
    );
  }

  register(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Observable<any> {
    return from(
      this.supabaseService.signUp(email, password, firstName, lastName)
    );
  }

  logout(): Observable<void> {
    return from(this.supabaseService.signOut()).pipe(
      tap(() => {
        this.currentUserSubject.next(null);
      })
    );
  }
}
