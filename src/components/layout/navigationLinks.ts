
import { 
  Home, Package, Wallet, Recycle, MessageSquare, User, 
  MapPin, Settings, Users, BarChart, ShieldCheck 
} from 'lucide-react';

interface SidebarLink {
  name: string;
  href: string;
  icon: React.ElementType;
}

/**
 * Get navigation links based on user role
 */
export const getNavLinks = (userRole: 'customer' | 'rider' | 'vendor' | 'admin'): SidebarLink[] => {
  switch (userRole) {
    case 'customer':
      return [
        { name: 'Home', href: '/customer', icon: Home },
        { name: 'Orders', href: '/customer/orders', icon: Package },
        { name: 'Wallet', href: '/customer/wallet', icon: Wallet },
        { name: 'Recycling', href: '/customer/recycling', icon: Recycle },
        { name: 'Messages', href: '/customer/messages', icon: MessageSquare },
        { name: 'Profile', href: '/customer/profile', icon: User },
      ];
    case 'rider':
      return [
        { name: 'Dashboard', href: '/rider', icon: Home },
        { name: 'Available Orders', href: '/rider/available', icon: Package },
        { name: 'Current Deliveries', href: '/rider/current', icon: MapPin },
        { name: 'Earnings', href: '/rider/earnings', icon: Wallet },
        { name: 'Messages', href: '/rider/messages', icon: MessageSquare },
        { name: 'Profile', href: '/rider/profile', icon: User },
      ];
    case 'vendor':
      return [
        { name: 'Dashboard', href: '/vendor', icon: Home },
        { name: 'Orders', href: '/vendor/orders', icon: Package },
        { name: 'Wallet', href: '/vendor/wallet', icon: Wallet },
        { name: 'Recycling', href: '/vendor/recycling', icon: Recycle },
        { name: 'Messages', href: '/vendor/messages', icon: MessageSquare },
        { name: 'Settings', href: '/vendor/settings', icon: Settings },
      ];
    case 'admin':
      return [
        { name: 'Dashboard', href: '/admin', icon: Home },
        { name: 'Users', href: '/admin/users', icon: Users },
        { name: 'Orders', href: '/admin/orders', icon: Package },
        { name: 'Payments', href: '/admin/payments', icon: Wallet },
        { name: 'Sustainability', href: '/admin/sustainability', icon: Recycle },
        { name: 'Partners', href: '/admin/partners', icon: ShieldCheck },
        { name: 'Analytics', href: '/admin/analytics', icon: BarChart },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
      ];
    default:
      return [];
  }
};

/**
 * Get user role title for display
 */
export const getRoleTitle = (userRole: string): string => {
  switch (userRole) {
    case 'customer':
      return 'Customer';
    case 'rider':
      return 'Rider';
    case 'vendor':
      return 'Vendor';
    case 'admin':
      return 'Administrator';
    default:
      return '';
  }
};
