import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PartnersSection from "@/components/PartnersSection";
import FooterSection from "@/components/FooterSection";
import MapComponent from "@/components/MapComponent";
import { Link } from "react-router-dom";

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PartnersSection />
      <MapComponent />
      <FooterSection />
      <div className="fixed bottom-4 right-4">
        <Link 
          to="/admin/login"
          className="text-xs text-gray-500 hover:text-gray-600 underline"
        >
          Admin Access
        </Link>
      </div>
    </div>
  );
};

export default Index;
