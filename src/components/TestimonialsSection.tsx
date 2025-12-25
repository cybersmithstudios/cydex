import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, User } from "lucide-react";

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  location: string;
  rating: number;
}

const testimonials: TestimonialProps[] = [
  {
    quote: "As a small business owner in Ibadan, I was skeptical about eco-friendly delivery, but Cydex has exceeded my expectations. My customers appreciate the sustainable approach.",
    author: "Adebayo Ogunlesi",
    role: "Owner, Green Harvest Market",
    location: "Ibadan, Nigeria",
    rating: 5,
  },
  {
    quote: "Cydex has helped our restaurant reduce delivery times while maintaining our commitment to sustainability. Their cyclists know Ibadan's streets better than anyone.",
    author: "Funmi Adekunle",
    role: "Manager, Spice Route Restaurant",
    location: "Ibadan, Nigeria",
    rating: 5,
  },
  {
    quote: "I've seen my carbon credits grow each month with Cydex. It's encouraging to see tangible benefits from choosing green delivery options here in Ibadan.",
    author: "Oluwaseun Bankole",
    role: "Logistics Coordinator, Tech Hub Ibadan",
    location: "Ibadan, Nigeria",
    rating: 4,
  },
  {
    quote: "The customer service is exceptional. Whenever there's been an issue with a delivery, the Cydex team resolves it immediately.",
    author: "Chika Nwosu",
    role: "E-commerce Director, Naija Crafts",
    location: "Ibadan, Nigeria",
    rating: 5,
  },
  {
    quote: "As a university bookstore, we need reliable and quick deliveries. Cydex riders navigate UI campus effortlessly, even during exams week!",
    author: "Dr. Tunde Oladipo",
    role: "Manager, UI Bookstore",
    location: "Ibadan, Nigeria",
    rating: 5,
  },
  {
    quote: "The eco-friendly approach aligns perfectly with our brand values. Our customers appreciate knowing their orders are delivered sustainably.",
    author: "Amina Yusuf",
    role: "Brand Manager, Natural Beauty",
    location: "Ibadan, Nigeria",
    rating: 5,
  },
  {
    quote: "During last year's heavy rains, Cydex deliveries remained consistent when other services failed. Their commitment is impressive.",
    author: "Emeka Okafor",
    role: "Operations Lead, Ibadan Tech Solutions",
    location: "Ibadan, Nigeria",
    rating: 5,
  },
  {
    quote: "My elderly mother relies on medication deliveries. Cydex's reliable service has given our family peace of mind.",
    author: "Folake Adeyemi",
    role: "Customer",
    location: "Ibadan, Nigeria",
    rating: 5,
  }
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
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

  const goToNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection("right");
    
    setTimeout(() => {
      setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
      setIsAnimating(false);
      setDirection(null);
    }, 300);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection("left");
    
    setTimeout(() => {
      setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
      setIsAnimating(false);
      setDirection(null);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [current, isAnimating]);

  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      className="py-12 md:py-24 bg-gray-50 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className={`text-center mb-10 md:mb-16 transform transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}>
          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
            What Our <span className="text-primary">Clients Say</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it – hear from businesses that have 
            transformed their logistics with our sustainable solutions.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="relative overflow-hidden h-[450px] sm:h-[400px] md:h-[320px] glass px-4 py-6 md:p-10">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex flex-col justify-center p-4 md:p-10 transition-all duration-500 ${
                  index === current 
                    ? "opacity-100 translate-x-0" 
                    : direction === "right" && index === (current === 0 ? testimonials.length - 1 : current - 1)
                    ? "opacity-0 -translate-x-full"
                    : direction === "left" && index === (current === testimonials.length - 1 ? 0 : current + 1)
                    ? "opacity-0 translate-x-full"
                    : "opacity-0"
                }`}
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-10">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center bg-primary/20 border-2 border-primary/30">
                      <User size={28} className="text-primary" />
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex justify-center md:justify-start mb-2 md:mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={i < testimonial.rating ? "#AFFF64" : "none"}
                          color={i < testimonial.rating ? "#AFFF64" : "#D1D5DB"}
                          className="mr-1"
                        />
                      ))}
                    </div>
                    
                    <blockquote className="text-base md:text-lg italic text-foreground mb-3 md:mb-4">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div>
                      <p className="font-semibold text-sm md:text-base">{testimonial.author}</p>
                      <p className="text-muted-foreground text-xs md:text-sm">
                        {testimonial.role} • {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6 md:mt-8 gap-1.5 md:gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (index > current) {
                    setDirection("right");
                  } else if (index < current) {
                    setDirection("left");
                  }
                  setCurrent(index);
                }}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  index === current 
                    ? "bg-primary w-4 md:w-6" 
                    : "bg-muted hover:bg-muted/80"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToPrev}
            className="absolute top-1/2 -translate-y-1/2 -left-3 md:-left-5 bg-card h-8 w-8 md:h-10 md:w-10 rounded-full shadow-lg flex items-center justify-center hover:bg-muted transition-colors z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={goToNext}
            className="absolute top-1/2 -translate-y-1/2 -right-3 md:-right-5 bg-white h-8 w-8 md:h-10 md:w-10 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className={`text-center mt-8 md:mt-12 transform transition-all duration-700 delay-300 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}>
          <p className="text-base md:text-lg font-semibold">
            <span className="text-primary">98%</span> of customers recommend Cydex for sustainable deliveries
          </p>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-16 md:h-20 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-16 md:h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default TestimonialsSection;
