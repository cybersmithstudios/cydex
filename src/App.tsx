
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Index from './pages/Index';
import Auth from './pages/Auth';
import ResetPassword from './pages/Auth/ResetPassword';
import NotFound from './pages/NotFound';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import NewOrder from './pages/customer/NewOrder';
import RiderDashboard from './pages/rider/RiderDashboard';
import VendorDashboard from './pages/vendor/VendorDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from './components/ui/sonner';
import HowItWorks from './pages/HowItWorks';
import AboutUs from './pages/AboutUs';
import Faq from './pages/Faq';
import Contact from './pages/Contact';

// Protected route wrapper
const ProtectedRoute = ({ 
  children, 
  allowedRoles = [] 
}: { 
  children: JSX.Element, 
  allowedRoles?: Array<string> 
}) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    // Redirect them to the auth page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/auth" state={{ from: window.location }} replace />;
  }
  
  // Check role if allowedRoles is provided and not empty
  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    // Redirect to dashboard specific to their role
    return <Navigate to={`/${user.role}`} replace />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/reset-password" element={<ResetPassword />} />
            
            {/* Public pages */}
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Protected customer routes */}
            <Route 
              path="/customer/*" 
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <CustomerDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* New Order page */}
            <Route 
              path="/customer/new-order" 
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <NewOrder />
                </ProtectedRoute>
              } 
            />
            
            {/* Protected rider routes */}
            <Route 
              path="/rider/*" 
              element={
                <ProtectedRoute allowedRoles={['rider']}>
                  <RiderDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Protected vendor routes */}
            <Route 
              path="/vendor/*" 
              element={
                <ProtectedRoute allowedRoles={['vendor']}>
                  <VendorDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Protected admin routes */}
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          <FloatingWhatsApp 
            phoneNumber="1234567890"
            accountName="Cydex"
            avatar="/whatsapp.svg"
            statusMessage="Typically replies within minutes"
            chatMessage="Hello! 👋 Welcome to Cydex. How can we help you with sustainable deliveries today?"
            placeholder="Type your message here..."
            darkMode={true}
            allowClickAway={true}
            allowEsc={true}
            notification={true}
            notificationSound={false}
            notificationDelay={30}
            notificationLoop={3}
            style={{ zIndex: 999 }}
            buttonStyle={{ 
              backgroundColor: "#21CA1B", 
              boxShadow: "0 4px 12px rgba(175, 255, 100, 0.4)" 
            }}
            chatboxStyle={{ 
              border: "1px solid #333", 
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)" 
            }}
          />
          <Toaster />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
