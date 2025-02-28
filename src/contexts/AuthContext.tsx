
import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from "sonner";

// Define user roles
export type UserRole = 'customer' | 'rider' | 'vendor' | 'admin';

// Define user interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Customer User',
    email: 'customer@example.com',
    role: 'customer',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=customer'
  },
  {
    id: '2',
    name: 'Rider User',
    email: 'rider@example.com',
    role: 'rider',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=rider'
  },
  {
    id: '3',
    name: 'Vendor User',
    email: 'vendor@example.com',
    role: 'vendor',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=vendor'
  },
  {
    id: '4',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=admin'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('cydexUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in mock data
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (foundUser && password === 'password') { // Simple check for demo
        setUser(foundUser);
        localStorage.setItem('cydexUser', JSON.stringify(foundUser));
        toast.success(`Welcome back, ${foundUser.name}!`);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string, role: UserRole) => {
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
        avatar: `https://api.dicebear.com/7.x/personas/svg?seed=${email}`
      };
      
      // Add to mock users (in a real app, this would be an API call)
      mockUsers.push(newUser);
      
      // Auto login after registration
      setUser(newUser);
      localStorage.setItem('cydexUser', JSON.stringify(newUser));
      toast.success('Registration successful!');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('cydexUser');
    setUser(null);
    toast.info('You have been logged out');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
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
