import { Component, inject, OnInit } from '@angular/core';
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
export class EmployeeDashboardComponent implements OnInit {

  stats: any;
  loggedInUserRole: string | null = null;
  userName: string | null = null;

  animatedTotal = 0;
  animatedOpen = 0;
  animatedInProgress = 0;
  animatedResolved = 0;

  private authService = inject(AuthService);
  private dashboardService = inject(DashboardService);

  ngOnInit(): void {
    this.loggedInUserRole = this.authService.getRole();
    this.userName = this.authService.getUserName();
    this.loadStats();
  }

  loadStats() {
    this.dashboardService.getStats().subscribe({
      next: (res) => {
        this.stats = res;

        if (this.stats) {
          this.animateValue(this.stats.total, val => this.animatedTotal = val);
          this.animateValue(this.stats.open, val => this.animatedOpen = val);
          this.animateValue(this.stats.inProgress, val => this.animatedInProgress = val);
          this.animateValue(this.stats.resolved, val => this.animatedResolved = val);
        }
      },
      error: (err) => console.error(err)
    });
  }

  animateValue(finalValue: number, setter: (val: number) => void) {

    if (!finalValue || finalValue <= 0) {
      setter(0);
      return;
    }

    let current = 0;
    const duration = 800;
    const increment = Math.ceil(finalValue / (duration / 20));

    const timer = setInterval(() => {
      current += increment;

      if (current >= finalValue) {
        clearInterval(timer);
        setter(finalValue);
      } else {
        setter(current);
      }
    }, 20);
  }
}
