import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
    const loaderService = inject(LoaderService);


  const cloned = token
    ? req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) })
    : req;

    loaderService.show(); 

    return next(cloned).pipe(
      finalize(() => loaderService.hide())   // ✅ STOP LOADER
    );
};
