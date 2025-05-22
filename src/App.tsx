import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Toaster } from './components/ui/sonner';
import AppRoutes from './routes/AppRoutes';
import { useShowWhatsApp } from './hooks/useShowWhatsApp';

const AppContent = () => {
  const showWhatsApp = useShowWhatsApp();

  return (
    <>
      <AppRoutes />
      
      {showWhatsApp && (
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
      )}
      <Toaster />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
