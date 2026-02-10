import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../constants/api-endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    );
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      // JWT payload is Base64Url encoded
      const payload = token.split('.')[1];
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      ).join(''));

      const decoded = JSON.parse(jsonPayload);
      console.log('JWT decoded payload:', decoded); // 🔍 debug

      // adjust based on your backend claim
      return decoded.role || decoded.Role || decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
    } catch (err) {
      console.error('Invalid JWT token', err);
      return null;
    }
  }

  getUserName(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      // Directly read the name claim from your JWT
      return decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || null;
    } catch (err) {
      console.error('Invalid JWT token', err);
      return null;
    }
  }

  logout() {
    localStorage.clear();
  }
}

/* Interfaces (can move to models folder later) */
export interface LoginRequest {
  userId: string;
  password: string;
}

export interface LoginResponse {
  isSuccess: boolean;
  message: string;
  data: {
    token: string;
    userId: string;
    email: string;
    role: string;
  };
}
function jwt_decode(token: string): any {
  throw new Error('Function not implemented.');
}

