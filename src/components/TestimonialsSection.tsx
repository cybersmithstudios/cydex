
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
}

const testimonials: TestimonialProps[] = [
  {
    quote: "Cydex has completely transformed how our business handles deliveries. The carbon credit rewards are a game-changer for our sustainability goals.",
    author: "Sarah Johnson",
    role: "CEO, EcoStyle",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    rating: 5,
  },
  {
    quote: "The real-time tracking is incredibly precise, and knowing our deliveries are eco-friendly gives us and our customers peace of mind.",
    author: "Michael Chen",
    role: "Operations Manager, GreenTech",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    rating: 5,
  },
  {
    quote: "Since switching to Cydex, we've reduced our carbon footprint by 40%. Our customers love the sustainable approach to deliveries.",
    author: "Emily Rodriguez",
    role: "Sustainability Director, Terra Foods",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    rating: 4,
  },
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
      className="section-padding bg-gray-50 relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transform transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="text-primary">Clients Say</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it – hear from businesses that have 
            transformed their logistics with our sustainable solutions.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="relative overflow-hidden h-[400px] md:h-[320px] glass px-6 py-8 md:p-10">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex flex-col justify-center p-6 md:p-10 transition-all duration-500 ${
                  index === current 
                    ? "opacity-100 translate-x-0" 
                    : direction === "right" && index === (current === 0 ? testimonials.length - 1 : current - 1)
                    ? "opacity-0 -translate-x-full"
                    : direction === "left" && index === (current === testimonials.length - 1 ? 0 : current + 1)
                    ? "opacity-0 translate-x-full"
                    : "opacity-0"
                }`}
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/30">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          fill={i < testimonial.rating ? "#AFFF64" : "none"}
                          color={i < testimonial.rating ? "#AFFF64" : "#D1D5DB"}
                          className="mr-1"
                        />
                      ))}
                    </div>
                    
                    <blockquote className="text-lg md:text-xl italic text-gray-700 mb-4">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-gray-500 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 gap-2">
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
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === current 
                    ? "bg-primary w-6" 
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToPrev}
            className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-5 bg-white h-10 w-10 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={goToNext}
            className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-5 bg-white h-10 w-10 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className={`text-center mt-12 transform transition-all duration-700 delay-300 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}>
          <p className="text-lg font-semibold">
            <span className="text-primary">98%</span> of customers recommend Cydex for sustainable deliveries
          </p>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default TestimonialsSection;
