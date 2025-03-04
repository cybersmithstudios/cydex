
import React from "react";
import Navbar from "@/components/Navbar";
import ContactHero from "@/components/ContactHero";
import FooterSection from "@/components/FooterSection";
import MapComponent from "@/components/MapComponent";

const Contact = () => {
  return (
    <div>
      <Navbar />
      <ContactHero />
      
      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Find Us
            </h2>
            
            <div className="bg-white p-4 rounded-xl shadow-md">
              <MapComponent 
                center={{ lat: 7.4252, lng: 3.9164 }} 
                zoom={14} 
                markers={[
                  {
                    position: { lat: 7.4252, lng: 3.9164 },
                    title: "Cydex Headquarters",
                    description: "UI Plaza, Bodija Market Area, Ibadan, Nigeria"
                  }
                ]}
              />
            </div>
            
            <div className="mt-16">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Our Offices
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="font-semibold text-xl mb-2">Ibadan (HQ)</h3>
                  <p className="text-gray-600 mb-4">UI Plaza, Bodija Market Area,<br />Ibadan, Oyo State, Nigeria</p>
                  <p className="text-gray-600">
                    <strong>Phone:</strong> +234 803 123 4567<br />
                    <strong>Email:</strong> ibadan@cydex.ng
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="font-semibold text-xl mb-2">Lagos</h3>
                  <p className="text-gray-600 mb-4">72 Broad Street, Marina,<br />Lagos Island, Lagos, Nigeria</p>
                  <p className="text-gray-600">
                    <strong>Phone:</strong> +234 803 987 6543<br />
                    <strong>Email:</strong> lagos@cydex.ng
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="font-semibold text-xl mb-2">Abuja</h3>
                  <p className="text-gray-600 mb-4">Plot 24, Ademola Adetokunbo Crescent,<br />Wuse II, Abuja, Nigeria</p>
                  <p className="text-gray-600">
                    <strong>Phone:</strong> +234 803 456 7890<br />
                    <strong>Email:</strong> abuja@cydex.ng
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <FooterSection />
    </div>
  );
};

export default Contact;
