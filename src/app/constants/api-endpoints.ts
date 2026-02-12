export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: 'https://officeticketsystemdotnet-production.up.railway.app/api/AuthApi/login'
  },
  TICKET: {
    RAISE: 'https://officeticketsystemdotnet-production.up.railway.app/api/TicketAPI/raise',
    MY_TICKETS: 'https://officeticketsystemdotnet-production.up.railway.app/api/TicketAPI',
    GET_ADMINS: 'https://officeticketsystemdotnet-production.up.railway.app/api/TicketAPI/admins',
    ASSIGN_TICKET: 'https://officeticketsystemdotnet-production.up.railway.app/api/TicketAPI/assign-ticket',
    RESOLVE: 'https://officeticketsystemdotnet-production.up.railway.app/api/TicketAPI/resolve'  },

  DASHBOARD: {
    STATS: 'https://officeticketsystemdotnet-production.up.railway.app/api/dashboard/stats'
  }
};
