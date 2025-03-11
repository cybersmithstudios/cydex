
import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";

const Auth = () => {
  const { isAuthenticated, user } = useAuth();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') === 'register' ? 'signup' : 'login';
  const navigate = useNavigate();
  
  // Effect to handle redirect after successful authentication
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log("Auth page: User is authenticated, redirecting to dashboard:", user.role);
      navigate(`/${user.role}`);
    }
  }, [isAuthenticated, user, navigate]);
  
  return (
    <AuthLayout>
      <Tabs defaultValue={defaultTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        
        <TabsContent value="signup">
          <SignupForm />
        </TabsContent>
      </Tabs>
    </AuthLayout>
  );
};

export default Auth;
