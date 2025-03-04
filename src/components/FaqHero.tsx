
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const FaqHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Would handle search functionality here
    console.log("Searching for:", searchQuery);
  };

  return (
    <section className="relative pt-28 pb-20 overflow-hidden bg-gradient-to-br from-white to-gray-50">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary opacity-10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary opacity-10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 z-10 relative">
        <div className="text-center max-w-3xl mx-auto">
          <div className={`transition-all duration-700 transform ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked <span className="text-primary">Questions</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              Find answers to common questions about Cydex's eco-friendly delivery services, 
              how we work, and our commitment to sustainability.
            </p>
            
            <form onSubmit={handleSearch} className="max-w-xl mx-auto relative transition-all duration-700 delay-200 transform">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search for answers..."
                  className="w-full px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" className="absolute right-2 rounded-full h-10 w-10 flex items-center justify-center">
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </form>
          </div>
          
          <div className={`mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 transition-all duration-700 delay-300 transform ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-primary/50 transition-all cursor-pointer">
              <h3 className="font-medium">Delivery Information</h3>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-primary/50 transition-all cursor-pointer">
              <h3 className="font-medium">Account & Payments</h3>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-primary/50 transition-all cursor-pointer">
              <h3 className="font-medium">Partner With Us</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqHero;
