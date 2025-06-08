
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/SupabaseAuthContext";
import { fadeIn } from "@/utils/animations";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  
  const {
    isAuthenticated,
    user
  } = useAuth();
  
  const deliveryImages = [
    {
      src: "/lovable-uploads/7e72fc0f-d1c8-4f3c-9814-9a8022212eae.png",
      alt: "Bicycle delivery"
    },
    {
      src: "/lovable-uploads/c7aa382d-b0a6-46f9-8d0b-a005dc3cfe47.png",
      alt: "Walking delivery"
    },
    {
      src: "/lovable-uploads/115d316a-f5dd-4b56-8743-232ee3b0c01f.png",
      alt: "Electric bike delivery"
    }
  ];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Image carousel effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % deliveryImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, [deliveryImages.length]);

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
    featuresSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="z-10relative min-h-[100vh] md:min-h-screen flex items-center pt-16 md:pt-24 pb-12 md:pb-16 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -right-20 w-72 md:w-96 h-72 md:h-96 bg-primary opacity-10 rounded-full filter blur-3xl animate-pulse-soft"></div>
        <div className="absolute -bottom-20 -left-20 w-72 md:w-96 h-72 md:h-96 bg-primary opacity-10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12">
          <div className="lg:w-1/2 sm:pt-20 space-y-4 md:space-y-5 text-center lg:text-left max-w-2xl lg:max-w-none mx-auto">
            <div className={`transition-all duration-700 transform ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
              <p className="text-primary font-semibold inline-block py-1 px-3 rounded-full bg-primary/10 text-sm">
                Eco-Friendly Delivery Platform
              </p>
            </div>

            <h1 className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight transition-all duration-700 delay-100 transform ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
              Delivering Packages,
              <br className="hidden sm:block" />
              <span className="text-primary drop-shadow-xs">Preserving Planet</span>
            </h1>

            <p className={`text-sm md:text-base lg:text-lg text-gray-600 max-w-lg lg:max-w-none mx-auto lg:mx-0 transition-all duration-700 delay-200 transform ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
              Cydex revolutionizes logistics with zero-emission vehicles, optimized routes, and sustainable packaging, reducing carbon footprint while maintaining exceptional delivery experiences.
            </p>

            <div className={`flex flex-col sm:flex-row justify-center lg:justify-start gap-3 transition-all duration-700 delay-300 transform ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
              <Button onClick={handleSignUp} className="primary-button hover:scale-105 w-full sm:w-auto text-sm md:text-base py-2 md:py-3">
                {isAuthenticated ? "Go to Dashboard" : "Sign Up Now"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={handleLearnMore} className="secondary-button hover:scale-105 w-full sm:w-auto text-sm md:text-base py-2 md:py-3">
                Learn More
              </Button>
            </div>
          </div>

          <div className={`lg:w-1/2 w-full transition-all duration-1000 delay-300 transform ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}>
            <div className="relative px-4 sm:px-6 lg:px-0">
              <div className="absolute -top-3 sm:-top-5 -left-3 sm:-left-5 w-full h-full bg-primary/20 rounded-xl sm:rounded-2xl transform -rotate-6"></div>
              <div className="glass rounded-xl sm:rounded-2xl overflow-hidden relative z-10 w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px]">
                {deliveryImages.map((image, index) => (
                  <div key={index} className={`transition-opacity duration-700 absolute inset-0 ${currentImageIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className="w-full h-full object-cover object-center" 
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={`mt-8 md:mt-10 flex items-center justify-center transition-all duration-700 delay-400 transform ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full border-2 border-white overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/personas/svg?seed=${i}`} alt="User avatar" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="ml-3 md:ml-4">
            <p className="text-gray-600 text-xs sm:text-sm">
              Trusted by <span className="font-semibold">500+</span> eco-conscious businesses
            </p>
          </div>
        </div>

        <div className={`absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer transition-all duration-700 delay-500 ${isLoaded ? "opacity-100" : "opacity-0"}`} onClick={handleLearnMore}>
          <ChevronDown size={24} className="animate-bounce text-primary" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
