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
      
      {/* Hero Section - Mobile Optimized */}
      <section className="pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Background Elements - Responsive */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -right-20 w-72 sm:w-96 h-72 sm:h-96 bg-primary opacity-10 rounded-full filter blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-72 sm:w-96 h-72 sm:h-96 bg-primary opacity-10 rounded-full filter blur-3xl"></div>
          <img 
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b" 
            alt="Green landscape" 
            className="object-cover w-full h-full opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>
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
                Our Story & Mission
              </p>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
            >
              Redefining <span className="text-primary drop-shadow-md">Sustainable</span> Logistics
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Since 2020, Cydex has been on a mission to transform the logistics industry by creating eco-friendly delivery solutions that don't compromise on speed or reliability.
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
                Join Our Movement
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                className="secondary-button hover:scale-105 w-full sm:w-auto"
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
      
      {/* Our Story Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Our Story</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                Cydex was born out of a simple observation: while the world was embracing e-commerce and on-demand deliveries, the environmental impact of this convenience was being ignored.
              </p>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                In 2020, our founders, a group of environmental scientists and tech entrepreneurs, joined forces with a mission to transform the logistics industry. They envisioned a platform where sustainability and efficiency could coexist.
              </p>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                Starting with just three electric bikes in a single neighborhood, Cydex has grown into a comprehensive eco-friendly delivery network spanning multiple cities, with thousands of riders and partnered businesses.
              </p>
              <p className="text-sm sm:text-base text-gray-600">
                Today, we're proud to have saved over 1.5 million kg of CO₂ emissions through our zero-emission delivery network.
              </p>
            </div>
            
            <div className="relative mt-8 lg:mt-0">
              <div className="hidden sm:block absolute -top-4 sm:-top-6 -right-4 sm:-right-6 bg-primary/20 w-full h-full rounded-xl sm:rounded-2xl transform rotate-3 z-0"></div>
              <div className="glass rounded-xl sm:rounded-2xl overflow-hidden relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1487887235947-a955ef187fcc" 
                  alt="Eco-friendly delivery drowe" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
          
          {/* Timeline - Mobile Optimized */}
          <div className="mt-12 sm:mt-16 md:mt-20">
            <h3 className="text-xl sm:text-2xl font-bold mb-8 sm:mb-10 text-center">Our Journey</h3>
            
            <div className="relative border-l-2 border-gray-200 ml-4 sm:ml-6 md:ml-0 md:mx-auto md:max-w-3xl pl-6 md:pl-0">
              <TimelineItem
                year="2020"
                description="Cydex founded with a mission to create sustainable deliveries"
                position="left"
              />
              <TimelineItem
                year="2021"
                description="Launched carbon credit system and expanded to 5 major cities"
                position="right"
              />
              <TimelineItem
                year="2022"
                description="Introduced AI-powered route optimization and sustainable packaging"
                position="left"
              />
              <TimelineItem
                year="2023-Present"
                description="Nationwide expansion with over 10,000 riders and 1,000+ partnered businesses"
                position="right"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Mission & Values - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Our Mission & Values</h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
              At Cydex, we're driven by more than just making deliveries. We're committed to transforming logistics through sustainable practices and innovative technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <ValueCard
              icon={<Leaf className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />}
              title="Sustainability"
              description="We prioritize green logistics in every aspect of our operations, from zero-emission transportation to eco-friendly packaging solutions."
            />
            <ValueCard
              icon={<Lightbulb className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />}
              title="Innovation"
              description="Our AI-powered route optimization, carbon tracking, and sustainable packaging technologies push the boundaries of what's possible in green logistics."
            />
            <ValueCard
              icon={<Users className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />}
              title="Community"
              description="We're building a global community of eco-conscious customers, riders, and businesses, rewarding everyone for making sustainable choices."
            />
          </div>
        </div>
      </section>
      
      {/* Meet the Team - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Meet Our Team</h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
              The passionate individuals behind Cydex are united by a common mission to revolutionize the delivery industry through sustainability.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <TeamMember
              seed={101}
              name="Alex Taylor"
              role="CEO & Co-Founder"
            />
            <TeamMember
              seed={102}
              name="Morgan Chen"
              role="CTO & Co-Founder"
            />
            <TeamMember
              seed={103}
              name="Jordan Smith"
              role="Head of Sustainability"
            />
            <TeamMember
              seed={104}
              name="Sam Rodriguez"
              role="Operations Director"
            />
          </div>
        </div>
      </section>
      
      {/* Our Partners - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Our Partners & Certifications</h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
              We collaborate with leading environmental organizations and industry partners to maximize our positive impact.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 items-center justify-items-center">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <PartnerCard key={i} index={i} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-20 bg-primary/10">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Join Us in Making a Difference
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-10">
            Be part of our mission to create a sustainable future for deliveries.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Button 
              className="primary-button hover:scale-105 w-full sm:w-auto" 
              onClick={() => navigate("/auth?tab=register")}
            >
              Sign Up
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              className="secondary-button hover:scale-105 w-full sm:w-auto"
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

// Helper Components
const TimelineItem = ({ year, description, position }: { year: string; description: string; position: "left" | "right" }) => (
  <div className="md:flex md:items-center mb-8 sm:mb-12">
    {position === "left" && (
      <div className="md:w-1/2 md:pr-8 md:text-right">
        <h4 className="text-lg sm:text-xl font-semibold mb-1">{year}</h4>
        <p className="text-sm sm:text-base text-gray-600">{description}</p>
      </div>
    )}
    <div className="absolute left-[-8px] md:left-1/2 md:ml-[-8px] bg-primary w-3 h-3 sm:w-4 sm:h-4 rounded-full border-4 border-white"></div>
    {position === "right" ? (
      <div className="md:w-1/2 md:pl-8">
        <h4 className="text-lg sm:text-xl font-semibold mb-1">{year}</h4>
        <p className="text-sm sm:text-base text-gray-600">{description}</p>
      </div>
    ) : (
      <div className="md:w-1/2 md:pl-8 hidden md:block"></div>
    )}
  </div>
);

const ValueCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="bg-white rounded-xl p-6 sm:p-8 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
    <div className="bg-primary/10 p-3 sm:p-4 rounded-full inline-block mb-4 sm:mb-6">
      {icon}
    </div>
    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">{title}</h3>
    <p className="text-sm sm:text-base text-gray-600">{description}</p>
  </div>
);

const TeamMember = ({ seed, name, role }: { seed: number; name: string; role: string }) => (
  <div className="text-center">
    <div className="relative mb-3 sm:mb-4 mx-auto w-28 h-28 sm:w-40 sm:h-40 rounded-full overflow-hidden">
      <img 
        src={`https://api.dicebear.com/7.x/personas/svg?seed=${seed}`}
        alt={name}
        className="w-full h-full object-cover"
      />
    </div>
    <h3 className="text-base sm:text-xl font-bold mb-1">{name}</h3>
    <p className="text-sm sm:text-base text-primary font-medium">{role}</p>
  </div>
);

const PartnerCard = ({ index }: { index: number }) => (
  <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md w-full max-w-[140px] sm:max-w-[180px] h-[80px] sm:h-[100px] flex items-center justify-center">
    <div className="bg-gray-200 w-full h-10 sm:h-12 rounded flex items-center justify-center">
      <span className="text-xs sm:text-sm text-gray-500 font-medium">Partner {index}</span>
    </div>
  </div>
);

export default AboutUs;
