
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";

// Страницы
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import AITools from "./pages/AITools";
import DataManagement from "./pages/DataManagement";
import DataAnalysis from "./pages/DataAnalysis";
import ModelTraining from "./pages/ModelTraining";
import SemanticMemory from "./pages/SemanticMemory";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import SasokDashboard from "./pages/SasokDashboard";
import SasokInterfacePage from "./pages/SasokInterface";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          } />
          <Route path="/projects" element={
            <AppLayout>
              <Projects />
            </AppLayout>
          } />
          <Route path="/ai-tools" element={
            <AppLayout>
              <AITools />
            </AppLayout>
          } />
          <Route path="/data" element={
            <AppLayout>
              <DataManagement />
            </AppLayout>
          } />
          <Route path="/data-analysis" element={
            <AppLayout>
              <DataAnalysis />
            </AppLayout>
          } />
          <Route path="/model-training" element={
            <AppLayout>
              <ModelTraining />
            </AppLayout>
          } />
          <Route path="/semantic-memory" element={
            <AppLayout>
              <SemanticMemory />
            </AppLayout>
          } />
          <Route path="/settings" element={
            <AppLayout>
              <Settings />
            </AppLayout>
          } />
          <Route path="/sasok" element={
            <AppLayout>
              <SasokDashboard />
            </AppLayout>
          } />
          <Route path="/sasok-interface" element={
            <AppLayout>
              <SasokInterfacePage />
            </AppLayout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
