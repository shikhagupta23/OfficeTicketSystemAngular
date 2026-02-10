import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
    @Input() isOpen = true;

    private router = inject(Router);
    logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
