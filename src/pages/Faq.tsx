
import React from "react";
import Navbar from "@/components/Navbar";
import FaqHero from "@/components/FaqHero";
import FooterSection from "@/components/FooterSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
  return (
    <div>
      <Navbar />
      <FaqHero />
      
      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">General Questions</h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What is Cydex?</AccordionTrigger>
                    <AccordionContent>
                      Cydex is Nigeria's first eco-friendly delivery platform. We provide package delivery services 
                      using zero-emission vehicles like electric bikes, cargo bikes, and on-foot couriers to reduce 
                      the carbon footprint associated with traditional delivery methods.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Where does Cydex currently operate?</AccordionTrigger>
                    <AccordionContent>
                      We currently operate in major Nigerian cities including Lagos, Ibadan, Abuja, and Port Harcourt. 
                      We're rapidly expanding and plan to cover all major urban centers in Nigeria by the end of 2025.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>How does Cydex help the environment?</AccordionTrigger>
                    <AccordionContent>
                      Cydex reduces carbon emissions by using zero-emission vehicles, optimizing delivery routes to minimize 
                      distance traveled, offering sustainable packaging options, and implementing carbon offset programs. 
                      For every 100 deliveries completed, we plant a tree in partnership with local conservation organizations.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Delivery Information</h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="delivery-1">
                    <AccordionTrigger>What types of packages can you deliver?</AccordionTrigger>
                    <AccordionContent>
                      We can deliver a wide range of items including documents, small to medium-sized packages, food, 
                      groceries, and retail goods. For larger items, please contact our customer service to check availability.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="delivery-2">
                    <AccordionTrigger>How fast can you deliver my package?</AccordionTrigger>
                    <AccordionContent>
                      Our delivery times vary based on distance, package type, and current demand. For same-city deliveries, 
                      we typically deliver within 1-3 hours. For express deliveries, we offer a 60-minute guarantee in 
                      select areas (additional charges apply).
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="delivery-3">
                    <AccordionTrigger>What if my package is damaged during delivery?</AccordionTrigger>
                    <AccordionContent>
                      All packages delivered by Cydex are insured. If your package is damaged during transit, 
                      please report it within 24 hours of delivery through our app or website. Our customer 
                      service team will guide you through the claims process.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="delivery-4">
                    <AccordionTrigger>Can I track my delivery in real-time?</AccordionTrigger>
                    <AccordionContent>
                      Yes! You can track your package in real-time through our mobile app or website. 
                      You'll receive live updates including estimated delivery time and the current 
                      location of your package.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Account & Payments</h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="account-1">
                    <AccordionTrigger>How do I create a Cydex account?</AccordionTrigger>
                    <AccordionContent>
                      You can create an account by downloading our mobile app from the App Store or Google Play, 
                      or by visiting our website and clicking on the "Sign Up" button. Follow the prompts to 
                      enter your details and create your account.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="account-2">
                    <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                    <AccordionContent>
                      We accept various payment methods including credit/debit cards, bank transfers, USSD payments, 
                      and mobile wallets like Paystack and Flutterwave. For business accounts, we also offer invoice-based 
                      billing with net-30 terms.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="account-3">
                    <AccordionTrigger>Do you offer corporate accounts?</AccordionTrigger>
                    <AccordionContent>
                      Yes, we offer special corporate accounts for businesses with regular delivery needs. 
                      Corporate accounts enjoy benefits like volume discounts, dedicated account managers, 
                      detailed reporting, and customized delivery solutions. Contact our business team for more information.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <FooterSection />
    </div>
  );
};

export default Faq;
