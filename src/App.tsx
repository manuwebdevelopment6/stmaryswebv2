import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/site/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Auth from "./pages/Auth.tsx";
import Academics from "./pages/Academics.tsx";
import Admissions from "./pages/Admissions.tsx";
import VirtualTour from "./pages/VirtualTour.tsx";
import SchoolLifePage from "./pages/SchoolLife.tsx";
import News from "./pages/News.tsx";
import Gallery from "./pages/Gallery.tsx";
import ExamDownloads from "./pages/ExamDownloads.tsx";
import StudentPortal from "./pages/StudentPortal.tsx";
import Admin from "./pages/Admin.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/academics" element={<Academics />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/life" element={<SchoolLifePage />} />
              <Route path="/news" element={<News />} />
              <Route path="/virtual-tour" element={<VirtualTour />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/exam-downloads" element={<ExamDownloads />} />
              <Route path="/portal" element={<StudentPortal />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/auth" element={<Auth />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
