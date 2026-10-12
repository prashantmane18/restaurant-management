import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  username = '';
  password = '';
  confirmPassword = '';

  message = '';
  errorMessage = '';

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  register(): void {

    console.log('REGISTER BUTTON CLICKED');

    this.message = '';
    this.errorMessage = '';

    if (!this.username || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill all fields.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.auth.register(this.username, this.password).subscribe({
      next: (response) => {
        this.message = response.message;

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },

      error: (error) => {
        console.error('Registration failed:', error);

        this.errorMessage =
          error?.error?.message ||
          'Registration failed. Please try again.';
      }
    });
  }
}