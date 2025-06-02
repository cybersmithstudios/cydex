
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/SupabaseAuthContext";
import AppRoutes from "@/routes/AppRoutes";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Toaster as ShadcnToaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <ShadcnToaster />
            <BrowserRouter>
              <div className="min-h-screen bg-background font-sans antialiased">
                <AppRoutes />
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
