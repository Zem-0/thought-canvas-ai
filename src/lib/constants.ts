export const BASE_URL = import.meta.env.VITE_BASE_URL || window.location.origin;

// Auth related routes
export const ROUTES = {
  DASHBOARD: '/dashboard',
  SIGN_IN: '/sign-in',
  // Add other routes as needed
} as const; 