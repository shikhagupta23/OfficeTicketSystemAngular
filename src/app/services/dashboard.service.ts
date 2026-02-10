import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);

  getStats(): Observable<any> {
    return this.http.get(API_ENDPOINTS.DASHBOARD.STATS);
  }
}
