import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getCurrentUser()) {
    return true;
  }

  // หากไม่ได้เข้าสู่ระบบให้เด้งกลับไปที่หน้า login
  router.navigate(['/login']);
  return false;
};
