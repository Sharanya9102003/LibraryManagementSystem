import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
 
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userName= localStorage.getItem('userName');
  // console.log(userName);
  if (userName) {
 
 
    // router.navigate(['']);
    return true;
  } else {
    router.navigate(['']);
    return false;
 
  }
};
 
 
 
 
