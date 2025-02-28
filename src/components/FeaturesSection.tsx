
import React, { useEffect, useState, useRef } from "react";
import { Truck, Leaf, MapPin, Award, Handshake } from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const Feature = ({ icon, title, description, delay }: FeatureProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const featureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (featureRef.current) {
      observer.observe(featureRef.current);
    }

    return () => {
      if (featureRef.current) {
        observer.unobserve(featureRef.current);
      }
    };
  }, [delay]);

  return (
    <div 
      ref={featureRef}
      className={`feature-card transform transition-all duration-700 ${
        isVisible 
          ? "translate-y-0 opacity-100" 
          : "translate-y-20 opacity-0"
      }`}
    >
      <div className="mb-4 p-3 bg-primary/20 rounded-full inline-block">
        <div className="text-primary">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const FeaturesSection = () => {
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

  const features = [
    {
      icon: <Truck size={28} />,
      title: "Eco-Friendly Deliveries",
      description: "Zero-emission fleet of electric vehicles and bikes delivering packages with minimal environmental impact.",
      delay: 0,
    },
    {
      icon: <Award size={28} />,
      title: "Carbon Credit Rewards",
      description: "Earn incentives and rewards for choosing green delivery options and reducing your carbon footprint.",
      delay: 200,
    },
    {
      icon: <MapPin size={28} />,
      title: "Real-Time Tracking",
      description: "Follow your deliveries in real-time with our intuitive tracking system, offering precise ETA updates.",
      delay: 400,
    },
    {
      icon: <Leaf size={28} />,
      title: "Sustainable Packaging",
      description: "Biodegradable and recyclable packaging solutions that minimize waste and environmental impact.",
      delay: 600,
    },
    {
      icon: <Handshake size={28} />,
      title: "Sustainable Partnerships",
      description: "Collaborations with eco-conscious businesses to create a greener logistics ecosystem.",
      delay: 800,
    },
  ];

  return (
    <section id="features" className="section-padding bg-white relative overflow-hidden">
      <div 
        ref={sectionRef}
        className="container mx-auto px-6"
      >
        <div className={`text-center mb-16 transform transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Revolutionizing <span className="text-primary">Green Logistics</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our innovative features combine cutting-edge technology with 
            environmental consciousness to deliver a superior, sustainable service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full"></div>
    </section>
  );
};

export default FeaturesSection;
