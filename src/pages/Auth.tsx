
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Eye, EyeOff, AlertCircle, Shield, Mail } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, isAuthenticated, user, verifyMFA, resetPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mfaRequired, setMfaRequired] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerRole, setRegisterRole] = useState<UserRole>('customer');
  
  // Additional info for different roles
  const [vehicleType, setVehicleType] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [adminCode, setAdminCode] = useState('');

  // Get the return URL from location state, or default to the user's dashboard
  const returnUrl = location.state?.from?.pathname;

  // Redirect to appropriate dashboard if already logged in
  useEffect(() => {
    if (isAuthenticated && user && !mfaRequired) {
      redirectToDashboard(returnUrl || user.role);
    }
  }, [isAuthenticated, user, mfaRequired]);

  const redirectToDashboard = (path: string | UserRole) => {
    if (path.startsWith('/')) {
      navigate(path);
    } else {
      switch (path) {
        case 'customer':
          navigate('/customer');
          break;
        case 'rider':
          navigate('/rider');
          break;
        case 'vendor':
          navigate('/vendor');
          break;
        case 'admin':
          navigate('/admin');
          break;
        default:
          navigate('/');
      }
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(loginEmail, loginPassword);
      // MFA simulation for demo purposes (in real app this would be from backend)
      if ((loginEmail === 'vendor@example.com' || loginEmail === 'admin@example.com') && 
          loginPassword === 'password') {
        setMfaRequired(true);
      }
      // If not requiring MFA, redirect is handled in the useEffect
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMfaVerification = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    setIsLoading(true);
    try {
      const success = await verifyMFA(mfaCode);
      if (success) {
        setMfaRequired(false);
        // Redirect handled by useEffect
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await resetPassword(resetEmail);
      setShowForgotPassword(false);
      // In a real app, would redirect to a "check your email" page
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate role-specific fields
    if (registerRole === 'rider' && !vehicleType) {
      toast.error('Please select your vehicle type');
      return;
    }
    
    if (registerRole === 'vendor' && (!businessName || !businessAddress)) {
      toast.error('Please complete all business information');
      return;
    }
    
    if (registerRole === 'admin' && adminCode !== 'CYDEX-ADMIN') {
      toast.error('Invalid admin registration code');
      return;
    }
    
    setIsLoading(true);
    try {
      // Create role-specific additional info
      let additionalInfo = {};
      
      switch (registerRole) {
        case 'rider':
          additionalInfo = { vehicleType };
          break;
        case 'vendor':
          additionalInfo = { businessName, businessAddress };
          break;
        case 'admin':
          additionalInfo = { isAdmin: true };
          break;
      }
      
      await register(registerName, registerEmail, registerPassword, registerRole, additionalInfo);
      // Show success and redirect to login tab
      toast.success(`Registration successful! You can now log in as a ${registerRole}.`);
      
      // Reset form and switch to login tab
      setRegisterName('');
      setRegisterEmail('');
      setRegisterPassword('');
      setVehicleType('');
      setBusinessName('');
      setBusinessAddress('');
      setAdminCode('');
      
      // Switch to login tab after successful registration
      document.querySelector('[data-state="inactive"][data-value="login"]')?.click();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Login hints for demo
  const loginHints = [
    { email: 'customer@example.com', role: 'Customer' },
    { email: 'rider@example.com', role: 'Rider' },
    { email: 'vendor@example.com', role: 'Vendor (with 2FA)' },
    { email: 'admin@example.com', role: 'Admin (with 2FA)' }
  ];

  // MFA Dialog
  if (mfaRequired) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="text-center mb-6">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-bold">Two-Factor Authentication</h1>
            <p className="text-gray-600 mt-2">
              Enter the 6-digit code from your authenticator app
            </p>
          </div>
          
          <form onSubmit={handleMfaVerification} className="space-y-6">
            <div className="space-y-2">
              <InputOTP maxLength={6} value={mfaCode} onChange={setMfaCode}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <p className="text-xs text-center text-gray-500 mt-2">
                For demo, enter any 6 digits (e.g., 123456)
              </p>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isLoading || mfaCode.length !== 6}
              onClick={handleMfaVerification}
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </Button>
            
            <div className="text-center">
              <button 
                type="button" 
                className="text-sm text-gray-600 hover:text-primary"
                onClick={() => {
                  setMfaRequired(false);
                  navigate('/auth');
                }}
              >
                Back to login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Password Reset Dialog
  const forgotPasswordDialog = (
    <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset Your Password</DialogTitle>
          <DialogDescription>
            Enter your email address and we'll send you a link to reset your password.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handlePasswordReset} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="reset-email">Email</Label>
            <Input
              id="reset-email"
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowForgotPassword(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col">
      <div className="container max-w-screen-xl mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-8" 
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
        
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">
              <span className="text-primary">Cy</span>dex
            </h1>
            <p className="text-gray-600 mt-2">
              Access your eco-friendly delivery dashboard
            </p>
          </div>
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Log In</TabsTrigger>
              <TabsTrigger value="register">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      className="mr-2 accent-primary"
                    />
                    <Label htmlFor="remember" className="text-sm cursor-pointer">
                      Remember me
                    </Label>
                  </div>
                  <button 
                    type="button" 
                    className="text-sm text-primary hover:underline"
                    onClick={() => setShowForgotPassword(true)}
                  >
                    Forgot password?
                  </button>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Log In'}
                </Button>
              </form>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700 mb-2 font-medium">Demo Accounts (password: "password")</p>
                <div className="grid grid-cols-2 gap-2">
                  {loginHints.map((hint) => (
                    <button
                      key={hint.email}
                      onClick={() => {
                        setLoginEmail(hint.email);
                        setLoginPassword('password');
                      }}
                      className="text-xs text-left p-2 hover:bg-gray-100 rounded transition-colors"
                    >
                      <span className="block font-medium">{hint.role}</span>
                      <span className="block text-gray-500">{hint.email}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-center mt-4">
                <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                <p className="text-xs text-gray-600">
                  For demo purposes, MFA is enabled for Vendor and Admin accounts
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Full Name</Label>
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="Enter your full name"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="Enter your email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                      minLength={8}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Password must be at least 8 characters
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>I am a:</Label>
                  <RadioGroup 
                    value={registerRole} 
                    onValueChange={(value) => setRegisterRole(value as UserRole)}
                    className="grid grid-cols-2 gap-2"
                  >
                    <div className="flex items-center space-x-2 p-2 rounded border border-gray-200">
                      <RadioGroupItem value="customer" id="customer" />
                      <Label htmlFor="customer" className="cursor-pointer">Customer</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-2 rounded border border-gray-200">
                      <RadioGroupItem value="rider" id="rider" />
                      <Label htmlFor="rider" className="cursor-pointer">Rider</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-2 rounded border border-gray-200">
                      <RadioGroupItem value="vendor" id="vendor" />
                      <Label htmlFor="vendor" className="cursor-pointer">Vendor</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-2 rounded border border-gray-200">
                      <RadioGroupItem value="admin" id="admin" />
                      <Label htmlFor="admin" className="cursor-pointer">Admin</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {/* Role-specific fields */}
                {registerRole === 'rider' && (
                  <div className="space-y-2">
                    <Label htmlFor="vehicle-type">Vehicle Type</Label>
                    <RadioGroup 
                      value={vehicleType} 
                      onValueChange={setVehicleType}
                      className="grid grid-cols-3 gap-2"
                    >
                      <div className="flex items-center space-x-2 p-2 rounded border border-gray-200">
                        <RadioGroupItem value="bicycle" id="bicycle" />
                        <Label htmlFor="bicycle" className="cursor-pointer">Bicycle</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-2 rounded border border-gray-200">
                        <RadioGroupItem value="e-bike" id="e-bike" />
                        <Label htmlFor="e-bike" className="cursor-pointer">E-Bike</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-2 rounded border border-gray-200">
                        <RadioGroupItem value="ev" id="ev" />
                        <Label htmlFor="ev" className="cursor-pointer">EV</Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}
                
                {registerRole === 'vendor' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="business-name">Business Name</Label>
                      <Input
                        id="business-name"
                        type="text"
                        placeholder="Enter your business name"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="business-address">Business Address</Label>
                      <Input
                        id="business-address"
                        type="text"
                        placeholder="Enter your business address"
                        value={businessAddress}
                        onChange={(e) => setBusinessAddress(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}
                
                {registerRole === 'admin' && (
                  <div className="space-y-2">
                    <Label htmlFor="admin-code">Admin Registration Code</Label>
                    <Input
                      id="admin-code"
                      type="text"
                      placeholder="Enter admin code"
                      value={adminCode}
                      onChange={(e) => setAdminCode(e.target.value)}
                      required
                    />
                    <p className="text-xs text-gray-500">
                      For demo, use code: CYDEX-ADMIN
                    </p>
                  </div>
                )}
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mr-2 accent-primary"
                    required
                  />
                  <Label htmlFor="terms" className="text-sm cursor-pointer">
                    I agree to the{' '}
                    <a href="#" className="text-primary hover:underline">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                  </Label>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
              
              <div className="flex items-center justify-center mt-4">
                <Mail className="h-4 w-4 text-primary mr-2" />
                <p className="text-xs text-gray-600">
                  For demo purposes, email verification is simulated
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {forgotPasswordDialog}
    </div>
  );
};

export default Auth;
