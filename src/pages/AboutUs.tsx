import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Bike, Leaf, Lightbulb, Users, ArrowRight } from "lucide-react";
import { TracingBeam } from "@/components/ui/tracing-beam";

const AboutUs = () => {
  const navigate = useNavigate();
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section - Mobile Optimized */}
      <section className="pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
        {/* Background Elements - Responsive */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -right-20 w-72 sm:w-96 h-72 sm:h-96 bg-primary opacity-10 rounded-full filter blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-72 sm:w-96 h-72 sm:h-96 bg-primary opacity-10 rounded-full filter blur-3xl"></div>
          <img 
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b" 
            alt="Green landscape" 
            className="object-cover w-full h-full opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
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
              className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0"
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
                  const storySection = document.querySelector('.py-20.bg-background');
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
      <section className="py-12 sm:py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Our Story</h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
                Cydex was born out of a simple observation: while the world was embracing e-commerce and on-demand deliveries, the environmental impact of this convenience was being ignored.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
                In 2020, our founders, a group of environmental scientists and tech entrepreneurs, joined forces with a mission to transform the logistics industry. They envisioned a platform where sustainability and efficiency could coexist.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
                Starting with just three electric bikes in a single neighborhood, Cydex has grown into a comprehensive eco-friendly delivery network spanning multiple cities, with thousands of riders and partnered businesses.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground">
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
          
          {/* Timeline with TracingBeam */}
          <div className="mt-12 sm:mt-16 md:mt-20">
            <h3 className="text-xl sm:text-2xl font-bold mb-8 sm:mb-10 text-center">Our Journey</h3>
            
            <TracingBeam className="px-4">
              <div className="max-w-3xl pl-5 mx-auto space-y-12 md:space-y-16">
                <TimelineItem 
                  year="2020"
                  title="Cydex Founded"
                  description="Cydex was founded with a mission to create sustainable deliveries"
                />
                <TimelineItem 
                  year="2021"
                  title="Expansion & Innovation"
                  description="Launched carbon credit system and expanded to 5 major cities"
                />
                <TimelineItem 
                  year="2022"
                  title="Technology Advancements"
                  description="Introduced AI-powered route optimization and sustainable packaging"
                />
                <TimelineItem 
                  year="2023-Present"
                  title="Nationwide Presence"
                  description="Nationwide expansion with over 10,000 riders and 1,000+ partnered businesses"
                />
              </div>
            </TracingBeam>
          </div>
        </div>
      </section>
      
      {/* Our Mission & Values - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-20 bg-muted/30 dark:bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Our Mission & Values</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto">
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
      <section className="py-12 sm:py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Meet Our Team</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto">
              The passionate individuals behind Cydex are united by a common mission to revolutionize the delivery industry through sustainability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <TeamMember
              image="/team/david.jpeg"
              name="Akinrinola David Akinyele"
              role="CEO & Co-Founder"
            />
            <TeamMember
              image="/team/tobi.jpeg"
              name="Tobiloba Olugbemi"
              role="CTO & Co-Founder"
            />
            <TeamMember
              image="/team/grace.jpeg"
              name="Grace David"
              role="Sustainability Director & Co-Founder"
            />
          </div>
        </div>
      </section>
      
      {/* Our Partners - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-20 bg-muted/30 dark:bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Our Partners & Certifications</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto">
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
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto mb-8 sm:mb-10">
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
const TimelineItem = ({ 
  year, 
  title, 
  description
}: { 
  year: string; 
  title: string;
  description: string; 
}) => (
  <div className="relative pl-0 group">
    <div className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm font-medium text-primary">{year}</span>
      </div>
      <h4 className="text-lg font-semibold mb-2 text-foreground">{title}</h4>
      <p className="text-sm sm:text-base text-muted-foreground">{description}</p>
    </div>
  </div>
);

const ValueCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="bg-card rounded-xl p-6 sm:p-8 shadow-md border border-border hover:shadow-lg transition-shadow">
    <div className="bg-primary/10 p-3 sm:p-4 rounded-full inline-block mb-4 sm:mb-6">
      {icon}
    </div>
    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">{title}</h3>
    <p className="text-sm sm:text-base text-muted-foreground">{description}</p>
  </div>
);

const TeamMember = ({ image, name, role }: { image: string; name: string; role: string }) => (
  <div className="text-center">
      <div className="relative mb-3 sm:mb-4 mx-auto w-28 h-28 sm:w-40 sm:h-40 rounded-full overflow-hidden shadow-lg border-4 border-background">
      <img 
        src={image}
        alt={name}
        className="w-full h-full object-cover"
      />
    </div>
    <h3 className="text-base sm:text-xl font-bold mb-1">{name}</h3>
    <p className="text-sm sm:text-base text-primary font-medium">{role}</p>
  </div>
);

const PartnerCard = ({ index }: { index: number }) => (
  <div className="bg-card p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md w-full max-w-[140px] sm:max-w-[180px] h-[80px] sm:h-[100px] flex items-center justify-center">
    <div className="bg-muted w-full h-10 sm:h-12 rounded flex items-center justify-center">
      <span className="text-xs sm:text-sm text-muted-foreground font-medium">Partner {index}</span>
    </div>
  </div>
);

export default AboutUs;
