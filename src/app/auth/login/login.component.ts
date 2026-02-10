import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private router = inject(Router);
  private authService = inject(AuthService);

  userId = '';
  password = '';

  login() {
    if (!this.userId || !this.password) {
      return;
    }

    this.authService.login({
      userId: this.userId,
      password: this.password
    }).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.authService.storeToken(res.data.token);
          this.router.navigate(['/employee/dashboard']);
        }
      },
      error: () => {
        alert('Invalid credentials');
      }
    });
  }

}
