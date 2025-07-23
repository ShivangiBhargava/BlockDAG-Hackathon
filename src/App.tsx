
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProjectSummaryPage from "./pages/ProjectSummaryPage";
import SlidePresentationPage from "./pages/SlidePresentationPage";
import DemoVideoScriptPage from "./pages/DemoVideoScriptPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/summary" element={<ProjectSummaryPage />} />
          <Route path="/presentation" element={<SlidePresentationPage />} />
          <Route path="/demo-script" element={<DemoVideoScriptPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
