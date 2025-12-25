import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { ArrowRight, Bike, Package, CreditCard, User, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HowItWorks = () => {
  const navigate = useNavigate();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("how-it-works-section");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section - Mobile Optimized */}
      <section className="pt-28 sm:pt-24 md:pt-32 pb-12 sm:pb-16 bg-gradient-to-b from-background to-muted relative overflow-hidden">
        {/* Background Elements - Responsive */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -right-20 w-72 sm:w-96 h-72 sm:h-96 bg-primary opacity-10 rounded-full filter blur-3xl animate-pulse-soft"></div>
          <div className="absolute -bottom-20 -left-20 w-72 sm:w-96 h-72 sm:h-96 bg-primary opacity-10 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 text-center lg:text-left relative z-10">
          <div className="max-w-3xl mx-auto lg:mx-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block py-1 px-3 sm:px-4 rounded-full bg-primary/10 mb-3 sm:mb-4"
            >
              <p className="text-primary font-semibold text-sm">
                Eco-Friendly Logistics Process
              </p>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
            >
              Sustainable, Smart, & <span className="text-primary drop-shadow-md">Rewarding</span> Deliveries
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Cydex helps you make a positive environmental impact while enjoying fast and cost-effective deliveries with benefits for customers, riders and vendors.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4"
            >
              <Button 
                className="primary-button hover:scale-105 w-full sm:w-auto" 
                onClick={() => navigate("/auth?tab=register")}
                size="lg"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                className="secondary-button hover:scale-105 w-full sm:w-auto"
                size="lg"
                onClick={scrollToFeatures}
              >
                Explore How It Works
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Step-by-Step Process Sections - Mobile Optimized */}
      <section id="how-it-works-section" className="py-12 sm:py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">How Cydex Works</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto">
              Our platform connects eco-conscious customers, green delivery riders, and sustainable vendors - creating a complete ecosystem for zero-emission deliveries.
            </p>
          </div>
          
          {/* For Customers */}
          <div className="mb-12 sm:mb-20">
            <div className="flex items-center justify-center mb-8 sm:mb-10">
              <div className="bg-primary/10 p-2 sm:p-3 rounded-full">
                <User className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold ml-3 sm:ml-4">For Customers</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Customer Steps */}
              <StepCard number="01" title="Order" description="Order food/items from eco-friendly vendors through our easy-to-use app." />
              <StepCard number="02" title="Choose Delivery" description="Select a sustainable delivery method (bicycle, walker, or electric vehicle)." />
              <StepCard number="03" title="Track" description="Track your delivery in real-time with accurate ETAs and route visualization." />
              <StepCard number="04" title="Earn Credits" description="Earn carbon credits based on your eco-friendly delivery choices." />
            </div>
          </div>
          
          {/* For Riders */}
          <div className="mb-12 sm:mb-20">
            <div className="flex items-center justify-center mb-8 sm:mb-10">
              <div className="bg-primary/10 p-2 sm:p-3 rounded-full">
                <Bike className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold ml-3 sm:ml-4">For Riders</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {/* Rider Steps */}
              <StepCard number="01" title="Accept Orders" description="View and accept available orders in your area through the rider app." />
              <StepCard number="02" title="Deliver" description="Deliver using bicycle, walking, or electric vehicle to maximize carbon credit earnings." />
              <StepCard number="03" title="Earn" description="Earn carbon credits + regular payment for each completed delivery." />
            </div>
          </div>
          
          {/* For Vendors */}
          <div className="mb-12 sm:mb-20">
            <div className="flex items-center justify-center mb-8 sm:mb-10">
              <div className="bg-primary/10 p-2 sm:p-3 rounded-full">
                <Store className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold ml-3 sm:ml-4">For Vendors</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {/* Vendor Steps */}
              <StepCard number="01" title="List Your Store" description="Create your store profile and start accepting orders through our platform." />
              {/* <StepCard number="02" title="Recycling Program" description="Partner with our recycling reward program to further enhance your green credentials." /> */}
              <StepCard number="03" title="Get Incentives" description="Receive business incentives and increased visibility for eco-friendly deliveries." />
            </div>
          </div>
        </div>
      </section>
      
      {/* Carbon Credit System - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Carbon Credit System Explained</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto">
              Our innovative carbon credit system rewards eco-friendly choices and helps reduce carbon footprint.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <div className="bg-card rounded-xl p-6 sm:p-8 shadow-lg">
                <h3 className="text-xl sm:text-2xl font-bold mb-6">How Carbon Credits Work</h3>
                
                <div className="space-y-4 sm:space-y-6">
                  <CreditFeature
                    icon={<Bike className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />}
                    title="Eco-Friendly Delivery"
                    description="Every eco-friendly delivery earns carbon credits based on distance and transport method."
                  />
                  
                  <CreditFeature
                    icon={<CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />}
                    title="Credit Accumulation"
                    description="Credits accumulate in your account with each delivery and can be tracked in real-time."
                  />
                  
                  <CreditFeature
                    icon={<Package className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />}
                    title="Redeem Rewards"
                    description="Exchange credits for discounts, free meals, or donations to environmental projects."
                  />
                </div>
              </div>
            </div>
            
            <div className="glass p-3 sm:p-6 rounded-xl relative">
              <div className="hidden sm:block absolute -top-4 -right-4 bg-primary/20 w-full h-full rounded-xl transform rotate-3 z-0"></div>
              <div className="relative z-10 bg-card p-3 sm:p-6 rounded-xl shadow-lg">
                <h3 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-6">CO₂ Savings Calculator</h3>
                
                <div className="space-y-2 sm:space-y-4">
                  <SavingsRow label="1 km bike delivery:" value="-250g CO₂" />
                  <SavingsRow label="5 km electric vehicle:" value="-950g CO₂" />
                  <SavingsRow label="10 delivery sustainable packaging:" value="-2kg CO₂" />
                  
                  <div className="mt-3 sm:mt-6 pt-3 sm:pt-6 border-t border-border">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                      <div className="text-sm sm:text-lg font-medium">Monthly average savings:</div>
                      <div className="text-lg sm:text-2xl font-bold text-green-600">15kg CO₂</div>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">Equivalent to planting 1 tree every month!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-20 bg-primary/10">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Join Cydex & Make Your Deliveries Count
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto mb-8 sm:mb-10">
            Start making a positive impact today by joining our growing network of eco-conscious users.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Button 
              className="primary-button hover:scale-105 w-full sm:w-auto" 
              onClick={() => navigate("/auth?tab=register")}
            >
              Sign Up as Customer
              <User className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              className="secondary-button hover:scale-105 w-full sm:w-auto"
              onClick={() => navigate("/auth?tab=register&role=rider")}
            >
              Become a Rider
              <Bike className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              className="secondary-button hover:scale-105 w-full sm:w-auto"
              onClick={() => navigate("/auth?tab=register&role=vendor")}
            >
              Register Your Business
              <Store className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      <FooterSection />
    </div>
  );
};

// Helper Components
const StepCard = ({ number, title, description }: { number: string; title: string; description: string }) => (
  <div className="bg-card rounded-xl p-5 sm:p-6 shadow-md border border-border hover:shadow-lg transition-shadow">
    <div className="text-3xl sm:text-4xl font-bold text-primary/30 mb-3 sm:mb-4">{number}</div>
    <h4 className="text-lg sm:text-xl font-semibold mb-2">{title}</h4>
    <p className="text-sm sm:text-base text-muted-foreground">{description}</p>
  </div>
);

const CreditFeature = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 bg-primary/10 p-2 sm:p-3 rounded-full">
      {icon}
    </div>
    <div className="ml-3 sm:ml-4">
      <h4 className="text-base sm:text-lg font-semibold">{title}</h4>
      <p className="text-sm sm:text-base text-muted-foreground">{description}</p>
    </div>
  </div>
);

const SavingsRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
    <div className="text-sm sm:text-base font-medium">{label}</div>
    <div className="font-bold text-green-600">{value}</div>
  </div>
);

export default HowItWorks;
