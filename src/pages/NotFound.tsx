
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4">
      <div className="text-center max-w-md w-full">
        <div className="relative mb-8 mx-auto w-32 h-32">
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse"></div>
          <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
            <AlertTriangle size={40} className="text-primary" />
          </div>
        </div>
        
        <h1 className="text-7xl font-bold mb-4 text-gray-800">4<span className="text-primary">0</span>4</h1>
        <h2 className="text-2xl font-semibold mb-2">Oops! Page not found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for seems to have wandered off our eco-friendly route.
        </p>
        
        <div className="space-y-4">
          <Link to="/">
            <Button className="primary-button">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          
          <p className="text-sm text-gray-500 pt-6">
            Need assistance? <Link to="/contact" className="text-primary hover:underline">Contact our support team</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
