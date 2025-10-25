import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingScreen from "@/components/LoadingScreen";
import { useLoadingScreen } from "@/hooks/useLoadingScreen";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Features from "./pages/Features";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import Contact from "./pages/Contact";
import RentalPlan from "./pages/RentalPlan";
import CustomerDashboard from "./pages/CustomerDashboard";
import CustomerRequestStatus from "./pages/CustomerRequestStatus";
import CustomerHistory from "./pages/CustomerHistory";
import FeaturedCards from "./pages/FeaturedCards";
import CardHolderDashboard from "./pages/CardHolderDashboard";
import CardHolderMyCards from "./pages/CardHolderMyCards";
import CardHolderRequests from "./pages/CardHolderRequests";
import CardHolderHistory from "./pages/CardHolderHistory";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isLoading } = useLoadingScreen();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/features" element={<Features />} />
          <Route path="/rental-plan" element={<RentalPlan />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/featured-cards" element={<FeaturedCards />} />
          <Route path="/customer-request-status" element={<CustomerRequestStatus />} />
          <Route path="/customer-history" element={<CustomerHistory />} />
          <Route path="/customer-profile" element={<Profile />} />
          <Route path="/customer-settings" element={<Settings />} />
          <Route path="/cardholder-dashboard" element={<CardHolderDashboard />} />
          <Route path="/cardholder-my-cards" element={<CardHolderMyCards />} />
          <Route path="/cardholder-requests" element={<CardHolderRequests />} />
          <Route path="/cardholder-history" element={<CardHolderHistory />} />
          <Route path="/cardholder-profile" element={<Profile />} />
          <Route path="/cardholder-settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
