
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-lg shadow-sm py-4" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center">
          <span className="text-2xl font-bold text-black">
            <span className="text-primary">Cy</span>dex
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="nav-link">Features</a>
          <a href="#testimonials" className="nav-link">Testimonials</a>
          <a href="#partners" className="nav-link">Partners</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>

        {/* Sign Up Button (Desktop) */}
        <div className="hidden md:block">
          <button className="primary-button">
            Sign Up Now
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass py-4 px-6 flex flex-col space-y-4 animate-fade-in">
          <a 
            href="#features" 
            className="nav-link block py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </a>
          <a 
            href="#testimonials" 
            className="nav-link block py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Testimonials
          </a>
          <a 
            href="#partners" 
            className="nav-link block py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Partners
          </a>
          <a 
            href="#contact" 
            className="nav-link block py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </a>
          <button 
            className="primary-button w-full"
            onClick={() => setIsMenuOpen(false)}
          >
            Sign Up Now
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
