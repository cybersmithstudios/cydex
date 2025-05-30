
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/SupabaseAuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import LogoutConfirmationDialog from "@/components/auth/LogoutConfirmationDialog";
import DesktopNavigation from "./navbar/DesktopNavigation";
import TabletNavigation from "./navbar/TabletNavigation";
import UserDropdown from "./navbar/UserDropdown";
import MobileNavigation from "./navbar/MobileNavigation";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const onLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const onConfirmLogout = () => {
    logout();
    navigate("/");
    setShowLogoutDialog(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md py-4 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container max-w-screen-xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/525fd30a-476a-4e14-ae55-ec2b11d54013.png" 
              alt="Cydex Logo" 
              className="h-10" 
            />
          </Link>
        </div>

        <DesktopNavigation />
        <TabletNavigation />

        <button 
          className="sm:hidden p-2 rounded-md focus:outline-none" 
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        <div className="hidden sm:flex items-center space-x-4">
          {isAuthenticated && user ? (
            <UserDropdown user={user} onLogoutClick={onLogoutClick} />
          ) : (
            <>
              <Button
                variant="ghost"
                className="hidden md:inline-flex"
                onClick={() => navigate("/auth")}
              >
                Log in
              </Button>
              <Button
                className="bg-primary hover:bg-primary/90 rounded-full"
                onClick={() => navigate("/auth?tab=register")}
              >
                Sign up
              </Button>
            </>
          )}
        </div>
      </div>

      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogoutClick={onLogoutClick}
      />

      <LogoutConfirmationDialog 
        isOpen={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={onConfirmLogout}
      />
    </header>
  );
};

export default Navbar;
