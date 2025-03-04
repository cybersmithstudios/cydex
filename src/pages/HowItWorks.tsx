
import React from "react";
import Navbar from "@/components/Navbar";
import HowItWorksHero from "@/components/HowItWorksHero";
import FooterSection from "@/components/FooterSection";

const HowItWorks = () => {
  return (
    <div>
      <Navbar />
      <HowItWorksHero />
      
      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Our Simple Process
            </h2>

            <div className="space-y-16">
              {/* Step 1 */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-5">
                  <div className="bg-primary/10 rounded-xl p-6 aspect-square flex items-center justify-center">
                    <div className="text-8xl font-bold text-primary">1</div>
                  </div>
                </div>
                <div className="md:col-span-7">
                  <h3 className="text-2xl font-semibold mb-4">Place Your Order</h3>
                  <p className="text-gray-600 mb-4">
                    Using our intuitive mobile app or website, select your pickup and delivery
                    locations, choose your preferred eco-friendly delivery option, and schedule
                    your delivery time.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Enter pickup and delivery details</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Select your preferred eco-friendly delivery option</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Choose a convenient delivery time</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 2 */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7 md:order-1 lg:order-2">
                  <h3 className="text-2xl font-semibold mb-4">We Pick Up Your Package</h3>
                  <p className="text-gray-600 mb-4">
                    Our eco-conscious rider arrives at your specified pickup location with sustainable 
                    packaging if needed. We carefully collect your package, ensuring it's securely 
                    prepared for transport.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Eco-friendly riders arrive promptly</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Sustainable packaging options available</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Careful handling of all items</span>
                    </li>
                  </ul>
                </div>
                <div className="md:col-span-5 md:order-2 lg:order-1">
                  <div className="bg-primary/10 rounded-xl p-6 aspect-square flex items-center justify-center">
                    <div className="text-8xl font-bold text-primary">2</div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-5">
                  <div className="bg-primary/10 rounded-xl p-6 aspect-square flex items-center justify-center">
                    <div className="text-8xl font-bold text-primary">3</div>
                  </div>
                </div>
                <div className="md:col-span-7">
                  <h3 className="text-2xl font-semibold mb-4">Track Your Delivery</h3>
                  <p className="text-gray-600 mb-4">
                    Monitor your package's journey in real-time through our app or website. 
                    Receive timely updates and notifications as your delivery progresses, 
                    ensuring transparency and peace of mind.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Real-time GPS tracking</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Automated progress notifications</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Estimated delivery time updates</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 4 */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7 md:order-1 lg:order-2">
                  <h3 className="text-2xl font-semibold mb-4">Safe & Eco-Friendly Delivery</h3>
                  <p className="text-gray-600 mb-4">
                    Your package arrives at its destination on time and in perfect condition. 
                    Our eco-friendly transportation methods ensure minimal environmental impact 
                    without compromising on delivery quality or speed.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Zero-emission delivery vehicles</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Optimized delivery routes to reduce carbon footprint</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Proof of delivery with digital confirmation</span>
                    </li>
                  </ul>
                </div>
                <div className="md:col-span-5 md:order-2 lg:order-1">
                  <div className="bg-primary/10 rounded-xl p-6 aspect-square flex items-center justify-center">
                    <div className="text-8xl font-bold text-primary">4</div>
                  </div>
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

export default HowItWorks;
