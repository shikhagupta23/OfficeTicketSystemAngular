import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule  } from '@angular/common/http';
import Swal from 'sweetalert2';
import { TicketService } from '../../../services/ticket.service';
import { AuthService } from '../../../services/auth.service';
import { Select2Directive } from '../../../directives/select2.directive';

@Component({
  selector: 'app-raise-ticket',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule, Select2Directive],
  templateUrl: './raise-ticket.component.html',
  styleUrls: ['./raise-ticket.component.scss']
})
export class RaiseTicketComponent {

  private fb = inject(FormBuilder);
  private ticketService = inject(TicketService);
  private authService = inject(AuthService);

  showModal = false;
  tickets: any[] = [];
  currentPage = 1;
  pageSize = 6;
  totalPages = 0;
  searchText = '';
  loading = true;
  admins: any[] = [];
  selectedAdminId: string | null = null;
  loggedInUserRole: string | null = null;
  assigningTicketId: number | null = null;


  ngOnInit() {
    this.loggedInUserRole = this.authService.getRole();
    console.log(this.loggedInUserRole);
    this.loadTickets();
  }
  
  ticketForm = this.fb.group({
    title: ['', Validators.required],
    category: ['', Validators.required],
    priority: ['', Validators.required],
    description: ['', Validators.required]
  });

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadTickets();
  }

  onSearch() {
    this.currentPage = 1;
    this.loadTickets();
  }
  loadAdmins() {
  this.ticketService.getAdmins().subscribe({
    next: (res) => this.admins = res,
    error: () => Swal.fire('Error', 'Failed to load admins', 'error')
  });
}

  loadTickets() {
    this.loading = true;

    this.ticketService.getMyTickets(this.currentPage, this.pageSize, this.searchText)
      .subscribe({
      next: (res) => {
        this.tickets = res.dataList || [];
        this.currentPage = res.pageNumber;
        this.totalPages = res.totalPages;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        Swal.fire('Error', 'Failed to load tickets', 'error');
      }
    });
  }

  get paginatedTickets() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.tickets.slice(start, start + this.pageSize);
  }
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.ticketForm.reset();
  }

  submitTicket() {
    if (this.ticketForm.invalid) return;

    const payload = {
      title: this.ticketForm.value.title,
      description: this.ticketForm.value.description,
      priority: this.mapPriority(this.ticketForm.value.priority)
    };


      this.ticketService.raiseTicket(payload).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Ticket Raised 🎉',
          text: res?.message || 'Your ticket has been raised successfully',
          confirmButtonColor: '#3085d6'
        });

        this.closeModal();
        this.loadTickets();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: err?.error?.message || 'Something went wrong',
          confirmButtonColor: '#d33'
        });
      }
    });
  }

  openAssignDropdown(ticketId: number) {
    this.assigningTicketId = ticketId;
    this.selectedAdminId = null;
    this.loadAdmins();
  }

  assignTicket(ticketId: number) {
    if (!this.selectedAdminId) return;

    this.ticketService.assignTicket({ ticketId, adminId: this.selectedAdminId }).subscribe({
      next: (res) => {
        Swal.fire('Success', res?.message || 'Ticket assigned', 'success');
        this.assigningTicketId = null;
        this.loadTickets(); // reload tickets
      },
      error: (err) => Swal.fire('Error', err?.error?.message || 'Assignment failed', 'error')
    });
  }

  resolveTicket(ticketId: number) {
    // Send only ticketId; backend will mark it as Resolved
    this.ticketService.resolveTicket(ticketId).subscribe({
      next: (res) => {
        Swal.fire('Success', res?.message || 'Ticket marked as Resolved', 'success');
        this.loadTickets(); // refresh tickets
      },
      error: (err) => Swal.fire('Error', err?.error?.message || 'Failed to update status', 'error')
    });
  }



mapPriority(priority: string | null | undefined): number {
  switch (priority) {
    case 'Low': return 1;
    case 'Medium': return 2;
    case 'High': return 3;
    default: return 1;
  }
}

getStatusText(status: number): string {
  switch (status) {
    case 1: return 'Open';
    case 2: return 'InProgress';
    case 3: return 'Resolved';
    case 4: return 'Closed';
    default: return 'Unknown';
  }
}

getStatusClass(status: number): string {
  switch (status) {
    case 1: return 'open';
    case 2: return 'inprogress';
    case 3: return 'resolved';
    case 4: return 'closed';
    default: return '';
  }
}

getPriorityText(priority: number): string {
  switch (priority) {
    case 1: return 'Low';
    case 2: return 'Medium';
    case 3: return 'High';
    default: return 'Unknown';
  }
}

getPriorityClass(priority: number): string {
  switch (priority) {
    case 1: return 'low';
    case 2: return 'medium';
    case 3: return 'high';
    default: return '';
  }
}

}
