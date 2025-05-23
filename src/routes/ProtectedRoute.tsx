
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute = ({ 
  children, 
  allowedRoles = [] 
}: { 
  children: JSX.Element, 
  allowedRoles?: Array<string> 
}) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  
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
