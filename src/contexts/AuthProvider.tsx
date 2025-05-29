
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { AuthContext } from './AuthContext';
import { User, UserRole, AuthContextType } from '../types/auth.types';
import { SESSION_TIMEOUT } from '../constants/auth.constants';
import LoadingDisplay from '@/components/ui/LoadingDisplay';
import { debugAuthState } from '../utils/debugUtils';
import AuthService from '@/services/authService';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [sessionExpiry, setSessionExpiry] = useState<number | null>(null);
  const [loginAttempts, setLoginAttempts] = useState<{[key: string]: {count: number, lastAttempt: number}}>({});

  const authService = AuthService.getInstance();

  // Global timeout to prevent infinite loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) {
        console.warn('Global loading timeout reached after 15 seconds, forcing loading to false');
        setLoading(false);
        // Clear any potentially stale auth data
        if (!user) {
          localStorage.removeItem('cydexSessionExpiry');
        }
      }
    }, 15000); // 15 second global timeout

    return () => clearTimeout(timeout);
  }, [loading, user]);

  // Helper function to safely set loading with timeout
  const safeSetLoading = (isLoading: boolean, timeoutMs = 10000) => {
    setLoading(isLoading);
    
    if (isLoading) {
      // Set a timeout to prevent infinite loading
      const timeout = setTimeout(() => {
        console.warn('Loading timeout reached, forcing loading to false');
        setLoading(false);
      }, timeoutMs);
      
      return () => clearTimeout(timeout);
    }
  };

  // Helper function to clear all auth state
  const clearAuthState = () => {
    setUser(null);
    setSessionExpiry(null);
    setLoading(false);
    setLoggingOut(false);
    localStorage.removeItem('cydexSessionExpiry');
  };

  // Initialize session from backend
  useEffect(() => {
    const initSession = async () => {
      try {
        safeSetLoading(true, 8000); // 8 second timeout for initial session check
        
        // Check if we have a stored user and valid token
        const currentUser = authService.getCurrentUser();
        const token = authService.getToken();
        
        if (currentUser && token) {
          // Verify token is still valid by making a test request
          try {
            // We can use any authenticated endpoint to verify the token
            // For now, we'll just trust the stored user data
            const userData: User = {
              id: currentUser.id,
              name: `${currentUser.first_name} ${currentUser.last_name}`,
              email: currentUser.email,
              role: currentUser.role as UserRole,
              verified: true // Default for backend auth
            };
            
            setUser(userData);
            
            // Set session expiry
            const newExpiry = Date.now() + SESSION_TIMEOUT;
            setSessionExpiry(newExpiry);
            localStorage.setItem('cydexSessionExpiry', newExpiry.toString());
            
            console.log('Session restored from localStorage:', userData);
          } catch (error) {
            console.error('Token validation failed:', error);
            authService.logout();
            clearAuthState();
          }
        } else {
          clearAuthState();
        }
      } catch (error) {
        console.error('Session initialization error:', error);
        debugAuthState();
        clearAuthState();
      } finally {
        setLoading(false);
      }
    };
    
    initSession();
  }, []);

  // Check for session timeout
  useEffect(() => {
    if (!user || !sessionExpiry) return;
    
    const intervalId = setInterval(() => {
      if (isSessionExpired()) {
        logout();
        toast.info("Your session has expired due to inactivity. Please log in again.");
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(intervalId);
  }, [user, sessionExpiry]);

  // Update last active timestamp on user interactions
  useEffect(() => {
    if (!user) return;
    
    const updateActivity = () => {
      refreshSession();
    };
    
    window.addEventListener('click', updateActivity);
    window.addEventListener('keypress', updateActivity);
    
    return () => {
      window.removeEventListener('click', updateActivity);
      window.removeEventListener('keypress', updateActivity);
    };
  }, [user]);

  const isSessionExpired = () => {
    if (!sessionExpiry) return true;
    return Date.now() > sessionExpiry;
  };

  const refreshSession = async () => {
    if (!user) return;
    
    const newExpiry = Date.now() + SESSION_TIMEOUT;
    setSessionExpiry(newExpiry);
    localStorage.setItem('cydexSessionExpiry', newExpiry.toString());
  };

  // Login function with backend API
  const login = async (email: string, password: string) => {
    console.log('Login attempt for:', email);
    setLoading(true);
    try {
      // Check login attempts
      const userAttempts = loginAttempts[email] || { count: 0, lastAttempt: 0 };
      
      // If more than 5 attempts in the last 15 minutes, block login
      if (userAttempts.count >= 5 && Date.now() - userAttempts.lastAttempt < 15 * 60 * 1000) {
        throw new Error('Too many login attempts. Please try again later.');
      }
      
      // Use backend auth service
      const response = await authService.login({ email, password });
      
      const userData: User = {
        id: response.user.id,
        name: `${response.user.first_name} ${response.user.last_name}`,
        email: response.user.email,
        role: response.user.role as UserRole,
        verified: true // Default for backend auth
      };
      
      setUser(userData);
      
      // Set session expiry
      const newExpiry = Date.now() + SESSION_TIMEOUT;
      setSessionExpiry(newExpiry);
      localStorage.setItem('cydexSessionExpiry', newExpiry.toString());
      
      console.log('Login successful for user:', response.user.id);
      
      // Reset login attempts on successful login
      setLoginAttempts(prev => ({ ...prev, [email]: { count: 0, lastAttempt: Date.now() } }));
      toast.success(`Welcome back, ${userData.name}!`);
      
    } catch (error: any) {
      // Increment login attempts
      setLoginAttempts(prev => ({
        ...prev,
        [email]: { count: (prev[email]?.count || 0) + 1, lastAttempt: Date.now() }
      }));
      
      const message = error.message || 'Login failed';
      console.error('Login error:', message);
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register function with backend API
  const register = async (name: string, email: string, password: string, role: UserRole, additionalInfo?: any) => {
    setLoading(true);
    try {
      const [firstName, ...lastNameParts] = name.split(' ');
      const lastName = lastNameParts.join(' ') || '';
      
      const registerData = {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        role: role.toUpperCase() as any, // Backend expects uppercase roles
        password_confirmation: password,
        ...additionalInfo
      };
      
      const response = await authService.register(registerData);
      
      const userData: User = {
        id: response.user.id,
        name: `${response.user.first_name} ${response.user.last_name}`,
        email: response.user.email,
        role: response.user.role.toLowerCase() as UserRole,
        verified: true // Default for backend auth
      };
      
      setUser(userData);
      
      // Set session expiry
      const newExpiry = Date.now() + SESSION_TIMEOUT;
      setSessionExpiry(newExpiry);
      localStorage.setItem('cydexSessionExpiry', newExpiry.toString());
      
      toast.success('Registration successful! Welcome to Cydex!');
      
    } catch (error: any) {
      const message = error.message || 'Registration failed';
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Email verification function
  const verifyEmail = async (email: string): Promise<void> => {
    setLoading(true);
    try {
      await authService.verifyEmail(email);
      toast.success('Email verification sent! Please check your email.');
    } catch (error: any) {
      const message = error.message || 'Email verification failed';
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Password reset request with backend API
  const resetPassword = async (email: string): Promise<void> => {
    setLoading(true);
    try {
      await authService.resetPassword(email);
      toast.success('Password reset code sent to your email.');
    } catch (error: any) {
      const message = error.message || 'Password reset failed';
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Change password function with backend API
  const changePassword = async (email: string, code: string, newPassword: string): Promise<void> => {
    setLoading(true);
    try {
      await authService.changePassword(email, code, newPassword);
      toast.success('Password changed successfully!');
    } catch (error: any) {
      const message = error.message || 'Password change failed';
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update password function
  const updatePassword = async (token: string, newPassword: string): Promise<boolean> => {
    setLoading(true);
    try {
      // For backend implementation, we'd need a specific endpoint for this
      // For now, we'll return false to indicate it's not implemented
      toast.error('Password update not implemented yet.');
      return false;
    } catch (error) {
      toast.error('Password update failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Enable Multi-Factor Authentication
  const enableMFA = async (): Promise<void> => {
    if (!user) {
      toast.error('You must be logged in to enable MFA.');
      return;
    }
    
    setLoading(true);
    try {
      // MFA would need to be implemented on the backend
      // For now, we'll just show a message
      toast.info('MFA feature will be available soon.');
    } catch (error) {
      toast.error('Failed to enable MFA. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Verify MFA code
  const verifyMFA = async (code: string): Promise<boolean> => {
    setLoading(true);
    try {
      // MFA verification would need backend implementation
      // For now, we'll just return false
      toast.info('MFA verification will be available soon.');
      return false;
    } catch (error: any) {
      const message = error.message || 'MFA verification failed';
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function with backend
  const logout = async () => {
    try {
      setLoggingOut(true);
      authService.logout();
      clearAuthState();
      toast.info('You have been logged out');
      
      // Force page navigation to home
      window.location.href = '/';
    } catch (error) {
      console.error('Error during logout:', error);
      // Even if logout fails, clear local state
      clearAuthState();
      toast.error('Failed to log out completely, but local session cleared');
      // Still redirect to home
      window.location.href = '/';
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    verifyEmail,
    resetPassword,
    updatePassword,
    enableMFA,
    verifyMFA,
    isSessionExpired,
    refreshSession,
    changePassword
  };

  if (loading && !user) {
    return <LoadingDisplay fullScreen message="Loading..." size="lg" />;
  }

  if (loggingOut) {
    return <LoadingDisplay fullScreen message="Signing out..." size="lg" />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
