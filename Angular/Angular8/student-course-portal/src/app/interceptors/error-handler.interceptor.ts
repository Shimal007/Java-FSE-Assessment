import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const router = new Router();

  return next(req).pipe(
    catchError(error => {
      if (error.status === 401) {
        console.error('Unauthorized error:', error);
        router.navigate(['/']);
      } else if (error.status === 500) {
        console.error('Server error:', error);
      }

      return throwError(() => error);
    })
  );
};
