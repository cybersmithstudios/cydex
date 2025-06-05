import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/SupabaseAuthContext";
import { SupabaseProvider } from "@/contexts/SupabaseContext";
import { CartProvider } from "@/contexts/CartContext";
import AppRoutes from "@/routes/AppRoutes";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Toaster as ShadcnToaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();

// Supabase configuration
const supabaseUrl = 'https://szdfivpxenexorutudwj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6ZGZpdnB4ZW5leG9ydXR1ZHdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzODg1NDMsImV4cCI6MjA1Njk2NDU0M30.mb021u9hZ7lZBI81CycLFWK2WrvpaRjDwK23uKYFBVU';

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <SupabaseProvider supabaseUrl={supabaseUrl} supabaseKey={supabaseKey}>
          <AuthProvider>
            <CartProvider>
              <TooltipProvider>
                <Toaster />
                <ShadcnToaster />
                <BrowserRouter>
                  <div className="min-h-screen bg-background font-sans antialiased">
                    <AppRoutes />
                  </div>
                </BrowserRouter>
              </TooltipProvider>
            </CartProvider>
          </AuthProvider>
        </SupabaseProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
