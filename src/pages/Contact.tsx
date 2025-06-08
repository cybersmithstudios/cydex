import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Mail, Phone, MapPin, SendHorizonal, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      toast.error("Please fill out all fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Your message has been sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary opacity-10 rounded-full filter blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary opacity-10 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block py-1 px-4 rounded-full bg-primary/10 mb-4"
          >
            <p className="text-primary font-semibold text-xs sm:text-sm md:text-base">
              Get In Touch
            </p>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 md:mb-6"
          >
            We're Here to <span className="text-primary drop-shadow-sm">Help</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8"
          >
            Have questions about our services or want to join our mission? Our team is ready to assist you with any inquiries or feedback.
          </motion.p>
        </div>
      </section>
      
      {/* Contact Form & Info */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg sm:rounded-xl p-5 sm:p-6 md:p-8 shadow-md sm:shadow-lg border border-gray-100">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm sm:text-base">Your Name</Label>
                  <Input 
                    id="name"
                    type="text"
                    placeholder="Oluwaseun Adeyemi"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-10 sm:h-12 text-sm sm:text-base"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm sm:text-base">Email Address</Label>
                  <Input 
                    id="email"
                    type="email"
                    placeholder="oluwaseun@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-10 sm:h-12 text-sm sm:text-base"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm sm:text-base">Message</Label>
                  <Textarea 
                    id="message"
                    placeholder="How can we help you?"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="resize-none text-sm sm:text-base min-h-[120px]"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="primary-button w-full hover:scale-105"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <SendHorizonal className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-6 sm:space-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Contact Information</h2>
                <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                  Our team is available Monday through Friday from 9:00 AM to 6:00 PM to assist you with any questions or concerns.
                </p>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 sm:p-3 rounded-full flex-shrink-0 mt-0.5">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <h3 className="text-base sm:text-lg font-bold">Email Us</h3>
                    <p className="text-sm sm:text-base text-gray-600">cydexlogistics@gmail.com</p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">We'll respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 sm:p-3 rounded-full flex-shrink-0 mt-0.5">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <h3 className="text-base sm:text-lg font-bold">Call Us</h3>
                    <p className="text-sm sm:text-base text-gray-600">+2348028985352</p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Mon-Fri, 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 sm:p-3 rounded-full flex-shrink-0 mt-0.5">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <h3 className="text-base sm:text-lg font-bold">Visit Us</h3>
                    <p className="text-sm sm:text-base text-gray-600">123 Business District, Ikeja,</p>
                    <p className="text-sm sm:text-base text-gray-600">Lagos, Nigeria</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 sm:pt-6 border-t border-gray-200 mt-6 sm:mt-8">
                <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Follow Us</h3>
                <div className="flex space-x-2 sm:space-x-3 md:space-x-4">
                  <a href="https://www.instagram.com/cydexlogistics" target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-gray-200 p-2 sm:p-3 rounded-full transition-colors" aria-label="Instagram">
                    <Instagram className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
                  </a>
                  <a href="https://x.com/cydexlogistics" target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-gray-200 p-2 sm:p-3 rounded-full transition-colors" aria-label="X (Twitter)">
                    <Twitter className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
                  </a>
                  <a href="https://www.linkedin.com/company/cydexlogistics" target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-gray-200 p-2 sm:p-3 rounded-full transition-colors" aria-label="LinkedIn">
                    <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
                  </a>
                </div>
              </div>      
            </div>
          </div>
        </div>
      </section>
      
      {/* Live Chat Support */}
      <section className="py-16 bg-primary/10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Immediate Help?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Our support team is ready to assist you in real-time through our live chat service.
          </p>
          <Button 
            className="primary-button hover:scale-105"
            onClick={() => toast.info("Live chat support would open here")}
          >
            Start a Live Chat
            <MessageSquare className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
      
      <FooterSection />
    </div>
  );
};

export default Contact;