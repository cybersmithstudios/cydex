import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { fadeIn, slideUp } from "@/utils/animations";

const HeroSection = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  // Function to navigate to the appropriate dashboard or auth page
  const handleSignUp = () => {
    if (isAuthenticated && user) {
      navigate(`/${user.role}`);
    } else {
      navigate("/auth?tab=register");
    }
  };

  // Function to handle the Learn More button
  const handleLearnMore = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>

      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 -left-12 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>

      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content */}
          <div className="lg:col-span-7 z-10">
            <motion.h1
              initial="hidden"
              animate="show"
              variants={fadeIn("right", "tween", 0.2, 0.7)}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              Sustainable Delivery for a{" "}
              <span className="text-primary">Greener Tomorrow</span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="show"
              variants={fadeIn("right", "tween", 0.4, 0.7)}
              className="text-lg text-gray-600 mt-6 max-w-xl"
            >
              Cydex revolutionizes eco-friendly logistics with carbon-neutral
              deliveries, recycled packaging, and partnerships with
              environmentally conscious businesses.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeIn("right", "tween", 0.6, 0.7)}
              className="flex flex-wrap gap-4 mt-8"
            >
              <Button
                onClick={handleSignUp}
                className="bg-primary hover:bg-primary/90 text-black px-6 py-6 h-auto text-base rounded-full"
              >
                {isAuthenticated ? "Go to Dashboard" : "Sign Up Now"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                onClick={handleLearnMore}
                className="border-gray-300 hover:bg-gray-100 text-gray-800 px-6 py-6 h-auto text-base rounded-full"
              >
                Learn More
              </Button>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeIn("right", "tween", 0.8, 0.7)}
              className="mt-10 flex items-center"
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
                    >
                      <img
                        src={`https://api.dicebear.com/7.x/personas/svg?seed=${i}`}
                        alt="User avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-gray-600 text-sm text-center">
                  Trusted by <span className="font-semibold">500+</span> eco-conscious businesses
                </p>
              </div>
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideUp}
            className="lg:col-span-5 relative z-10"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl transform -translate-x-10 translate-y-10"></div>
              <img
                src="https://images.unsplash.com/photo-1618022335292-382f6409c5c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                alt="Eco-friendly delivery"
                className="w-full h-auto rounded-2xl shadow-xl z-20 relative"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-xl rotate-12 z-10"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;