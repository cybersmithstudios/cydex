
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { ArrowRight, Bike, Package, CreditCard, Truck, User, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HowItWorks = () => {
  const navigate = useNavigate();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Sustainable, Smart, & <span className="text-primary">Rewarding</span> Deliveries
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
          >
            Cydex helps you make a positive environmental impact while enjoying fast and cost-effective deliveries.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button 
              className="primary-button hover:scale-105" 
              onClick={() => navigate("/auth?tab=register")}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* Step-by-Step Process Sections */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How Cydex Works</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our platform connects eco-conscious customers, green delivery riders, and sustainable vendors - creating a complete ecosystem for zero-emission deliveries.
            </p>
          </div>
          
          {/* For Customers */}
          <div className="mb-20">
            <div className="flex items-center justify-center mb-10">
              <div className="bg-primary/10 p-3 rounded-full">
                <User className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold ml-4">For Customers</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="text-4xl font-bold text-primary/30 mb-4">01</div>
                <h4 className="text-xl font-semibold mb-2">Order</h4>
                <p className="text-gray-600">
                  Order food/items from eco-friendly vendors through our easy-to-use app.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="text-4xl font-bold text-primary/30 mb-4">02</div>
                <h4 className="text-xl font-semibold mb-2">Choose Delivery</h4>
                <p className="text-gray-600">
                  Select a sustainable delivery method (bicycle, walker, or electric vehicle).
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="text-4xl font-bold text-primary/30 mb-4">03</div>
                <h4 className="text-xl font-semibold mb-2">Track</h4>
                <p className="text-gray-600">
                  Track your delivery in real-time with accurate ETAs and route visualization.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="text-4xl font-bold text-primary/30 mb-4">04</div>
                <h4 className="text-xl font-semibold mb-2">Earn Credits</h4>
                <p className="text-gray-600">
                  Earn carbon credits based on your eco-friendly delivery choices.
                </p>
              </div>
            </div>
          </div>
          
          {/* For Riders */}
          <div className="mb-20">
            <div className="flex items-center justify-center mb-10">
              <div className="bg-primary/10 p-3 rounded-full">
                <Bike className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold ml-4">For Riders</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="text-4xl font-bold text-primary/30 mb-4">01</div>
                <h4 className="text-xl font-semibold mb-2">Accept Orders</h4>
                <p className="text-gray-600">
                  View and accept available orders in your area through the rider app.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="text-4xl font-bold text-primary/30 mb-4">02</div>
                <h4 className="text-xl font-semibold mb-2">Deliver</h4>
                <p className="text-gray-600">
                  Deliver using bicycle, walking, or electric vehicle to maximize carbon credit earnings.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="text-4xl font-bold text-primary/30 mb-4">03</div>
                <h4 className="text-xl font-semibold mb-2">Earn</h4>
                <p className="text-gray-600">
                  Earn carbon credits + regular payment for each completed delivery.
                </p>
              </div>
            </div>
          </div>
          
          {/* For Vendors */}
          <div className="mb-20">
            <div className="flex items-center justify-center mb-10">
              <div className="bg-primary/10 p-3 rounded-full">
                <Store className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold ml-4">For Vendors</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="text-4xl font-bold text-primary/30 mb-4">01</div>
                <h4 className="text-xl font-semibold mb-2">List Your Store</h4>
                <p className="text-gray-600">
                  Create your store profile and start accepting orders through our platform.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="text-4xl font-bold text-primary/30 mb-4">02</div>
                <h4 className="text-xl font-semibold mb-2">Recycling Program</h4>
                <p className="text-gray-600">
                  Partner with our recycling reward program to further enhance your green credentials.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="text-4xl font-bold text-primary/30 mb-4">03</div>
                <h4 className="text-xl font-semibold mb-2">Get Incentives</h4>
                <p className="text-gray-600">
                  Receive business incentives and increased visibility for eco-friendly deliveries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Carbon Credit System */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Carbon Credit System Explained</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our innovative carbon credit system rewards eco-friendly choices and helps reduce carbon footprint.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6">How Carbon Credits Work</h3>
                
                <div className="space-y-6">
                  <div className="flex">
                    <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                      <Bike className="h-6 w-6 text-primary" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold">Eco-Friendly Delivery</h4>
                      <p className="text-gray-600">Every eco-friendly delivery earns carbon credits based on distance and transport method.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                      <CreditCard className="h-6 w-6 text-primary" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold">Credit Accumulation</h4>
                      <p className="text-gray-600">Credits accumulate in your account with each delivery and can be tracked in real-time.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold">Redeem Rewards</h4>
                      <p className="text-gray-600">Exchange credits for discounts, free meals, or donations to environmental projects.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass p-6 rounded-xl relative">
              <div className="absolute -top-6 -right-6 bg-primary/20 w-full h-full rounded-xl transform rotate-3 z-0"></div>
              <div className="relative z-10 bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold mb-6">CO₂ Savings Calculator</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="font-medium">1 km bike delivery:</div>
                    <div className="font-bold text-green-600">-250g CO₂</div>
                  </div>
                  
                  <div className="flex justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="font-medium">5 km electric vehicle:</div>
                    <div className="font-bold text-green-600">-950g CO₂</div>
                  </div>
                  
                  <div className="flex justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="font-medium">10 delivery sustainable packaging:</div>
                    <div className="font-bold text-green-600">-2kg CO₂</div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <div className="text-lg font-medium">Monthly average savings:</div>
                      <div className="text-2xl font-bold text-green-600">15kg CO₂</div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Equivalent to planting 1 tree every month!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary/10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Cydex & Make Your Deliveries Count
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Start making a positive impact today by joining our growing network of eco-conscious users.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              className="primary-button hover:scale-105" 
              onClick={() => navigate("/auth?tab=register")}
            >
              Sign Up as Customer
              <User className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              className="secondary-button hover:scale-105"
              onClick={() => navigate("/auth?tab=register&role=rider")}
            >
              Become a Rider
              <Bike className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              className="secondary-button hover:scale-105"
              onClick={() => navigate("/auth?tab=register&role=vendor")}
            >
              Register Your Business
              <Store className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      <FooterSection />
    </div>
  );
};

export default HowItWorks;
