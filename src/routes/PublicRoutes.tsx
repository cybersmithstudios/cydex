
import { Route, Routes } from 'react-router-dom';
import Index from '../pages/Index';
import Auth from '../pages/Auth';
import ResetPassword from '../pages/Auth/ResetPassword';
import NotFound from '../pages/NotFound';
import HowItWorks from '../pages/HowItWorks';
import AboutUs from '../pages/AboutUs';
import Faq from '../pages/Faq';
import Contact from '../pages/Contact';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
      
      {/* Public pages */}
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/contact" element={<Contact />} />
      
      {/* Catch-all route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PublicRoutes;
