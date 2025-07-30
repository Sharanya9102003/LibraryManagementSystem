import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LibraryService } from '../libraryservice.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  public msg: string = '';
  public errorColor: string = '';

  constructor(private fb: FormBuilder, private router: Router,private libraryService: LibraryService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatchValidator });
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  public register(): void {
    if (this.registerForm.valid) {
      const user = {
        userName: this.registerForm.value.userName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      };
  
      this.libraryService.registerUser(user).subscribe({
        next: () => {
          this.msg = 'Registration Successful!';
          this.errorColor = 'green';
          // localStorage.setItem('userName', this.registerForm.value.userName);

          setTimeout(() => {
            this.registerForm.reset();
            this.router.navigate(['']); // Redirect to login page
          }, 100);
        },
        error: () => {
          this.msg = 'Registration Failed!';
          this.errorColor = 'red';
        }
      });
    } else {
      this.msg = 'Please correct the errors in the form';
      this.errorColor = 'red';
    }
  }
  
}
