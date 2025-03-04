
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { X, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User } from '@/types/auth.types';

interface SidebarLink {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: SidebarLink[];
  user: User | null;
  handleLogout: () => void;
  userRoleTitle: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navLinks,
  user,
  handleLogout,
  userRoleTitle
}) => {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-40">
      <div className="absolute inset-0 bg-gray-600 bg-opacity-75" onClick={onClose}></div>
      <div className="absolute inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="p-4 border-b flex items-center justify-between">
          <Link to="/" className="text-xl font-bold" onClick={onClose}>
            <span className="text-primary">Cy</span>dex
          </Link>
          <button onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-2 py-4">
          <div className="mb-6 px-4 py-3 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.avatar} alt={user?.name || 'User'} />
                <AvatarFallback>{user?.name?.[0] || 'U'}</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="font-medium">{user?.name}</p>
                <p className="text-xs text-gray-500">{userRoleTitle}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-center"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
          <nav>
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="flex items-center py-2 px-3 rounded-md transition-colors text-gray-700 hover:bg-gray-100"
                    onClick={onClose}
                  >
                    <link.icon className="h-5 w-5" />
                    <span className="ml-3">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
