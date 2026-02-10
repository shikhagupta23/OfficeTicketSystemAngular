import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    CommonModule,
    RouterModule,
    RouterOutlet
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  isSidebarOpen = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
