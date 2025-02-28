
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { 
  Bell, LogOut, Menu, MessageSquare, User, X, 
  Home, Package, Wallet, Recycle, Settings, 
  MapPin, ChevronDown, Users, BarChart, ShieldCheck 
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface SidebarLink {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: 'customer' | 'rider' | 'vendor' | 'admin';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, userRole }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation links based on user role
  const getNavLinks = (): SidebarLink[] => {
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

  const navLinks = getNavLinks();
  
  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar for larger screens */}
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
                  <span className="text-xl font-bold">
                    <span className="text-primary">Cy</span>dex
                  </span>
                ) : (
                  <span className="text-xl font-bold text-primary">C</span>
                )}
              </Link>
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={cn("p-1 rounded-md hover:bg-gray-100", !isSidebarOpen && "hidden")}
              >
                <Menu className={cn("h-5 w-5", isSidebarOpen ? "hidden" : "block")} />
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
                  onClick={handleLogout}
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
      </aside>

      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-100 mr-2"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <span className="text-xl font-bold">
            <span className="text-primary">Cy</span>dex
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
              <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="absolute inset-y-0 left-0 w-64 bg-white shadow-lg">
            <div className="p-4 border-b flex items-center justify-between">
              <Link to="/" className="text-xl font-bold" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="text-primary">Cy</span>dex
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)}>
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
                    <p className="text-xs text-gray-500">{getRoleTitle()}</p>
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
                              : "text-gray-700 hover:bg-gray-100"
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <link.icon className={cn("h-5 w-5", isActive && "text-primary")} />
                          <span className="ml-3">{link.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        isSidebarOpen ? "lg:ml-64" : "lg:ml-20",
        "pt-16 lg:pt-0"
      )}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
