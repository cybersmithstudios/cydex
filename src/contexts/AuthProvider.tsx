
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { AuthContext } from './AuthContext';
import { User, UserRole } from '../types/auth.types';
import { SESSION_TIMEOUT } from '../constants/auth.constants';
import { supabase } from '../lib/supabase';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionExpiry, setSessionExpiry] = useState<number | null>(null);
  const [loginAttempts, setLoginAttempts] = useState<{[key: string]: {count: number, lastAttempt: number}}>({});

  // Initialize session from Supabase
  useEffect(() => {
    const initSession = async () => {
      setLoading(true);
      
      // Check if we have a session
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error loading session:', error);
        setLoading(false);
        return;
      }
      
      if (session) {
        await fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    };
    
    initSession();
    
    // Listen for authentication changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        await fetchUserProfile(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setSessionExpiry(null);
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch user profile from Supabase
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        throw error;
      }
      
      if (profile) {
        const userData: User = {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          role: profile.role as UserRole,
          avatar: profile.avatar || undefined,
          verified: profile.verified,
          mfaEnabled: profile.mfa_enabled || undefined,
          lastActive: profile.last_active || undefined,
          carbonCredits: profile.carbon_credits || undefined
        };
        
        setUser(userData);
        
        // Set session expiry
        const newExpiry = Date.now() + SESSION_TIMEOUT;
        setSessionExpiry(newExpiry);
        localStorage.setItem('cydexSessionExpiry', newExpiry.toString());
        
        // Update last active timestamp
        await supabase
          .from('profiles')
          .update({ last_active: new Date().toISOString() })
          .eq('id', userId);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast.error('Failed to load user profile');
    } finally {
      setLoading(false);
    }
  };

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
    
    // Update last active timestamp in Supabase
    try {
      await supabase
        .from('profiles')
        .update({ last_active: new Date().toISOString() })
        .eq('id', user.id);
    } catch (error) {
      console.error('Error updating last active timestamp:', error);
    }
  };

  // Login function with Supabase
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Check login attempts
      const userAttempts = loginAttempts[email] || { count: 0, lastAttempt: 0 };
      
      // If more than 5 attempts in the last 15 minutes, block login
      if (userAttempts.count >= 5 && Date.now() - userAttempts.lastAttempt < 15 * 60 * 1000) {
        throw new Error('Too many login attempts. Please try again later.');
      }
      
      // Sign in with Supabase
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        // Increment login attempts
        setLoginAttempts(prev => ({
          ...prev,
          [email]: { count: (prev[email]?.count || 0) + 1, lastAttempt: Date.now() }
        }));
        
        throw error;
      }
      
      // Reset login attempts on successful login
      setLoginAttempts(prev => ({ ...prev, [email]: { count: 0, lastAttempt: Date.now() } }));
      toast.success(`Welcome back!`);
      
    } catch (error: any) {
      const message = error.message || 'Login failed';
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register function with Supabase
  const register = async (name: string, email: string, password: string, role: UserRole, additionalInfo?: any) => {
    setLoading(true);
    try {
      // Register with Supabase
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
            ...additionalInfo
          }
        }
      });
      
      if (error) {
        throw error;
      }
      
      toast.success('Registration successful! Please check your email to verify your account.');
      
    } catch (error: any) {
      const message = error.message || 'Registration failed';
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
      // In a real app, we would verify the token with Supabase
      // For this demo, we'll just return true
      toast.success('Email verified successfully! You can now log in.');
      return true;
    } catch (error) {
      toast.error('Email verification failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Password reset request with Supabase
  const resetPassword = async (email: string): Promise<void> => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });
      
      if (error) {
        throw error;
      }
      
      toast.success('Password reset link sent to your email.');
    } catch (error: any) {
      const message = error.message || 'Password reset failed';
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update password with Supabase
  const updatePassword = async (token: string, newPassword: string): Promise<boolean> => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      
      if (error) {
        throw error;
      }
      
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
      // In a real app, we would enable MFA with Supabase
      // For this demo, we'll just update the user object
      
      // Update user with MFA enabled
      await supabase
        .from('profiles')
        .update({ mfa_enabled: true })
        .eq('id', user.id);
      
      const updatedUser = { ...user, mfaEnabled: true };
      setUser(updatedUser);
      
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
      // For demo purposes, any 6-digit code is valid
      if (code.length === 6 && /^\d+$/.test(code)) {
        toast.success('MFA verification successful!');
        return true;
      }
      
      throw new Error('Invalid verification code');
    } catch (error: any) {
      const message = error.message || 'MFA verification failed';
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function with Supabase
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('cydexSessionExpiry');
      setUser(null);
      setSessionExpiry(null);
      toast.info('You have been logged out');
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Failed to log out');
    }
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
