
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import LoadingDisplay from "@/components/ui/LoadingDisplay";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  // Test credentials info
  const testCredentials = {
    email: "admin@cydex.com",
    password: "admin123"
  };
  
  // Effect to handle redirect after successful login
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('Admin login - user role:', user.role);
      if (user.role === 'ADMIN' || user.role === 'admin') {
        console.log('Redirecting to admin dashboard');
        navigate('/admin', { replace: true });
      } else {
        toast.error("Access denied. Admin credentials required.");
        navigate('/', { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log('Attempting admin login with:', email);
      await login(email, password);
      toast.success("Admin login successful!");
    } catch (error) {
      console.error("Admin login failed:", error);
      toast.error(error instanceof Error ? error.message : "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const fillTestCredentials = () => {
    setEmail(testCredentials.email);
    setPassword(testCredentials.password);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <img 
            src="/lovable-uploads/525fd30a-476a-4e14-ae55-ec2b11d54013.png" 
            alt="Cydex Logo" 
            className="h-12 mx-auto mb-4" 
          />
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-gray-600">Access the admin dashboard</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="space-y-6">
            <div className="flex items-center mb-4">
              <Button variant="ghost" size="sm" asChild className="p-0 mr-2">
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Home
                </Link>
              </Button>
            </div>

            {/* Test Credentials Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">Test Credentials:</h3>
              <p className="text-sm text-blue-700 mb-1">Email: {testCredentials.email}</p>
              <p className="text-sm text-blue-700 mb-3">Password: {testCredentials.password}</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fillTestCredentials}
                className="text-blue-600 border-blue-300 hover:bg-blue-100"
              >
                Use Test Credentials
              </Button>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@cydex.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login as Admin"}
              </Button>
            </form>
            
            {isSubmitting && (
              <div className="mt-4">
                <div className="flex justify-center">
                  <LoadingDisplay size="sm" message="Verifying admin credentials..." />
                </div>
              </div>
            )}
          </div>
        </div>
        
        <p className="text-center mt-6 text-sm text-gray-600">
          Need regular access?
          <Link to="/auth" className="text-primary hover:underline mx-1">Go to main login</Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
