
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import AuthLayout from "@/components/auth/AuthLayout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { resetPassword } = useAuth();
  
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    setIsSubmitting(true);
    try {
      await resetPassword(email);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Password reset request failed:", error);
      // Error toast is already shown in the resetPassword function
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <AuthLayout>
      <div className="mb-4">
        <Button variant="ghost" size="sm" asChild className="p-0">
          <Link to="/auth">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Login
          </Link>
        </Button>
      </div>
      
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Reset Password</h1>
        {!isSubmitted ? (
          <p className="text-gray-600 mt-2">Enter your email to receive a password reset link</p>
        ) : (
          <p className="text-gray-600 mt-2">Check your email for the reset link</p>
        )}
      </div>
      
      {!isSubmitted ? (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      ) : (
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            We've sent a password reset link to <strong>{email}</strong>.
            Please check your email and follow the instructions.
          </p>
          <Button asChild variant="outline" className="mt-2">
            <Link to="/auth">Back to Login</Link>
          </Button>
        </div>
      )}
      
      <div className="mt-6 text-center">
        <p className="text-sm">
          Remember your password?{" "}
          <Link to="/auth" className="text-primary hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
