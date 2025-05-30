
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import LoadingDisplay from '@/components/ui/LoadingDisplay';

export const ProtectedRoute = ({ 
  children, 
  allowedRoles = [] 
}: { 
  children: JSX.Element, 
  allowedRoles?: Array<string> 
}) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();
  
  // Show loading only for a reasonable time
  if (loading) {
    return <LoadingDisplay fullScreen message="Checking authentication..." size="md" />;
  }
  
  if (!isAuthenticated || !user) {
    // Pass only the pathname, search and hash as a string to avoid the Location object serialization issue
    return <Navigate to="/auth" state={{ from: location.pathname + location.search }} replace />;
  }
  
  // Check role if allowedRoles is provided and not empty
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect to dashboard specific to their role
    const rolePath = user.role.toLowerCase();
    return <Navigate to={`/${rolePath}`} replace />;
  }
  
  return children;
};
