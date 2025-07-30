``
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
 
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  userName: string | null = '';
 
 
  constructor(private router: Router) {}
 
  ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
    console.log('Username from localStorage:', this.userName);
  }
 
  logout(): void {
    localStorage.removeItem('userName');
    this.router.navigate(['']);
  }
}
 
 ``