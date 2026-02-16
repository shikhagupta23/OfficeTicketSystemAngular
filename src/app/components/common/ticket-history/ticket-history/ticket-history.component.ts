import { Component, inject } from '@angular/core';
import { TicketService } from '../../../../services/ticket.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticket-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ticket-history.component.html',
  styleUrl: './ticket-history.component.scss'
})
export class TicketHistoryComponent {

  private ticketService = inject(TicketService);
  
  tickets: any[] = [];
  currentPage = 1;
  pageSize = 6;
  totalPages = 0;
  totalCount = 0;
  searchText = '';
  loading = false;

  ngOnInit(){
    this.loadTickets();
  }

  onSearch() {
    this.currentPage = 1;
    this.loadTickets();
  }

  loadTickets() {
    this.loading = true;

    this.ticketService.getMyTickets(this.currentPage, this.pageSize, this.searchText)
      .subscribe({
      next: (res) => {
        this.tickets = res.dataList || [];
        this.currentPage = res.pageNumber;
        this.totalPages = res.totalPages;
        this.totalCount = res.totalCount;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        Swal.fire('Error', 'Failed to load tickets', 'error');
      }
    });
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadTickets();
  }

  // STATUS TEXT
  getStatusText(status: number): string {
    switch (status) {
      case 1: return 'Open';
      case 2: return 'In Progress';
      case 3: return 'Resolved';
      case 4: return 'Closed';
      default: return 'Unknown';
    }
  }

  // PRIORITY TEXT
  getPriorityText(priority: number): string {
    switch (priority) {
      case 1: return 'Low';
      case 2: return 'Medium';
      case 3: return 'High';
      default: return 'Unknown';
    }
  }

  // STATUS COLOR CLASS
  getStatusClass(status: number): string {
    switch (status) {
      case 1: return 'open';
      case 2: return 'progress';
      case 3: return 'resolved';
      case 4: return 'closed';
      default: return '';
    }
  }

  // PRIORITY COLOR CLASS
  getPriorityClass(priority: number): string {
    switch (priority) {
      case 1: return 'low';
      case 2: return 'medium';
      case 3: return 'high';
      default: return '';
    }
  }

}
