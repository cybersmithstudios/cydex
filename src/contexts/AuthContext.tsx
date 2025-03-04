
import { createContext, useContext } from 'react';
import { AuthContextType } from '../types/auth.types';

// Create the context with a default undefined value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Re-export from the provider file
export { AuthProvider } from './AuthProvider';
export type { UserRole, User } from '../types/auth.types';
