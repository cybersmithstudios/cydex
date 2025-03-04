
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <img 
            src="/lovable-uploads/525fd30a-476a-4e14-ae55-ec2b11d54013.png" 
            alt="Cydex Logo" 
            className="h-12 mx-auto mb-4" 
          />
          <h1 className="text-2xl font-bold">Welcome to Cydex</h1>
          <p className="text-gray-600">Nigeria's eco-friendly delivery platform</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          {children}
        </div>
        
        <p className="text-center mt-6 text-sm text-gray-600">
          By using our service, you agree to our
          <a href="#" className="text-primary hover:underline mx-1">Terms of Service</a>
          and
          <a href="#" className="text-primary hover:underline mx-1">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
