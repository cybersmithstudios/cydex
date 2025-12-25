import React, { useRef, useState, useEffect } from "react";

const partnersData = [
  {
    name: "GreenLeaf",
    logo: "https://via.placeholder.com/150x80?text=GreenLeaf",
  },
  {
    name: "EcoDelivery",
    logo: "https://via.placeholder.com/150x80?text=EcoDelivery",
  },
  {
    name: "SustainableTech",
    logo: "https://via.placeholder.com/150x80?text=SustainableTech",
  },
  {
    name: "ZeroEmissions",
    logo: "https://via.placeholder.com/150x80?text=ZeroEmissions",
  },
  {
    name: "EarthFirst",
    logo: "https://via.placeholder.com/150x80?text=EarthFirst",
  },
  {
    name: "BioCourier",
    logo: "https://via.placeholder.com/150x80?text=BioCourier",
  },
];

const PartnersSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="partners" 
      ref={sectionRef} 
      className="py-12 md:py-24 bg-background"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className={`text-center mb-10 md:mb-16 transform transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}>
          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
            Our <span className="text-primary">Green Partners</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            We collaborate with leading sustainable businesses and organizations 
            to create a more environmentally responsible delivery ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-8">
          {partnersData.map((partner, index) => (
            <div 
              key={index}
              className={`flex items-center justify-center transition-all duration-700 transform ${
                isVisible 
                  ? "translate-y-0 opacity-100" 
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="p-3 md:p-4 rounded-lg md:rounded-xl bg-muted hover:bg-muted/80 transition-all duration-300 w-full h-24 md:h-32 flex items-center justify-center hover:shadow-md">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-10 md:max-h-12 grayscale hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-10 md:mt-16 text-center transform transition-all duration-700 delay-500 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}>
          <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
            Certified by leading environmental organizations
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-6">
            <div className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-primary/10 text-xs md:text-sm font-medium">
              Carbon Neutral
            </div>
            <div className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-primary/10 text-xs md:text-sm font-medium">
              Sustainable Logistics Alliance
            </div>
            <div className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-primary/10 text-xs md:text-sm font-medium">
              Green Business Bureau
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
