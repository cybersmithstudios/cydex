import { useAuth } from '../contexts/AuthContext';
import { useLocation } from 'react-router-dom';

export const useShowWhatsApp = () => {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  // List of paths where WhatsApp should be hidden when authenticated
  const protectedPaths = [
    '/customer',
    '/vendor',
    '/rider',
    '/admin'
  ];

  // Check if current path starts with any of the protected paths
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

  // Show WhatsApp only if user is not authenticated or not on a protected path
  return !isAuthenticated || !isProtectedPath;
}; 