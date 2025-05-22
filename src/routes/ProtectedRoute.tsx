
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute = ({ 
  children, 
  allowedRoles = [] 
}: { 
  children: JSX.Element, 
  allowedRoles?: Array<string> 
}) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    // Redirect them to the auth page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/auth" state={{ from: window.location }} replace />;
  }
  
  // Check role if allowedRoles is provided and not empty
  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    // Redirect to dashboard specific to their role
    return <Navigate to={`/${user.role}`} replace />;
  }
  
  return children;
};
