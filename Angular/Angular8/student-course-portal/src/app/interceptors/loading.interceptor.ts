import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // Show loading indicator before sending the request
  loadingService.show();

  // finalize runs whether the Observable completes successfully or errors,
  // so it is the correct place to hide the loading indicator
  return next(req).pipe(
    finalize(() => loadingService.hide())
  );
};
