import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, of, pipe, tap } from 'rxjs';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../models/auth';
import { response } from 'express';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private urlApi = 'http://localhost:8080/auth';
  private userSubject = new BehaviorSubject<Usuario | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    this.restore();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private restore(): void {
    if (!this.isBrowser) {
      return;
    }

    const userData = localStorage.getItem('usuario');
    if (userData) {
      this.userSubject.next(JSON.parse(userData));
    }
  }

  login(nombre: string, contrasenia: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.urlApi}/login`, { nombre, contrasenia })
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('usuario', JSON.stringify(res.usuario));
          this.userSubject.next(res.usuario);
        })
      );
  }

  me() {
    return this.http.get<Usuario>(`${this.urlApi}/me`).pipe(
      tap(user => {
        this.userSubject.next(user);
      })
    );
  }

  logoutServer(): Observable<any> {
    if (!this.isBrowser) {
      this.userSubject.next(null);
      return of(null);
    }
    return this.http.post(`${this.urlApi}/logout`, {}).pipe(
      tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        this.userSubject.next(null);
      })
    );
  }

  logout() {
    if (!this.isBrowser) return;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.userSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  register(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.urlApi}/register`, usuario);
  }

}
