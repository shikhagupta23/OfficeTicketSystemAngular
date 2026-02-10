import { Component, inject } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.scss'
})
export class EmployeeDashboardComponent {
  stats: any;
  loggedInUserRole: string | null = null;
  private authService = inject(AuthService);

  private dashboardService = inject(DashboardService);

    ngOnInit(): void {
      this.loggedInUserRole = this.authService.getRole();
      this.loadStats();
  }

  loadStats() {
    this.dashboardService.getStats().subscribe({
      next: res => this.stats = res,
      error: err => console.error(err)
    });
  }
}
