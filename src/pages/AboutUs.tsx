
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Bike, Leaf, Lightbulb, Users, ArrowRight } from "lucide-react";

const AboutUs = () => {
  const navigate = useNavigate();
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary opacity-10 rounded-full filter blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary opacity-10 rounded-full filter blur-3xl"></div>
          <img 
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b" 
            alt="Green landscape" 
            className="object-cover w-full h-full opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center lg:text-left relative z-10">
          <div className="max-w-3xl mx-auto lg:mx-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block py-1 px-4 rounded-full bg-primary/10 mb-4"
            >
              <p className="text-green-600 font-semibold text-sm sm:text-base">
                Our Story & Mission
              </p>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              Redefining <span className="text-primary drop-shadow-sm">Sustainable</span> Logistics
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Since 2020, Cydex has been on a mission to transform the logistics industry by creating eco-friendly delivery solutions that don't compromise on speed or reliability.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
            >
              <Button 
                className="primary-button hover:scale-105" 
                onClick={() => navigate("/auth?tab=register")}
                size="lg"
              >
                Join Our Movement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                className="secondary-button hover:scale-105"
                size="lg"
                onClick={() => {
                  const storySection = document.querySelector('.py-20.bg-white');
                  if (storySection) {
                    storySection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Read Our Story
              </Button>
            </motion.div>
          </div>
          
          {/* Decorative Elements */}
          <div className="hidden lg:block absolute -right-20 top-40 opacity-30">
            <Leaf className="w-40 h-40 text-primary" />
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Cydex was born out of a simple observation: while the world was embracing e-commerce and on-demand deliveries, the environmental impact of this convenience was being ignored.
              </p>
              <p className="text-gray-600 mb-4">
                In 2020, our founders, a group of environmental scientists and tech entrepreneurs, joined forces with a mission to transform the logistics industry. They envisioned a platform where sustainability and efficiency could coexist.
              </p>
              <p className="text-gray-600 mb-4">
                Starting with just three electric bikes in a single neighborhood, Cydex has grown into a comprehensive eco-friendly delivery network spanning multiple cities, with thousands of riders and partnered businesses.
              </p>
              <p className="text-gray-600">
                Today, we're proud to have saved over 1.5 million kg of CO₂ emissions through our zero-emission delivery network.
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute -top-6 -right-6 bg-primary/20 w-full h-full rounded-2xl transform rotate-3 z-0"></div>
              <div className="glass rounded-2xl overflow-hidden relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1487887235947-a955ef187fcc" 
                  alt="Eco-friendly delivery drone" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
          
          {/* Timeline */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold mb-10 text-center">Our Journey</h3>
            
            <div className="relative border-l-2 border-gray-200 ml-6 md:ml-0 md:mx-auto md:max-w-3xl pl-6 md:pl-0">
              <div className="md:flex md:items-center mb-12">
                <div className="md:w-1/2 md:pr-8 md:text-right">
                  <h4 className="text-xl font-semibold mb-1">2020</h4>
                  <p className="text-gray-600">Cydex founded with a mission to create sustainable deliveries</p>
                </div>
                <div className="absolute left-[-8px] md:left-1/2 md:ml-[-8px] bg-primary w-4 h-4 rounded-full border-4 border-white"></div>
                <div className="md:w-1/2 md:pl-8 hidden md:block"></div>
              </div>
              
              <div className="md:flex md:items-center mb-12">
                <div className="md:w-1/2 md:pr-8 hidden md:block"></div>
                <div className="absolute left-[-8px] md:left-1/2 md:ml-[-8px] bg-primary w-4 h-4 rounded-full border-4 border-white"></div>
                <div className="md:w-1/2 md:pl-8">
                  <h4 className="text-xl font-semibold mb-1">2021</h4>
                  <p className="text-gray-600">Launched carbon credit system and expanded to 5 major cities</p>
                </div>
              </div>
              
              <div className="md:flex md:items-center mb-12">
                <div className="md:w-1/2 md:pr-8 md:text-right">
                  <h4 className="text-xl font-semibold mb-1">2022</h4>
                  <p className="text-gray-600">Introduced AI-powered route optimization and sustainable packaging</p>
                </div>
                <div className="absolute left-[-8px] md:left-1/2 md:ml-[-8px] bg-primary w-4 h-4 rounded-full border-4 border-white"></div>
                <div className="md:w-1/2 md:pl-8 hidden md:block"></div>
              </div>
              
              <div className="md:flex md:items-center">
                <div className="md:w-1/2 md:pr-8 hidden md:block"></div>
                <div className="absolute left-[-8px] md:left-1/2 md:ml-[-8px] bg-primary w-4 h-4 rounded-full border-4 border-white"></div>
                <div className="md:w-1/2 md:pl-8">
                  <h4 className="text-xl font-semibold mb-1">2023-Present</h4>
                  <p className="text-gray-600">Nationwide expansion with over 10,000 riders and 1,000+ partnered businesses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Mission & Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              At Cydex, we're driven by more than just making deliveries. We're committed to transforming logistics through sustainable practices and innovative technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="bg-primary/10 p-4 rounded-full inline-block mb-6">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Sustainability</h3>
              <p className="text-gray-600">
                We prioritize green logistics in every aspect of our operations, from zero-emission transportation to eco-friendly packaging solutions.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="bg-primary/10 p-4 rounded-full inline-block mb-6">
                <Lightbulb className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Innovation</h3>
              <p className="text-gray-600">
                Our AI-powered route optimization, carbon tracking, and sustainable packaging technologies push the boundaries of what's possible in green logistics.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="bg-primary/10 p-4 rounded-full inline-block mb-6">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Community</h3>
              <p className="text-gray-600">
                We're building a global community of eco-conscious customers, riders, and businesses, rewarding everyone for making sustainable choices.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Meet the Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              The passionate individuals behind Cydex are united by a common mission to revolutionize the delivery industry through sustainability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <div className="relative mb-4 mx-auto w-40 h-40 rounded-full overflow-hidden">
                  <img 
                    src={`https://api.dicebear.com/7.x/personas/svg?seed=${100+i}`}
                    alt={`Team member ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">{
                  i === 1 ? "Alex Taylor" : 
                  i === 2 ? "Morgan Chen" : 
                  i === 3 ? "Jordan Smith" : "Sam Rodriguez"
                }</h3>
                <p className="text-primary font-medium">{
                  i === 1 ? "CEO & Co-Founder" : 
                  i === 2 ? "CTO & Co-Founder" : 
                  i === 3 ? "Head of Sustainability" : "Operations Director"
                }</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Partners */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Partners & Certifications</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We collaborate with leading environmental organizations and industry partners to maximize our positive impact.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-md w-full max-w-[180px] h-[100px] flex items-center justify-center">
                <div className="bg-gray-200 w-full h-12 rounded flex items-center justify-center">
                  <span className="text-gray-500 font-medium">Partner {i}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary/10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Us in Making a Difference
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Be part of our mission to create a sustainable future for deliveries.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              className="primary-button hover:scale-105" 
              onClick={() => navigate("/auth?tab=register")}
            >
              Sign Up
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              className="secondary-button hover:scale-105"
              onClick={() => navigate("/contact")}
            >
              Become a Partner
            </Button>
          </div>
        </div>
      </section>
      
      <FooterSection />
    </div>
  );
};

export default AboutUs;
