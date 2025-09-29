import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Ensure cookies (sessions) are sent
  const cloned = req.clone({ withCredentials: true });
  return next(cloned);
};
