
import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Session, User as SupabaseUser } from '@supabase/supabase-js';

// Define user roles
export type UserRole = 'customer' | 'rider' | 'vendor' | 'admin';

// Define user interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  verified: boolean;
  mfaEnabled?: boolean;
  lastActive?: string;
  carbonCredits?: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole, additionalInfo?: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  verifyEmail: (token: string) => Promise<boolean>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (token: string, newPassword: string) => Promise<boolean>;
  enableMFA: () => Promise<void>;
  verifyMFA: (code: string) => Promise<boolean>;
  isSessionExpired: () => boolean;
  refreshSession: () => void;
  session: Session | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Session timeout in milliseconds (30 minutes)
const SESSION_TIMEOUT = 30 * 60 * 1000;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionExpiry, setSessionExpiry] = useState<number | null>(null);
  const [loginAttempts, setLoginAttempts] = useState<{[key: string]: {count: number, lastAttempt: number}}>({});
  const [session, setSession] = useState<Session | null>(null);

  // Listen for auth state changes
  useEffect(() => {
    setLoading(true);
    
    // Set up supabase auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth state changed:', event, currentSession);
        if (currentSession) {
          setSession(currentSession);
          const { user: supabaseUser } = currentSession;
          
          // Fetch user profile from profiles table
          if (supabaseUser) {
            await fetchUserProfile(supabaseUser);
          }
        } else {
          setUser(null);
          setSession(null);
        }
        
        setLoading(false);
      }
    );

    // Check current session on initial load
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      console.log('Initial session check:', currentSession);
      if (currentSession) {
        setSession(currentSession);
        const { user: supabaseUser } = currentSession;
        
        // Fetch user profile from profiles table
        if (supabaseUser) {
          await fetchUserProfile(supabaseUser);
        }
      }
      
      setLoading(false);
    });

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch user profile from database
  const fetchUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();
        
      if (error) throw error;
      
      if (profile) {
        const userData: User = {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          role: profile.role,
          avatar: profile.avatar || `https://api.dicebear.com/7.x/personas/svg?seed=${profile.email}`,
          verified: profile.verified,
          mfaEnabled: profile.mfa_enabled,
          lastActive: profile.last_active,
          carbonCredits: profile.carbon_credits
        };
        
        setUser(userData);
        
        // Set session expiry
        const expiry = Date.now() + SESSION_TIMEOUT;
        setSessionExpiry(expiry);
        
        // Update last active timestamp
        updateLastActive(profile.id);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  // Update last active timestamp
  const updateLastActive = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          last_active: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);
        
      if (error) throw error;
    } catch (error) {
      console.error("Error updating last active:", error);
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

  const refreshSession = () => {
    if (!user) return;
    
    const newExpiry = Date.now() + SESSION_TIMEOUT;
    setSessionExpiry(newExpiry);
    
    // Update last active timestamp
    updateLastActive(user.id);
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
      
      toast.success('Logged in successfully!');
      
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string, role: UserRole, additionalInfo?: any) => {
    setLoading(true);
    try {
      // Create the user in Supabase Auth
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
      
      if (error) throw error;
      
      toast.success('Registration successful! Please check your email to verify your account.');
      
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
      // In a real implementation, we would verify the token
      // For Supabase, email verification is handled through the email link
      
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
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      
      if (error) throw error;
      
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
      // In Supabase, password reset is handled through the email link
      // The token is part of the URL and handled by Supabase auth
      
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      
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
      // In a real implementation, we would enable MFA through Supabase
      // Currently, Supabase doesn't have built-in MFA, so this would require a custom implementation
      
      // For mock purposes, we'll just update the user profile
      const { error } = await supabase
        .from('profiles')
        .update({ mfa_enabled: true })
        .eq('id', user.id);
        
      if (error) throw error;
      
      // Update local user state
      setUser(prev => prev ? { ...prev, mfaEnabled: true } : null);
      
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
      // In a real implementation, we would verify the MFA code
      // For demo purposes, we'll just check if it's a 6-digit code
      
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
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setSession(null);
      setSessionExpiry(null);
      toast.info('You have been logged out');
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out. Please try again.");
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
    refreshSession,
    session
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
