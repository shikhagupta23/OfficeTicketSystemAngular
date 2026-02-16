import { environment } from "../../environment/environment";

const BASE_URL = environment.baseUrl;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${BASE_URL}/api/AuthApi/login`
  },
  TICKET: {
    RAISE: `${BASE_URL}/api/TicketAPI/raise`,
    MY_TICKETS: `${BASE_URL}/api/TicketAPI`,
    GET_ADMINS: `${BASE_URL}/api/TicketAPI/admins`,
    ASSIGN_TICKET: `${BASE_URL}/api/TicketAPI/assign-ticket`,
    RESOLVE: `${BASE_URL}/api/TicketAPI/resolve`
  },

  DASHBOARD: {
    STATS: `${BASE_URL}/api/dashboard/stats`
  }

  // AUTH: {
  //   LOGIN: `${BASE_URL}/AuthApi/login`
  // },
  // TICKET: {
  //   RAISE: `${BASE_URL}/TicketAPI/raise`,
  //   MY_TICKETS: `${BASE_URL}/TicketAPI`,
  //   GET_ADMINS: `${BASE_URL}/TicketAPI/admins`,
  //   ASSIGN_TICKET: `${BASE_URL}/TicketAPI/assign-ticket`,
  //   RESOLVE: `${BASE_URL}/TicketAPI/resolve`  },

  // DASHBOARD: {
  //   STATS: `${BASE_URL}/dashboard/stats`
  // }
};
