import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('HTTP Error:', error);
      let erorMessage = error.error?.message || 'Unknown error';
      if (error.status === 0) {
        console.error('Network error');
        erorMessage = 'Network error: Please check your internet connection.';
      }

      if (error.status === 401) {
        erorMessage = 'Unauthorized: You do not have permission to access this resource.';
      }

      if (error.status === 500) {
        erorMessage = 'Server error: An error occurred on the server. Please try again later.';
      }

      return throwError(() => new Error(erorMessage));
    }),
  );
};
