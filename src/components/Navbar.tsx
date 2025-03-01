
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Shield, LogOut, User, Settings, BarChart, Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for navbar
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

  // Navigate to dashboard based on user role
  const goToDashboard = () => {
    if (user) {
      navigate(`/${user.role}`);
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
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
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/logo.png" 
              alt="Cydex Logo" 
              className="h-10" 
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
          <Link to="/" className="nav-link text-sm lg:text-base">
            Home
          </Link>
          <Link to="/how-it-works" className="nav-link text-sm lg:text-base">
            How It Works
          </Link>
          <Link to="/about" className="nav-link text-sm lg:text-base">
            About Us
          </Link>
          <Link to="/faq" className="nav-link text-sm lg:text-base">
            FAQ
          </Link>
          <Link to="/contact" className="nav-link text-sm lg:text-base">
            Contact Us
          </Link>
        </nav>

        {/* Tablet Navigation Dropdown */}
        <div className="hidden sm:flex md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1">
                Menu <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link to="/">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/how-it-works">How It Works</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/about">About Us</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/faq">FAQ</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/contact">Contact Us</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile menu button */}
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

        {/* Auth Buttons or User Menu */}
        <div className="hidden sm:flex items-center space-x-4">
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={goToDashboard}>
                  <BarChart className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                {user.role === 'admin' && (
                  <DropdownMenuItem onClick={() => navigate("/admin")}>
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Admin Panel</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden absolute top-full left-0 right-0 bg-white shadow-md p-4 z-50 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="p-2 hover:bg-gray-100 rounded-md" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/how-it-works" className="p-2 hover:bg-gray-100 rounded-md" onClick={() => setMobileMenuOpen(false)}>
              How It Works
            </Link>
            <Link to="/about" className="p-2 hover:bg-gray-100 rounded-md" onClick={() => setMobileMenuOpen(false)}>
              About Us
            </Link>
            <Link to="/faq" className="p-2 hover:bg-gray-100 rounded-md" onClick={() => setMobileMenuOpen(false)}>
              FAQ
            </Link>
            <Link to="/contact" className="p-2 hover:bg-gray-100 rounded-md" onClick={() => setMobileMenuOpen(false)}>
              Contact Us
            </Link>
            
            {/* Mobile auth buttons */}
            {isAuthenticated && user ? (
              <>
                <div className="border-t my-2 pt-2"></div>
                <Button 
                  variant="ghost" 
                  className="justify-start p-2" 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    goToDashboard();
                  }}
                >
                  <BarChart className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                {user.role === 'admin' && (
                  <Button 
                    variant="ghost" 
                    className="justify-start p-2" 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate("/admin");
                    }}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Admin Panel
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  className="justify-start p-2" 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </>
            ) : (
              <>
                <div className="border-t my-2 pt-2"></div>
                <Button
                  variant="outline"
                  className="w-full justify-center"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/auth");
                  }}
                >
                  Log in
                </Button>
                <Button
                  className="w-full justify-center bg-primary hover:bg-primary/90 rounded-full"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/auth?tab=register");
                  }}
                >
                  Sign up
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
