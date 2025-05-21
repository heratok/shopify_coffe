import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, Session } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    if (!environment.supabaseUrl || !environment.supabaseAnonKey) {
      throw new Error('Las variables de entorno de Supabase no están configuradas correctamente');
    }
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );
  }

  async getSession(): Promise<Session | null> {
    const { data: { session }, error } = await this.supabase.auth.getSession();
    if (error) throw error;
    return session;
  }

  async signUp(email: string, password: string, firstName: string, lastName: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName
        }
      }
    });
    
    if (error) throw error;
    return data;
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    return data;
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }
}