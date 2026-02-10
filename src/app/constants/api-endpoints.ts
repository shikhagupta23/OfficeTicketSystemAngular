export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: 'https://officeticketsystemdotnet-production.up.railway.app/api/AuthApi/login'
  },
  TICKET: {
    RAISE: 'https://localhost:7166/api/TicketAPI/raise',
    MY_TICKETS: 'https://localhost:7166/api/TicketAPI',
    GET_ADMINS: 'https://localhost:7166/api/TicketAPI/admins',
    ASSIGN_TICKET: 'https://localhost:7166/api/TicketAPI/assign-ticket',
    RESOLVE: 'https://localhost:7166/api/TicketAPI/resolve'  },

  DASHBOARD: {
    STATS: 'https://localhost:7166/api/dashboard/stats'
  }
};
