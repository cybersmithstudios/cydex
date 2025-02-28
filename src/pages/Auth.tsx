
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';

const Auth = () => {
  const navigate = useNavigate();
  const { login, register, isAuthenticated, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerRole, setRegisterRole] = useState<UserRole>('customer');

  // Redirect to appropriate dashboard if already logged in
  React.useEffect(() => {
    if (isAuthenticated && user) {
      redirectToDashboard(user.role);
    }
  }, [isAuthenticated, user]);

  const redirectToDashboard = (role: UserRole) => {
    switch (role) {
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
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(loginEmail, loginPassword);
      // Redirect is handled in the useEffect
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register(registerName, registerEmail, registerPassword, registerRole);
      // Redirect is handled in the useEffect
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
    { email: 'vendor@example.com', role: 'Vendor' },
    { email: 'admin@example.com', role: 'Admin' }
  ];

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
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
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
                  <a href="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-hover"
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
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="Create a password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    required
                    minLength={6}
                  />
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
                  className="w-full bg-primary hover:bg-primary-hover"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;
