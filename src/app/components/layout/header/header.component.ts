import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  private authService = inject(AuthService);

  userName: string | null = null;
  userRole: string | null = null;

  ngOnInit() {
    this.userName = this.authService.getUserName();
    this.userRole = this.authService.getRole();
  }

  onToggle() {
    this.toggleSidebar.emit();
  }
}
