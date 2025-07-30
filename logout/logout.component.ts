import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: `<p>Logging out...</p>`
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) {
    
// localStorage.removeItem('userToken'); // or use AuthService
// this.router.navigate(['/landing']);

  }

  ngOnInit(): void {
    localStorage.removeItem('loggedInUser'); // Clear session or token
    this.router.navigate(['/landing']); // Redirect to login
  }
}
