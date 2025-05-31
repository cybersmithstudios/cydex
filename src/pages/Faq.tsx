
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  MessageSquare, 
  Mail,
  User,
  Bike,
  Building,
  CreditCard
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
  const navigate = useNavigate();
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 md:pt-28 pb-10 md:pb-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6">
            Need Help? <span className="text-primary">We've Got Answers</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about deliveries, payments, and sustainability.
          </p>
        </div>
      </section>
      
      {/* FAQ Accordion Sections */}
      <section className="py-10 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          {/* General Questions */}
          <div className="mb-12">
            <div className="flex items-center mb-6 sm:mb-8">
              <div className="bg-primary/10 p-2 sm:p-3 rounded-full">
                <User className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold ml-3 sm:ml-4">General Questions</h2>
            </div>
            
            <Accordion type="single" collapsible className="bg-white shadow-sm sm:shadow-md rounded-lg sm:rounded-xl overflow-hidden border border-gray-100">
              <AccordionItem value="item-1" className="border-b">
                <AccordionTrigger className="p-4 sm:p-5 md:p-6 hover:bg-gray-50 hover:no-underline text-left font-medium text-base sm:text-lg">
                  What is Cydex?
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-6 pt-2 text-sm sm:text-base text-gray-600">
                  Cydex is an eco-friendly delivery platform that connects customers, riders, and vendors in a sustainable ecosystem. We offer zero-emission deliveries using bicycles, walking couriers, and electric vehicles, while also tracking and rewarding carbon savings through our carbon credit system.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border-b">
                <AccordionTrigger className="p-4 sm:p-5 md:p-6 hover:bg-gray-50 hover:no-underline text-left font-medium text-base sm:text-lg">
                  How does the carbon credit system work?
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-6 pt-2 text-sm sm:text-base text-gray-600">
                  With every eco-friendly delivery, you earn carbon credits based on distance and delivery method. These credits accumulate in your account and can be redeemed for discounts on future orders, free meals, or even donations to environmental projects. It's our way of rewarding sustainable choices.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="border-b">
                <AccordionTrigger className="p-4 sm:p-5 md:p-6 hover:bg-gray-50 hover:no-underline text-left font-medium text-base sm:text-lg">
                  Where is Cydex currently available?
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-6 pt-2 text-sm sm:text-base text-gray-600">
                  Cydex is currently available in major urban areas across the country. We're rapidly expanding to new cities every month. Check our app or website to see if we're operating in your location, or sign up to be notified when we launch in your area.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="p-4 sm:p-5 md:p-6 hover:bg-gray-50 hover:no-underline text-left font-medium text-base sm:text-lg">
                  How is Cydex different from other delivery services?
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-6 pt-2 text-sm sm:text-base text-gray-600">
                  Unlike traditional delivery services, Cydex focuses on sustainability without compromising speed or reliability. We exclusively use zero-emission vehicles, optimize routes to minimize environmental impact, offer sustainable packaging options, and reward all users with our carbon credit system. Each delivery with us actively reduces carbon emissions.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          {/* For Customers */}
          <div className="mb-12">
            <div className="flex items-center mb-6 sm:mb-8">
              <div className="bg-primary/10 p-2 sm:p-3 rounded-full">
                <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold ml-3 sm:ml-4">For Customers</h2>
            </div>
            
            <Accordion type="single" collapsible className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100">
              <AccordionItem value="item-1" className="border-b">
                <AccordionTrigger className="p-4 sm:p-5 md:p-6 hover:bg-gray-50 hover:no-underline text-left font-medium text-base sm:text-lg">
                  How do I place an order?
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-6 pt-2 text-sm sm:text-base text-gray-600">
                  Simply create an account on our app or website, browse local eco-friendly vendors, select your items, choose your preferred delivery method (bicycle, walking, or electric vehicle), and check out. You can track your order in real-time and earn carbon credits with each delivery.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border-b">
                <AccordionTrigger className="p-4 sm:p-5 md:p-6 hover:bg-gray-50 hover:no-underline text-left font-medium text-base sm:text-lg">
                  How do I track my delivery?
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-6 pt-2 text-sm sm:text-base text-gray-600">
                  After placing an order, you'll receive real-time updates through our app. You can view your rider's location on a map, see their ETA, and even communicate with them directly if needed. Our tracking system is designed to provide accurate and transparent delivery information.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="border-b">
                <AccordionTrigger className="p-4 sm:p-5 md:p-6 hover:bg-gray-50 hover:no-underline text-left font-medium text-base sm:text-lg">
                  What payment methods are supported?
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-6 pt-2 text-sm sm:text-base text-gray-600">
                  We accept all major credit and debit cards, mobile payment platforms (Apple Pay, Google Pay), and select cryptocurrency options. You can save payment methods securely in your account for faster checkout.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="p-4 sm:p-5 md:p-6 hover:bg-gray-50 hover:no-underline text-left font-medium text-base sm:text-lg">
                  Are delivery fees higher than traditional services?
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-6 pt-2 text-sm sm:text-base text-gray-600">
                  Our delivery fees are competitive with traditional services. While eco-friendly transportation might occasionally have slightly higher base costs, we offset this through operational efficiencies and our carbon credit system, which provides value back to customers. Many customers find that the credits they earn make Cydex more cost-effective in the long run.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          {/* For Riders */}
          <div className="mb-12">
            <div className="flex items-center mb-6 sm:mb-8">
              <div className="bg-primary/10 p-2 sm:p-3 rounded-full">
                <Bike className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold ml-3 sm:ml-4">For Riders</h2>
            </div>
            
            <Accordion type="single" collapsible className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100">
              <AccordionItem value="item-1" className="border-b">
                <AccordionTrigger className="p-4 sm:p-5 md:p-6 hover:bg-gray-50 hover:no-underline text-left font-medium text-base sm:text-lg">
                  How do I sign up as a rider?
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-6 pt-2 text-sm sm:text-base text-gray-600">
                  To become a Cydex rider, download our rider app, create an account, and complete the application process. You'll need to provide identification, choose your delivery method (bicycle, walking, or electric vehicle), complete a short training, and pass a background check. Once approved, you can start accepting deliveries immediately.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border-b">
                <AccordionTrigger className="p-4 sm:p-5 md:p-6 hover:bg-gray-50 hover:no-underline text-left font-medium text-base sm:text-lg">
                  How do I earn carbon credits?
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-6 pt-2 text-sm sm:text-base text-gray-600">
                  As a rider, you earn carbon credits based on each delivery's distance and your transportation method. Bicycles and walking earn the highest credit rates. These credits can be redeemed for bonuses, gear upgrades, or converted to cash rewards. You'll also receive regular payments for your deliveries.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="p-4 sm:p-5 md:p-6 hover:bg-gray-50 hover:no-underline text-left font-medium text-base sm:text-lg">
                  What if I don't have my own bicycle or electric vehicle?
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-6 pt-2 text-sm sm:text-base text-gray-600">
                  In select locations, Cydex offers rental programs for bicycles and electric vehicles. Through partnerships with sustainable transportation providers, we can help riders access equipment at affordable rates. Some high-performing riders may qualify for subsidized purchase programs after a qualifying period.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          {/* For Vendors */}
          <div className="mb-12">
            <div className="flex items-center mb-6 sm:mb-8">
              <div className="bg-primary/10 p-2 sm:p-3 rounded-full">
                <Building className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold ml-3 sm:ml-4">For Vendors</h2>
            </div>
            
            <Accordion type="single" collapsible className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100">
              <AccordionItem value="item-1" className="border-b">
                <AccordionTrigger className="p-4 sm:p-5 md:p-6 hover:bg-gray-50 hover:no-underline text-left font-medium text-base sm:text-lg">
                  How do I list my business on Cydex?
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-6 pt-2 text-sm sm:text-base text-gray-600">
                  Create a vendor account on our website or business app, provide your business details (including your sustainability practices), upload your menu or product catalog, set your delivery radius, and complete the verification process. Our team will review your application and help you get set up within 2-3 business days.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border-b">
                <AccordionTrigger className="p-4 sm:p-5 md:p-6 hover:bg-gray-50 hover:no-underline text-left font-medium text-base sm:text-lg">
                  How does Cydex help sustainable businesses?
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-6 pt-2 text-sm sm:text-base text-gray-600">
                  Cydex promotes eco-friendly businesses through preferred placement in search results, special badges and recognition, marketing campaigns highlighting sustainable vendors, and business incentives through our carbon credit system. We also offer optional sustainable packaging partnerships to further enhance your green credentials.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="p-4 sm:p-5 md:p-6 hover:bg-gray-50 hover:no-underline text-left font-medium text-base sm:text-lg">
                  What are the fees for vendors?
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-6 pt-2 text-sm sm:text-base text-gray-600">
                  Our standard commission is competitive with other delivery platforms. However, businesses with strong sustainability practices qualify for reduced rates. We also offer a carbon credit system for vendors, where sustainable packaging choices and other green initiatives can earn you credits that reduce your commission fees over time.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
      
      {/* Contact Support CTA */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 text-center max-w-3xl">
          <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-sm sm:shadow-lg border border-gray-100">
            <div className="bg-primary/10 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Still have questions?</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
              Our support team is here to help you with any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button 
                className="bg-primary hover:bg-primary/90 text-white px-6 py-5 sm:px-8 sm:py-6 text-sm sm:text-base"
                onClick={() => navigate('/contact')}
              >
                <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Contact Support
              </Button>
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary/10 px-6 py-5 sm:px-8 sm:py-6 text-sm sm:text-base"
                onClick={() => navigate('/contact')}
              >
                View Help Center
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <FooterSection />
    </div>
  );
};

export default Faq;
