
import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { UsuarioToken } from 'src/app/Core/models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: UsuarioToken | null = null;
  private token: string | null = null;
  private tokenKey = 'auth_token';

  constructor(private cookieService: CookieService) {
    const storedToken = localStorage.getItem(this.tokenKey);
    if (storedToken) {
      this.setToken(storedToken);
    }
  }

  getUser(): UsuarioToken | null {
    return this.user;
  }

  isLoggedIn(): boolean {
    return !!this.user;
  }

  setToken(token: string): void {
    this.token = token;
    this.setUser(this.decryptToken(token));
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return this.token;
  }

  logout(): void {
    this.clearUserData();
  }

  private clearUserData(): void {
    this.cookieService.delete('.AspNetCore.Identity.Application');
    localStorage.removeItem(this.tokenKey);
    this.user = null;
    this.token = null;
  }

  private setUser(user: UsuarioToken): void {
    this.user = user;
  }

  private decryptToken(token: string): UsuarioToken{
    let decodedJWT = JSON.parse(window.atob(token.split('.')[1]));

    const user: UsuarioToken = {
      id : decodedJWT['jti'],
      isStaf : decodedJWT['IsStaff'],
      name: decodedJWT['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
    };

    return user
  }

}
