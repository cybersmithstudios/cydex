
import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary opacity-10 rounded-full filter blur-3xl animate-pulse-soft"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary opacity-10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 space-y-6 mb-10 lg:mb-0">
            <div 
              className={`transition-all duration-700 transform ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <p className="text-primary font-semibold mb-2 inline-block py-1 px-3 rounded-full bg-primary/10">
                Eco-Friendly Delivery Platform
              </p>
            </div>

            <h1 
              className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance transition-all duration-700 delay-100 transform ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              Delivering Packages,
              <br className="hidden sm:block" />
              <span className="text-primary">Preserving Planet</span>
            </h1>

            <p 
              className={`text-lg text-gray-600 max-w-xl transition-all duration-700 delay-200 transform ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              Cydex revolutionizes logistics with zero-emission vehicles, 
              optimized routes, and sustainable packaging, reducing carbon 
              footprint while maintaining exceptional delivery experiences.
            </p>

            <div 
              className={`flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 transition-all duration-700 delay-300 transform ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <button className="primary-button hover:scale-105">
                Sign Up Now
              </button>
              <button className="secondary-button hover:scale-105">
                Learn More
              </button>
            </div>
          </div>

          <div 
            className={`lg:w-1/2 relative transition-all duration-1000 delay-300 transform ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
            }`}
          >
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-full h-full bg-primary/20 rounded-2xl transform -rotate-6"></div>
              <div className="glass rounded-2xl overflow-hidden relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1487887235947-a955ef187fcc?auto=format&fit=crop&q=80&w=1000"
                  alt="Eco-friendly delivery drone" 
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        <div 
          className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer transition-all duration-700 delay-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onClick={scrollToFeatures}
        >
          <ChevronDown size={30} className="animate-bounce text-primary" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
