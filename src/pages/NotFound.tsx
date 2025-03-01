
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Map, Package, AlertTriangle } from "lucide-react";
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-40 w-40 rounded-full bg-primary/10 animate-pulse"></div>
          </div>
          <div className="relative z-10 py-8 flex flex-col items-center justify-center">
            <Package className="h-16 w-16 text-primary mb-2 animate-bounce" />
            <div className="flex items-center justify-center">
              <h1 className="text-7xl font-bold text-gray-900">4</h1>
              <div className="mx-2">
                <AlertTriangle className="h-12 w-12 text-amber-500 animate-spin-slow" />
              </div>
              <h1 className="text-7xl font-bold text-gray-900">4</h1>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! We've lost this package</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for has been misplaced or doesn't exist.
          Our eco-friendly riders are searching for it!
        </p>
        
        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
          
          <div className="flex items-center justify-center text-sm text-gray-500">
            <Map className="h-4 w-4 mr-2" />
            <span>Lost somewhere in the route: {location.pathname}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
