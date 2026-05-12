import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = false;
  error = '';

  login() {
    this.isLoading = true;
    this.error = '';

    setTimeout(() => {
      this.authService.login();
      this.isLoading = false;
      const returnUrl = new URLSearchParams(window.location.search).get('returnUrl') || '/dashboard';
      this.router.navigateByUrl(returnUrl);
    }, 1000);
  }
}