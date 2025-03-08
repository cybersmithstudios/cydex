
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronDown, LogOut } from 'lucide-react';
import { User } from '@/types/auth.types';
import LogoutConfirmationDialog from '@/components/auth/LogoutConfirmationDialog';

interface SidebarLink {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface SidebarProps {
  navLinks: SidebarLink[];
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  handleLogout: () => void;
  userRole: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  navLinks,
  isSidebarOpen,
  setIsSidebarOpen,
  user,
  handleLogout,
  userRole
}) => {
  const location = useLocation();
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
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 bg-white shadow-md z-40 overflow-hidden transition-all duration-300 ease-in-out",
        isSidebarOpen ? "w-64" : "w-20",
        "hidden lg:block"
      )}
    >
      <div className="h-full flex flex-col justify-between">
        <div>
          {/* Logo and collapse button */}
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <Link to="/" className={cn("flex items-center", !isSidebarOpen && "justify-center w-full")}>
              {isSidebarOpen ? (
                <img 
                  src="/lovable-uploads/525fd30a-476a-4e14-ae55-ec2b11d54013.png" 
                  alt="Cydex Logo" 
                  className="h-8"
                />
              ) : (
                <img 
                  src="/og-tab.png" 
                  alt="Cydex Icon" 
                  className="h-8 w-8"
                />
              )}
            </Link>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={cn("p-1 rounded-md hover:bg-gray-100", !isSidebarOpen && "hidden")}
            >
              <ChevronDown className={cn("h-5 w-5 transform transition-transform", isSidebarOpen ? "rotate-90" : "rotate-0")} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="px-2 py-4">
            <ul className="space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                
                return (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className={cn(
                        "flex items-center py-2 px-3 rounded-md transition-colors",
                        isActive 
                          ? "bg-primary-light text-gray-900" 
                          : "text-gray-700 hover:bg-gray-100",
                        !isSidebarOpen && "justify-center"
                      )}
                    >
                      <link.icon className={cn("h-5 w-5", isActive && "text-primary")} />
                      {isSidebarOpen && <span className="ml-3">{link.name}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* User Section */}
        <div className="border-t p-4">
          {isSidebarOpen ? (
            <div className="flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} alt={user?.name || 'User'} />
                <AvatarFallback>{user?.name?.[0] || 'U'}</AvatarFallback>
              </Avatar>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 truncate">{getRoleTitle()}</p>
              </div>
              <button 
                onClick={onLogoutClick}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <LogOut className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <Avatar className="h-8 w-8 cursor-pointer" onClick={() => setIsSidebarOpen(true)}>
                <AvatarImage src={user?.avatar} alt={user?.name || 'User'} />
                <AvatarFallback>{user?.name?.[0] || 'U'}</AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>
      </div>

      <LogoutConfirmationDialog 
        isOpen={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={onConfirmLogout}
      />
    </aside>
  );
};

export default Sidebar;
