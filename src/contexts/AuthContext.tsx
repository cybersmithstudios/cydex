
import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService, { LoginCredentials, RegisterData } from '@/services/authService';
import { User, UserRole, AuthContextType } from '@/types/auth.types';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authService = AuthService.getInstance();

  useEffect(() => {
    // Check for existing session on mount
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser({
        id: currentUser.id,
        name: `${currentUser.first_name} ${currentUser.last_name}`,
        email: currentUser.email,
        role: currentUser.role as UserRole,
        verified: true // Default value for existing users
      });
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      setUser({
        id: response.user.id,
        name: `${response.user.first_name} ${response.user.last_name}`,
        email: response.user.email,
        role: response.user.role as UserRole,
        verified: true // Default for login
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
        id: response.user.id,
        name: `${response.user.first_name} ${response.user.last_name}`,
        email: response.user.email,
        role: response.user.role as UserRole,
        verified: true // Default for new registrations
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
        verifyEmail,
        loading: false,
        updatePassword: async () => false,
        enableMFA: async () => {},
        verifyMFA: async () => false,
        isSessionExpired: () => false,
        refreshSession: () => {}
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
