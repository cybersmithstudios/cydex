
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import MobileMenu from './MobileMenu';
import MobileHeader from './MobileHeader';
import { getNavLinks, getRoleTitle } from './navigationLinks';
import { UserRole } from '@/types/auth.types';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: UserRole;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, userRole }) => {
  const { user, logout, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  console.log('DashboardLayout render:', {
    userRole,
    user,
    loading,
    isAuthenticated,
    children: !!children
  });

  const navLinks = getNavLinks(userRole);
  const userRoleTitle = getRoleTitle(userRole);
  
  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  // Show loading state while auth is being determined
  if (loading) {
    console.log('DashboardLayout: Showing loading state');
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to auth if not authenticated
  if (!isAuthenticated) {
    console.log('DashboardLayout: Not authenticated, redirecting to auth');
    navigate('/auth');
    return null;
  }

  console.log('DashboardLayout: Rendering dashboard content');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar for larger screens */}
      <Sidebar 
        navLinks={navLinks}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        user={user}
        handleLogout={handleLogout}
        userRole={userRole}
      />

      {/* Mobile Header */}
      <MobileHeader 
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        user={user}
        userRole={userRole}
        handleLogout={handleLogout}
      />

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
        user={user}
        handleLogout={handleLogout}
        userRoleTitle={userRoleTitle}
      />

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
