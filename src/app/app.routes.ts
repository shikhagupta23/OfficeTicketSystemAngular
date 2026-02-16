import { Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { EmployeeDashboardComponent } from "./components/employee/employee-dashboard/employee-dashboard.component";
import { LayoutComponent } from "./components/layout/layout/layout.component";
import { RaiseTicketComponent } from "./components/employee/raise-ticket/raise-ticket.component";
import { TicketHistoryComponent } from "./components/common/ticket-history/ticket-history/ticket-history.component";

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // <-- default route
  { path: 'login', component: LoginComponent },
  {
    path: 'employee',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: EmployeeDashboardComponent },
      { path: 'raise-ticket', component: RaiseTicketComponent }
    ]
  },
  {
    path: 'ticket',
    component: LayoutComponent,
    children: [
      { path: 'history', component: TicketHistoryComponent }
    ]
  },
  { path: '**', redirectTo: 'login' } // <-- fallback route
];
