
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { UserRole, AuthContextType } from '@/types/auth.types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile without blocking authentication
          setTimeout(async () => {
            try {
              const { data: profileData, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
              
              if (error) {
                console.error('Error fetching profile:', error);
                // Create a basic profile if none exists
                setProfile({
                  id: session.user.id,
                  name: session.user.email?.split('@')[0] || 'User',
                  email: session.user.email,
                  role: 'CUSTOMER',
                  verified: false
                });
              } else {
                setProfile(profileData);
              }
            } catch (error) {
              console.error('Profile fetch error:', error);
              // Fallback profile
              setProfile({
                id: session.user.id,
                name: session.user.email?.split('@')[0] || 'User',
                email: session.user.email,
                role: 'CUSTOMER',
                verified: false
              });
            }
          }, 0);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success('Login successful!');
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role: role.toUpperCase(),
          },
          emailRedirectTo: `${window.location.origin}/auth`
        }
      });

      if (error) throw error;

      toast.success('Registration successful! Please check your email to verify your account.');
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Registration failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setSession(null);
      setProfile(null);
      toast.info('Logged out successfully');
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      if (error) throw error;
      toast.success('Password reset email sent!');
    } catch (error: any) {
      console.error('Reset password error:', error);
      toast.error(error.message || 'Failed to send reset email');
      throw error;
    }
  };

  const changePassword = async (email: string, code: string, password: string) => {
    try {
      // This would be handled by Supabase's built-in password reset flow
      toast.info('Please use the link sent to your email to reset your password');
    } catch (error: any) {
      console.error('Change password error:', error);
      throw error;
    }
  };

  const verifyEmail = async (email: string) => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });
      if (error) throw error;
      toast.success('Verification email sent!');
    } catch (error: any) {
      console.error('Verify email error:', error);
      throw error;
    }
  };

  // Create user object compatible with existing types
  const authUser = profile ? {
    id: profile.id,
    name: profile.name,
    email: profile.email,
    role: profile.role as UserRole,
    verified: profile.verified || false,
    avatar: profile.avatar,
  } : null;

  const value: AuthContextType = {
    user: authUser,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user, // Base authentication on session user, not profile
    verifyEmail,
    resetPassword,
    updatePassword: async () => false,
    enableMFA: async () => {},
    verifyMFA: async () => false,
    isSessionExpired: () => false,
    refreshSession: () => {},
    changePassword,
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
