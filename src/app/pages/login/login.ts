import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  username = '';
  password = '';

  errorMessage = '';

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  login(): void {

    this.errorMessage = '';

    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter username and password.';
      return;
    }

    this.auth.login(this.username, this.password).subscribe({

      next: (response) => {

        console.log('Login successful:', response);

        localStorage.setItem('token', response.token);

        this.router.navigate(['/restaurants']);
      },

      error: (error) => {

        console.error('Login failed:', error);

        this.errorMessage =
          error?.error?.message ||
          'Invalid username or password.';
      }
    });
  }
}