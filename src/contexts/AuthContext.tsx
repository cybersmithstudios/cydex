import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService, { LoginCredentials, RegisterData } from '@/services/authService';

export type UserRole = 'CUSTOMER' | 'ADMIN' | 'RIDER' | 'VENDOR';

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  changePassword: (email: string, code: string, password: string) => Promise<void>;
  verifyEmail: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authService = AuthService.getInstance();

  useEffect(() => {
    // Check for existing session on mount
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser({
        ...currentUser,
        role: currentUser.role as UserRole
      });
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      setUser({
        ...response.user,
        role: response.user.role as UserRole
      });
      setIsAuthenticated(true);
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      const [firstName, ...lastNameParts] = name.split(' ');
      const lastName = lastNameParts.join(' ');
      
      const registerData: RegisterData = {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        role,
        password_confirmation: password
      };

      const response = await authService.register(registerData);
      setUser({
        ...response.user,
        role: response.user.role as UserRole
      });
      setIsAuthenticated(true);
    } catch (error: any) {
      throw new Error(error.message || 'Registration failed');
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const resetPassword = async (email: string) => {
    try {
      await authService.resetPassword(email);
    } catch (error: any) {
      throw new Error(error.message || 'Password reset failed');
    }
  };

  const changePassword = async (email: string, code: string, password: string) => {
    try {
      await authService.changePassword(email, code, password);
    } catch (error: any) {
      throw new Error(error.message || 'Password change failed');
    }
  };

  const verifyEmail = async (email: string) => {
    try {
      await authService.verifyEmail(email);
    } catch (error: any) {
      throw new Error(error.message || 'Email verification failed');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        resetPassword,
        changePassword,
        verifyEmail
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
