import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  const cloned = token
    ? req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) })
    : req;

  return next(cloned);
};
