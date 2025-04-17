import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Index from './pages/Index';
import Auth from './pages/Auth';
import ResetPassword from './pages/Auth/ResetPassword';
import NotFound from './pages/NotFound';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import NewOrder from './pages/customer/NewOrder';
import Orders from './pages/customer/Orders';
import Wallet from './pages/customer/Wallet';
import Recycling from './pages/customer/Recycling';
import Messages from './pages/customer/Messages';
import Profile from './pages/customer/Profile';
import RiderDashboard from './pages/rider/RiderDashboard';
import AvailableOrders from './pages/rider/AvailableOrders';
import CurrentDeliveries from './pages/rider/CurrentDeliveries';
import RiderEarnings from './pages/rider/Earnings';
import RiderMessages from './pages/rider/Messages';
import RiderProfile from './pages/rider/Profile';
import VendorDashboard from './pages/vendor/VendorDashboard';
import AddProduct from './pages/vendor/AddProduct';
import VendorOrders from './pages/vendor/Orders';
import VendorWallet from './pages/vendor/Wallet';
import VendorRecycling from './pages/vendor/Recycling';
import VendorMessages from './pages/vendor/Messages';
import VendorSettings from './pages/vendor/Settings';
import AdminDashboard from './pages/admin/AdminDashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from './components/ui/sonner';
import HowItWorks from './pages/HowItWorks';
import AboutUs from './pages/AboutUs';
import Faq from './pages/Faq';
import Contact from './pages/Contact';
import AdminLogin from './components/admin/AdminLogin';
import AdminProtectedRoute from './components/admin/AdminProtectedRoute';
import Dashboard from './pages/admin/Dashboard';
import IncomingOrders from './pages/admin/IncomingOrders';
import RiderAssignment from './pages/admin/RiderAssignment';
import FleetTracking from './pages/admin/FleetTracking';
import DeliveryLogs from './pages/admin/DeliveryLogs';
import Escalations from './pages/admin/Escalations';

const ProtectedRoute = ({ 
  children, 
  allowedRoles = [] 
}: { 
  children: JSX.Element, 
  allowedRoles?: Array<string> 
}) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: window.location }} replace />;
  }
  
  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
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
            
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contact" element={<Contact />} />
            
            <Route path="/admin/login" element={<AdminLogin />} />
            
            <Route path="/admin" element={
              <AdminProtectedRoute>
                <Dashboard />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/orders" element={
              <AdminProtectedRoute>
                <IncomingOrders />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/riders" element={
              <AdminProtectedRoute>
                <RiderAssignment />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/tracking" element={
              <AdminProtectedRoute>
                <FleetTracking />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/logs" element={
              <AdminProtectedRoute>
                <DeliveryLogs />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/escalations" element={
              <AdminProtectedRoute>
                <Escalations />
              </AdminProtectedRoute>
            } />
            
            <Route 
              path="/customer/new-order" 
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <NewOrder />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/customer/orders" 
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <Orders />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/customer/wallet" 
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <Wallet />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/customer/recycling" 
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <Recycling />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/customer/messages" 
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <Messages />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/customer/profile" 
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/customer/*" 
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <CustomerDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/rider" 
              element={
                <ProtectedRoute allowedRoles={['rider']}>
                  <RiderDashboard />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/rider/available" 
              element={
                <ProtectedRoute allowedRoles={['rider']}>
                  <AvailableOrders />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/rider/current" 
              element={
                <ProtectedRoute allowedRoles={['rider']}>
                  <CurrentDeliveries />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/rider/earnings" 
              element={
                <ProtectedRoute allowedRoles={['rider']}>
                  <RiderEarnings />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/rider/messages" 
              element={
                <ProtectedRoute allowedRoles={['rider']}>
                  <RiderMessages />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/rider/profile" 
              element={
                <ProtectedRoute allowedRoles={['rider']}>
                  <RiderProfile />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/vendor" 
              element={
                <ProtectedRoute allowedRoles={['vendor']}>
                  <VendorDashboard />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/vendor/add-product" 
              element={
                <ProtectedRoute allowedRoles={['vendor']}>
                  <AddProduct />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/vendor/orders" 
              element={
                <ProtectedRoute allowedRoles={['vendor']}>
                  <VendorOrders />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/vendor/wallet" 
              element={
                <ProtectedRoute allowedRoles={['vendor']}>
                  <VendorWallet />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/vendor/recycling" 
              element={
                <ProtectedRoute allowedRoles={['vendor']}>
                  <VendorRecycling />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/vendor/messages" 
              element={
                <ProtectedRoute allowedRoles={['vendor']}>
                  <VendorMessages />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/vendor/settings" 
              element={
                <ProtectedRoute allowedRoles={['vendor']}>
                  <VendorSettings />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          <FloatingWhatsApp 
            phoneNumber="1234567890"
            accountName="Cydex"
            avatar="/og-tab.png"
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
