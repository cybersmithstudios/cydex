
import { User } from '../types/auth.types';

// Enhanced mock users with more security features
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Customer User',
    email: 'customer@example.com',
    role: 'CUSTOMER',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=customer',
    verified: true,
    carbonCredits: 450
  },
  {
    id: '2',
    name: 'Rider User',
    email: 'rider@example.com',
    role: 'RIDER',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=rider',
    verified: true,
    carbonCredits: 870
  },
  {
    id: '3',
    name: 'Vendor User',
    email: 'vendor@example.com',
    role: 'VENDOR',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=vendor',
    verified: true,
    mfaEnabled: true,
    carbonCredits: 1200
  },
  {
    id: '4',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'ADMIN',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=admin',
    verified: true,
    mfaEnabled: true,
    carbonCredits: 2500
  }
];
