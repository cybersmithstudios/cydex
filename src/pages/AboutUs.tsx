
import React from "react";
import Navbar from "@/components/Navbar";
import AboutUsHero from "@/components/AboutUsHero";
import FooterSection from "@/components/FooterSection";

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <AboutUsHero />
      
      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
            
            <div className="prose prose-lg max-w-none">
              <p>
                Founded in 2023 in Ibadan, Nigeria, Cydex was born from a simple yet powerful idea: 
                to revolutionize package delivery in Africa's growing cities while addressing the 
                pressing issue of carbon emissions from traditional logistics operations.
              </p>
              
              <p>
                Our founder, Adebayo Olamide, witnessed firsthand the environmental impact of 
                conventional delivery methods while working in Lagos's bustling e-commerce sector. 
                As someone passionate about environmental sustainability, Adebayo envisioned a 
                delivery service that could maintain the efficiency and reliability that customers 
                expect while dramatically reducing the carbon footprint.
              </p>
              
              <h3 className="text-2xl font-semibold mt-8 mb-4">From Vision to Reality</h3>
              
              <p>
                Teaming up with environmental scientists, logistics experts, and tech innovators, 
                Adebayo established Cydex with a commitment to zero-emission delivery vehicles, 
                optimized route planning, and sustainable packaging solutions. The company began 
                with a small fleet of electric bikes in Ibadan, focusing initially on document 
                delivery and small packages.
              </p>
              
              <p>
                Word quickly spread about the reliable service that was also helping to reduce 
                urban pollution. As demand grew, so did our team and our fleet. Today, Cydex 
                operates in major Nigerian cities, with plans to expand across West Africa.
              </p>
              
              <h3 className="text-2xl font-semibold mt-8 mb-4">Making an Impact</h3>
              
              <p>
                Since our inception, we've completed over 500,000 deliveries without relying on 
                fossil fuels. Our carbon offset initiatives have planted more than 10,000 trees 
                across Nigeria, and we've partnered with local recycling programs to ensure our 
                packaging materials never end up in landfills.
              </p>
              
              <p>
                But we're most proud of the community we've built. Our network of riders, mostly 
                young Nigerians passionate about environmental conservation, has found sustainable 
                employment while contributing to a greener future. Many of our corporate clients 
                have been inspired to adopt more eco-friendly practices across their operations 
                after partnering with us.
              </p>
              
              <h3 className="text-2xl font-semibold mt-8 mb-4">Looking Ahead</h3>
              
              <p>
                As we continue to grow, our commitment to sustainability only strengthens. We're 
                investing in research and development to further reduce our environmental impact, 
                exploring solar-powered delivery vehicles, and developing even more efficient 
                routing algorithms.
              </p>
              
              <p>
                Our vision for the future includes expanding our services to every major city in 
                Africa, establishing Cydex as the continent's premier eco-friendly logistics provider, 
                and demonstrating that business success and environmental responsibility can go 
                hand in hand.
              </p>
              
              <p>
                Join us on our journey to transform logistics while preserving our planet for 
                future generations.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <FooterSection />
    </div>
  );
};

export default AboutUs;
