import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import ChairmanDashboard from "./pages/dashboards/ChairmanDashboard";
import DirectorDashboard from "./pages/dashboards/DirectorDashboard";
import CustomerDashboard from "./pages/dashboards/CustomerDashboard";
import ManagingDirectorDashboard from "./pages/dashboards/ManagingDirectorDashboard";
import GMDashboard from "./pages/dashboards/GMDashboard";
import DGMDashboard from "./pages/dashboards/DGMDashboard";
import AGMDashboard from "./pages/dashboards/AGMDashboard";
import EngineerDashboard from "./pages/dashboards/EngineerDashboard";
import OperatorDashboard from "./pages/dashboards/OperatorDashboard";
import OfficerDashboard from "./pages/dashboards/OfficerDashboard";
import ChiefEngineerDashboard from "./pages/dashboards/ChiefEngineerDashboard";
import SystemAnalystDashboard from "./pages/dashboards/SystemAnalystDashboard";
import TechnicianDashboard from "./pages/dashboards/TechnicianDashboard";
import UserManagement from "./pages/management/UserManagement";
import PowerPlantsManagement from "./pages/management/PowerPlantsManagement";
import SubstationsManagement from "./pages/management/SubstationsManagement";
import IncidentManagement from "./pages/management/IncidentManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/" element={<Index />} />
                
                {/* Dashboard Routes */}
                <Route path="/dashboard/chairman" element={<ProtectedRoute><ChairmanDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/managing-director" element={<ProtectedRoute><ManagingDirectorDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/director/generation" element={<ProtectedRoute><DirectorDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/director/transmission" element={<ProtectedRoute><DirectorDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/director/distribution" element={<ProtectedRoute><DirectorDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/director/finance" element={<ProtectedRoute><DirectorDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/director/hr" element={<ProtectedRoute><DirectorDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/director/planning" element={<ProtectedRoute><DirectorDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/gm/:department" element={<ProtectedRoute><GMDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/dgm/:department" element={<ProtectedRoute><DGMDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/agm/:department" element={<ProtectedRoute><AGMDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/chief-engineer" element={<ProtectedRoute><ChiefEngineerDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/engineer/:specialization" element={<ProtectedRoute><EngineerDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/system-analyst" element={<ProtectedRoute><SystemAnalystDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/technician/:specialization" element={<ProtectedRoute><TechnicianDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/operator/:type" element={<ProtectedRoute><OperatorDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/officer/:department" element={<ProtectedRoute><OfficerDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/customer" element={<ProtectedRoute><CustomerDashboard /></ProtectedRoute>} />
                
                {/* Management Routes */}
                <Route path="/management/users" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
                <Route path="/management/power-plants" element={<ProtectedRoute><PowerPlantsManagement /></ProtectedRoute>} />
                <Route path="/management/substations" element={<ProtectedRoute><SubstationsManagement /></ProtectedRoute>} />
                <Route path="/management/incidents" element={<ProtectedRoute><IncidentManagement /></ProtectedRoute>} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
