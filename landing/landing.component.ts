import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LibraryService, User } from '../libraryservice.service';
 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  myForm: FormGroup;
  msg: string = '';
  errorColor: string = '';
 
  constructor(private router: Router, private libraryService: LibraryService) {
    this.myForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }
 
  ngOnInit(): void {
    this.myForm.reset();
    this.msg = '';
    this.errorColor = '';
  }
 
  validate(): void {
    const { userName, password } = this.myForm.value;
 
    if (this.myForm.valid) {
      this.libraryService.getUsers().subscribe({
        next: (users: User[]) => {
          const user = users.find(u => u.userName === userName && u.password === password);
          if (user) {
            // ✅ Store username in localStorage
            localStorage.setItem('userName', user.userName);
 
       
            this.msg = 'Successfully Logged In!';
            this.errorColor = 'green';
 
            setTimeout(() => {
              this.router.navigate(['/home']);
              this.myForm.reset();
            }, 1000);
          } else {
            this.msg = 'Invalid Username or Password';
            this.errorColor = 'red';
          }
        },
        error: () => {
          this.msg = 'Error fetching user data';
          this.errorColor = 'red';
        }
      });
    } else {
      this.msg = 'Please fill out the form correctly';
      this.errorColor = 'orange';
    }
  }
}
 
 