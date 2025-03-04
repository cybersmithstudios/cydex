
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { AuthContext } from './AuthContext';
import { User, UserRole } from '../types/auth.types';
import { mockUsers } from '../data/mockUsers';
import { SESSION_TIMEOUT } from '../constants/auth.constants';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionExpiry, setSessionExpiry] = useState<number | null>(null);
  const [loginAttempts, setLoginAttempts] = useState<{[key: string]: {count: number, lastAttempt: number}}>({});

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('cydexUser');
    const storedExpiry = localStorage.getItem('cydexSessionExpiry');
    
    if (storedUser && storedExpiry) {
      const expiry = parseInt(storedExpiry, 10);
      if (expiry > Date.now()) {
        setUser(JSON.parse(storedUser));
        setSessionExpiry(expiry);
        // Refresh session when loaded
        refreshSession();
      } else {
        // Session expired
        logout();
        toast.info("Your session has expired. Please log in again.");
      }
    }
    setLoading(false);
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

  const refreshSession = () => {
    if (!user) return;
    
    const newExpiry = Date.now() + SESSION_TIMEOUT;
    setSessionExpiry(newExpiry);
    localStorage.setItem('cydexSessionExpiry', newExpiry.toString());
    
    // Update last active timestamp
    const updatedUser = { ...user, lastActive: new Date().toISOString() };
    setUser(updatedUser);
    localStorage.setItem('cydexUser', JSON.stringify(updatedUser));
  };

  // Login function with brute force protection
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Check login attempts
      const userAttempts = loginAttempts[email] || { count: 0, lastAttempt: 0 };
      
      // If more than 5 attempts in the last 15 minutes, block login
      if (userAttempts.count >= 5 && Date.now() - userAttempts.lastAttempt < 15 * 60 * 1000) {
        throw new Error('Too many login attempts. Please try again later.');
      }
      
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in mock data
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (foundUser && password === 'password') { // Simple check for demo
        // Reset login attempts on successful login
        setLoginAttempts(prev => ({ ...prev, [email]: { count: 0, lastAttempt: Date.now() } }));
        
        // Set session expiry
        const expiry = Date.now() + SESSION_TIMEOUT;
        setSessionExpiry(expiry);
        localStorage.setItem('cydexSessionExpiry', expiry.toString());
        
        // Update user and save to localStorage
        const updatedUser = { ...foundUser, lastActive: new Date().toISOString() };
        setUser(updatedUser);
        localStorage.setItem('cydexUser', JSON.stringify(updatedUser));
        
        toast.success(`Welcome back, ${foundUser.name}!`);
      } else {
        // Increment login attempts
        setLoginAttempts(prev => ({
          ...prev,
          [email]: { count: (prev[email]?.count || 0) + 1, lastAttempt: Date.now() }
        }));
        
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register function with additional info for different roles
  const register = async (name: string, email: string, password: string, role: UserRole, additionalInfo?: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      if (mockUsers.some(u => u.email === email)) {
        throw new Error('Email already exists');
      }
      
      // Create new user
      const newUser: User = {
        id: (mockUsers.length + 1).toString(),
        name,
        email,
        role,
        avatar: `https://api.dicebear.com/7.x/personas/svg?seed=${email}`,
        verified: false, // Requires verification
        carbonCredits: 100 // Starting credits
      };
      
      // Add role-specific fields
      if (additionalInfo) {
        Object.assign(newUser, additionalInfo);
      }
      
      // Add to mock users (in a real app, this would be an API call)
      mockUsers.push(newUser);
      
      // In a real app, we would send a verification email here
      
      toast.success('Registration successful! Please check your email to verify your account.');
      
      // For demo purposes, auto-verify the account
      setTimeout(() => {
        const userIndex = mockUsers.findIndex(u => u.email === email);
        if (userIndex !== -1) {
          mockUsers[userIndex].verified = true;
        }
      }, 5000);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Email verification function
  const verifyEmail = async (token: string): Promise<boolean> => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, we would verify the token with the backend
      // For demo, we'll just return true
      toast.success('Email verified successfully! You can now log in.');
      return true;
    } catch (error) {
      toast.error('Email verification failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Password reset request
  const resetPassword = async (email: string): Promise<void> => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email exists
      const userExists = mockUsers.some(u => u.email === email);
      if (!userExists) {
        throw new Error('Email not found');
      }
      
      // In a real app, we would send a password reset email
      toast.success('Password reset link sent to your email.');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Password reset failed';
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update password with token
  const updatePassword = async (token: string, newPassword: string): Promise<boolean> => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, we would verify the token and update the password
      toast.success('Password updated successfully!');
      return true;
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user with MFA enabled
      const updatedUser = { ...user, mfaEnabled: true };
      setUser(updatedUser);
      localStorage.setItem('cydexUser', JSON.stringify(updatedUser));
      
      toast.success('Multi-Factor Authentication enabled successfully!');
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, any 6-digit code is valid
      if (code.length === 6 && /^\d+$/.test(code)) {
        toast.success('MFA verification successful!');
        return true;
      }
      
      throw new Error('Invalid verification code');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'MFA verification failed';
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('cydexUser');
    localStorage.removeItem('cydexSessionExpiry');
    setUser(null);
    setSessionExpiry(null);
    toast.info('You have been logged out');
  };

  const value = {
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
    refreshSession
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
