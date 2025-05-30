
import { useAuth } from '../contexts/SupabaseAuthContext';
import { useLocation } from 'react-router-dom';

export const useShowWhatsApp = () => {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  // List of paths where WhatsApp should be hidden (all dashboard routes)
  const dashboardPaths = [
    '/customer',
    '/vendor', 
    '/rider',
    '/admin'
  ];

  // Check if current path starts with any of the dashboard paths
  const isDashboardPath = dashboardPaths.some(path => pathname.startsWith(path));

  // Hide WhatsApp on all dashboard pages regardless of authentication status
  // Show WhatsApp only on public routes
  return !isDashboardPath;
};
