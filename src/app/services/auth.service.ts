import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly CURRENT_USER_KEY = 'current_user';
  private currentUserSubject = new BehaviorSubject<User | null>(this.loadUserFromStorage());

  public currentUser$ = this.currentUserSubject.asObservable();

  // Mock users
  private mockUsers: User[] = [
    { id: '1', email: 'admin@example.com', password: '123', name: 'Admin', role: 'admin' },
    { id: '2', email: 'doctor@example.com', password: '123', name: 'Dr. Smith', role: 'doctor' }
  ];

  constructor() { }

  private loadUserFromStorage(): User | null {
    const data = localStorage.getItem(this.CURRENT_USER_KEY);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  login(email: string, password: string): Observable<{ success: boolean; user?: User; message?: string }> {
    // Simulate API call delay
    const user = this.mockUsers.find(u => u.email === email && u.password === password);

    if (user) {
      const { password, ...userWithoutPassword } = user;
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
      this.currentUserSubject.next(userWithoutPassword as User);
      return of({ success: true, user: userWithoutPassword as User }).pipe(delay(500));
    }

    return of({ success: false, message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' }).pipe(delay(500));
  }

  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.getValue();
  }
}
