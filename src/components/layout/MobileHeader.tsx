
import React, { useState } from 'react';
import { Bell, Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { User, MessageSquare, Settings, LogOut } from 'lucide-react';
import { User as UserType } from '@/types/auth.types';
import LogoutConfirmationDialog from '@/components/auth/LogoutConfirmationDialog';

interface MobileHeaderProps {
  onMenuToggle: () => void;
  user: UserType | null;
  userRole: string;
  handleLogout: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ 
  onMenuToggle, 
  user, 
  userRole,
  handleLogout 
}) => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  // Get role title for display
  const getRoleTitle = () => {
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

  const onLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const onConfirmLogout = () => {
    handleLogout();
    setShowLogoutDialog(false);
  };

  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-md hover:bg-gray-100 mr-2"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="text-xl font-bold flex items-center">
          <img 
            src="/lovable-uploads/525fd30a-476a-4e14-ae55-ec2b11d54013.png" 
            alt="Cydex Logo" 
            className="h-6"
          />
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <button className="p-2 rounded-full hover:bg-gray-100 relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-0.5">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} alt={user?.name || 'User'} />
                <AvatarFallback>{user?.name?.[0] || 'U'}</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div>
                <p className="font-medium">{user?.name}</p>
                <p className="text-xs text-gray-500">{getRoleTitle()}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={`/${userRole}/profile`} className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`/${userRole}/messages`} className="cursor-pointer">
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>Messages</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`/${userRole}/settings`} className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogoutClick} className="text-red-500 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <LogoutConfirmationDialog 
        isOpen={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={onConfirmLogout}
      />
    </div>
  );
};

export default MobileHeader;
