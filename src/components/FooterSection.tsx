
import React from "react";
import { Instagram, Linkedin, Twitter, ArrowRight } from "lucide-react";

const FooterSection = () => {
  const currentYear = new Date().getFullYear();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter signup logic here
    alert("Thank you for signing up for our newsletter!");
  };

  return (
    <footer id="contact" className="bg-gray-900 text-white relative overflow-hidden">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              <span className="text-primary">Cy</span>dex
            </h3>
            <p className="text-gray-400 max-w-xs">
              Revolutionary eco-friendly delivery platform transforming logistics with sustainability at its core.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="transition-colors hover:text-primary">
                <Instagram />
              </a>
              <a href="#" className="transition-colors hover:text-primary">
                <Linkedin />
              </a>
              <a href="#" className="transition-colors hover:text-primary">
                <Twitter />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#features" className="text-gray-400 hover:text-primary transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-400 hover:text-primary transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#partners" className="text-gray-400 hover:text-primary transition-colors">
                  Partners
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Stay updated with our latest news and sustainable initiatives.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bg-primary hover:bg-primary-hover text-black rounded-lg p-2 transition-colors"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
              <p className="text-xs text-gray-500">
                By subscribing, you agree to our Privacy Policy.
              </p>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Cydex. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">
              Made with sustainability in mind.
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mb-32 -mr-32 blur-3xl"></div>
    </footer>
  );
};

export default FooterSection;
