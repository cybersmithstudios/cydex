<<<<<<< HEAD

import { Navigate, useLocation } from 'react-router-dom';
=======
import { Navigate } from 'react-router-dom';
>>>>>>> 18b9bac
import { useAuth } from '../contexts/AuthContext';
import LoadingDisplay from '@/components/ui/LoadingDisplay';

export const ProtectedRoute = ({ 
  children, 
  allowedRoles = [] 
}: { 
  children: JSX.Element, 
  allowedRoles?: Array<string> 
}) => {
<<<<<<< HEAD
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
=======
  const { isAuthenticated, user, loading } = useAuth();
  
  // Show loading only for a reasonable time
  if (loading) {
    return <LoadingDisplay fullScreen message="Checking authentication..." size="md" />;
  }
>>>>>>> 18b9bac
  
  if (!isAuthenticated) {
    // Pass only the pathname, search and hash as a string to avoid the Location object serialization issue
    return <Navigate to="/auth" state={{ from: location.pathname + location.search }} replace />;
  }
  
  // Check role if allowedRoles is provided and not empty
  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    // Redirect to dashboard specific to their role
    return <Navigate to={`/${user.role}`} replace />;
  }
  
  return children;
};
