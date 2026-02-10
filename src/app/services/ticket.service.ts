import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private http = inject(HttpClient);

  getMyTickets(page: number, pageSize: number, search?: string): Observable<any> {
    const params: any = { page, pageSize };
    if (search?.trim()) params.search = search;
    return this.http.get(API_ENDPOINTS.TICKET.MY_TICKETS, { params });
  }

  raiseTicket(payload: any): Observable<any> {
    return this.http.post(API_ENDPOINTS.TICKET.RAISE, payload);
  }

  getAdmins(): Observable<any> {
    return this.http.get(API_ENDPOINTS.TICKET.GET_ADMINS);
  }

  assignTicket(payload: { ticketId: number, adminId: string }): Observable<any> {
    return this.http.post(API_ENDPOINTS.TICKET.ASSIGN_TICKET, payload);
  }

  resolveTicket(ticketId: number): Observable<any> {
    return this.http.put(`${API_ENDPOINTS.TICKET.RESOLVE}/${ticketId}`, null);
  }


}
